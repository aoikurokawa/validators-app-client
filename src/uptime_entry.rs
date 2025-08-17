use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct UptimeEntry {
    pub epoch: u64,
    pub uptime: f64,
    pub uptime_pct: f64,
}
