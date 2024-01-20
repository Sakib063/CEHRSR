import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {

  const res = await request.json();
  const streamName=res.patient_id;
  console.log(streamName);
  delete(res.patient_id);
  const multichainConfig = {
    host: process.env.HOST,
    port: process.env.RPCPORT,
    rpcuser: process.env.RPCUSER,
    rpcpassword: process.env.RPCPASSWORD,
  };

  const date = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  
  const formattedDate = date.toLocaleString('en-US', options);
  const keydate = formattedDate.replace(' ', '');
  const key='Entry:'+keydate;
  console.log('key',key);
  const formData = {
    json: {
      ...res,
      date: formattedDate,
      hospital: 'test',
    }
  };
  console.log('formData', formData);

  try {
    // Publish Data to Stream
    console.log('publishing data');
    const publishResponse = await axios.post(
      `http://${multichainConfig.host}:${multichainConfig.port}`,
      {
        method: 'publish',
        params: [streamName, key, formData],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
      }
    );

    const publishData = await publishResponse.data;

    if(publishData.result){
        console.log('Publish successful');
        return Response.json({status: 200});
    } 
    else{
        console.error('Error publishing to Multichain:', publishData.error);
        return Response.json({ message: 'Failed to publish to Multichain' });
      }
    } 
    catch (error) {
      console.error('Error processing request:', error);
      return Response.json({ message: 'Internal Server Error' });
    }
  }