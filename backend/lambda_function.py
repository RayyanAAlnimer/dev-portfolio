import boto3
import json
import os

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])


def lambda_handler(event, context):
    response = table.update_item(
        Key={
            "id": "visitor_count"
        },
        UpdateExpression="ADD #count :increment",
        ExpressionAttributeNames={
            "#count": "count"
        },
        ExpressionAttributeValues={
            ":increment": 1
        },
        ReturnValues="UPDATED_NEW"
    )

    count = int(response["Attributes"]["count"])

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "count": count
        })
    }