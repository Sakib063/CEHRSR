"use client";

import React from 'react';
import { useState } from "react";

export default function Main() {
    const [pid,setPid]=useState('');
    const [doctor,setDoctor]=useState('');
    const [doctorName,setDoctorName]=useState('');
    const [removed,setRemoved]=useState(false);

    const submit=async (e)=>{
        e.preventDefault();

        const data={
            pid,
        };

        const response=await fetch('/api/GetData',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data),
        });
        if(response.status===201){
            const chain_response=await response.json();
            setDoctor(chain_response.doctorId);
            setDoctorName(chain_response.doctorName);
        }
    }

    const permission=async (e)=>{
        e.preventDefault();

        const doctor_data={
            pid,doctor,doctorName,
        };

        const reponse=await fetch('/api/RemoveAccess',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(doctor_data),
        });
        if(reponse.status===201){
            setRemoved(true);
        }
    }

    return (
        <main>
            <div className="w-1/2 border-blue-700 border-2 rounded-md mx-auto my-20">
                <div className="flex items-center justify-center py-10 flex-col">
                    <div className="mb-4">
                        <form onSubmit={submit}>
                            <label htmlFor="patientId" className="text-sm text-black float-left w-32">Patient ID</label>
                            <input type="text" id="patientId" className="border border-blue-700 rounded p-1 text-sm flex-1" required 
                               value={pid} onChange={(e)=>setPid(e.target.value)} />
                            <br />
                            <button type="submit" className="bg-blue-500 text-white rounded-full p-2 my-6 mx-10 w-40">Ok</button>
                        </form>
                    </div>
                    <div className="w-1/2 border-blue-700 border-2 rounded-md p-4 mx-auto my-20">
                        <p>Doctor ID: {doctor}</p>
                        <br />
                        <p>Doctor Name: {doctorName}</p>
                        <br />
                        {removed ? (
                            <p className="text-blue-500">Access Removed</p>
                        ) : (
                            <button onClick={permission} className="bg-red-500 text-white rounded-full p-2 w-40 hover:bg-red-700">
                                Remove Access
                            </button>
                        )}                    
                    </div>
                </div>
            </div>
        </main>
    );
}
