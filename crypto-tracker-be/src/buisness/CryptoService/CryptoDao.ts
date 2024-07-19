
export interface Crypto {
    name: string;
    symbol: string;
    rank: number
}

export type CryptoExtended = { _id: string } & Crypto;


export interface CryptoDao {
    create(doc: Crypto): Promise<string>;
    // get(userId: Types.ObjectId): Promise<UserExtended>;
    getByName(name: string): Promise<CryptoExtended | null>;
    getById(crypto_id: string): Promise<any>;
    getAllCrypto(): Promise<CryptoExtended[]>;
}