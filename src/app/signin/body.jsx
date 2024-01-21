"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ProjectLogo from "public/logo CEHRSR.png";

function LoginBody() {
  const router = useRouter();

  const [login, setLogin] = useState(false);
  
  const [national_id, setnational_id] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const Psubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      national_id: national_id,
      password: password,
      type: "patient",


    });


    if (result?.error) {
        console.log(result.error);
      setError(true);
    } else {
      router.refresh();
      router.push('/dashboard');
      router.refresh();

    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const credentials = { national_id, password };

    const result = await signIn("credentials", {
      redirect: false,
      national_id: credentials.national_id,
      type: "doctor",

      password: credentials.password,
    });

    if (result?.error) {
      console.log(result.error);
      setError(true);
    } else {
      router.refresh();
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
          <Image
            src={ProjectLogo}
            height={100}
            width={90}
            className="mx-auto w-auto"
            alt="ProjectLogo"
          ></Image>
          <div className=" flex sm:mx-auto sm:w-full sm:max-w-sm">
            <button
              type="submit"
              className="flex w-1/2 justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2"
              onClick={() => setLogin(false)}
            >
              I am a Patient
            </button>
            <button
              type="submit"
              className="flex w-1/2 justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml*2"
              onClick={() => setLogin(true)}
            >
              I am a Doctor
            </button>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {login ? (
          <div className="w-1/2 border-green-700 border-2 rounded-md mx-auto my-20">
          <div className="flex items-center justify-center py-10 flex-col">
            <form className="py-10 flex-col" onSubmit={submit}>
              <div className="mb-4">
                <label htmlFor="national_id" className="text-sm text-black float-left w-32">
                  National ID
                </label>
                <input
                  type="text"
                  className="border border-green-700 rounded p-1 text-sm flex-1"
                  required
                  value={national_id}
                  onChange={(e) => setnational_id(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-sm text-black float-left w-32">
                  Password
                </label>
                <input
                  type="password"
                  className="border border-green-700 rounded p-1 text-sm flex-1"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center mb-4 pt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white rounded-full p-2 w-40 hover:bg-green-700"
                >
                  Login
                </button>
              </div>
            </form>
            <a className="text-green-700" href="/registration">
              Click here to sign up
            </a>
            <p>
              <a className="text-green-700" href="">
                Forgot Password?
              </a>
            </p>
            {error && <p>Error has occurred. Check credentials</p>}
          </div>
        </div>
        ) : (
          <div className="w-1/2 border-blue-700 border-2 rounded-md mx-auto my-20">
          <div className="flex items-center justify-center py-10 flex-col">
          <form className="py-10 flex-col" onSubmit={Psubmit}>
              <div className="mb-4">
                  <label htmlFor="national_id" className="text-sm text-black float-left w-32">National ID</label>
                  <input type="text" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                      value={national_id} onChange={(e) => setnational_id(e.target.value)}/>
              </div>
              <div className="mb-4">
                  <label htmlFor="password" className="text-sm text-black float-left w-32">Password</label>
                  <input type="password" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                      value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="flex items-center justify-center mb-4 pt-4">
                  <button type="submit" className="bg-blue-500 text-white rounded-full p-2 w-40 hover:bg-blue-700">Login</button>
              </div>
          </form>
          <a className="text-blue-700" href="/registration"> Click here to sign up </a>
          <p><a className="text-blue-700" href="">Forgot Password?</a></p>
          </div>
          {/* <p disabled={setError}>
              {Error && <span>Error has occured. Check credentials</span>} 
          </p> */}
      </div>
        )}
      </div>
  );
}

export default LoginBody;
