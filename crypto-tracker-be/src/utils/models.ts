import * as mongoose from 'mongoose';

export const mapToMongoDocs = <T>(res: mongoose.Document<T>[]) => {
    return res.map((r) => (r.toObject() as any) as T);
}
export const mapToMongoDoc = <T>(res: mongoose.Document<T>) => {
    return (res.toObject() as any) as T;
  }
  