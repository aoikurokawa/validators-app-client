use serde::{Deserialize, Serialize};

// use crate::{epoch_credits::EpochCredits, ping_entry::PingEntry, uptime_entry::UptimeEntry};

// Response types based on API docs
#[derive(Debug, Deserialize, Serialize)]
pub struct Validator {
    /// Network
    ///
    /// 'mainnet', 'testnet' or 'pythnet'
    pub network: Option<String>,

    /// Account
    pub account: Option<String>,

    /// Validator's Name
    pub name: Option<String>,

    /// Keybase ID
    pub keybase_id: Option<String>,

    /// WWW URL
    pub www_url: Option<String>,

    /// Details
    pub details: Option<String>,

    /// Avatar URL
    pub avatar_url: Option<String>,

    /// Created At
    pub created_at: Option<String>,

    /// Updated At
    pub updated_at: Option<String>,

    /// Admin Warning
    pub admin_warning: Option<String>,

    /// Is Jito Labs client
    pub jito: Option<bool>,

    /// MEV commission
    pub jito_commission: Option<u16>,

    /// The list of stake pool
    pub stake_pools_list: Option<Vec<String>>,

    /// Is active
    pub is_active: Option<bool>,

    /// Is
    pub is_dz: Option<bool>,

    /// Active Stake
    pub active_stake: Option<u64>,

    /// Authorized Withdrawer Score
    pub authorized_withdrawer_score: Option<f64>,

    /// Commission
    pub commission: Option<u8>,

    /// Data Center Concentration Score
    pub data_center_concentration_score: Option<i64>,

    /// Delinquent
    pub delinquent: Option<bool>,

    /// Published Information Score
    pub published_information_score: Option<i64>,

    /// Root Distance Score
    pub root_distance_score: Option<i64>,

    /// Security Report Score
    pub security_report_score: Option<i64>,

    /// Skipped Slot Score
    pub skipped_slot_score: Option<i64>,

    /// Skipped After Score
    pub skipped_after_score: Option<i64>,

    /// Software Version
    pub software_version: Option<String>,

    /// Software Version Score
    pub software_version_score: Option<i64>,

    /// Stake Concentration Score
    pub stake_concentration_score: Option<i64>,

    /// Consensus Mods Score
    pub consensus_mods_score: Option<i8>,

    /// Total Score
    pub total_score: Option<i64>,

    /// Vote Distance Score
    pub vote_distance_score: Option<i64>,

    /// Software Client
    pub software_client: Option<String>,

    /// Software Client ID
    pub software_client_id: Option<u16>,

    /// IP Address
    pub ip: Option<String>,

    /// Data Center Key
    pub data_center_key: Option<String>,

    /// Autonomous System Number
    pub autonomous_system_number: Option<i64>,

    /// Latitude
    pub latitude: Option<String>,

    /// Longitude
    pub longitude: Option<String>,

    /// Data Center Host
    pub data_center_host: Option<String>,

    /// Vote Account
    #[serde(default)]
    pub vote_account: String,

    /// Epoch Credits
    pub epoch_credits: Option<u64>,

    /// Epoch
    pub epoch: Option<u64>,

    /// Skipped Slots
    pub skipped_slots: Option<u64>,

    /// Skipped Slot Percent
    pub skipped_slot_percent: Option<String>,

    /// Ping Time
    pub ping_time: Option<f64>,

    /// URL
    pub url: Option<String>,
}
