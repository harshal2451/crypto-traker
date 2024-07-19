import { Connection, Model, Schema, Document } from "mongoose";
import * as mongoose from 'mongoose';
import { CryptoData, CryptoDataDao, CryptoDataExtended} from "./CryptoDataDao";
import { mapToMongoDocs } from "../../utils/models";

export const schema = new Schema<CryptoDataExtended>({
    crypto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crypto',
    },
    current_price: Number,
    market_cap: Number,
    volume: Number,
    change_price: Number,
    change_price_24: Number
}, {
    timestamps: true,
    versionKey: false
});


export class CryptoDataDaoMongo implements CryptoDataDao {

    model: Model<Document<CryptoDataExtended>>;

    constructor(mongo: Connection) {
        this.model = mongo.model<Document<CryptoDataExtended>>("CryptoData", schema);
    }

    async getByName(crypto_id: string): Promise<CryptoDataExtended[]> {
        return this.model.find({
            crypto_id 
        }).sort({createdAt: -1}).limit(20).then((r) => {
            
            return mapToMongoDocs<CryptoDataExtended>(r);
        })
    }

    async create(doc: CryptoData): Promise<string> {
        return this.model.create(doc).then((r) => {
            return r.id;
        });
    }


}

export const CryptoDataSchema = schema;
export default mongoose.model<Document<CryptoDataExtended>>("CryptoData", schema);