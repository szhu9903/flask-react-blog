import pytest

@pytest.mark.usefixtures('client_admin')
@pytest.mark.usefixtures('client_github')
class TestBlog:

    def test_get_blog(self, client):
        response = client.get('/api/v3/blog/')
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06
        assert len(response.json['data']) > 0 and len(response.json['data']) <= response.json['total_count']

    def test_get_blog_lv(self, client):
        response = client.get('/api/v3/blog/?view=blog_LV')
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert len(response.json['data']) > 0 and len(response.json['data']) <= response.json['total_count']
        blog_data = response.json['data'][0]
        assert 'bt_name' in blog_data and 'bu_username' in blog_data

    @pytest.mark.parametrize(('filter_str'),(
        ('filter=b_title=test',),('filter=b_type=2',),('filter=b_type=1')
    ))
    def test_get_blog_lv_filter(self, client, filter_str):
        response = client.get(f'/api/v3/blog/?view=blog_LV&{filter_str}')
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert len(response.json['data']) > 0 and len(response.json['data']) <= response.json['total_count']
        blog_data = response.json['data'][0]
        assert 'bt_name' in blog_data and 'bu_username' in blog_data

    def test_post_blog(self, client, client_admin, client_github):
        request_json = {
            "data":{
                    "b_brief": "描述",
                    "b_content": "##文章内容",
                    "b_title": "测试test1",
                    "b_tag":[
                        {"bt_tagid": 3},
                        {"bt_tagid": 4}
                    ],
                    "b_type": 2
            }
        }
        response = client.post('/api/v3/blog/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_github.post('/api/v3/blog/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_admin.post('/api/v3/blog/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06
        assert response.json['rowid'] is not None
        self.add_blogid = response.json['rowid']

    def test_put_blog(self, client, client_admin, client_github):
        request_json = {
            "data": {
                "b_brief": "描述test",
                "b_tag": [
                    {"bt_tagid": 1},
                    {"bt_tagid": 2}
                ],
            }
        }
        response = client.put('/api/v3/blog/1/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_github.put('/api/v3/blog/1/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_admin.put('/api/v3/blog/1/', json=request_json)
        assert response.status_code == 200
        print(response.json)
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06

    def test_delete_blog(self, client, client_admin, client_github):
        response = client.delete('/api/v3/blog/3/')
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_github.delete('/api/v3/blog/3/')
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_admin.delete('/api/v3/blog/3/')
        assert response.status_code == 200
        print(response.json)
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06

