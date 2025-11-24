import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const mongodbUri = process.env.mongoUri2;
if (!mongodbUri) throw new Error("MONGO URI tidak valid...\nSilahkan Cek kembali...\n\n");

const client = new MongoClient(mongodbUri, {});
let clientPromise = client.connect();

export default clientPromise;
