import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method==='POST'){
        const {pid,did,dname,dnum}=req.body;
        const formData={'json':{pid}};
        
        const streamName=pid.toString();

        const multichainConfig = {
            host: process.env.HOST,
            port: 10254,
            rpcuser: process.env.RPCUSER,
            rpcpassword:"4FvtSrGSouE4SGLmSTYDsKZPLBUNhatFAws5ucvNHg5v",
        };

        const subscribeResponse=await fetch(`http://${multichainConfig.host}:${multichainConfig.port}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
            },
            body: JSON.stringify({
            method: 'unsubscribe',
            params: [streamName],
            }),
        });
        if (!subscribeResponse.ok) {
            throw new Error(`HTTP error subscribing to stream! Status: ${subscribeResponse.status}`);
        }
        res.status(201).send();
    }
}