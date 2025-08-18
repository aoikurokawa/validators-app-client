use serde::{Deserialize, Serialize};

/// Commission for a given period of time
#[derive(Debug, Deserialize, Serialize)]
pub struct CommissionChange {
    /// Created at
    created_at: String,

    /// Commission before
    commission_before: Option<f64>,

    /// Commission after
    commission_after: Option<f64>,

    /// Epoch
    epoch: Option<u64>,

    /// Network
    network: Option<String>,

    /// Epoch completion
    epoch_completion: Option<f64>,

    /// Batch UUID
    batch_uuid: Option<String>,

    /// Account pubkey
    account: Option<String>,

    /// Name
    name: Option<String>,

    /// Source from rewards
    source_from_rewards: Option<bool>,
}

/// Commission changes response
#[derive(Debug, Deserialize, Serialize)]
pub struct CommissionChangesResponse {
    /// Commission Histories
    commission_histories: Vec<CommissionChange>,

    /// Total count
    total_count: u64,
}
