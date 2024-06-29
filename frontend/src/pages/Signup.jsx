import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import { signUp } from "../lib/services";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSignUp = async () => {
    try {
      const response = await signUp({
        firstName,
        lastName,
        userName,
        password,
      });
      if (response.status === 201 && response?.data?.token) {
        navigate("/dashboard");
      } else
        setError(
          response.data.error || response.data.message || "Invalid credentials"
        );
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white p-8 h-max">
          <div className="text-center">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your information to create an account"} />
          </div>
          <InputBox
            placeholder="Enter your First Name here..."
            label={"First Name"}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            placeholder="Enter your Last Name here..."
            label={"Last Name"}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            placeholder="Enter your User Name here..."
            label={"User Name"}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            placeholder="Enter your password here..."
            type={"password"}
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={handleSignUp}
              disabled={!firstName || !lastName || !userName || !password}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
