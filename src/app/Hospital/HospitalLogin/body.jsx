"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";


function Loginbody() {
  const router = useRouter();
  const [license_number, setlicense_number] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const credentials = { license_number, password };

    const result = await signIn('credentials', {
      redirect: false,
      national_id: credentials.license_number,
      type: "hospital",

      password: credentials.password,
    });
    if (result?.error) {
        console.log(result.error);
      setError(true);
    } else {
       console.log("result", result);
      router.refresh();
      router.replace('/dashboard');
      router.refresh();

    }
  };

  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full">
          {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
          <Image
            src={"/logo CEHRSR.png"}
            height={100}
            width={90}
            className="mx-auto w-auto"
            alt="ProjectLogo"
          ></Image>
          <div className=" flex sm:mx-auto sm:w-full ">
          <h1 className="text-center font-extrabold text-sky-700 tracking-tight text-6xl mx-auto">Hospital Admin</h1>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        
          <div className="w-1/2 border-sky-700 border-2 rounded-md mx-auto my-10">
          <div className="flex items-center justify-center py-10 flex-col">
            <form className="py-10 flex-col" onSubmit={submit}>
              <div className="mb-4">
                <label htmlFor="license" className="text-sm text-black float-left w-32">
                  License No.
                </label>
                <input
                  type="text"
                  className="border border-sky-700 rounded p-1 text-sm flex-1"
                  required
                  value={license_number}
                  onChange={(e) => setlicense_number(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-sm text-black float-left w-32">
                  Password
                </label>
                <input
                  type="password"
                  className="border border-sky-700 rounded p-1 text-sm flex-1"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center mb-4 pt-4">
                <button
                  type="submit"
                  className="bg-sky-600 text-white rounded-full p-2 w-40 hover:bg-sky-700"
                >
                  Login
                </button>
              </div>
            </form>
            <p>
              <a className="text-sky-700" href="">
                Forgot Password?
              </a>
            </p>
            {error && <p>Error has occurred. Check credentials</p>}
          </div>
        </div>

          
      </div>
  );
}

export default Loginbody;