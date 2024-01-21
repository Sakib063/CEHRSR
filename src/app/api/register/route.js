import { NextResponse } from 'next/server';
import axios from 'axios';



export  async function POST(request) {

  const res = await request.json();
  console.log(res);

  
  
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
    
    const streamName = res.nid;

    console.log('creating stream');
    // Create Stream
    const createStreamResponse = await axios.post(
      `http://${multichainConfig.host}:${multichainConfig.port}`,
      {
        method: 'create',
        params: ['stream', streamName, true],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
      }
    );

    const createStreamData = createStreamResponse.data;

    if (createStreamData && createStreamData.error) {
      console.error('Error creating stream:', createStreamData.error);
      return NextResponse.json({ message: 'Internal Server Error' });
    }

    // Publish Data to Stream
    console.log('publishing data');
    const publishResponse = await axios.post(
      `http://${multichainConfig.host}:${multichainConfig.port}`,
      {
        method: 'publish',
        params: [streamName, 'patientinfo', formData],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
      }
    );

    const publishData = publishResponse.data;

    if (publishData && publishData.error) {
      console.error('Error publishing data:', publishData.error);
      return NextResponse.json({ message: 'Internal Server Error' });
    } else {
      console.log('Patient Registered Successfully');
    }

    return NextResponse.json({ message: 'Patient Registered Successfully' });
  } catch (error) {
    console.error('Error interacting with Multichain:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}
