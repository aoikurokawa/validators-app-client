use crate::network::Network;

/// Configuration for the client
pub struct Config {
    /// Supported network
    pub network: Network,

    /// API Token
    pub api_token: String,

    /// Timeout duration
    pub timeout: Option<std::time::Duration>,
}

impl Config {
    /// Initialize [`Config`]
    pub const fn new(
        network: Network,
        api_token: String,
        timeout: Option<std::time::Duration>,
    ) -> Self {
        Self {
            network,
            api_token,
            timeout,
        }
    }
}
