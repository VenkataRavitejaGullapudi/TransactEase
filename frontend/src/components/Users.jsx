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
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-5">
        <InputBox
          onChange={handleInputChange}
          placeholder={"Search users..."}
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
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between m-2">
      <div className="flex">
        <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center m-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
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
