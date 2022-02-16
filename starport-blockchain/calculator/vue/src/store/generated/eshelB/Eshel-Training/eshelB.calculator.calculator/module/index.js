// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCalculateSum } from "./types/calculator/tx";
import { MsgCalculateMul } from "./types/calculator/tx";
import { MsgCalculateDiv } from "./types/calculator/tx";
import { MsgCalculateSub } from "./types/calculator/tx";
const types = [
    ["/eshelB.calculator.calculator.MsgCalculateSum", MsgCalculateSum],
    ["/eshelB.calculator.calculator.MsgCalculateMul", MsgCalculateMul],
    ["/eshelB.calculator.calculator.MsgCalculateDiv", MsgCalculateDiv],
    ["/eshelB.calculator.calculator.MsgCalculateSub", MsgCalculateSub],
];
export const MissingWalletError = new Error("wallet is required");
export const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    let client;
    if (addr) {
        client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    }
    else {
        client = await SigningStargateClient.offline(wallet, { registry });
    }
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgCalculateSum: (data) => ({ typeUrl: "/eshelB.calculator.calculator.MsgCalculateSum", value: MsgCalculateSum.fromPartial(data) }),
        msgCalculateMul: (data) => ({ typeUrl: "/eshelB.calculator.calculator.MsgCalculateMul", value: MsgCalculateMul.fromPartial(data) }),
        msgCalculateDiv: (data) => ({ typeUrl: "/eshelB.calculator.calculator.MsgCalculateDiv", value: MsgCalculateDiv.fromPartial(data) }),
        msgCalculateSub: (data) => ({ typeUrl: "/eshelB.calculator.calculator.MsgCalculateSub", value: MsgCalculateSub.fromPartial(data) }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
