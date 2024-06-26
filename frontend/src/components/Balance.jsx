import { useEffect, useState } from "react";
import { getBalance } from "../lib/services";

export const Balance = () => {
  const [balance, setBalance] = useState(-1);

  const fetchBalance = async () => {
    getBalance()
      .then((res) => {
        setBalance(res.data?.balance);
      })
      .catch((error) => {
        console.error("Failed to get balance", error);
        setBalance(-1);
      });
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="font-bold text-lg">Your balance: </div>
      <div className="font-semibold ml-2 text-lg">
        Rs. {balance > 0 ? balance : "----"}
      </div>
      <button onClick={fetchBalance} className={`h-[1.4em]`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          width="24px"
          fill="green"
        >
          <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
        </svg>
      </button>
    </div>
  );
};
