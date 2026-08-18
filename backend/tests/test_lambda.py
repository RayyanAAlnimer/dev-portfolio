import os
import json
from unittest.mock import MagicMock

os.environ["TABLE_NAME"] = "test-visitors"
os.environ["AWS_DEFAULT_REGION"] = "eu-north-1"
os.environ["AWS_EC2_METADATA_DISABLED"] = "true"

import backend.lambda_function as lambda_function


def test_lambda_handler_returns_updated_count():
    mock_table = MagicMock()

    mock_table.update_item.return_value = {
        "Attributes": {
            "count": 18
        }
    }

    lambda_function.table = mock_table

    response = lambda_function.lambda_handler({}, None)

    assert response["statusCode"] == 200
    assert json.loads(response["body"]) == {
        "count": 18
    }

    mock_table.update_item.assert_called_once()