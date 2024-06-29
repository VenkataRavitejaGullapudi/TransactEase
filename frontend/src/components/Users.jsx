import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "./Button";
import InputBox from "./InputBox";
import { getUsersByFilter } from "../lib/services";
import { debounce } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFilteredUsers = useCallback((filterValue) => {
    setLoading(true);
    getUsersByFilter(filterValue)
      .then((res) => {
        if (res.status === 200 && res.data?.users) {
          setUsers(res.data.users || []);
        } else {
          setError(
            res.data?.message || res.data?.error || "Something went wrong"
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(
          err.message || err.response?.data?.message || "Something went wrong"
        );
        if (err.response?.status == 401 || err.response?.status == 403) {
          navigate("/signin");
          return;
        }
        console.log(err);
      });
  }, []);

  const debouncedGetFilteredUsers = useMemo(() => {
    return debounce(getFilteredUsers, 500);
  }, [getFilteredUsers]);

  function handleInputChange(e) {
    const filter = e.target.value;
    debouncedGetFilteredUsers(filter);
  }

  useEffect(() => {
    debouncedGetFilteredUsers("");
  }, [debouncedGetFilteredUsers]);

  return (
    <div className="m-1">
      <div className="ml-2 font-bold mt-6 text-lg">Users</div>
      <div className="mt-1 mb-4">
        <InputBox
          onChange={handleInputChange}
          placeholder={"Search for users..."}
        />
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div>
            {users.map((user) => (
              <User user={user} key={user._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-5 gap-2 my-3">
      <div className="col-span-3 flex items-center overflow-hidden">
        <div className="rounded-full w-8 h-8 shrink-0 bg-slate-200 flex justify-center items-center mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full overflow-hidden">
          <div className="text-ellipsis overflow-hidden whitespace-nowrap">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="col-span-2 whitespace-nowrap flex flex-col justify-center items-end h-full m-1">
        <Button
          fullWidth={false}
          label={"Send Money"}
          onClick={() => {
            navigate(
              "/send?id=" +
                user._id +
                "&firstName=" +
                user.firstName +
                "&lastName=" +
                user.lastName
            );
          }}
        />
      </div>
    </div>
  );
}
