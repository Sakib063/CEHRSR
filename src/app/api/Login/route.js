import { NextResponse } from 'next/server';
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/libs/auth";

import axios from 'axios';


export async function POST(request) {
  try {
    const res = await request.json();
    console.log(res);

    const form_nid = res.nid;
    const form_password = res.password;

    const streamName = form_nid;
    const key = 'patientinfo';
    console.log('streamName', streamName);

    const multichainConfig = {
      host: process.env.HOST,
      port: process.env.RPCPORT,
      rpcuser: process.env.RPCUSER,
      rpcpassword: process.env.RPCPASSWORD,
    };

    // Fetch data from Multichain
    const response = await axios.post(
      `http://${multichainConfig.host}:${multichainConfig.port}`,
      {
        method: 'liststreamkeyitems',
        params: [streamName, key],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
      }
    );

    const chain_response = response.data;
    const chain_nid = JSON.stringify(chain_response.result[0]?.data?.json?.nid).replace(/^"|"$/g, '');
    const chain_password = JSON.stringify(chain_response.result[0]?.data?.json?.password).replace(/^"|"$/g, '');
    const chain_firstname = JSON.stringify(chain_response.result[0]?.data?.json?.firstname).replace(/^"|"$/g, '');

    if (chain_nid === form_nid && chain_password === form_password) {
      // Patient verified successfully, generate JWT token
      const token = await new SignJWT({
        username: chain_firstname,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(getJwtSecretKey());

      // Set the token as a cookie
      const response = NextResponse.json(
        { success: true },
        { status: 200, headers: { 'content-type': 'application/json' } }
      );
      response.cookies.set({
        name: 'token',
        value: token,
        path: '/',
      });

      // Notify all tabs that the user has logged in
      
      console.log('Patient Verified Successfully');
      return response;
    } else {
      // Authentication failed
      console.log('Authentication Failed');
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error('Error fetching Multichain stream items:', error.message);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}

function notifyTabs(message) {
  const broadcastChannel = new BroadcastChannel('auth');
  broadcastChannel.postMessage(message);
}


