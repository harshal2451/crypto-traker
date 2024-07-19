import mongoose from "mongoose";
import { getEnv } from "../../env";
let conn: mongoose.Connection;
const createConnection = (uri: string) => {
    if (!conn) {
        
        conn = mongoose.createConnection(uri);
        conn.on('error', function callback() {
            console.error.bind(console, 'mongo connection error:')
            conn.close();
        });
        conn.once('open', function callback() {
            console.log("db connected to the ", getEnv().MONGO_URI)
            return;
        });
        return conn;
    }
    return conn;
}

export const getMongo = (): mongoose.Connection => {
    return createConnection(getEnv().MONGO_URI);
}


