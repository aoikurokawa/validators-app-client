use serde::{Deserialize, Serialize};

/// History of block production stats for the account
#[derive(Debug, Deserialize, Serialize)]
pub struct ValidatorBlockProductionHistory {
    /// Epoch number
    epoch: Option<u64>,

    /// Leader slots
    leader_slots: Option<u64>,

    /// Blocks produced
    blocks_produced: Option<u64>,

    /// Skipped slots
    skipped_slots: Option<u64>,

    /// Skipped slot percent
    skipped_slot_percent: Option<String>,

    /// Created at
    created_at: String,

    /// Batch UUID
    batch_uuid: String,
}
