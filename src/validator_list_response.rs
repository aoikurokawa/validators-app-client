use serde::{Deserialize, Serialize};

use crate::validator::Validator;

#[derive(Debug, Deserialize, Serialize)]
pub struct ValidatorListResponse {
    /// Validators
    pub validators: Vec<Validator>,

    /// Total
    pub total: u64,

    /// Limit
    pub limit: u64,

    /// Offset
    pub offset: u64,
}
