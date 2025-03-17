import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";
import ButtonLoader from "../loader/ButtonLoader";
function Login() {
  const user = useSelector((state) => state.user);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    if (loginData.username === "") {
      toast.error("Username field should not be blank");
    } else if (loginData.password === "") {
      toast.error("Password field should not be blank");
    } else {
      const res = await dispatch(loginUserThunk(loginData));
      console.log("response", res);
      if (res?.payload?.success) {
        const jwt = res?.payload?.jwt;
        toast.success(res?.payload?.message);
        navigate("/");
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-[35rem] w-full flex flex-col gap-10 p-10 bg-base-300 rounded-lg">
        <h2 className="text-2xl font-semibold">Login Here</h2>
        <label className="input input-bordered w-full">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
          />
        </label>

        <label className="input input-bordered w-full">
          <FaKey />
          <input
            type="password"
            className="grow"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
          />
        </label>
        <button
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={user?.buttonLoading ? true : false}
        >
          {user?.buttonLoading ? <ButtonLoader /> : "Login"}
        </button>

        <p className="text-md">
          Don't have an account? &nbsp;{" "}
          <Link to="/signup" className="text-lg text-blue-300">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
