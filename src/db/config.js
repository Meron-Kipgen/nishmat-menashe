import { Client, Databases, ID, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('666acc380020b2ed30c6'); 
const db = new Databases(client);
const account = new Account(client);

export { ID, db, account, client };