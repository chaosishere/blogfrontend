import { SignUpBodyType } from "@chaosdevelopertools/blog-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpBodyType>({
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/${type === "signin" ? "signin" : "signup"}`,

        postInputs,
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blog/1");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="bg-slate-50 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-centre text-2xl font-extrabold">
            {type === "signin" ? "Login your account" : "Create an account"}{" "}
          </div>
          <div className="pt-2 text-center text-stone-400">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="pl-2 text-black underline"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Create" : "Login"}
            </Link>
          </div>
          <div>
            <LabelledInputBox
              label="Username"
              placeholder="Enter your email address"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
            />
            <LabelledInputBox
              label="Password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="text-white mt-8 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function LabelledInputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <label className="block mb-2 text-lg font-medium text-black pt-2 ">
        {label}
      </label>
      <input
        onChange={onChange}
        type="text"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
