import pytest

@pytest.mark.usefixtures('client_admin')
@pytest.mark.usefixtures('client_github')
class TestSys:

    def test_get_menu(self, client, client_github, client_admin):
        response = client.get('/api/v2/usermenu/')
        assert response.status_code == 200
        assert response.json['status'] == 401
        response = client_github.get('/api/v2/usermenu/')
        assert response.status_code == 200
        assert response.json['status'] == 401
        response = client_admin.get('/api/v2/usermenu/')
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06
        assert len(response.json['data']) > 0

