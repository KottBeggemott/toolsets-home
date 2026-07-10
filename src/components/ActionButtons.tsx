import { useState } from "react";
import "./ActionButtons.css";
import Toast from "./Toast";

type ActionButtonsProps = {
  onReset?: () => void;
  onCopy?: () => Promise<void> | void;
  onShare?: () => Promise<void> | void;
};

export default function ActionButtons({
  onReset,
  onCopy,
  onShare,
}: ActionButtonsProps) {
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 1800);
  };

  const handleReset = () => {
    if (!onReset) return;
    onReset();
    showToast("Reset complete");
  };

  const handleCopy = async () => {
    if (!onCopy) return;
    await onCopy();
    showToast("Copied to clipboard");
  };

  const handleShare = async () => {
    if (!onShare) return;
    await onShare();
    showToast("Shared successfully");
  };

  return (
    <>
      <div className="action-buttons">
        {onReset && <button onClick={handleReset}>Reset</button>}
        {onCopy && <button onClick={handleCopy}>📋 Copy Result</button>}
        {onShare && <button onClick={handleShare}>🔗 Share</button>}
      </div>

      <Toast message={toast} />
    </>
  );
}