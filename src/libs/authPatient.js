// patientAuthProvider.js

import axios from 'axios';


export async function patientAuthProvider(credentials) {
  try {
    const { password: password } = credentials;
    const  national_id = credentials?.national_id;
    
    const streamName = national_id;
    const key = 'patientinfo';

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
    const chain_firstname = JSON.stringify(chain_response.result[0]?.data?.json?.firstName).replace(/^"|"$/g, '');


    if (chain_nid === national_id && chain_password === password) {
      

      return Promise.resolve({ id: national_id, name: chain_firstname, type: "Patient"  });
    } else {
      // Authentication failed
      return Promise.resolve(null);
    }
  } catch (error) {
    console.error('Error fetching Multichain stream items:', error.message);
    return Promise.resolve(null);
  }
}
