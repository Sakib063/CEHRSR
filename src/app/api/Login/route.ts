import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req, res) {
  if (req.method === 'POST') {
    const { nid, password } = req.body;
    const formData = { json: { nid, password } };
    console.log(formData);
    const form_nid = (nid ?? '').toString();
    const form_password = (password ?? '').toString();
    console.log('test ', form_nid);
    const streamName = form_nid;
    const key = 'patientinfo';

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
            Authorization:
              'Basic ' +
              Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
          },
        }
      );

      // Access response data directly
      const chain_response = response.data;
      const chain_nid = JSON.stringify(chain_response.result[0].data.json.nid).replace(/^"|"$/g, '');
      const chain_password = JSON.stringify(chain_response.result[0].data.json.password).replace(/^"|"$/g, '');

      if (chain_nid === form_nid && chain_password === form_password) {
        res.status(201).send();
      }
    } catch (error) {
      console.error('Error fetching Multichain stream items:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

async function subscribeToStream(streamName, multichainConfig) {
  const subscribeResponse = await axios.post(
    `http://${multichainConfig.host}:${multichainConfig.port}`,
    {
      method: 'subscribe',
      params: [streamName],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
      },
    }
  );

  if (!subscribeResponse.ok) {
    throw new Error(`HTTP error subscribing to stream! Status: ${subscribeResponse.status}`);
  }
}
