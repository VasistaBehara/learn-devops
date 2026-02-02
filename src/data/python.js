const pythonData = {
    name: 'Python for DevOps',
    icon: '🐍',
    description: 'Python automation, scripting, and tooling for infrastructure and DevOps workflows.',
    concepts: [
        {
            title: 'File Operations',
            content: 'Python provides powerful file handling with context managers. Read, write, and manipulate files safely with automatic cleanup.',
            codeExample: {
                language: 'python',
                code: `# Read file
with open('config.txt', 'r') as f:
    content = f.read()
    # or lines = f.readlines()

# Write file
with open('output.txt', 'w') as f:
    f.write('Hello World\\n')

# Append to file
with open('log.txt', 'a') as f:
    f.write(f'{datetime.now()}: Event\\n')

# Read JSON
import json
with open('config.json') as f:
    config = json.load(f)

# Write JSON
with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)

# Read YAML
import yaml
with open('config.yaml') as f:
    config = yaml.safe_load(f)`
            }
        },
        {
            title: 'Working with Paths',
            content: 'The pathlib module provides an object-oriented interface for filesystem paths. More readable and portable than os.path.',
            codeExample: {
                language: 'python',
                code: `from pathlib import Path

# Create path objects
config_dir = Path('/etc/myapp')
script_dir = Path(__file__).parent

# Path operations
log_file = config_dir / 'logs' / 'app.log'
print(log_file.exists())
print(log_file.is_file())
print(log_file.suffix)  # .log
print(log_file.stem)    # app

# Create directories
Path('data/cache').mkdir(parents=True, exist_ok=True)

# Find files
for py_file in Path('.').glob('**/*.py'):
    print(py_file)

# Read/write
content = Path('file.txt').read_text()
Path('output.txt').write_text('data')`
            }
        },
        {
            title: 'Subprocess and Commands',
            content: 'Execute shell commands and external programs. Use subprocess.run() for most cases. Capture output and handle errors.',
            codeExample: {
                language: 'python',
                code: `import subprocess

# Simple command
result = subprocess.run(['ls', '-la'], capture_output=True, text=True)
print(result.stdout)
print(result.returncode)

# With shell=True (use carefully)
result = subprocess.run('echo $HOME', shell=True, capture_output=True, text=True)

# Check for errors
result = subprocess.run(['git', 'status'], check=True, capture_output=True, text=True)

# Stream output
process = subprocess.Popen(
    ['tail', '-f', '/var/log/syslog'],
    stdout=subprocess.PIPE,
    text=True
)
for line in process.stdout:
    print(line, end='')

# Timeout
try:
    result = subprocess.run(['sleep', '10'], timeout=5)
except subprocess.TimeoutExpired:
    print("Command timed out")`
            }
        },
        {
            title: 'HTTP Requests',
            content: 'The requests library simplifies HTTP operations. Make API calls, handle authentication, and process responses.',
            codeExample: {
                language: 'python',
                code: `import requests

# GET request
response = requests.get('https://api.example.com/users')
data = response.json()

# With headers and auth
response = requests.get(
    'https://api.example.com/data',
    headers={'Authorization': f'Bearer {token}'},
    params={'page': 1, 'limit': 10}
)

# POST request
response = requests.post(
    'https://api.example.com/users',
    json={'name': 'John', 'email': 'john@example.com'}
)

# Error handling
response.raise_for_status()  # Raises exception on 4xx/5xx

# Session for multiple requests
session = requests.Session()
session.headers.update({'Authorization': f'Bearer {token}'})
response = session.get('/api/data')

# Timeout and retry
response = requests.get(url, timeout=5)`
            }
        },
        {
            title: 'Environment Variables',
            content: 'Access and manage environment variables for configuration. Use dotenv for local development.',
            codeExample: {
                language: 'python',
                code: `import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Get environment variable
db_host = os.getenv('DB_HOST', 'localhost')  # With default
api_key = os.environ['API_KEY']  # Raises KeyError if missing

# Set environment variable
os.environ['NEW_VAR'] = 'value'

# Check if variable exists
if 'DEBUG' in os.environ:
    debug_mode = True

# Get all environment variables
for key, value in os.environ.items():
    print(f'{key}={value}')

# Type conversion
port = int(os.getenv('PORT', '8080'))
debug = os.getenv('DEBUG', 'false').lower() == 'true'`
            }
        },
        {
            title: 'Logging',
            content: 'Python\'s logging module provides flexible logging. Configure levels, handlers, and formatters for structured output.',
            codeExample: {
                language: 'python',
                code: `import logging

# Basic configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Log levels
logger.debug('Debug message')
logger.info('Info message')
logger.warning('Warning message')
logger.error('Error message')
logger.exception('Exception with traceback')

# Structured logging with extra data
logger.info('User action', extra={'user_id': 123, 'action': 'login'})

# JSON logging
import json
class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'message': record.getMessage()
        })`
            }
        },
        {
            title: 'Configuration Management',
            content: 'Handle configuration from multiple sources: files, environment variables, and command line arguments.',
            codeExample: {
                language: 'python',
                code: `import argparse
import yaml
import os

# Command line arguments
parser = argparse.ArgumentParser(description='DevOps Tool')
parser.add_argument('--config', '-c', default='config.yaml')
parser.add_argument('--env', choices=['dev', 'prod'], default='dev')
parser.add_argument('--verbose', '-v', action='store_true')
args = parser.parse_args()

# Load YAML config
with open(args.config) as f:
    config = yaml.safe_load(f)

# Override with environment
config['database']['host'] = os.getenv('DB_HOST', config['database']['host'])

# Dataclass for typed config
from dataclasses import dataclass

@dataclass
class DatabaseConfig:
    host: str
    port: int = 5432
    
db_config = DatabaseConfig(
    host=config['database']['host'],
    port=config['database'].get('port', 5432)
)`
            }
        },
        {
            title: 'Working with AWS (Boto3)',
            content: 'Boto3 is the AWS SDK for Python. Manage EC2, S3, Lambda, and other AWS services programmatically.',
            codeExample: {
                language: 'python',
                code: `import boto3

# S3 operations
s3 = boto3.client('s3')

# Upload file
s3.upload_file('local.txt', 'my-bucket', 'remote.txt')

# Download file
s3.download_file('my-bucket', 'remote.txt', 'local.txt')

# List objects
response = s3.list_objects_v2(Bucket='my-bucket', Prefix='logs/')
for obj in response.get('Contents', []):
    print(obj['Key'])

# EC2 operations
ec2 = boto3.resource('ec2')

# List running instances
for instance in ec2.instances.filter(
    Filters=[{'Name': 'instance-state-name', 'Values': ['running']}]
):
    print(f'{instance.id}: {instance.instance_type}')

# Secrets Manager
secrets = boto3.client('secretsmanager')
secret = secrets.get_secret_value(SecretId='my-secret')
credentials = json.loads(secret['SecretString'])`
            }
        },
        {
            title: 'SSH and Remote Execution',
            content: 'Use Paramiko or Fabric for SSH connections and remote command execution. Manage remote servers programmatically.',
            codeExample: {
                language: 'python',
                code: `import paramiko

# SSH client
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

# Connect with key
ssh.connect(
    hostname='server.example.com',
    username='admin',
    key_filename='/path/to/key.pem'
)

# Execute command
stdin, stdout, stderr = ssh.exec_command('ls -la')
print(stdout.read().decode())

# SFTP file transfer
sftp = ssh.open_sftp()
sftp.put('local.txt', '/remote/path/file.txt')
sftp.get('/remote/file.txt', 'local.txt')
sftp.close()

ssh.close()

# Using Fabric (higher level)
from fabric import Connection

with Connection('user@server.example.com') as conn:
    result = conn.run('uname -a')
    conn.put('local.txt', '/remote/')
    conn.get('/remote/file.txt')`
            }
        },
        {
            title: 'Docker SDK',
            content: 'Control Docker containers and images from Python. Build, run, and manage containers programmatically.',
            codeExample: {
                language: 'python',
                code: `import docker

client = docker.from_env()

# List containers
for container in client.containers.list():
    print(f'{container.name}: {container.status}')

# Run container
container = client.containers.run(
    'nginx:latest',
    detach=True,
    ports={'80/tcp': 8080},
    name='my-nginx'
)

# Execute command in container
result = container.exec_run('nginx -v')
print(result.output.decode())

# Container logs
logs = container.logs(stream=True)
for log in logs:
    print(log.decode())

# Build image
image, logs = client.images.build(
    path='./app',
    tag='myapp:latest',
    rm=True
)

# Stop and remove
container.stop()
container.remove()`
            }
        },
        {
            title: 'Kubernetes Client',
            content: 'The kubernetes Python client interacts with K8s clusters. Manage pods, deployments, and services programmatically.',
            codeExample: {
                language: 'python',
                code: `from kubernetes import client, config

# Load kubeconfig
config.load_kube_config()  # From ~/.kube/config
# config.load_incluster_config()  # In-cluster

v1 = client.CoreV1Api()
apps_v1 = client.AppsV1Api()

# List pods
pods = v1.list_namespaced_pod(namespace='default')
for pod in pods.items:
    print(f'{pod.metadata.name}: {pod.status.phase}')

# Create deployment
deployment = client.V1Deployment(
    metadata=client.V1ObjectMeta(name='nginx'),
    spec=client.V1DeploymentSpec(
        replicas=3,
        selector=client.V1LabelSelector(
            match_labels={'app': 'nginx'}
        ),
        template=client.V1PodTemplateSpec(...)
    )
)
apps_v1.create_namespaced_deployment(namespace='default', body=deployment)

# Delete pod
v1.delete_namespaced_pod(name='pod-name', namespace='default')`
            }
        },
        {
            title: 'Template Rendering (Jinja2)',
            content: 'Jinja2 is a powerful templating engine. Generate configuration files, emails, and dynamic content.',
            codeExample: {
                language: 'python',
                code: `from jinja2 import Environment, FileSystemLoader

# Load templates from directory
env = Environment(loader=FileSystemLoader('templates'))
template = env.get_template('nginx.conf.j2')

# Render template
config = template.render(
    server_name='example.com',
    port=8080,
    upstream_servers=['10.0.0.1', '10.0.0.2']
)

# Write to file
with open('/etc/nginx/nginx.conf', 'w') as f:
    f.write(config)

# Template example (nginx.conf.j2):
'''
server {
    listen {{ port }};
    server_name {{ server_name }};
    
    {% for server in upstream_servers %}
    upstream backend {
        server {{ server }};
    }
    {% endfor %}
}
'''

# String template
from jinja2 import Template
t = Template("Hello {{ name }}!")
print(t.render(name="World"))`
            }
        },
        {
            title: 'Concurrency and Async',
            content: 'Python supports threading, multiprocessing, and async/await. Choose based on I/O-bound vs CPU-bound tasks.',
            codeExample: {
                language: 'python',
                code: `import asyncio
import aiohttp
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# Async HTTP requests
async def fetch(session, url):
    async with session.get(url) as response:
        return await response.json()

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Run async
results = asyncio.run(fetch_all(urls))

# Thread pool for I/O-bound
def check_server(host):
    # Check server availability
    return host, is_available

with ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(check_server, servers))

# Process pool for CPU-bound
def process_file(filename):
    # Heavy computation
    return result

with ProcessPoolExecutor() as executor:
    results = list(executor.map(process_file, files))`
            }
        },
        {
            title: 'Error Handling and Retries',
            content: 'Robust error handling with try/except. Implement retry logic for transient failures.',
            codeExample: {
                language: 'python',
                code: `import time
from functools import wraps

# Basic error handling
try:
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.HTTPError as e:
    logger.error(f'HTTP error: {e}')
except requests.exceptions.ConnectionError:
    logger.error('Connection failed')
except Exception as e:
    logger.exception(f'Unexpected error: {e}')
    raise

# Retry decorator
def retry(max_attempts=3, delay=1, backoff=2):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            attempts = 0
            current_delay = delay
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempts += 1
                    if attempts == max_attempts:
                        raise
                    time.sleep(current_delay)
                    current_delay *= backoff
        return wrapper
    return decorator

@retry(max_attempts=3, delay=1)
def call_api():
    return requests.get(url)`
            }
        },
        {
            title: 'CLI Tools with Click',
            content: 'Click is a powerful library for building command-line interfaces. Define commands, options, and arguments declaratively.',
            codeExample: {
                language: 'python',
                code: `import click

@click.group()
@click.option('--debug/--no-debug', default=False)
@click.pass_context
def cli(ctx, debug):
    ctx.ensure_object(dict)
    ctx.obj['DEBUG'] = debug

@cli.command()
@click.argument('name')
@click.option('--count', '-c', default=1, help='Number of greetings')
def hello(name, count):
    """Greet NAME count times."""
    for _ in range(count):
        click.echo(f'Hello, {name}!')

@cli.command()
@click.option('--env', type=click.Choice(['dev', 'prod']))
@click.option('--config', type=click.Path(exists=True))
def deploy(env, config):
    """Deploy to environment."""
    click.echo(f'Deploying to {env}...')
    if click.confirm('Continue?'):
        # Deploy logic
        click.echo(click.style('Success!', fg='green'))

if __name__ == '__main__':
    cli()`
            }
        },
        {
            title: 'Regular Expressions',
            content: 'Python\'s re module provides regex support. Find, match, and extract patterns from text.',
            codeExample: {
                language: 'python',
                code: `import re

# Search for pattern
text = "Error on 2024-01-15: Connection failed"
match = re.search(r'\\d{4}-\\d{2}-\\d{2}', text)
if match:
    print(match.group())  # 2024-01-15

# Find all matches
logs = "IP: 192.168.1.1, IP: 10.0.0.1"
ips = re.findall(r'\\d+\\.\\d+\\.\\d+\\.\\d+', logs)

# Search and extract groups
pattern = r'(\\w+)=(\\w+)'
matches = re.findall(pattern, 'host=localhost port=8080')
# [('host', 'localhost'), ('port', '8080')]

# Replace
result = re.sub(r'password=\\w+', 'password=****', config)

# Compile for reuse
log_pattern = re.compile(r'\\[(\\w+)\\] (.*)')
for line in log_lines:
    match = log_pattern.match(line)
    if match:
        level, message = match.groups()`
            }
        },
        {
            title: 'Data Serialization',
            content: 'Serialize and deserialize data in JSON, YAML, and other formats. Handle complex objects with custom encoders.',
            codeExample: {
                language: 'python',
                code: `import json
import yaml
from dataclasses import dataclass, asdict
from datetime import datetime

# JSON with custom encoder
class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data = {'timestamp': datetime.now(), 'status': 'ok'}
json_str = json.dumps(data, cls=CustomEncoder, indent=2)

# Dataclass serialization
@dataclass
class Server:
    name: str
    ip: str
    port: int = 22

server = Server(name='web1', ip='10.0.0.1')
json.dumps(asdict(server))

# YAML multi-document
with open('configs.yaml') as f:
    for doc in yaml.safe_load_all(f):
        print(doc)

# Pickle for Python objects (not for untrusted data)
import pickle
with open('data.pkl', 'wb') as f:
    pickle.dump(complex_object, f)`
            }
        },
        {
            title: 'Database Operations',
            content: 'Connect to databases and execute queries. Use SQLAlchemy for ORM or direct database drivers.',
            codeExample: {
                language: 'python',
                code: `# SQLite example
import sqlite3

conn = sqlite3.connect('app.db')
cursor = conn.cursor()

# Create table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS servers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        ip TEXT NOT NULL
    )
''')

# Insert with parameters (prevents SQL injection)
cursor.execute(
    'INSERT INTO servers (name, ip) VALUES (?, ?)',
    ('web1', '10.0.0.1')
)
conn.commit()

# Query
cursor.execute('SELECT * FROM servers WHERE name LIKE ?', ('%web%',))
rows = cursor.fetchall()

# SQLAlchemy ORM
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://user:pass@host/db')
Session = sessionmaker(bind=engine)
session = Session()

servers = session.query(Server).filter(Server.active == True).all()`
            }
        },
        {
            title: 'Testing with Pytest',
            content: 'Write and run tests with pytest. Use fixtures, mocking, and parametrization for comprehensive testing.',
            codeExample: {
                language: 'python',
                code: `import pytest
from unittest.mock import Mock, patch

# Basic test
def test_addition():
    assert 1 + 1 == 2

# Fixture
@pytest.fixture
def config():
    return {'host': 'localhost', 'port': 8080}

def test_server_config(config):
    assert config['host'] == 'localhost'

# Parametrization
@pytest.mark.parametrize('input,expected', [
    ('hello', 'HELLO'),
    ('world', 'WORLD'),
])
def test_uppercase(input, expected):
    assert input.upper() == expected

# Mocking
@patch('mymodule.requests.get')
def test_api_call(mock_get):
    mock_get.return_value.json.return_value = {'status': 'ok'}
    result = fetch_status()
    assert result == 'ok'

# Exception testing
def test_division_by_zero():
    with pytest.raises(ZeroDivisionError):
        1 / 0`
            }
        },
        {
            title: 'Packaging and Distribution',
            content: 'Package Python code for distribution. Use setuptools, pyproject.toml, and create installable packages.',
            codeExample: {
                language: 'python',
                code: `# pyproject.toml (modern approach)
'''
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "mydevopstool"
version = "1.0.0"
dependencies = [
    "click>=8.0",
    "requests>=2.28",
]

[project.scripts]
mytool = "mydevopstool.cli:main"
'''

# Project structure
'''
mydevopstool/
├── pyproject.toml
├── README.md
├── src/
│   └── mydevopstool/
│       ├── __init__.py
│       ├── cli.py
│       └── utils.py
└── tests/
    └── test_utils.py
'''

# Build and install
# pip install build
# python -m build
# pip install dist/mydevopstool-1.0.0-py3-none-any.whl

# Development install
# pip install -e .[dev]`
            }
        }
    ],
    questions: [
        { question: 'Why is Python popular for DevOps?', answer: 'Python has rich libraries (Boto3, Ansible, Fabric), readable syntax, cross-platform support, strong community, and integrates well with APIs, cloud services, and configuration formats (YAML, JSON).' },
        { question: 'What is the difference between subprocess.run() and os.system()?', answer: 'subprocess.run() is preferred: captures output, handles errors better, more secure with shell=False. os.system() just returns exit code, outputs to terminal, always uses shell.' },
        { question: 'How do you handle credentials securely in Python?', answer: `Use environment variables (os.environ), AWS Secrets Manager, HashiCorp Vault, or encrypted config files.
Never hardcode credentials.
Use dotenv for local dev.
IAM roles for AWS.` },
        { question: 'What is the purpose of if __name__ == "__main__"?', answer: `It checks if the script is run directly (not imported).
Code under it only executes when run as main script.
Allows modules to be both importable and runnable.` },
        { question: 'How do you manage Python dependencies?', answer: `Use requirements.txt or pyproject.toml.
Virtual environments (venv) isolate dependencies. pip-tools for dependency resolution.
Poetry or pipenv for advanced management.` },
        { question: 'What is a context manager and when to use it?', answer: `Context managers (with statement) ensure cleanup (closing files, releasing locks).
Use for resources that need cleanup.
Implement with __enter__/__exit__ or @contextmanager decorator.` },
        { question: 'How do you make HTTP requests in Python?', answer: `Use requests library for simple cases. aiohttp for async.
Handle errors with raise_for_status().
Use sessions for multiple requests.
Set timeouts to prevent hanging.` },
        { question: 'What is the difference between threading and multiprocessing?', answer: `Threading: shared memory, good for I/O-bound tasks, limited by GIL.
Multiprocessing: separate memory, good for CPU-bound tasks, true parallelism. asyncio for many concurrent I/O tasks.` },
        { question: 'How do you parse command line arguments?', answer: `Use argparse (standard library) or click (more powerful).
Define arguments, options, types, and help text.
Click supports subcommands and is more Pythonic.` },
        { question: 'What is the GIL and how does it affect concurrency?', answer: `Global Interpreter Lock prevents true parallelism in threads.
Doesn't affect I/O-bound tasks (threads release GIL during I/O).
Use multiprocessing for CPU-bound parallel tasks.` },
        { question: 'How do you interact with AWS using Python?', answer: `Use boto3, the official AWS SDK.
Configure credentials via environment, IAM roles, or config file.
Use client for low-level API, resource for higher-level abstraction.` },
        { question: 'What is Jinja2 and when is it used?', answer: `Jinja2 is a templating engine for generating text from templates.
Used for config files, HTML, emails.
Ansible uses Jinja2 for templates.
Supports variables, loops, filters.` },
        { question: 'How do you write tests in Python?', answer: `Use pytest (preferred) or unittest.
Write test functions with assertions.
Use fixtures for setup.
Mock external dependencies.
Run with pytest command.
Aim for good coverage.` },
        { question: 'What is the difference between list comprehension and generator expression?', answer: `List comprehension [x for x in iterable] creates a list in memory.
Generator (x for x in iterable) yields items lazily, memory efficient for large datasets.` },
        { question: 'How do you handle errors and retries?', answer: `Use try/except for error handling.
Log exceptions.
Implement retry with backoff for transient failures.
Use tenacity library for advanced retry logic.
Raise custom exceptions.` },
        { question: 'What are type hints and why use them?', answer: `Type hints (def foo(x: int) -> str:) document expected types.
Caught by mypy, IDE static analysis.
Improve code readability and catch bugs early.
Not enforced at runtime.` },
        { question: 'How do you work with Docker from Python?', answer: `Use docker SDK (docker-py).
Build images, run containers, execute commands, stream logs.
Connect with docker.from_env().
Useful for testing and automation.` },
        { question: 'What is a virtual environment and why use it?', answer: `Virtual environments isolate project dependencies.
Create with python -m venv .venv.
Activate before installing packages.
Prevents conflicts between projects.
Essential for reproducible builds.` },
        { question: 'How do you read and write YAML in Python?', answer: `Use PyYAML library. yaml.safe_load() for reading, yaml.dump() for writing. safe_load prevents arbitrary code execution.
Supports multiple documents with safe_load_all().` },
        { question: 'What is the best way to structure a Python project?', answer: `Use src layout, separate tests directory, pyproject.toml for configuration.
Include README, requirements.
Use __init__.py for packages.
Follow PEP 8 style guide.
Use git and CI/CD.` }
    ]
};

export default pythonData;
