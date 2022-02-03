import {Request, Response} from "express";
import {Block} from "./application";

const WebSocket = require("ws");
const express = require("express");
const bodyParser = require('body-parser');
const {
    replaceChain,
    getLatestBlock,
    generateNextBlock,
    addBlock,
    isValidNewBlock,
    blockchain,
} = require("./application.ts")

interface IncomingMessage {
    data: string;
}

interface Websocket {
    on: (messageName: string, handler: any) => void;
    send: (message: string) => void;
    url: string;
}

enum MessageType {
    QUERY_LATEST,
    QUERY_ALL,
    RESPONSE_BLOCKCHAIN,
}

const httpPort: number = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3001;
const p2pPort: number = process.env.P2P_PORT ? parseInt(process.env.P2P_PORT) : 6001;
const initialPeers: Array<string> = process.env.PEERS ? process.env.PEERS.split(',') : [];

const sockets: any[] = [];

const connectToPeers = (newPeers: Array<string>) => {
    newPeers.forEach((peer: string) => {
        const ws = new WebSocket(peer);
        ws.on('open', () => initConnection(ws));
        ws.on('error', () => {
            console.log('connection failed')
        });
    });
};

const handleBlockchainResponse = (message: IncomingMessage) => {
    const receivedBlocks = JSON.parse(message.data).sort((b1: Block, b2: Block) => (b1.height - b2.height));
    const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    const latestBlockHeld = getLatestBlock();
    if (latestBlockReceived.height > latestBlockHeld.height) {
        console.log('blockchain possibly behind. We got: ' + latestBlockHeld.height + ' Peer got: ' + latestBlockReceived.height);
        if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
            if (isValidNewBlock(latestBlockReceived, latestBlockHeld)) {
                console.log("We can append the received block to our chain");
                blockchain.push(latestBlockReceived);
                broadcast(responseLatestMsg());
            }
        } else if (receivedBlocks.length === 1) {
            console.log("We have to query the chain from our peer");
            broadcast(queryAllMsg());
        } else {
            console.log("Received blockchain is longer than current blockchain");
            replaceChain(receivedBlocks);
            broadcast(responseLatestMsg());
        }
    } else {
        console.log('received blockchain is not longer than current blockchain. Do nothing');
    }
};

const initHttpServer = () => {
    const app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req: Request, res: Response) => res.send(JSON.stringify(blockchain)));
    app.post('/mineBlock', async (req: Request, res: Response) => {
        console.log("received request to mine block with data:", req.body.data);
        let newBlock = await generateNextBlock(req.body.data);
        addBlock(newBlock);
        broadcast(responseLatestMsg());
        console.log('block added: ' + JSON.stringify(newBlock));
        res.send();
    });
    app.get('/peers', (req: Request, res: Response) => {
        res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req: Request, res: Response) => {
        connectToPeers([req.body.peer]);
        res.send();
    });
    app.listen(httpPort, () => console.log('Listening http on port: ' + httpPort));
    console.log("wsServer Initiated")
};

const initP2PServer = () => {
    const server = new WebSocket.Server({port: p2pPort});
    server.on('connection', (ws: Websocket) => initConnection(ws));
    console.log('listening websocket p2p port on: ' + p2pPort);
};

const initConnection = (ws: Websocket) => {
    sockets.push(ws);
    initMessageHandler(ws);
    initErrorHandler(ws);
    write(ws, queryChainLengthMsg());
};

const initMessageHandler = (ws: Websocket) => {
    ws.on('message', (data: string) => {
        const message = JSON.parse(data);
        console.log('Received message' + JSON.stringify(message));
        switch (message.type) {
            case MessageType.QUERY_LATEST:
                write(ws, responseLatestMsg());
                break;
            case MessageType.QUERY_ALL:
                write(ws, responseChainMsg());
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:
                handleBlockchainResponse(message);
                break;
        }
    });
};

const initErrorHandler = (ws: Websocket) => {
    const closeConnection = (ws: Websocket) => {
        console.log('connection failed to peer: ' + ws.url);
        sockets.splice(sockets.indexOf(ws), 1);
    };
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
};

const queryChainLengthMsg = () => ({'type': MessageType.QUERY_LATEST});
const queryAllMsg = () => ({'type': MessageType.QUERY_ALL});

const responseChainMsg = () =>({
    'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(blockchain)
});

const responseLatestMsg = () => ({
    'type': MessageType.RESPONSE_BLOCKCHAIN,
    'data': JSON.stringify([getLatestBlock()])
});

const write = (ws: Websocket, message: any) => ws.send(JSON.stringify(message));
const broadcast = (message: any) => sockets.forEach(socket => write(socket, message));

connectToPeers(initialPeers);
initHttpServer();
initP2PServer();
console.log("servers initialized");