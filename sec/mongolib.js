  
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'test';

const client = new MongoClient(url, { useUnifiedTopology: true });

const USUARIOS = 'users'

async function getUser(id)
{
    
    const user = await db()
    .collection(USUARIOS)
    .findOne({username:id});
    return user;
}

async function insertUser(user)
{
    await db().collection(USUARIOS)
            .insertOne(user);
    return ;
}



const getDatabase = (callback) => {
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        callback(db, client);
    });
}

const findDocuments = function (db, callback) {
    const collection = db.collection('offers');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

exports.getDatabase = getDatabase;
exports.findDocuments = findDocuments;
exports.getUser= getUser;
exports.insertUser = insertUser;