const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const tableName = process.env.SAMPLE_TABLE;

exports.handler = async (event, context) => {
  const params = {
    Item: {
     "id": {
       S: "1"
      }, 
     "name": {
       S: "new ak"
      }, 
     "role": {
       S: "Admin"
      },
      "email": {
        S: "newAk@gmail.com"
       }
    }, 
    ReturnConsumedCapacity: "TOTAL", 
    ReturnValues: UPDATED_NEW,
    TableName: tableName
  };

  let response;

  try {
    const result = await dynamodb.putItem(params).promise();
    response = {
      "data": result,
      "status": 200,
      "msg": "Process is Completed Successfully"
    };
  }
  catch (error) {
    response = {
      "data": error,
      "status": 500,
      "msg": "Error!! while creating the user data."
    };
  }
  finally {
    return context.succeed(response);
  }
};
