// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Cluster, PublicKey } from "@solana/web3.js";
import JitoRestakingIDL from "../idl/jito_restaking.json";
import JitoVaultIDL from "../idl/jito_vault.json";
import { JitoRestaking } from "@/types/jitoRestaking";
// import type { Hello } from "../target/types/hello";

// Re-export the generated IDL and type
export { JitoRestakingIDL, JitoVaultIDL };

// The programId is imported from the program IDL.
export const JITO_RESTAKING_PROGRAM_ID = new PublicKey(JitoRestakingIDL.metadata.address);
export const JITO_VAULT_PROGRAM_ID = new PublicKey(JitoVaultIDL.metadata.address);

// This is a helper function to get the Hello Anchor program.
export function getJitoRestakingProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program(
    {
      ...JitoRestakingIDL,
      address: address ? address.toBase58() : JitoRestakingIDL.metadata.address,
    } as JitoRestaking,
    provider
  );
}

// This is a helper function to get the program ID for the Hello program depending on the cluster.
export function getHelloProgramId(cluster: Cluster) {
  switch (cluster) {
    case "devnet":
    case "testnet":
      // This is the program ID for the Hello program on devnet and testnet.
      return new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");
    case "mainnet-beta":
    default:
      return HELLO_PROGRAM_ID;
  }
}
