import sys
print(sys.argv[0])
import pytest
from app import create_app
from app.comm.SqlExecute import SqlExecute

# 接收配置信息
def pytest_addoption(parser):
    parser.addoption(
        "--secret_key",
        action="store",
        help="flask api secret key!"
    )
    parser.addoption(
        "--db_pwd",
        action="store",
        help="flask api test mysql password!"
    )
    parser.addoption(
        "--db_host",
        action="store",
        help="flask api test mysql password!"
    )
    parser.addoption(
        "--cloud_host",
        action="store",
        help="flask api test cloud host"
    )
    parser.addoption(
        "--cloud_pwd",
        action="store",
        help="flask api test cloud pwd"
    )


def execute_sql(file_name, cursor):
    with open(file_name, 'r') as fd:
        sql_str = fd.read()
        sql_list = sql_str.split(';')[:-1]
    for sql in sql_list:
        cursor.transact_commit_sql_data(sql)
    cursor.commit()

@pytest.fixture(scope="session")
def app(request):
    pytest_config = {
        "secret_key": request.config.getoption("--secret_key"),
        "db_pwd": request.config.getoption("--db_pwd"),
        "db_host": request.config.getoption("--db_host"),
        "cloud_host": request.config.getoption("--cloud_host"),
        "cloud_pwd": request.config.getoption("--cloud_pwd"),
    }
    app = create_app(config_name='test', pytest_config=pytest_config)
    with app.app_context():
        # 测试数据库插入测试数据
        print('----------------- 初始化测试数据 -------------------')
        execute_sql('tests/data/del_data.sql', SqlExecute())
        execute_sql('tests/data/init_data.sql', SqlExecute())
        yield app
        # 删除测试数据
        print('----------------- 删除测试数据 -------------------')
        execute_sql('tests/data/del_data.sql', SqlExecute())


def login(client, user_name, user_pwd):
    request_data = {
        "data":{
            "user_name":user_name,
            "user_pwd":user_pwd,
        }
    }
    response = client.post('/api/v2/login/', json=request_data, content_type='application/json')
    return response.json['data']['access_token']

@pytest.fixture(scope="function")
def client(app):
    with app.test_client() as client:
        yield client

@pytest.fixture(scope="class")
def client_admin(app):
    with app.test_client() as client_admin:
        access_token = login(client_admin, 'test1', 'blogadmin')
        client_admin.environ_base['HTTP_AUTHORIZATION'] = f'Token {access_token}'
        yield client_admin

# 模拟登录github,权限测试
@pytest.fixture(scope="class")
def client_github(app):
    with app.test_client() as client_github:
        access_token = login(client_github, 'test2', 'blogadmin')
        client_github.environ_base['HTTP_AUTHORIZATION'] = f'Token {access_token}'
        yield client_github




