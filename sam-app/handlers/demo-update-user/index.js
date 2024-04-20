const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const tableName = process.env.SAMPLE_TABLE;

exports.handler = async (event, context) => {
  const params = {
    ExpressionAttributeNames: {
      "#AT": "name",
      "#Y": "role",
      "#Z": "email",
    },
    ExpressionAttributeValues: {
      ":t": {
        S: "upAK",
      },
      ":y": {
        S: "User",
      },
      ":z": {
        S: "upak@gmail.com",
      },
    },
    Key: {
      id: {
        S: "1",
      },
    },
    ReturnValues: "ALL_NEW",
    UpdateExpression: "SET #Y = :y, #AT = :t, #Z = :z",
    TableName: tableName,
  };

  let response;

  try {
    const result = await dynamodb.updateItem(params).promise();
    response = {
      data: result,
      status: 200,
      msg: "Process is Completed Successfully",
    };
  } catch (error) {
    response = {
      data: error,
      status: 500,
      msg: "Error!! while updated the user data.",
    };
  } finally {
    return context.succeed(response);
  }
};
