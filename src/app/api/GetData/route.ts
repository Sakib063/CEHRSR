import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request){
    if(req.method==='POST'){
        const {pid,did,dname,dnum}=req.body;
        const formData={'json':{pid,did,dname,dnum}};
        
        const streamName=pid.toString();
        const key = 'EHR'; 

        const multichainConfig = {
            host: process.env.HOST,
            port: 10254,
            rpcuser: process.env.RPCUSER,
            rpcpassword:"4FvtSrGSouE4SGLmSTYDsKZPLBUNhatFAws5ucvNHg5v",
        };

        const response=await fetch(`http://${multichainConfig.host}:${multichainConfig.port}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
            },
            body: JSON.stringify({
            method: 'liststreamkeyitems',
            params: [streamName,key],
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const chain_response = await response.json();
        const server_response=chain_response.result[0].data.json
        console.log(server_response);
        
        res.status(201).json(server_response);
    }
}