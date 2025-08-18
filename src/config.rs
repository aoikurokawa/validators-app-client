/// Supported networks
#[derive(Debug, Clone)]
pub enum Network {
    Mainnet,
    Testnet,
}

/// Configuration for the client
pub struct Config {
    /// Supported network
    pub network: Network,

    /// API Key
    pub api_key: Option<String>,

    /// Timeout duration
    pub timeout: Option<std::time::Duration>,
}
