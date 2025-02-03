"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-700">
      <input
        type="text"
        placeholder="Search by vault..."
        className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
      />
      <WalletMultiButton style={{}} />
    </div>
  );
}
