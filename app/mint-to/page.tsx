"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import toast from "react-hot-toast";

// import {
//   createMintToInstruction,
//   MintToInstructionAccounts,
//   MintToInstructionArgs,
// } from "../../clients/vault/instructions/";
import {
  createMintToInstruction,
  findConfigPDA,
  MintToInstructionAccounts,
  MintToInstructionArgs,
  Vault,
} from "@/clients/vault";
import { PublicKey, Transaction } from "@solana/web3.js";
import { associatedAddress } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { createAssociatedTokenAccountIdempotentInstruction } from "@solana/spl-token";

export default function MintTo() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const [vault, setVault] = useState("");
  const [amountIn, setAmountIn] = useState(0);
  const [amountOut, setAmountOut] = useState(0);

  const mintVrt = async () => {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const vaultPubkey = new PublicKey(vault);

    try {
      const vaultInfo = await Vault.fromAccountAddress(connection, vaultPubkey);

      const depositorVrtAta = associatedAddress({
        mint: vaultInfo.vrtMint,
        owner: publicKey,
      });
      const vaultStAta = associatedAddress({
        mint: vaultInfo.supportedMint,
        owner: vaultPubkey,
      });
      const vaultVrtFeeAta = associatedAddress({
        mint: vaultInfo.vrtMint,
        owner: publicKey,
      });

      const depositorVrtAtaIx =
        createAssociatedTokenAccountIdempotentInstruction(
          publicKey,
          depositorVrtAta,
          publicKey,
          vaultInfo.vrtMint,
        );
      const vaultStAtaIx = createAssociatedTokenAccountIdempotentInstruction(
        publicKey,
        vaultStAta,
        vaultPubkey,
        vaultInfo.supportedMint,
      );
      const vaultFeeWalletVrtAtaIx =
        createAssociatedTokenAccountIdempotentInstruction(
          publicKey,
          vaultVrtFeeAta,
          publicKey,
          vaultInfo.vrtMint,
        );

      const accounts: MintToInstructionAccounts = {
        config: findConfigPDA().pda,
        vault: vaultPubkey,
        vrtMint: vaultInfo.vrtMint,
        depositor: publicKey,
        depositorTokenAccount: associatedAddress({
          mint: vaultInfo.supportedMint,
          owner: publicKey,
        }),
        vaultTokenAccount: vaultStAta,
        depositorVrtTokenAccount: depositorVrtAta,
        vaultFeeTokenAccount: vaultVrtFeeAta,
      };

      const args: MintToInstructionArgs = {
        amountIn: amountIn,
        minAmountOut: amountOut,
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
      await connection.sendRawTransaction(signedTransation.serialize(), {
        skipPreflight: false,
        preflightCommitment: "confirmed",
      });

      toast.success(`Success`);
    } catch (error: any) {
      toast.error(`Error`);
    }
  };

  return (
    <div>
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Mint VRT</h2>
        <input
          className="w-full mb-2 p-2 border text-gray-950"
          placeholder="Vault"
          onChange={(e) => setVault(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 border text-gray-950"
          placeholder="Amount In"
          onChange={(e) => {
            const num = Number.parseInt(e.target.value);
            setAmountIn(num);
          }}
        />
        <input
          className="w-full mb-2 p-2 border text-gray-950"
          placeholder="Amount Out"
          onChange={(e) => {
            const num = Number.parseInt(e.target.value);
            setAmountOut(num);
          }}
        />
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
