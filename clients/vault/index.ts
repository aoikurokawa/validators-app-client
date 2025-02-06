import { PublicKey } from "@solana/web3.js";
export * from "./accounts";
export * from "./errors";
export * from "./instructions";
export * from "./types";

const CONFIG_SEED = "config";
const VAULT_SEED = "vault";

/**
 * Program address
 *
 * @category constants
 * @category generated
 */
export const PROGRAM_ADDRESS = "Vau1t6sLNxnzB7ZDsef8TLbPLfyZMYXH8WTNqUdm9g8";

/**
 * Program public key
 *
 * @category constants
 * @category generated
 */
export const PROGRAM_ID = new PublicKey(PROGRAM_ADDRESS);

/**
 * Vault Config public key
 */
export const findConfigPDA = () => {
  const seedBuffer = Buffer.from(CONFIG_SEED, "utf8");

  const [pda, bump] = PublicKey.findProgramAddressSync(
    [seedBuffer],
    PROGRAM_ID,
  );

  return { pda, bump, seeds: [seedBuffer] };
};

export const findVaultPDA = (base: PublicKey) => {
  const seedBuffer = Buffer.from(VAULT_SEED, "utf8");
  const baseBuffer = base.toBuffer();

  const [pda, bump] = PublicKey.findProgramAddressSync(
    [seedBuffer, baseBuffer],
    PROGRAM_ID,
  );

  return { pda, bump, seeds: [seedBuffer, baseBuffer] };
};
