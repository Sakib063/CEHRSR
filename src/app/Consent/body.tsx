"use client"

import React from 'react';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Main(){
    const router = useRouter();
    const [pid, setPid] = useState('');
    const [did, setDid] = useState('');
    const [dname, setDname] = useState('');
    const [dnumber, setDnumber] = useState('');

    const submit=async (e)=>{
        e.preventDefault();

        const data={pid,did,dname,dnumber};
        const response=await fetch('/api/AllowAccess',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data),
        });

        if(response.status===201){
            router.refresh();
            router.push('/ViewConsent');
        }
        else{
            setError(true);
            return;
        }
    }

    return (
        <main>
            <div className="w-1/2 border-blue-700 border-2 rounded-md mx-auto my-20">
                <div className="flex items-center justify-center">
                    <form className="py-10 flex-col" onSubmit={submit}>
                        <div className="mb-4">
                            <label htmlFor="patientId" className="text-sm text-black float-left w-32">Patient ID</label>
                            <input type="text" id="patientId" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={pid} onChange={(e) => setPid(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="doctorId" className="text-sm text-black float-left w-32">Doctor ID</label>
                            <input type="text" id="doctorId" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={did} onChange={(e) => setDid(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="doctorName" className="text-sm text-black float-left w-32">Doctor's Name</label>
                            <input type="text" id="doctorName" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={dname} onChange={(e) => setDname(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="text-sm text-black float-left w-32">Phone</label>
                            <input type="text" id="phone" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                                value={dnumber} onChange={(e) => setDnumber(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-center mb-4 pt-4">
                            <button type="submit" className="bg-blue-500 text-white rounded-full p-2 w-40 hover:bg-blue-700">Consent</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
