use reqwest::Client;
use serde::Deserialize;

use crate::{
    config::{Config, Network},
    error::ValidatorsAppError,
    validator::Validator,
    validator_list_response::ValidatorListResponse,
};

pub mod config;
mod epoch_credits;
mod error;
mod ping_entry;
mod uptime_entry;
mod validator;
mod validator_list_response;

pub struct ValidatorsAppClient {
    /// Request client
    client: Client,

    /// Base URL
    base_url: String,

    /// API Key
    api_key: Option<String>,
}

impl ValidatorsAppClient {
    /// Initialize [`ValidatorsAppClient`]
    pub fn new(config: Config) -> Result<Self, ValidatorsAppError> {
        let base_url = match config.network {
            Network::Mainnet => "https://www.validators.app/api/v1".to_string(),
            Network::Testnet => "https://www.validators.app/api/v1".to_string(),
        };

        let mut client_builder = Client::builder();

        if let Some(timeout) = config.timeout {
            client_builder = client_builder.timeout(timeout);
        }

        let client = client_builder
            .build()
            .map_err(ValidatorsAppError::Network)?;

        Ok(Self {
            client,
            base_url,
            api_key: config.api_key,
        })
    }

    /// Construct [`ValidatorsAppClient`] for mainnet
    pub fn mainnet() -> Result<Self, ValidatorsAppError> {
        Self::new(Config {
            network: Network::Mainnet,
            api_key: None,
            timeout: Some(std::time::Duration::from_secs(30)),
        })
    }

    /// Get all validators
    pub async fn get_validators(
        &self,
        limit: Option<f64>,
        offset: Option<u64>,
    ) -> Result<ValidatorListResponse, ValidatorsAppError> {
        let mut url = format!("{}/validators", self.base_url);
        let mut params = Vec::new();

        if let Some(limit) = limit {
            params.push(format!("limit={}", limit));
        }

        if let Some(offset) = offset {
            params.push(format!("offset={}", offset));
        }

        if !params.is_empty() {
            url.push('?');
            url.push_str(&params.join("&"));
        }

        let response = match self.api_key.as_ref() {
            Some(api_key) => {
                self.client
                    .get(&url)
                    .header("Token", api_key)
                    .send()
                    .await?
            }
            None => self.client.get(&url).send().await?,
        };

        self.handle_response(response).await
    }

    /// Get specific validator
    pub async fn get_validator(&self, vote_account: &str) -> Result<Validator, ValidatorsAppError> {
        let url = format!("{}/validator/{}", self.base_url, vote_account);

        let response = self.client.get(&url).send().await?;

        self.handle_response(response).await
    }

    /// Search validators by name
    pub async fn search_validators(
        &self,
        query: &str,
    ) -> Result<ValidatorListResponse, ValidatorsAppError> {
        let url = format!(
            "{}/validators?search={}",
            self.base_url,
            urlencoding::encode(query)
        );

        let response = self.client.get(&url).send().await?;

        self.handle_response(response).await
    }

    // Helper method to handle API responses
    async fn handle_response<T>(&self, response: reqwest::Response) -> Result<T, ValidatorsAppError>
    where
        T: for<'de> Deserialize<'de>,
    {
        let status = response.status();

        if !status.is_success() {
            let error_text = response
                .text()
                .await
                .unwrap_or_else(|_| "Unknown error".to_string());

            return Err(ValidatorsAppError::Api {
                status: status.as_u16(),
                message: error_text,
            });
        }

        let text = response.text().await?;
        let result: T = serde_json::from_str(&text)?;
        Ok(result)
    }
}
