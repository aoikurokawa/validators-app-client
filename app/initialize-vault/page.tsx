"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  createInitializeVaultInstruction,
  findConfigPDA,
  findVaultPDA,
  InitializeVaultInstructionAccounts,
  InitializeVaultInstructionArgs,
  PROGRAM_ID as VAULT_PROGRAM_ID,
} from "@/clients/vault";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";

export default function InitializeVault() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [stMint, setStMint] = useState(
    "Sy2gWQkAHHSK5jDSebSGS1ZvTPX1cDU66GZrr8apckf",
  );
  const [depositFee, setDepositFee] = useState(0);
  const [withdrawalFee, setWithdrawalFee] = useState(0);
  const [rewardFee, setRewardFee] = useState(0);
  const [decimals, setDecimals] = useState(9);

  const initializeVault = async () => {
    console.log("helo");
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const base = Keypair.generate();
    const vrtMint = Keypair.generate();

    console.log(publicKey);
    console.log(stMint);
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

      console.log("transaction Id: ", txId);
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Initialize Vault</h2>
        <input
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
        />
        <button
          onClick={() => initializeVault()}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Initialize Vault
        </button>
      </div>
    </div>
  );
}
