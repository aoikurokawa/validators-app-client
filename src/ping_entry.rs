use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct PingEntry {
    /// Timestamp
    pub timestamp: u64,

    /// Ping time
    pub ping_time: Option<f64>,

    /// Loss
    pub loss: Option<f64>,
}
