import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    const res = await request.json();       
    const streamName=res.id.nid;
    console.log(streamName);
   

    const multichainConfig = {
        host: process.env.HOST,
        port: 10254,
        rpcuser: process.env.RPCUSER,
        rpcpassword:"7ZqnLSM4SEFCWTBhGoKgTmaPqg86CHRmEeym8sgRbjno",
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
        throw new Error(`HTTP error unsubscribing to stream! Status: ${subscribeResponse.status}`);
    }
    console.log("Unsubscribed to stream");
    return Response.json({ status: 200 });
}