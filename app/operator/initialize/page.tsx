"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Keypair, Transaction } from "@solana/web3.js";
import {
  createInitializeOperatorInstruction,
  findConfigPDA,
  findOperatorPDA,
  InitializeOperatorInstructionAccounts,
  InitializeOperatorInstructionArgs,
} from "restake-ts/dist/restaking";
import SuccessToast from "@/components/SuccessToast";

/**
 * Initialize Operator Page
 *
 *
 * @returns
 */
export default function InitializeOperator() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [operatorFeeBps, setOperatorFeeBps] = useState(0);

  const handleInitializeOperator = async () => {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const base = Keypair.generate();
    const operatorPubkey = findOperatorPDA(base.publicKey).pda;

    try {
      const accounts: InitializeOperatorInstructionAccounts = {
        config: findConfigPDA().pda,
        operator: operatorPubkey,
        admin: publicKey,
        base: base.publicKey,
      };

      const args: InitializeOperatorInstructionArgs = {
        operatorFeeBps: operatorFeeBps,
      };

      const ix = createInitializeOperatorInstruction(accounts, args);
      const transaction = new Transaction();
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      transaction.add(ix);
      transaction.partialSign(base);

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
        <h2 className="text-2xl font-bold mb-4">Initialize Operator</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-4 my-4">
            <label className="w-1/3">Operator Fee BPS: </label>
            <input
              className="flex-1 p-2 bg-gray-700 rounded-lg"
              placeholder="Enter Operator Fee BPS"
              onChange={(e) => {
                const num = Number.parseInt(e.target.value);
                setOperatorFeeBps(num);
              }}
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => handleInitializeOperator()}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Initialize Operator
      </button>
    </div>
  );
}
