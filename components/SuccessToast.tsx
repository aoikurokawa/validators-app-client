// import { Clipboard } from "lucide-react";
import toast from "react-hot-toast";

interface SuccessToastProps {
  txId: string;
}

export default function SuccessToast({ txId }: SuccessToastProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(txId);
    toast.success("Transaction ID copied!");
  };

  return (
    <div className="flex flex-col">
      <span className="font-semibold">Success Tx ID:</span>
      <span className="break-all text-gray-200">{txId.slice(0, 20)}...</span>
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-1 text-sm text-gray-200 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition mt-2"
      >
        {/* <Clipboard className="w-4 h-4" /> */}
        Copy
      </button>
    </div>
  );
}
