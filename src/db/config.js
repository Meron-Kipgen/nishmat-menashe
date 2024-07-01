import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('666acc380020b2ed30c6'); 

export const db = new Databases(client);
export { ID };