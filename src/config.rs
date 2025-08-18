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

    /// API Token
    pub api_token: String,

    /// Timeout duration
    pub timeout: Option<std::time::Duration>,
}
