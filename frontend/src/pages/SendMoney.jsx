import { useNavigate, useSearchParams } from "react-router-dom";
import InputBox from "../components/InputBox";
import { useState } from "react";
import { transferMoney } from "../lib/services";
import Button from "../components/Button";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();



  const handleOnInitaiteTransfer = () => {
    setLoading(true);
    setMessage(null);
    if (amount <= 0) {
      setMessage("Amount must be greater than 0");
      setIsError(true);
      setLoading(false);
      return;
    }
    transferMoney(id, amount)
      .then((res) => {
        setMessage(res.data.message);
        setIsError(false);
      })
      .catch((err) => {
        setMessage(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Transfer Failed"
        );
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-large text-white uppercase">
                  {firstName[0] + lastName[0]}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">
                {firstName + " " + lastName}
              </h3>
            </div>
            {message ? (
              <div className="mx-1 my-5">
                <p className="text-xl m-1 my-10 text-center font-semibold" style={{ color: isError ? "red" : "green" }}>
                  {message}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2 my-3 mx-1">
                  <InputBox
                    type={"number"}
                    onChange={(e) => setAmount(e.target.value)}
                    label={"Amount (in Rs)"}
                    placeholder={"Enter Amount"}
                  />
                </div>
                <button
                  disabled={loading}
                  onClick={handleOnInitaiteTransfer}
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                >
                  {loading ? "Loading..." : "Transfer Money"}
                </button>
              </div>
            )}
            {message && isError && <Button onClick={() => {setMessage(null); setIsError(false)}} label={"Try Again"}/> }
            {message && !isError && <Button onClick={() => navigate("/dashboard")} label={"Back to Dashboard"}/> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
