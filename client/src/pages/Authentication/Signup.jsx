import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { signupUserThunk } from "../../store/slice/user/user.thunk";
import ButtonLoader from "../loader/ButtonLoader";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (signupData.fullName === "" || signupData.fullName.length < 3) {
      toast.error(
        "Full Name field should not be blank or length should be at least 3 letter."
      );
    } else if (signupData.username === "" || signupData.username.length < 6) {
      toast.error(
        "Username field should not be blank or length should be at least 6 letter."
      );
    } else if (
      signupData.password === "" ||
      signupData.password.length < 8 ||
      !regex.test(signupData.password)
    ) {
      toast.error(
        "Password field should not be blank or length should be at least 8 letter.\nPassword must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
    } else if (
      signupData.confirmPassword === "" ||
      signupData.confirmPassword.length < 8 ||
      !regex.test(signupData.confirmPassword)
    ) {
      toast.error("Confirm Password field should not be blank");
    } else if (signupData.password !== signupData.confirmPassword) {
      toast.error("Password not matched");
    } else {
      const res = await dispatch(signupUserThunk(signupData));
      console.log("response", res);
      if (res?.payload?.success) {
        toast.success(res?.payload?.message);
        navigate("/");
      } else {
        toast.error(res?.payload);
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-[35rem] w-full flex flex-col gap-5 p-10 bg-base-300 rounded-lg">
        <h2 className="text-2xl font-semibold">Signup Here</h2>

        <label className="input input-bordered w-full">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Full Name"
            name="fullName"
            onChange={handleInputChange}
          />
        </label>

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
        <label className="input input-bordered w-full">
          <FaKey />
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleInputChange}
          />
        </label>
        <div className="w-full flex border border-gray-600 p-2 space-x-3 bg-[#1D232A] rounded-md">
          <BiMaleFemale />
          <div className="flex space-x-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={signupData.gender === "male" ? "checked" : false}
              onChange={handleInputChange}
            />
            <p>Male</p>
          </div>

          <div className="flex space-x-2">
            <input
              type="radio"
              name="gender"
              checked={signupData.gender === "female" ? "checked" : false}
              value="female"
              onChange={handleInputChange}
            />
            <p>Female</p>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSignup}
          disabled={user?.buttonLoading ? true : false}
        >
          {user?.buttonLoading ? <ButtonLoader /> : "Signup"}
        </button>

        <p className="text-md">
          Already have an account? &nbsp;{" "}
          <Link to="/login" className="text-lg text-blue-300">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
