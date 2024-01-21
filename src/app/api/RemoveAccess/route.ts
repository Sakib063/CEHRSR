import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    const res = await request.json();       
    const streamName=res.nid;

    const multichainConfig = {
        host: process.env.HOST,
        port: 10245,
        rpcuser: process.env.RPCUSER,
        rpcpassword:"7NDGrmUbaCK4RQUbLniFoKrMucHRGYKNDkWUUgXvtwPY",
    };

    const subscribeResponse=await fetch(`http://${multichainConfig.host}:${multichainConfig.port}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
        body: JSON.stringify({
        method: 'unsubscribe',
        params: [streamName],
        }),
    });
    if (!subscribeResponse.ok) {
        throw new Error(`HTTP error subscribing to stream! Status: ${subscribeResponse.status}`);
    }
    console.log("Unsubscribed to stream");
}