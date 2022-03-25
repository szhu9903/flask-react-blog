import pytest
import click

@click.command()
@click.option('--secret_key', help = 'falsk secret_key')
@click.option('--db_pwd', help = 'database password')
@click.option('--db_host', help = 'database host')
def run_pytest(secret_key, db_pwd, db_host):
    """ run flask pytest param """
    pytest.main(['--cov-config=../.coveragerc',
                 '--cov=./app',
                 '--cov-report=xml',
                 './tests',
                 f'--secret_key={secret_key}',
                 f'--db_pwd={db_pwd}',
                 f'--db_host={db_host}'])
    

if __name__ == '__main__':
    run_pytest()

