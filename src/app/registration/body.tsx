"use client"

import React from 'react';
import { useRouter } from "next/navigation";
import { useState } from "react";

console.log('heloooooooooooooooo');
export default function RegForm() {
    const [firstName,SetFirstName]=useState('');
    const [lastName,SetLastName]=useState('');
    const [nid,SetNid]=useState('');
    const [gender,SetGender]=useState('');
    const [age,SetAge]=useState('');
    const [phone,SetPhone]=useState('');
    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const [confirmPassword,SetConfirmPassword]=useState('');
    const [isLoading,SetLoading]=useState(false);
    const [passwordMatchError,SetPasswordMatchError]=useState(false);
    const router = useRouter();

   
    var user=
        {
            nid,
            firstName,
            lastName,
            gender,
            age,
            phone,
            email,
            password,
        };

    const submit = async (e:any)=> {
        e.preventDefault();
        SetLoading(true);

        if(password!=confirmPassword){
            SetPasswordMatchError(true);
            return;
        };
        
        
        console.log('from submit',user)

        const response=await fetch('/api/register',{ 
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(user),
        });
        if(response.status===201){
            router.refresh();
            router.push('/login');
        }
    }


    return (
        <main> 
            <div className="w-1/2 border-blue-700 border-2 rounded-md mx-auto my-20">
                <div className="flex items-center justify-center">
                    <form className="py-10 flex-col" onSubmit={submit}>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="text-sm text-black float-left w-32">First Name</label>
                            <input type="text" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={firstName} onChange={(e) => SetFirstName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="text-sm text-black float-left w-32">Last Name</label>
                            <input type="text" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={lastName} onChange={(e) => SetLastName(e.target.value)} />                        
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nid" className="text-sm text-black float-left w-32">National ID</label>
                            <input type="test" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={nid} onChange={(e) => SetNid(e.target.value)} />                          
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="text-sm text-black float-left w-32">Gender</label>
                            <input type="text" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={gender} onChange={(e) => SetGender(e.target.value)} />                          
                        </div>
                        <div className="mb-4">
                            <label htmlFor="age" className="text-sm text-black float-left w-32">Age</label>
                            <input type="text" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={age} onChange={(e) => SetAge(e.target.value)} />                          
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="text-sm text-black float-left w-32">Phone Number</label>
                            <input type="text" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={phone} onChange={(e) => SetPhone(e.target.value)} />                          
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-sm text-black float-left w-32">Email</label>
                            <input type="email" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={email} onChange={(e) => SetEmail(e.target.value)} />                          
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-sm text-black float-left w-32">Password</label>
                            <input type="password" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={password} onChange={(e) => SetPassword(e.target.value)} />                          
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="text-sm text-black float-left w-32">Confirm Password</label>
                            <input type="password" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={confirmPassword} onChange={(e) => SetConfirmPassword(e.target.value)} />                          
                        </div>
                        <div className="flex items-center justify-center mb-4 pt-4">
                            <button disabled={isLoading} type="submit" className="bg-blue-500 text-white rounded-full p-2 w-40 hover:bg-blue-700">
                                {isLoading && <span>Wait...</span>}
                                {!isLoading && <span>SignUp</span>}
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
