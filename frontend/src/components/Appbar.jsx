import { useNavigate } from "react-router-dom";
import { getAuthUserName, removeAuthToken } from "../lib/utils";
export const Appbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    navigate("/signin");
  };

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">R-Wallet</div>
      <div className="flex items-center m-2">
        <div className="rounded-full h-8 w-8 bg-slate-200 flex justify-center mr-2">
          <div className="flex flex-col justify-center h-full text-lg uppercase">
            {getAuthUserName()[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mr-2">
          {getAuthUserName()}
        </div>
        <div
          onClick={handleLogout}
          className="cursor-pointer mx-2"
          title={"Logout"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="red"
          >
            <path d="M440-440v-400h80v400h-80Zm40 320q-74 0-139.5-28.5T226-226q-49-49-77.5-114.5T120-480q0-80 33-151t93-123l56 56q-48 40-75 97t-27 121q0 116 82 198t198 82q117 0 198.5-82T760-480q0-64-26.5-121T658-698l56-56q60 52 93 123t33 151q0 74-28.5 139.5t-77 114.5q-48.5 49-114 77.5T480-120Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
