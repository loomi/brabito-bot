import { MongoClient } from 'mongodb';
import mongodbEnv from './mongo-environment';

export class MongoConnector {
  private readonly URIConnection = mongodbEnv.uri;
  private mongoClient: MongoClient | null = null;

  async createConnection(): Promise<MongoClient> {
    this.mongoClient = new MongoClient(this.URIConnection);
    return await this.mongoClient.connect();
  }

  getConnection() {
    return this.mongoClient;
  }

  async closeConnection() {
    await this.mongoClient?.close();
  }
}

const mongoHandler = new MongoConnector();

export { mongoHandler };
