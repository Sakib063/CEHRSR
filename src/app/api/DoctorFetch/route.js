import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const req = await request.json();
    const form_nid = req.nid;
    const streamName = form_nid;
    
    //  console.log(req);
    //  console.log('streamName', streamName);

    const multichainConfig = {
      host: process.env.HOST,
      port: //doctor port,
      rpcuser: process.env.RPCUSER,
      rpcpassword: //doctor password,
    };

    // Fetch data from Multichain
    const response = await axios.post(
      `http://${multichainConfig.host}:${multichainConfig.port}`,
      {
        method: 'liststreamitems',
        params: [streamName,],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
      }
    );
    const chain_response = response.data.result;
    const entry_key = (key) => /^Entry:\d{2}\/\d{2}\/\d{4},\d{2}:\d{2}:\d{2}/.test(key);
    const cleaned_response = chain_response.filter((entry) => entry.keys.some(entry_key));
    //  console.log(cleaned_response);
    return NextResponse.json({cleaned_response},{status: 200});
  } 
  catch (error) {
    console.error('Error fetching Multichain stream items:', error.message);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}