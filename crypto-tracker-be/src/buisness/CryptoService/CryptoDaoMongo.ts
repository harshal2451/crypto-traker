import { Connection, Model, Schema, Document, Types } from "mongoose";
import * as mongoose from 'mongoose';
import { Crypto, CryptoDao, CryptoExtended} from "./CryptoDao";
import { mapToMongoDoc, mapToMongoDocs } from "../../utils/models";

export const schema = new Schema<CryptoExtended>({
    name: String,
    symbol: String,
    rank: Number,
}, {
    timestamps: true,
    versionKey: false
});


// schema.plugin(mongoosePaginate);

export class CryptoDaoMongo implements CryptoDao {

    model: Model<Document<CryptoExtended>>;

    constructor(mongo: Connection) {
        this.model = mongo.model<Document<CryptoExtended>>("Crypto", schema);
    }

    async getByName(name: string): Promise<CryptoExtended | null> {
        return this.model.findOne({
            name: { $regex: new RegExp(name, 'i') }
        }).then((r) => {
            if(!r) return null;
            return mapToMongoDoc<CryptoExtended>(r);
        })
    }

    
    async getById(crypto_id: string): Promise<any> {
        let cryptoId = new Types.ObjectId(crypto_id)
        const crypto = await this.model.aggregate([
        { $match: { _id: cryptoId } },
        {
            $lookup: {
                from: 'cryptodatas',
                localField: '_id',
                foreignField: 'crypto_id',
                pipeline: [ 
                    { $sort: { 'createdAt': -1 } },
                    { $limit: 20 } 
                ],
                as: 'data',
            }
        },
        ]);
        if (crypto.length === 0) {
            throw new Error('Crypto currency not found');
        }
        return crypto[0];
    }

    async getAllCrypto(): Promise<CryptoExtended[]>{
        return this.model.find({}).sort({rank: 1}).limit(5).then(r => {
            return mapToMongoDocs<CryptoExtended>(r);
        })
    }


    async create(doc: Crypto): Promise<string> {
        return this.model.create(doc).then((r) => {
            return r.id;
        });
    }
}

export const CryptoSchema = schema;
export default mongoose.model<Document<CryptoExtended>>("Crypto", schema);