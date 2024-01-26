import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    const res = await request.json();       
    const streamName=res.nid;

    const multichainConfig = {
        host: process.env.HOST,
        port: 10254,
        rpcuser: process.env.RPCUSER,
        rpcpassword:"A48P82GYqD49G2f1UM1GUb9sKiC238cJjjhBfg4bhmJS",
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
    return Response.json({ status: 200 });
}