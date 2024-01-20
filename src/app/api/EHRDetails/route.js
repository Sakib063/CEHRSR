import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const req = await request.json();
    console.log(req);
    const streamName = req.id;
    var key = req.key;
    key = 'Entry:'+key.replace(' ', '');
    console.log(key);

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
        params: [streamName,key],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
      }
    );
    const chain_response = response.data.result[0].data.json;
    return Response.json({chain_response},{status: 200});
  } 
  catch (error) {
    console.error('Error fetching Multichain stream items:', error.message);
    return NextResponse.json({ message: 'Internal Server Error' });

  }
}