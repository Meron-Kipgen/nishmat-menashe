// appwriteConfig.js

import { Client, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('666acc380020b2ed30c6'); // Replace with your Appwrite project ID

const account = new Account(client,'5a257783157bc99b58ac7e79ae4f91f970289ab4b27a1d48a73d6ce8b2b3a0c7a25a649b11e7f7ffb861304d6cc9cbc56dcb87b5866f5ae8bb13980c7954dd13a2430b0df0026214860bcb755012cf0ba3900342001bf37e73d9631f534085a64a8fdcca1d95a19787eee4240d6e65661023643838d36013cf5a97397dd8ec3f'); 

export { client, account };
