import io
import os
import pytest
from werkzeug.datastructures import FileStorage

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

    def test_upload_img(self, client, client_github, client_admin):
        file_path = os.path.join("tests/data/logo.png")
        file_data = open(file_path, 'rb')
        file = FileStorage(
            stream = file_data,
            filename = "logo.png",
            content_type = "image/png",
        )
        response = client.post('/api/v2/upload/img/', data={'file': file}, content_type='multipart/form-data')
        assert response.status_code == 200
        assert response.json['status'] == 403
        file_data = open(file_path, 'rb')
        file = FileStorage(
            stream = file_data,
            filename = "logo.png",
            content_type = "image/png",
        )
        response = client_github.post('/api/v2/upload/img/', data={'file': file}, content_type='multipart/form-data')
        assert response.status_code == 200
        assert response.json['status'] == 403
        file_data = open(file_path, 'rb')
        file = FileStorage(
            stream = file_data,
            filename = "logo.png",
            content_type = "image/png",
        )
        response = client_admin.post('/api/v2/upload/img/', data={'file': file}, content_type='multipart/form-data')
        assert response.status_code == 200
        assert response.json['status'] == 200
        assert response.json['code'] == 0x06
        file_data.close()

