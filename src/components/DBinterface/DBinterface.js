var AWS = require("aws-sdk");
//var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
//AWS.config.credentials = credentials;
AWS.config.update({
    region: 'us-west-1',
    endpoint: "dynamodb.us-west-1.amazonaws.com",
    accessKeyId: "AKIATPIELXQYT2AQM3Q3",
    secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();

export const updateUserInfo = async (username, attribute, value) => {
    var params = {
        TableName: "User",
        Key: {
            "username": { S: username }
        },
        UpdateExpression: "SET " + attribute + " = :value",
        ExpressionAttributeValues: {
            ":value": value
        }
    };
    dynamodb.updateItem(params, function (err) {
        if (err) {
            console.log("Update error", err);
        } else {
            console.log("Success");
        }
    })
}

export const RegisterInfo = async (table_name, item) => {
    var params = {
        TableName: table_name,
        Item: item
    };

    // Call DynamoDB to add the item to the table
    dynamodb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

export const GetUserInfo = async (username, attributes) => {
    var params = {
        TableName: 'User',
        Key: {
            'username': { 'S': username }
        },
        ProjectionExpression: attributes
    };

    var result = 0
    await new Promise((resolve, reject) => {
        dynamodb.getItem(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err)
            }
            else {
                resolve(data.Item)
            }
        })
    }).then((data) => {
        result = data
    }).catch((err) => {
        result = err
    })
    return result
}

export const GetBlackSpotInfo = async (id, attributes) => {
    var params = {
        TableName: 'BlackSpot',
        Key: {
            'id': { 'N': id }
        },
        ProjectionExpression: attributes
    };

    var result = 0
    await new Promise((resolve, reject) => {
        dynamodb.getItem(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err)
            }
            else {
                resolve(data.Item)
            }
        })
    }).then((data) => {
        result = data
    }).catch((err) => {
        result = err
    })
    return result
}
