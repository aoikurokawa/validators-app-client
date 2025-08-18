use std::time::Duration;

use validators_app_client::{ValidatorsAppClient, config::Config, network::Network};

#[tokio::main]
async fn main() {
    let config = Config::new(
        Network::Mainnet,
        "".to_string(),
        Some(Duration::from_secs(30)),
    );
    let validator_app_client = ValidatorsAppClient::new(config).unwrap();

    let commission_changes = validator_app_client
        .get_commission_changes(None, None, None, None, None)
        .await
        .unwrap();

    println!("{commission_changes:?}");
}
