const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const tableName = process.env.SAMPLE_TABLE;

exports.handler = async (event, context) => {
  const params = {
    Key: {
      'id': {
        'S': '1'
      }
    },
    TableName: tableName
  };

  let response;

  try {
    const result = await dynamodb.getItem(params).promise();
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
      "msg": "Error!! while fetching the user data."
    };
  }
  finally {
    return context.succeed(response);
  }
};
