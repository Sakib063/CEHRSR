import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request) {
    const res = await request.json();
     console.log('res', res);

    const streamName = res;
   

    const multichainConfig = {
        host: process.env.HOST,
        port: 10254,
        rpcuser: process.env.RPCUSER,
        rpcpassword: "7ZqnLSM4SEFCWTBhGoKgTmaPqg86CHRmEeym8sgRbjno",
    };

    try {
        const subscribeResponse = await fetch(`http://${multichainConfig.host}:${multichainConfig.port}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
            },
            body: JSON.stringify({
                method: 'subscribe',
                params: [streamName],
            }),
        });

        // Check if the response status is OK
        if (!subscribeResponse.ok) {
            console.error('Failed to subscribe to Multichain. HTTP Status:', subscribeResponse.status);
            return Response.json({ message: 'Failed to subscribe to Multichain' });
        }

            console.log('donee',subscribeResponse);

            return Response.json({ status: 200 });
        
    } catch (error) {
        console.error('Error processing request:', error);
        return Response.json({ message: 'Internal Server Error' });
    }
}
