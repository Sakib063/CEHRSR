import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    // const req = await request.json();
    // const form_nid = req.nid;
    // const streamName = form_nid;
    const key = 'EHR';
    // console.log(req);
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
        params: ['80272410', 'patientinfo'], // Corrected this line
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
      }
    );
    
    const chain_response = response.data.result[0]?.data?.json;
    delete chain_response['password'];
    return Response.json({chain_response},{status: 200});
  } 
  catch (error) {
    console.error('Error fetching Multichain stream items:', error.message);
    return NextResponse.json({ message: 'Internal Server Error' });

  }
}