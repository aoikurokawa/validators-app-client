"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  createMintToInstruction,
  MintToInstructionAccounts,
  MintToInstructionArgs,
} from "../../clients/vault/instructions/";
import { PROGRAM_ID as VAULT_PROGRAM_ID } from "@/clients/vault";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { associatedAddress } from "@coral-xyz/anchor/dist/cjs/utils/token";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createAssociatedTokenAccountIdempotentInstructionWithDerivation,
} from "@solana/spl-token";

export default function MintTo() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const [stMint, setStMint] = useState(
    "Sy2gWQkAHHSK5jDSebSGS1ZvTPX1cDU66GZrr8apckf"
  );
  const [vrtMint, setVrtMint] = useState(
    "3WDRbKNfuFz1Pg2AR1EQSZj8GDzsWSHwhWuET3CeArUM"
  );
  const [depositFee, setDepositFee] = useState(0);
  const [withdrawalFee, setWithdrawalFee] = useState(0);
  const [rewardFee, setRewardFee] = useState(0);
  const [decimals, setDecimals] = useState(9);

  const CONFIG_SEED = "config";
  const VAULT_SEED = "vault";

  function findConfigPDA() {
    // Convert seed to a Uint8Array
    const seedBuffer = Buffer.from(CONFIG_SEED, "utf8");

    // Find the PDA using the seed and program ID
    const [pda, bump] = PublicKey.findProgramAddressSync(
      [seedBuffer],
      VAULT_PROGRAM_ID
    );

    return { pda, bump, seeds: [seedBuffer] };
  }

  const mintVrt = async () => {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const stMintPubkey = new PublicKey(stMint);
    const vrtMintPubkey = new PublicKey(
      "3WDRbKNfuFz1Pg2AR1EQSZj8GDzsWSHwhWuET3CeArUM"
    );
    const vaultPubkey = new PublicKey(
      "7Yit8TYf79Hv1TRBAD3a8SALsGnwUtMzsQLsEaS7CVNp"
    );
    try {
      const depositorVrtAtaIx =
        createAssociatedTokenAccountIdempotentInstruction(
          publicKey,
          associatedAddress({ mint: vrtMintPubkey, owner: publicKey }),
          publicKey,
          vrtMintPubkey
        );
      const vaultStAtaIx = createAssociatedTokenAccountIdempotentInstruction(
        publicKey,
        associatedAddress({ mint: stMintPubkey, owner: vaultPubkey }),
        vaultPubkey,
        stMintPubkey
      );
      const vaultFeeWalletVrtAtaIx = createAssociatedTokenAccountIdempotentInstruction(
        publicKey,
        associatedAddress({ mint: vrtMintPubkey, owner: publicKey }),
        publicKey,
        vrtMintPubkey
      );
      const accounts: MintToInstructionAccounts = {
        config: findConfigPDA().pda,
        vault: vaultPubkey,
        vrtMint: new PublicKey(vrtMint),
        depositor: publicKey,
        depositorTokenAccount: associatedAddress({
          mint: stMintPubkey,
          owner: publicKey,
        }),
        vaultTokenAccount: associatedAddress({
          mint: stMintPubkey,
          owner: vaultPubkey,
        }),
        depositorVrtTokenAccount: associatedAddress({
          mint: new PublicKey("3WDRbKNfuFz1Pg2AR1EQSZj8GDzsWSHwhWuET3CeArUM"),
          owner: publicKey,
        }),
        vaultFeeTokenAccount: associatedAddress({
          mint: new PublicKey("3WDRbKNfuFz1Pg2AR1EQSZj8GDzsWSHwhWuET3CeArUM"),
          owner: publicKey,
        }),
      };

      const args: MintToInstructionArgs = {
        amountIn: 10,
        minAmountOut: 0,
      };

      const ix = createMintToInstruction(accounts, args);
      const transaction = new Transaction();
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      transaction.add(depositorVrtAtaIx);
      transaction.add(vaultStAtaIx);
      transaction.add(vaultFeeWalletVrtAtaIx);
      transaction.add(ix);

      const signedTransation = await signTransaction!(transaction);
      const txId = await connection.sendRawTransaction(
        signedTransation.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        }
      );

      console.log("transaction Id: ", txId);
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Mint VRT</h2>
        {/* <input
          className="w-full mb-2 p-2 border text-gray-950"
          placeholder="Staking Token Mint"
          onChange={(e) => setStMint(e.target.value)}
          defaultValue={"Sy2gWQkAHHSK5jDSebSGS1ZvTPX1cDU66GZrr8apckf"}
        />
        <input
          type="number"
          className="w-full mb-2 p-2 border text-gray-950"
          placeholder="Deposit Fee BPS"
          onChange={(e) => setDepositFee(Number(e.target.value))}
          defaultValue={10000}
        />
        <input
          type="number"
          className="w-full mb-2 p-2 border text-gray-950"
          placeholder="Withdrawal Fee BPS"
          onChange={(e) => setWithdrawalFee(Number(e.target.value))}
          defaultValue={10000}
        />
        <input
          type="number"
          className="w-full mb-2 p-2 border text-gray-950"
          placeholder="Reward Fee BPS"
          onChange={(e) => setRewardFee(Number(e.target.value))}
          defaultValue={10000}
        />
        <input
          type="number"
          className="w-full mb-2 p-2 border text-gray-950"
          placeholder="Decimals"
          onChange={(e) => setDecimals(Number(e.target.value))}
          defaultValue={9}
        /> */}
        <button
          onClick={() => mintVrt()}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Mint VRT
        </button>
      </div>
    </div>
  );
}
