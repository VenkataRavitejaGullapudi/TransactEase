import { useEffect, useState } from "react";
import { me } from "../lib/services";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedComponent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    me()
      .then((res) => {
        setUser(res.data?.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [children]);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin");
    }
  }, [user, navigate, loading]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <Loader
          label={"Just a moment...Getting things done..."}
          width={150}
          height={150}
        />
      </div>
    );
  }
  if (!user) {
    return <></>;
  }

  return children;
};

export default ProtectedComponent;
