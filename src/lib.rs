use reqwest::Client;

mod config;
mod error;

pub struct ValidatorsAppClient {
    /// Request client
    client: Client,

    /// Base URL
    base_url: String,

    /// API Key
    api_key: Option<String>,
}

impl ValidatorsAppClient {
    pub fn new(client: Client, base_url: String, api_key: Option<String>) -> Self {
        Self {
            client,
            base_url,
            api_key,
        }
    }
}
