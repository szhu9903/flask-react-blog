import pytest
from flask import json

@pytest.mark.parametrize(('user_name', 'user_pwd'),(
        ('test1', "blogadmin"),
        ('test2', "blogadmin"),
))
def test_user_login(client, user_name, user_pwd):
    request_data = {
        "data":{
            "user_name":user_name,
            "user_pwd":user_pwd,
        }
    }
    response = client.post('/api/v2/login/', json=request_data, content_type='application/json')
    assert response.status_code == 200
    assert response.json['status'] == 200
    assert 'access_token' in response.json['data']


@pytest.mark.parametrize(('user_name', 'user_pwd'),(
        ('', ''),
        ('', 'blogadmin'),
        ('test1', ''),
        ('test1', 'test'),
))
def test_error_user_login(client, user_name, user_pwd):
    request_data = {
        "data":{
            "user_name":user_name,
            "user_pwd":user_pwd,
        }
    }
    response = client.post('/api/v2/login/', data=json.dumps(request_data), content_type='application/json')
    assert response.status_code == 200
    assert response.json['status'] == 401.1
    assert response.json['data'] is None


