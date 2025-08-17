/// Supported networks
#[derive(Debug, Clone)]
pub enum Network {
    Mainnet,
    Testnet,
}

/// Configuration for the client
pub struct Config {
    /// Supported network
    network: Network,

    /// API Key
    api_key: Option<String>,

    /// Timeout duration
    timeout: Option<std::time::Duration>,
}
