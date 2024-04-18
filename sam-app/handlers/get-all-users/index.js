const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE || "demo-table";

exports.handler = (event, context) => {
  console.log("event ->", event);
  const body = event.body ? event.body : event;
  return context.succeed(body);
};
