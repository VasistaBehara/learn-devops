export default {
    id: 'linux',
    name: 'Linux',
    icon: '🐧',
    description: 'Open-source operating system essential for DevOps, servers, containers, and cloud infrastructure.',
    concepts: [
        {
            title: 'File System Hierarchy',
            content: `Linux follows FHS standard. Key directories: / (root), /bin (essential binaries), /etc (configs), /home (users), /var (variable data), /tmp (temporary), /usr (user programs), /opt (optional software).

Everything is a file. Symlinks, devices, sockets all represented as files.`,
            codeExample: {
                language: 'bash', code: `ls /                    # List root
tree -L 1 /             # Tree view
df -h                   # Disk usage
du -sh /var/log         # Directory size` }
        },
        {
            title: 'File Permissions',
            content: `Three permission types: read (r=4), write (w=2), execute (x=1). Three groups: owner, group, others. Octal notation: 755 = rwxr-xr-x.

chmod changes permissions. chown changes ownership. umask sets default permissions.`,
            codeExample: {
                language: 'bash', code: `chmod 755 script.sh     # rwxr-xr-x
chmod u+x file          # Add execute for owner
chown user:group file   # Change owner and group
ls -la                  # List with permissions` }
        },
        {
            title: 'Process Management',
            content: `Processes have PID. ps lists processes. top/htop for real-time. kill sends signals. Background with &, fg to foreground.

Daemons run in background. systemd manages services. nice/renice for priority.`,
            codeExample: {
                language: 'bash', code: `ps aux                  # All processes
ps aux | grep nginx     # Filter
top -c                  # Real-time with command
kill -9 PID             # Force kill
kill -15 PID            # Graceful termination
nohup ./script.sh &     # Run in background, persist` }
        },
        {
            title: 'systemd and Services',
            content: `systemd is init system and service manager. Units define services. systemctl controls services. journalctl reads logs.

Unit files in /etc/systemd/system/. Enable for boot start. Targets group services.`,
            codeExample: {
                language: 'bash', code: `systemctl status nginx       # Service status
systemctl start nginx        # Start service
systemctl enable nginx       # Start on boot
systemctl restart nginx      # Restart
journalctl -u nginx -f       # Follow logs
systemctl list-units --type=service` }
        },
        {
            title: 'Package Management',
            content: `apt/dpkg for Debian/Ubuntu. yum/dnf/rpm for RHEL/CentOS/Fedora. Package managers handle dependencies.

Repositories contain packages. Update package lists before installing. Lock files prevent conflicts.`,
            codeExample: {
                language: 'bash', code: `# Debian/Ubuntu
apt update && apt upgrade
apt install nginx
apt search nginx
apt remove nginx

# RHEL/CentOS
dnf update
dnf install nginx
dnf search nginx` }
        },
        {
            title: 'Networking',
            content: `ip command (replaces ifconfig). ss for sockets (replaces netstat). curl/wget for HTTP. DNS in /etc/resolv.conf. hosts in /etc/hosts.

iptables/nftables for firewall. Ports below 1024 require root.`,
            codeExample: {
                language: 'bash', code: `ip addr                     # Show interfaces
ip route                    # Show routing
ss -tulpn                   # Listening ports
netstat -tulpn              # Alternative
curl -I https://google.com  # HTTP headers
dig google.com              # DNS lookup
ping -c 4 google.com        # Connectivity test` }
        },
        {
            title: 'Text Processing',
            content: `grep searches text. sed for stream editing. awk for column processing. cut, sort, uniq, wc for manipulation.

Pipes (|) chain commands. Redirection: > overwrite, >> append, 2>&1 stderr to stdout.`,
            codeExample: {
                language: 'bash', code: `grep -r "error" /var/log/   # Recursive search
grep -i "warning" file      # Case insensitive
cat file | grep "pattern" | wc -l
awk '{print $1}' file       # First column
sed 's/old/new/g' file      # Replace
cat file | sort | uniq -c   # Count unique` }
        },
        {
            title: 'Shell Scripting',
            content: `Bash is default shell. Scripts start with shebang (#!/bin/bash). Variables, loops, conditionals, functions. Exit codes: 0 success, non-zero failure.

set -e exits on error. set -x for debugging. $? is last exit code.`,
            codeExample: {
                language: 'bash', code: `#!/bin/bash
set -euo pipefail

if [ -f "/path/file" ]; then
    echo "File exists"
fi

for i in {1..5}; do
    echo "Number: $i"
done

function greet() {
    echo "Hello, $1"
}
greet "World"` }
        },
        {
            title: 'SSH and Remote Access',
            content: `SSH for secure remote access. Key-based auth preferred over passwords. ssh-keygen creates keys. ssh-copy-id installs public key.

~/.ssh/config for aliases. scp/rsync for file transfer. ssh-agent for key management.`,
            codeExample: {
                language: 'bash', code: `ssh-keygen -t ed25519 -C "email@example.com"
ssh-copy-id user@server
ssh user@server
scp file.txt user@server:/path/
rsync -avz local/ user@server:/remote/

# ~/.ssh/config
Host myserver
    HostName 192.168.1.100
    User admin
    IdentityFile ~/.ssh/id_ed25519` }
        },
        {
            title: 'Disk and Storage',
            content: `lsblk lists block devices. fdisk/parted for partitioning. mkfs formats. mount attaches filesystems. /etc/fstab for permanent mounts.

LVM for flexible volume management. RAID for redundancy.`,
            codeExample: {
                language: 'bash', code: `lsblk                       # List block devices
df -h                       # Disk space
du -sh /var/*               # Directory sizes
mount /dev/sdb1 /mnt        # Mount device
umount /mnt                 # Unmount
fdisk -l                    # List partitions` }
        }
    ],
    questions: [
        { question: 'What is the difference between hard and soft links?', answer: `Hard link: Same inode, can't cross filesystems, survives original deletion. Soft (symbolic) link: Points to path, can cross filesystems, breaks if original deleted. Use ln -s for soft links.` },
        { question: 'Explain file permissions in Linux.', answer: `Three types: read (4), write (2), execute (1). Three groups: owner, group, others. Octal like 755 or symbolic like rwxr-xr-x. chmod changes, chown for ownership.` },
        { question: 'What is the difference between kill -9 and kill -15?', answer: `kill -15 (SIGTERM): Graceful, process can cleanup. kill -9 (SIGKILL): Force, immediate, no cleanup. Always try -15 first. -9 can leave resources locked.` },
        { question: 'How does systemd differ from init?', answer: `systemd: Parallel startup, socket activation, cgroups, journal logging. init (SysV): Sequential, scripts in /etc/init.d. systemd is faster, more features. Most modern distros use systemd.` },
        { question: 'What are inodes?', answer: `Data structures storing file metadata (permissions, owner, timestamps, block locations). Filename stored in directory, points to inode. Limited per filesystem. df -i shows usage.` },
        { question: 'Explain stdout, stderr, and stdin.', answer: `stdin (0): Standard input. stdout (1): Standard output. stderr (2): Error output. Redirect: > stdout, 2> stderr, &> both. Pipe | connects stdout to stdin.` },
        { question: 'What is the purpose of /etc/fstab?', answer: `Defines filesystems to mount at boot. Columns: device, mount point, type, options, dump, pass. Errors can prevent boot. Always test with mount -a.` },
        { question: 'How do you troubleshoot high CPU usage?', answer: `top/htop to identify process. ps aux --sort=-%cpu. Check with strace. Profile with perf. Review logs. May need to kill, restart, or optimize process.` },
        { question: 'Explain the boot process.', answer: `BIOS/UEFI → Bootloader (GRUB) → Kernel → init/systemd → Services. Kernel mounts root filesystem, starts init (PID 1). systemd starts services in parallel.` },
        { question: 'What is swap and when is it used?', answer: `Virtual memory on disk. Used when RAM full. Slower than RAM. Important for stability. Configure with /etc/fstab or swap file. swapon/swapoff to manage.` },
        { question: 'How do you check open ports?', answer: `ss -tulpn or netstat -tulpn. lsof -i :port for specific. nmap for external scan. Check firewall rules too. iptables -L or firewall-cmd --list-all.` },
        { question: 'What is cron and how do you use it?', answer: `Scheduled task execution. Crontab format: min hour day month weekday command. crontab -e to edit. System cron in /etc/cron.d/. Log in /var/log/cron.` },
        { question: 'Explain environment variables.', answer: `Key-value pairs affecting processes. export VAR=value to set. /etc/environment, ~/.bashrc for persistence. env to list. PATH for command lookup.` },
        { question: 'How do you diagnose network issues?', answer: `ping for connectivity. traceroute for path. dig/nslookup for DNS. curl for HTTP. ss for sockets. tcpdump/wireshark for packets. Check /etc/resolv.conf, firewall.` },
        { question: 'What is the difference between apt and dpkg?', answer: `dpkg: Low-level, installs .deb files, no dependency resolution. apt: High-level, uses repositories, handles dependencies. Use apt for normal operations, dpkg for manual installs.` }
    ]
};
