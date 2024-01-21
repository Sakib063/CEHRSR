import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request) {
    const res = await request.json();
    console.log('res',res);
    const streamName=res.nid;
    console.log('streamName',streamName);

    const multichainConfig = {
        host: process.env.HOST,
        port: 10254,
        rpcuser: process.env.RPCUSER,
        rpcpassword:"4FvtSrGSouE4SGLmSTYDsKZPLBUNhatFAws5ucvNHg5v",
    };

    try{
        const subscribeResponse=await fetch(`http://${multichainConfig.host}:${multichainConfig.port}`, {
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
        const subscribe = await subscribeResponse.data;

        if(subscribe.result){
            console.log('Subscribe successful');
            return Response.json({status: 200});
        } 
        else{
            console.error('Error subscribing to Multichain:', subscribe.error);
            return Response.json({ message: 'Failed to subscribe to Multichain' });
        }
    }
    catch(error){
        console.error('Error processing request:', error);
        return Response.json({ message: 'Internal Server Error' });
    }
}