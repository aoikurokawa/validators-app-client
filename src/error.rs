use thiserror::Error;

#[derive(Debug, Error)]
pub enum ValidatorsAppError {
    /// Network Error
    #[error(transparent)]
    Network(#[from] reqwest::Error),

    /// JSON Parse Error
    #[error(transparent)]
    Parse(#[from] serde_json::Error),

    /// API Error
    #[error("API error {status}: {message}")]
    Api { status: u16, message: String },
}
