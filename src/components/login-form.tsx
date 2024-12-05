import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeClosed, EyeOpen, Loading, Warning } from "../icons/Icons";

export default function LoginForm() {
  const credentials = {
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  };
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const fillCreds = () => {
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<{ token: string }>(
        "https://reqres.in/api/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      setLoading(false);
      navigate("/users");
    } catch (err) {
      setLoading(false);
      setError("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full md:pl-10 md:w-1/2 flex flex-col justify-center md:items-start items-center h-full"
    >
      <h1 className="mb-4 text-4xl font-bold">Login</h1>
      <h2 className="mb-8 text-sm text-gray-500">
        Please enter your credentials to continue.
      </h2>
      <div className="relative mb-4 w-full max-w-96">
        <input
          type="email"
          placeholder=""
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent border rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-accent-400 peer"
        />
        <label
          htmlFor="email"
          className="absolute bg-white text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 peer-focus:bg-accent-400 peer-focus:text-white peer-hover:text-accent-400 rounded-xl top-2 z-10 origin-[0] bg px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:bg-accent-400 dark:peer-focus:text-white dark:peer-hover:text-accent-400 dark:peer-placeholder-shown:scale-100 dark:peer-placeholder-shown:-translate-y-1/2 dark:peer-placeholder-shown:top-1/2 dark:peer-focus:top-2 dark:peer-focus:scale-75 dark:peer-focus:-translate-y-4"
        >
          Email
        </label>
      </div>
      <div className="relative mb-8 w-full max-w-96">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent border-1 border appearance-none rounded-lg focus:outline-none focus:ring-0 focus:border-accent-400 peer"
        />
        <button
        type="button"
          className="bg-transparent peer-focus:border-accent-400 text-accent-300 rounded-none hover:text-accent-500 text-sm items-center absolute right-0 top-0 h-full"
          onClick={() => setShowPassword(!showPassword)}
        >
          <EyeOpen className={`${showPassword ? "hidden" : ""}`} />
          <EyeClosed className={`${showPassword ? "" : "hidden"}`} />
        </button>
        <label
          htmlFor="password"
          className="absolute bg-white text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 peer-focus:bg-accent-400 peer-focus:text-white peer-hover:text-accent-400 rounded-xl top-2 z-10 origin-[0] bg px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 dark:bg-gray-900 dark:text-gray-400 dark:peer-focus:bg-accent-400 dark:peer-focus:text-white dark:peer-hover:text-accent-400 dark:peer-placeholder-shown:scale-100 dark:peer-placeholder-shown:-translate-y-1/2 dark:peer-placeholder-shown:top-1/2 dark:peer-focus:top-2 dark:peer-focus:scale-75 dark:peer-focus:-translate-y-4"
        >
          Password
        </label>
      </div>
      <button
        type="button"
        onClick={fillCreds}
        className="bg-transparent text-accent-300 hover:text-accent-500 mb-6 p-0 text-sm"
      >
        Forgot credentials? Click here to fill em!
      </button>
      {error && (
        <p className="mb-4 px-3 border border-red-400 animate-shake rounded-xl text-red-400 text-sm flex justify-center items-center">
          <Warning className="inline-block w-4 h-4 mr-2" />
          {error}
        </p>
      )}
      <button
        type="submit"
        className="w-full max-w-64 flex justify-center items-center p-2 mt-4 hover:scale-105 hover:translate-y-[-0.25rem] duration-300 hover:shadow-md hover:shadow-primary-200 dark:hover:shadow-primary-700 bg-primary-500 text-white rounded-lg focus:outline-none"
      >
        {loading ? <Loading className="animate-spin" /> : "Login"}
      </button>
    </form>
  );
}
