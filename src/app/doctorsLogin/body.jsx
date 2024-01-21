"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from "next/navigation";

function Loginbody() {
  const router = useRouter();
  const [national_id, setnational_id] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const credentials = { national_id, password };

    const result = await signIn('credentials', {
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
      router.push('/WelcomeDoctor');
      router.refresh();

    }
  };

  return (
    <main>
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
    </main>
  );
}

export default Loginbody;
