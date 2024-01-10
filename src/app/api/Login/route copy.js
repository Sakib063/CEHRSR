import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {

  const res = await request.json();
  console.log(res);

  const formData = { 'json': res };
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

  try {
    await subscribeToStream(streamName, multichainConfig);

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
    const chain_nid = JSON.stringify(chain_response.result[0].data.json.nid).replace(/^"|"$/g, '');
    const chain_password = JSON.stringify(chain_response.result[0].data.json.password).replace(/^"|"$/g, '');

    if (chain_nid === form_nid && chain_password === form_password) {
      return NextResponse.json({ message: 'Patient Verified Successfully' });
    } else {
      return NextResponse.json({ message: 'Authentication Failed' });
    }
  } catch (error) {
    console.error('Error fetching Multichain stream items:', error.message);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}

async function subscribeToStream(streamName , multichainConfig) {
  const subscribeResponse = await axios.post(
    `http://${multichainConfig.host}:${multichainConfig.port}`,
    {
      method: 'subscribe',
      params: [streamName],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
      },
    }
  );

  if (subscribeResponse.status !== 200) {
    throw new Error(`HTTP error subscribing to stream! Status: ${subscribeResponse.status}`);
  }
  else {
    console.log("Login successful");

  }
}
