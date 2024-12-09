import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39"
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

export const CreateKeyPair = async(mnemonic: string) => {
    let index = 0;
    const mnemonicSeed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/{index}/0'`;
    const derivedSeed = derivePath(path,mnemonicSeed.toString('hex')).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keyPair = Keypair.fromSecretKey(secret);
    index++;
    return keyPair;
}