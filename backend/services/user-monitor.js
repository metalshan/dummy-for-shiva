let dbClient = localrequire("database.mongo-client");
let mongoNative = require("mongodb").MongoClient;
let ObjectID = require('mongodb').ObjectID;
let collectionName = "loggedInUsers";

class UserMonitor{
    updateLastActive(_id){
        dbClient.update({
            _id: ObjectID(_id)
        }, {
            $set: {lastActive: new Date()}
        }, collectionName);
    }
}

module.exports = new UserMonitor();