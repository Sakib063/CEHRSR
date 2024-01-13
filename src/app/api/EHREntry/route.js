import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {

  const res = await request.json();
  console.log(res);
  const streamName='123123';
  const multichainConfig = {
    host: process.env.HOST,
    port: process.env.RPCPORT,
    rpcuser: process.env.RPCUSER,
    rpcpassword: process.env.RPCPASSWORD,
  };

  const formData = {
    json: res
  };
  console.log('formData', formData);

  try {
    // Publish Data to Stream
    console.log('publishing data');
    const publishResponse = await axios.post(
      `http://${multichainConfig.host}:${multichainConfig.port}`,
      {
        method: 'publish',
        params: [streamName, 'EHR', formData],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
      }
    );

    const publishData = await publishResponse.data;

    if (publishData) {
      console.log(publishData)
    } else {
      console.log(publishData.error)
    }
  } catch (error) {
    console.error('Error interacting with Multichain:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}
