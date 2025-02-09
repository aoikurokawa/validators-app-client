"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import toast, { Toaster } from "react-hot-toast";

import { Keypair, Transaction } from "@solana/web3.js";
import {
  createInitializeNcnInstruction,
  findConfigPDA,
  findNcnPDA,
  InitializeNcnInstructionAccounts,
} from "restake-ts/dist/restaking";
import SuccessToast from "@/components/SuccessToast";

/**
 * Initialize NCN Page
 *
 *
 * @returns
 */
export default function InitializeNcn() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const handleInitializeNcn = async () => {
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const base = Keypair.generate();
    const ncnPubkey = findNcnPDA(base.publicKey).pda;

    try {
      const accounts: InitializeNcnInstructionAccounts = {
        config: findConfigPDA().pda,
        ncn: ncnPubkey,
        admin: publicKey,
        base: base.publicKey,
      };

      const ix = createInitializeNcnInstruction(accounts);
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
        <h2 className="text-2xl font-bold mb-4">Initialize NCN</h2>
      </div>
      <button
        onClick={() => handleInitializeNcn()}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Initialize NCN
      </button>
    </div>
  );
}
