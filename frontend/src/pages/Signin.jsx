import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import { signIn } from "../lib/services";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(userName, password);
      if (response.status === 200 && response?.data?.token) {
        error && setError("");
        navigate("/dashboard");
      } else
        setError(
          response.data.error || response.data.message || "Invalid credentials"
        );
    } catch (error) {
      setError(
        error.response.data.error ||
          error.response.data.message ||
          "Invalid credentials"
      );
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
          <div className="text-center">
            <Heading label={"Sign in"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
          </div>
          <InputBox
            placeholder="Enter your email here.."
            label={"Email"}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            placeholder="Enter your password here..."
            label={"Password"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="mt-3 text-red-500">{error}</p>}
          <div className="pt-4">
            <Button label={"Sign in"} onClick={handleSignin} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
