"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect, braavos } from "@starknet-react/core";
import toast from "react-hot-toast";

interface BraavosIconProps {
  iconClassName?: string;
  buttonClassName?: string;
  tooltipClassName?: string;
  errorClassName?: string;
  showTooltip?: boolean;
  showError?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const BraavosIcon: React.FC<BraavosIconProps> = ({
  iconClassName = "",
  buttonClassName = "",
  tooltipClassName = "",
  errorClassName = "",
  showTooltip = true,
  showError = true,
  onConnect,
  onDisconnect,
}) => {
  const { address, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnection = async () => {
    setIsConnecting(true);
    setError(null);

    if (address) {
      try {
        await disconnect();
        toast.success("Braavos wallet successfully disconnected");
        onDisconnect?.();
      } catch (e) {
        console.error(e);
        setError("Failed to disconnect. Please try again.");
      } finally {
        setIsConnecting(false);
      }
      return;
    }

    try {
      await connect({ connector: connectors.find((c) => c.id === "braavos") || braavos() });
      toast.success("Braavos wallet successfully connected");
      onConnect?.();
    } catch (e) {
      console.error(e);
      setError("Failed to connect. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="group relative inline-block">
      <button
        onClick={handleConnection}
        className={`p-2 rounded-full transition-colors duration-200 border-2 ${
          address
            ? "bg-green-500 hover:bg-green-600 border-green-700" 
            : "bg-gray-200 hover:bg-gray-300 border-gray-400"
        } ${buttonClassName}`}
        disabled={isConnecting}
        aria-label={address ? "Disconnect from Braavos Wallet" : "Connect to Braavos Wallet"}
      >
        <Image
          src="/icons/braavos.png"
          alt="Braavos Wallet"
          width={24}
          height={24}
          className={`${address ? "filter brightness-0 invert" : ""} ${iconClassName}`}
        />
      </button>

      {showTooltip && (
        <span
          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tooltipClassName}`}
        >
          {address ? "Disconnect" : "Connect"}
        </span>
      )}

      {isConnecting && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 rounded-full">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {showError && error && (
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-red-100 text-red-700 text-xs rounded shadow ${errorClassName}`}
        >
          {error}
        </div>
      )}
    </div>
  );
};
