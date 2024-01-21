"use client"

import React from 'react';
import { signIn } from 'next-auth/react';

import { useRouter } from "next/navigation";
import { useState } from "react";


function Loginbody() {

    
    const router = useRouter();
    const [national_id, setNational_id] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const submit = async (e) => {
      e.preventDefault();
      const result =  signIn('credentials', {

        national_id: national_id,
        password: password,
        type: "patient",
        redirect: false,

      });
  
      if (result?.error) {
          console.log(result.error);
        setError(true);
      } else {
      
        router.refresh();
        router.push('/WelcomePatient');
        router.refresh();

      }
    };

  return (
    <main>
      


        <div className="w-1/2 border-blue-700 border-2 rounded-md mx-auto my-20">
            <div className="flex items-center justify-center py-10 flex-col">
            <form className="py-10 flex-col" onSubmit={submit}>
                <div className="mb-4">
                    <label htmlFor="national_id" className="text-sm text-black float-left w-32">National ID</label>
                    <input type="text" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                        value={national_id} onChange={(e) => setNational_id(e.target.value)}/>
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
    </main>
  )
}

export default Loginbody;