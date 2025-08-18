use std::time::Duration;

use validators_app_client::{
    ValidatorsAppClient,
    config::{Config, Network},
};

#[tokio::main]
async fn main() {
    let config = Config {
        network: Network::Mainnet,
        api_key: Some("".to_string()),
        timeout: Some(Duration::from_secs(30)),
    };
    let validator_app_client = ValidatorsAppClient::new(config).unwrap();

    let validators = validator_app_client
        .get_validators(None, None)
        .await
        .unwrap();

    println!("{validators:?}");
}
