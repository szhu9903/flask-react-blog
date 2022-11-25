import pytest
from flask import json

# 登录成功
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

# 登录失败
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

# 用户管理

@pytest.mark.usefixtures('client_admin')
@pytest.mark.usefixtures('client_github')
class TestUser:

    def test_get_user(self, client, client_github, client_admin):
        response = client.get('/api/v3/bloguser/')
        assert response.status_code == 200
        assert response.json['status'] == 403
        assert response.json['code'] == 0x13
        response = client_github.get('/api/v3/bloguser/')
        assert response.status_code == 200
        assert response.json['status'] == 403
        assert response.json['code'] == 0x14
        response = client_admin.get('/api/v3/bloguser/')
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06
        assert len(response.json['data']) > 0
        response = client_admin.get('/api/v3/bloguser/?depth_col=u_role')
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06
        assert len(response.json['data']) > 0
        assert 'u_role' in response.json['data'][0]

    def test_add_user(self, client, client_github, client_admin):
        request_json = {
            "data":{
                    "bu_account": "test1",
                    "bu_pwd": "123",
                    "bu_sex": "女",
                    "bu_username": "test_name",
                    "bu_isadmin": 0,
            }
        }
        response = client.post('/api/v3/bloguser/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_github.post('/api/v3/bloguser/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403

        # 用户重复
        response = client_admin.post('/api/v3/bloguser/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x21

        request_json = {
            "data":{
                    "bu_account": "test3",
                    "bu_pwd": "123",
                    "bu_sex": "女",
                    "bu_username": "test_name",
                    "bu_isadmin": 0,
                    "u_role": [{"ur_roleid": "1"}]
            }
        }
        response = client_admin.post('/api/v3/bloguser/', json=request_json)
        print(response.json)
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06
        assert response.json['rowid'] is not None

    def test_put_user(self, client, client_admin, client_github):
        request_json = {
            "data": {
                "bu_sex": "男",
            }
        }
        response = client.put('/api/v3/bloguser/1/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_github.put('/api/v3/bloguser/3/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_admin.put('/api/v3/bloguser/3/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06

    def test_delete_blog(self, client, client_admin, client_github):
        response = client.delete('/api/v3/bloguser/3/')
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_github.delete('/api/v3/bloguser/3/')
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_admin.delete('/api/v3/bloguser/3/')
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06