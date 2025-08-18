use reqwest::Client;
use serde::Deserialize;

use crate::{
    config::Config, error::ValidatorsAppError, network::Network, validator::Validator,
    validator_list_response::ValidatorListResponse,
};

pub mod config;
mod epoch_credits;
mod error;
pub mod network;
mod ping_entry;
mod uptime_entry;
mod validator;
mod validator_list_response;

pub struct ValidatorsAppClient {
    /// Request client
    client: Client,

    /// Base URL
    base_url: String,

    /// API Token
    api_token: String,
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

        let client = client_builder.build()?;

        Ok(Self {
            client,
            base_url,
            api_token: config.api_token,
        })
    }

    /// Construct [`ValidatorsAppClient`] for mainnet
    pub fn new_mainnet(api_token: String) -> Result<Self, ValidatorsAppError> {
        Self::new(Config {
            network: Network::Mainnet,
            api_token,
            timeout: Some(std::time::Duration::from_secs(30)),
        })
    }

    /// Construct [`ValidatorsAppClient`] for testnet
    pub fn new_testnet(api_token: String) -> Result<Self, ValidatorsAppError> {
        Self::new(Config {
            network: Network::Testnet,
            api_token,
            timeout: Some(std::time::Duration::from_secs(30)),
        })
    }

    /// Get all validators
    pub async fn get_validators(
        &self,
        limit: Option<f64>,
        page: Option<f64>,
        order: Option<&str>,
        active_only: Option<bool>,
        query: Option<&str>,
    ) -> Result<Vec<Validator>, ValidatorsAppError> {
        let network = match self.base_url.as_str() {
            url if url.contains("mainnet") => "mainnet",
            url if url.contains("testnet") => "testnet",
            _ => "mainnet", // default
        };

        let mut url = format!("{}/validators/{}.json", self.base_url, network);
        let mut params = Vec::new();

        if let Some(limit) = limit {
            params.push(format!("limit={limit}"));
        }
        if let Some(page) = page {
            params.push(format!("page={page}"));
        }
        if let Some(order) = order {
            params.push(format!("order={order}"));
        }
        if let Some(active_only) = active_only {
            params.push(format!("active_only={active_only}"));
        }
        if let Some(query) = query {
            params.push(format!("q={}", urlencoding::encode(query)));
        }

        if !params.is_empty() {
            url.push('?');
            url.push_str(&params.join("&"));
        }

        let response = self
            .client
            .get(&url)
            .header("Token", &self.api_token)
            .send()
            .await?;

        self.handle_response(response).await
    }

    /// Get specific validator
    ///
    /// # Parameters
    /// - account: Identity pubkey of validator
    /// - with_history: Show validator histories
    pub async fn get_validator(
        &self,
        account: &str,
        with_history: Option<bool>,
    ) -> Result<Validator, ValidatorsAppError> {
        let network = match self.base_url.as_str() {
            url if url.contains("mainnet") => "mainnet",
            url if url.contains("testnet") => "testnet",
            _ => "mainnet", // default
        };

        let mut url = format!("{}/validators/{}/{}.json", self.base_url, network, account);

        if let Some(true) = with_history {
            url.push_str("?with_history=true");
        }

        let response = self
            .client
            .get(&url)
            .header("Token", &self.api_token)
            .send()
            .await?;

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
