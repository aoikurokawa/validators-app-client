use serde::{Deserialize, Serialize};

use crate::{epoch_credits::EpochCredits, ping_entry::PingEntry, uptime_entry::UptimeEntry};

/// Response types based on API docs
#[derive(Debug, Deserialize, Serialize)]
pub struct Validator {
    /// Vote account pubkey
    vote_account: Option<String>,

    /// Validator's name
    name: Option<String>,

    /// Keybase ID
    keybase_id: Option<String>,

    /// WWW URL
    www_url: Option<String>,

    /// Details
    details: Option<String>,

    /// Avatar URL
    avatar_url: Option<String>,

    /// Comission
    commission: f64,

    /// Stake
    stake: u64,

    /// Active stake
    active_stake: u64,

    /// Marinade stake
    marinade_stake: u64,

    /// Marinade native stake
    marinade_native_stake: u64,

    /// Foundation stake
    foundation_stake: u64,

    /// Epoch credits
    epoch_credits: Option<EpochCredits>,

    /// Version
    version: Option<String>,

    /// Activated stake
    activated_stake: u64,

    /// Deactivated stake
    deactivated_stake: u64,

    /// Epoch vote account
    epoch_vote_account: bool,

    /// Root slot
    root_slot: Option<u64>,

    /// Vote slots
    vote_slots: Option<Vec<u64>>,

    /// Skip rate
    skip_rate: Option<f64>,

    /// Uptime
    uptime: Option<f64>,

    /// Uptimes
    uptimes: Option<Vec<UptimeEntry>>,

    /// Ping time
    ping_time: Option<f64>,

    /// Ping loss
    ping_loss: Option<f64>,

    /// Ping times
    ping_times: Option<Vec<PingEntry>>,
}
