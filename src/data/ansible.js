export default {
    id: 'ansible',
    name: 'Ansible',
    icon: '⚙️',
    description: 'Agentless automation tool for configuration management, application deployment, and orchestration.',
    concepts: [
        {
            title: 'Ansible Architecture',
            content: `Ansible is agentless - connects via SSH (Linux) or WinRM (Windows). Control node runs playbooks. Managed nodes are targets.

Push-based model. No agents to install or maintain. Idempotent - running multiple times produces same result.`,
            codeExample: {
                language: 'bash', code: `# Run ad-hoc command
ansible all -m ping -i inventory.ini
ansible webservers -m shell -a "uptime"` }
        },
        {
            title: 'Inventory',
            content: `Defines managed hosts. Static (INI or YAML files) or dynamic (scripts, plugins for cloud providers). Groups organize hosts.

Variables can be set per host, group, or in separate files. Children groups inherit parent variables.`,
            codeExample: {
                language: 'yaml', code: `all:
  children:
    webservers:
      hosts:
        web1: { ansible_host: 10.0.0.1 }
        web2: { ansible_host: 10.0.0.2 }
    databases:
      hosts:
        db1: { ansible_host: 10.0.1.1 }` }
        },
        {
            title: 'Playbooks',
            content: `YAML files defining automation tasks. Plays map hosts to tasks. Tasks call modules. Handlers run once at end when notified.

Playbooks are idempotent and declarative. Use tags for selective execution. Variables customize behavior.`,
            codeExample: {
                language: 'yaml', code: `---
- name: Configure web servers
  hosts: webservers
  become: true
  tasks:
    - name: Install nginx
      apt: name=nginx state=present
    - name: Start nginx
      service: name=nginx state=started enabled=true` }
        },
        {
            title: 'Modules',
            content: `Units of work in Ansible. 3000+ built-in modules. Categories: System, Commands, Files, Database, Cloud, Containers.

Modules are idempotent. Use command/shell for arbitrary commands (less idempotent). Custom modules in Python.`,
            codeExample: {
                language: 'yaml', code: `tasks:
  - name: Copy config
    copy: src=nginx.conf dest=/etc/nginx/ mode='0644'
  - name: Create user
    user: name=deploy groups=www-data shell=/bin/bash
  - name: Install packages
    apt: name={{ item }} state=present
    loop: [nginx, git, python3]` }
        },
        {
            title: 'Roles',
            content: `Reusable, organized content. Standard directory structure: tasks, handlers, templates, files, vars, defaults, meta.

Galaxy is the community hub for roles. Use requirements.yml to manage dependencies.`,
            codeExample: {
                language: 'bash', code: `roles/
└── webserver/
    ├── tasks/main.yml
    ├── handlers/main.yml
    ├── templates/nginx.conf.j2
    ├── files/
    ├── vars/main.yml
    ├── defaults/main.yml
    └── meta/main.yml` }
        },
        {
            title: 'Variables & Facts',
            content: `Variables customize playbooks. Precedence: command line > playbook > inventory > defaults. Facts are auto-gathered system info.

Register captures task output. Vault encrypts sensitive variables. Lookups fetch external data.`,
            codeExample: {
                language: 'yaml', code: `vars:
  http_port: 80
tasks:
  - name: Get hostname
    debug: msg="{{ ansible_hostname }}"
  - name: Run command
    command: "whoami"
    register: result
  - debug: var=result.stdout` }
        },
        {
            title: 'Templates (Jinja2)',
            content: `Templates use Jinja2 syntax. Variables, filters, conditionals, loops. .j2 extension convention.

Popular filters: default, join, upper, lower, regex_replace. Custom filters possible.`,
            codeExample: {
                language: 'yaml', code: `# template: nginx.conf.j2
server {
    listen {{ http_port }};
    server_name {{ domain }};
    {% for location in locations %}
    location {{ location.path }} {
        proxy_pass {{ location.backend }};
    }
    {% endfor %}
}` }
        },
        {
            title: 'Handlers & Notifications',
            content: `Handlers run once at end when notified by tasks. Perfect for service restarts after config changes.

Use flush_handlers to run immediately. Handlers run in order defined, not notified. Can chain notifications.`,
            codeExample: {
                language: 'yaml', code: `tasks:
  - name: Update config
    template: src=nginx.conf.j2 dest=/etc/nginx/nginx.conf
    notify: restart nginx
handlers:
  - name: restart nginx
    service: name=nginx state=restarted` }
        },
        {
            title: 'Ansible Vault',
            content: `Encrypts sensitive data. Encrypt files, variables, or strings. Use vault password file or prompt.

Best practice: separate vault files (secrets.yml) from regular vars. ansible-vault create/edit/view commands.`,
            codeExample: {
                language: 'bash', code: `# Create encrypted file
ansible-vault create secrets.yml
# Edit encrypted file
ansible-vault edit secrets.yml
# Run playbook with vault
ansible-playbook site.yml --ask-vault-pass
ansible-playbook site.yml --vault-password-file .vault_pass` }
        },
        {
            title: 'Best Practices',
            content: `Directory structure: inventory, group_vars, host_vars, roles, playbooks. Use YAML formatting. Name every task.

Idempotency: prefer declarative modules over command/shell. Test with --check (dry run). Use version control.`,
            codeExample: {
                language: 'bash', code: `project/
├── ansible.cfg
├── inventory/
│   ├── production
│   └── staging
├── group_vars/
│   └── all.yml
├── roles/
└── playbooks/
    ├── site.yml
    └── deploy.yml` }
        }
    ],
    questions: [
        { question: 'What makes Ansible agentless?', answer: `Uses SSH (Linux) or WinRM (Windows) - no software installed on targets. Reduces maintenance, security footprint. Python required on targets for most modules.` },
        { question: 'Explain idempotency in Ansible.', answer: `Running playbook multiple times produces same result. Tasks check current state before acting. Modules designed to be idempotent. Avoids unintended changes.` },
        { question: 'What is the difference between a playbook and a role?', answer: `Playbook: YAML file with plays and tasks. Role: Reusable, organized collection of tasks, handlers, templates, vars. Roles promote reuse; playbooks orchestrate roles.` },
        { question: 'How do you handle secrets in Ansible?', answer: `Ansible Vault encrypts files/vars. Store in separate vault file. Use vault password file in CI/CD. Can encrypt single values with encrypt_string.` },
        { question: 'What are Ansible facts?', answer: `Auto-gathered host information (OS, IP, CPU, memory). Available as ansible_* variables. Disable with gather_facts: false. Custom facts in /etc/ansible/facts.d/.` },
        { question: 'Explain handlers vs tasks.', answer: `Tasks run in order every execution. Handlers run once at end when notified. Perfect for service restarts. Deduplicated - only runs once per play.` },
        { question: 'What is dynamic inventory?', answer: `Scripts or plugins generating inventory from external sources. Cloud plugins for AWS, GCP, Azure. Returns JSON. Keeps inventory in sync with cloud.` },
        { question: 'How do you test Ansible playbooks?', answer: `--check: Dry run, shows changes. --diff: Shows file changes. Molecule: Full testing framework with Docker. Lint with ansible-lint.` },
        { question: 'What is Ansible Galaxy?', answer: `Community hub for roles. Install with ansible-galaxy install. requirements.yml for dependencies. Can publish your own roles.` },
        { question: 'Explain variable precedence.', answer: `22 levels, lowest to highest: defaults → inventory vars → playbook vars → role vars → block vars → task vars → extra vars (-e). Extra vars always win.` },
        { question: 'What is the difference between include and import?', answer: `Import: Static, processed at parse time, cannot use loops. Include: Dynamic, processed at runtime, can loop. Import preferred unless dynamic needed.` },
        { question: 'How do you run tasks on specific hosts?', answer: `when: condition with ansible_hostname or groups. delegate_to for running on different host. run_once for single execution regardless of hosts.` },
        { question: 'What is Ansible Tower/AWX?', answer: `GUI and REST API for Ansible. RBAC, job scheduling, inventory management. Tower is paid; AWX is open-source upstream. Great for enterprise teams.` },
        { question: 'How do you optimize Ansible performance?', answer: `Pipelining in ansible.cfg. SSH multiplexing. Async for long tasks. serial for rolling deployments. Mitogen plugin for faster execution.` },
        { question: 'What are callback plugins?', answer: `Custom output handling. Change how results display. Built-in: json, yaml, minimal. Can send to external systems (Slack, logging).` }
    ]
};
