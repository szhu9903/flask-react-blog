import pytest

@pytest.mark.usefixtures('client_admin')
@pytest.mark.usefixtures('client_github')
class TestBlogType:

    def test_get_blog_type(self, client):
        response = client.get('/api/v3/blogtype/')
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06
        assert len(response.json['data']) > 0 and len(response.json['data']) <= response.json['total_count']

    def test_post_blog_type(self, client, client_admin, client_github):
        request_json = {
            'data':{
                'bt_name': "test1"
            }
        }
        response = client.post('/api/v3/blogtype/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_github.post('/api/v3/blogtype/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 403
        response = client_admin.post('/api/v3/blogtype/', json=request_json)
        assert response.status_code == 200
        assert response.json['status'] == 200

