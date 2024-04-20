const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const tableName = process.env.SAMPLE_TABLE;

exports.handler = async (event, context) => {
  const params = {
    TableName: tableName,
  };

  let response;

  try {
    const result = await dynamodb.scan(params).promise();
    response = {
      data: result,
      status: 200,
      msg: "Process is Completed Successfully",
    };
  } catch (error) {
    response = {
      data: error,
      status: 500,
      msg: "Error!! while fetching the users data.",
    };
  } finally {
    return context.succeed(response);
  }
};
