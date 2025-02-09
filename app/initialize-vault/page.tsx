"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import {
  createInitializeVaultInstruction,
  findConfigPDA,
  findVaultPDA,
  InitializeVaultInstructionAccounts,
  InitializeVaultInstructionArgs,
} from "restake-ts/dist/vault";

/**
 * Initialize Vault Page
 *
 * Supported Token Address: "EPy1V1eWNnHsQTJ3272jBrJjRiJ9MZ1PURXhnEah7Hgg"
 * Deposit Fee BPS: 1000
 * Reward Fee BPS: 1000
 * Decimals: 9
 *
 * @returns
 */
export default function InitializeVault() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [stMint, setStMint] = useState("");
  const [depositFee, setDepositFee] = useState(0);
  const [withdrawalFee, setWithdrawalFee] = useState(0);
  const [rewardFee, setRewardFee] = useState(0);
  const [decimals, setDecimals] = useState(9);

  const handleInitializeVault = async () => {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const base = Keypair.generate();
    const vrtMint = Keypair.generate();

    try {
      const accounts: InitializeVaultInstructionAccounts = {
        config: findConfigPDA().pda,
        vault: findVaultPDA(base.publicKey).pda,
        vrtMint: vrtMint.publicKey,
        tokenMint: new PublicKey(stMint),
        admin: publicKey,
        base: base.publicKey,
      };

      const args: InitializeVaultInstructionArgs = {
        decimals: decimals,
        withdrawalFeeBps: withdrawalFee,
        depositFeeBps: depositFee,
        rewardFeeBps: rewardFee,
      };

      const ix = createInitializeVaultInstruction(accounts, args);
      const transaction = new Transaction();
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      transaction.add(ix);
      transaction.partialSign(base, vrtMint);

      const signedTransation = await signTransaction!(transaction);
      const txId = await connection.sendRawTransaction(
        signedTransation.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        },
      );

      toast.success(`Success Tx ID: ${txId}`);
    } catch (error: any) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="p-6 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Initialize Vault</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-4 my-4">
            <label className="w-1/3">Supported Token Mint Address: </label>
            <input
              className="flex-1 p-2 bg-gray-700 rounded-lg"
              placeholder="Enter Staking Token Mint"
              onChange={(e) => setStMint(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 my-4">
          <label className="w-1/3">Deposit Fee BPS: </label>
          <input
            type="number"
            className="flex-1 p-2 bg-gray-700 rounded-lg"
            placeholder="Enter Deposit Fee BPS"
            onChange={(e) => setDepositFee(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center space-x-4 my-4">
          <label className="w-1/3">Reward Fee BPS: </label>
          <input
            type="number"
            className="flex-1 p-2 bg-gray-700 rounded-lg"
            placeholder="Enter Reward Fee BPS"
            onChange={(e) => setRewardFee(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center space-x-4 my-4">
          <label className="w-1/3">Withdraw Fee BPS: </label>
          <input
            type="number"
            className="flex-1 p-2 bg-gray-700 rounded-lg"
            placeholder="Enter Withdraw Fee BPS"
            onChange={(e) => setWithdrawalFee(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center space-x-4 my-4">
          <label className="w-1/3">Decimals: </label>
          <input
            type="number"
            className="flex-1 p-2 bg-gray-700 rounded-lg"
            placeholder="Enter Decimals (Recommend: 9)"
            onChange={(e) => setDecimals(Number(e.target.value))}
          />
        </div>
        <button
          onClick={() => handleInitializeVault()}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Initialize Vault
        </button>
      </div>
    </div>
  );
}
