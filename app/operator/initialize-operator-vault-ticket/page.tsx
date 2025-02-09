"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { PublicKey, Transaction } from "@solana/web3.js";
import {
  createInitializeOperatorVaultTicketInstruction,
  findConfigPDA,
  findOperatorVaultTicketPDA,
  InitializeOperatorVaultTicketInstructionAccounts,
} from "restake-ts/dist/restaking";
import SuccessToast from "@/components/SuccessToast";

/**
 * Initialize Operator Vault Ticket Page
 * 
 * Operator Pubkey: 3E8JrRafaSkhHMviDj6BnRU1aEd2Q5saNPz3ebZXLwZf
 * Vault Pubkey: BWFx4yirYFHA45wNxVt6Ef6fpVkU1z31yS7bhQYQXAnq
 *
 * @returns
 */
export default function InitializeOperatorVaultTicket() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [vault, setVault] = useState("");
  const [operator, setOperator] = useState("");

  const handleInitializeOperator = async () => {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const operatorPubkey = new PublicKey(operator);
    const vaultPubkey = new PublicKey(vault);

    try {
      const accounts: InitializeOperatorVaultTicketInstructionAccounts = {
        config: findConfigPDA().pda,
        operator: operatorPubkey,
        vault: vaultPubkey,
        operatorVaultTicket: findOperatorVaultTicketPDA(
          operatorPubkey,
          vaultPubkey
        ).pda,
        admin: publicKey,
        payer: publicKey,
      };

      const ix = createInitializeOperatorVaultTicketInstruction(accounts);
      const transaction = new Transaction();
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      transaction.add(ix);

      const signedTransation = await signTransaction!(transaction);
      const txId = await connection.sendRawTransaction(
        signedTransation.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        }
      );

      toast.success(<SuccessToast txId={txId} />, {
        duration: 5000,
        position: "top-right",
        style: {
          background: "#1A1A1A",
          color: "#fff",
          border: "1px solid #333",
          padding: "12px",
          borderRadius: "8px",
        },
      });
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
        <h2 className="text-2xl font-bold mb-4">Initialize Operator Vault Ticket</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-4 my-4">
            <label className="w-1/3">Operator: </label>
            <input
              className="flex-1 p-2 bg-gray-700 rounded-lg"
              placeholder="Enter Operator PublicKey"
              onChange={(e) => setOperator(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4 my-4">
            <label className="w-1/3">Vault: </label>
            <input
              className="flex-1 p-2 bg-gray-700 rounded-lg"
              placeholder="Enter Vault PublicKey"
              onChange={(e) => setVault(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => handleInitializeOperator()}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Initialize Operator Vault Ticket
      </button>
    </div>
  );
}
