use serde::{Deserialize, Serialize};

/// Commission for a given period of time
#[derive(Debug, Deserialize, Serialize)]
pub struct CommissionChanges {
    /// Created at
    created_at: String,

    /// Commission before
    commission_before: f64,

    /// Commission after
    commission_after: f64,

    /// Epoch
    epoch: u64,

    /// Network
    network: String,

    /// Epoch completion
    epoch_completion: f64,

    /// Batch UUID
    batch_uuid: String,

    /// Account pubkey
    account: String,

    /// Name
    name: String,

    /// Source from rewards
    source_from_rewards: bool,
}
