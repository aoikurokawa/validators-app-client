use std::time::Duration;

use validators_app_client::{ValidatorsAppClient, config::Config, network::Network};

#[tokio::main]
async fn main() {
    let config = Config::new(
        Network::Mainnet,
        "tNfoWKvycrpSLJH4UYCFTL4R".to_string(),
        Some(Duration::from_secs(30)),
    );
    let validator_app_client = ValidatorsAppClient::new(config).unwrap();

    let validators = validator_app_client
        .get_validator_block_production_history(
            "CXPeim1wQMkcTvEHx9QdhgKREYYJD8bnaCCqPRwJ1to1",
            Some(10.0),
        )
        .await
        .unwrap();

    println!("{validators:?}");
}
