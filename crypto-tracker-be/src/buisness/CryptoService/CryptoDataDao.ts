import * as mongoose from 'mongoose';

export interface CryptoData {
    crypto_id: any;
    current_price?: number;
    market_cap?: number;
    volume?: number;
    change_price?: number;
    change_price_24?: number;
}

export type CryptoDataExtended = { _id: string } & CryptoData;


export interface CryptoDataDao {
    create(doc: CryptoData): Promise<string>;
    // get(userId: Types.ObjectId): Promise<UserExtended>;
    getByName(name: string): Promise<CryptoDataExtended[]>;
}