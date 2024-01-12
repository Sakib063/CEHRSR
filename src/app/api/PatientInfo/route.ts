import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const req = await request.json();
    const form_nid = req.nid;
    const streamName = form_nid;
    const key = 'patientinfo';
    // console.log('streamName', streamName);

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
    const chain_firstname = JSON.stringify(chain_response.result[0]?.data?.json?.firstName).replace(/^"|"$/g, '');
    const chain_birthyear = JSON.stringify(chain_response.result[0]?.data?.json?.age).replace(/^"|"$/g, '');
    const chain_gender = JSON.stringify(chain_response.result[0]?.data?.json?.gender).replace(/^"|"$/g, '');
    return new NextResponse({
      status: 200,
      body: JSON.stringify({
        chain_firstname,
        chain_birthyear,
        chain_gender,
      }),
    });
  } 
  catch (error) {
    console.error('Error fetching Multichain stream items:', error.message);
  }
}
