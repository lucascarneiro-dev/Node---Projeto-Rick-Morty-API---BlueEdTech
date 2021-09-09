const {MongoClient,ObjectId} = require('mongodb');
const dotenv = require('dotenv').config()


const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.${process.env.DB_CHAR}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(connectionString,{useUnifiedTopology: true, useNewUrlParser: true});


client.connect();

async function dbclose(){
    await client.close(false,() => console.log('Conexão encerrada com sucesso'))
}

module.exports = {client,dbclose,ObjectId}