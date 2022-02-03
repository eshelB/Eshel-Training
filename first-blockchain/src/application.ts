const CryptoJS = require("crypto-js");

const targetDifficulty = process.env.DIFF ? parseInt(process.env.DIFF) : 11; // finds block on avg. 25% of the time

export interface Block {
    // todo possible next implementations:
    // merkleRoot: string;
    // transactions: Array<string>;
    nonce: number;
    height: number;
    previousHash: string;
    timestamp: number;
    data: string;
    hash: string;
    difficulty: number;
}

const getGenesisBlock = () => {
    let genesisBlock: Block = {
        height: 0,
        previousHash: "0",
        timestamp: 1465154705,
        data: "my genesis block!!",
        hash: "first-hash",
        nonce: 0,
        difficulty: 0
    };
    return genesisBlock;
};

type Blockchain = Array<Block>;
let blockchain: Blockchain = [getGenesisBlock()];

const getLatestBlock = () => blockchain[blockchain.length - 1];

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function onDifficultyTarget(hash: string): boolean {
    const result = parseInt(hash[0], 16) > targetDifficulty
    console.log(
        `trying block hash starting with ${hash.slice(0, 3)}..., which is`,
        result ? "BIGGER!" : "smaller",
        "than the target", targetDifficulty
    );
    return result;
}

const generateNextBlock = async (blockData: string) => {
    const previousBlock = getLatestBlock();
    const nextHeight = previousBlock.height + 1;
    const nextTimestamp = new Date().getTime() / 1000;

    let currentNonce = 0;
    let nextHash = calculateHash(nextHeight, previousBlock.hash, nextTimestamp, blockData, currentNonce);
    while (!onDifficultyTarget(nextHash)) {
        console.log("sleeping before next try")
        await timeout(400);
        currentNonce += 1;
        nextHash = calculateHash(nextHeight, previousBlock.hash, nextTimestamp, blockData, currentNonce);
    }

    const nextBlock: Block = {
        data: blockData,
        previousHash: previousBlock.hash,
        height: nextHeight,
        timestamp: nextTimestamp,
        hash: nextHash,
        nonce: currentNonce,
        difficulty: targetDifficulty,
    };

    return nextBlock;
};

const calculateHashForBlock = (block: Block) => {
    return calculateHash(block.height, block.previousHash, block.timestamp, block.data, block.nonce);
};

const calculateHash = (height: number, previousHash: string, timestamp: number, data: string, nonce: number) => {
    return CryptoJS.SHA256(height + previousHash + timestamp + data + nonce).toString();
};

const addBlock = (newBlock: Block) => {
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
    }
};

const isValidNewBlock = (newBlock: Block, previousBlock: Block) => {
    if (previousBlock.height + 1 !== newBlock.height) {
        console.log('invalid height');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previous hash');
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
        console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
        return false;
    } else if (!onDifficultyTarget(newBlock.hash)) {
        console.log('hash', newBlock.hash, 'does not meet the requirement difficulty:', targetDifficulty);
        return false;
    }
    return true;
};

const replaceChain = (newBlocks: Array<Block>) => {
    if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
    } else {
        console.log('Received blockchain invalid');
    }
};

const isValidChain = (blockchainToValidate: Array<Block>) => {
    if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(getGenesisBlock())) {
        return false;
    }
    const tempBlocks = [blockchainToValidate[0]];
    for (let i = 1; i < blockchainToValidate.length; i++) {
        if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
            tempBlocks.push(blockchainToValidate[i]);
        } else {
            return false;
        }
    }
    return true;
};

module.exports = {
    replaceChain,
    getLatestBlock,
    generateNextBlock,
    addBlock,
    isValidNewBlock,
    blockchain,
};