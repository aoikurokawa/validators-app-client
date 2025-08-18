use serde::{Deserialize, Serialize};

// use crate::{epoch_credits::EpochCredits, ping_entry::PingEntry, uptime_entry::UptimeEntry};

// Response types based on API docs
#[derive(Debug, Deserialize, Serialize)]
pub struct Validator {
    /// Account
    pub account: String,

    /// Validator's Name
    pub name: Option<String>,

    /// Keybase ID
    pub keybase_id: Option<String>,

    /// WWw URL
    pub www_url: Option<String>,

    /// Details
    pub details: Option<String>,

    /// Avatar URL
    pub avatar_url: Option<String>,

    /// Commission
    pub commission: f64,

    /// Active stake
    pub active_stake: u64,

    /// Authorized withdrawer score
    pub authorized_withdrawer_score: Option<i32>,

    /// Data center concentration score
    pub data_center_concentration_score: Option<i32>,

    /// Delinquent
    pub delinquent: bool,

    /// Published information score
    pub published_information_score: Option<i32>,

    /// Root distance score
    pub root_distance_score: Option<i32>,

    /// Security report score
    pub security_report_score: Option<i32>,

    /// Skipped slot score
    pub skipped_slot_score: Option<i32>,

    /// Skipped after score
    pub skipped_after_score: Option<i32>,

    /// Software version
    pub software_version: Option<String>,

    /// Software version score
    pub software_version_score: Option<i32>,

    /// Stake concentration score
    pub stake_concentration_score: Option<i32>,

    /// Consensus mods score
    pub consensus_mods_score: Option<i32>,

    /// Total score
    pub total_score: Option<i32>,

    /// Vote distance score
    pub vote_distance_score: Option<i32>,

    /// Software client
    pub software_client: Option<String>,

    /// Software client ID
    pub software_client_id: Option<i32>,

    /// IP address
    pub ip: Option<String>,

    /// Data center key
    pub data_center_key: Option<String>,

    /// Autonomous system number
    pub autonomous_system_number: Option<i32>,

    /// Latitude
    pub latitude: Option<String>,

    /// Longitude
    pub longitude: Option<String>,

    /// Data center host
    pub data_center_host: Option<String>,

    /// Vote account
    pub vote_account: String,

    /// Epoch credits
    pub epoch_credits: Option<u64>,

    /// Epoch number
    pub epoch: Option<u64>,

    /// Skipped slots
    pub skipped_slots: Option<u64>,

    /// Skipped slot percent
    pub skipped_slot_percent: Option<String>,

    /// Ping time
    pub ping_time: Option<String>,

    /// Network
    pub network: Option<String>,

    /// Created at
    pub created_at: Option<String>,

    /// Updated at
    pub updated_at: Option<String>,

    /// Admin warning
    pub admin_warning: Option<String>,

    /// Jito client
    pub jito: Option<bool>,

    /// Jito commission
    pub jito_commission: Option<u64>,

    /// Stake pools list
    pub stake_pools_list: Option<Vec<String>>,

    /// Is active
    pub is_active: Option<bool>,

    /// Is DZ
    pub is_dz: Option<bool>,

    /// URL
    pub url: Option<String>,
}
