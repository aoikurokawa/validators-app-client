use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct EpochCredits {
    epoch: u64,

    credits: u64,

    previous_credits: u64,
}
