const bashData = {
    name: 'Bash/Shell Scripting',
    icon: '💻',
    description: 'Essential shell scripting skills for automation, system administration, and DevOps workflows.',
    concepts: [
        {
            title: 'Variables and Data Types',
            content: 'Bash variables are untyped by default. Use $var or ${var} to reference. Declare with readonly, local, or export for different scopes. Arrays use parentheses syntax.',
            codeExample: {
                language: 'bash',
                code: `# Basic variables
NAME="John"
AGE=25
echo "Hello, $NAME"

# Read-only and exported
readonly CONSTANT="value"
export PATH="/usr/local/bin:$PATH"

# Arrays
FRUITS=("apple" "banana" "orange")
echo \${FRUITS[0]}        # First element
echo \${FRUITS[@]}        # All elements
echo \${#FRUITS[@]}       # Array length`
            }
        },
        {
            title: 'Conditionals',
            content: 'Use if/elif/else with test conditions. Test with [ ] or [[ ]]. [[ ]] supports regex and is more flexible. Use && and || for short-circuit evaluation.',
            codeExample: {
                language: 'bash',
                code: `# Basic if statement
if [[ -f "/etc/passwd" ]]; then
    echo "File exists"
elif [[ -d "/etc" ]]; then
    echo "Directory exists"
else
    echo "Not found"
fi

# String comparison
if [[ "$NAME" == "John" ]]; then
    echo "Hello John"
fi

# Numeric comparison
if [[ $AGE -gt 18 ]]; then
    echo "Adult"
fi

# Short-circuit
[[ -f "file.txt" ]] && echo "exists" || echo "not found"`
            }
        },
        {
            title: 'Loops',
            content: 'For loops iterate over lists, ranges, or command output. While loops run until condition is false. Until loops run until condition is true.',
            codeExample: {
                language: 'bash',
                code: `# For loop with list
for fruit in apple banana orange; do
    echo "$fruit"
done

# For loop with range
for i in {1..5}; do
    echo "Number: $i"
done

# C-style for loop
for ((i=0; i<5; i++)); do
    echo "$i"
done

# While loop
count=0
while [[ $count -lt 5 ]]; do
    echo "$count"
    ((count++))
done

# Loop through files
for file in *.txt; do
    echo "Processing $file"
done`
            }
        },
        {
            title: 'Functions',
            content: 'Functions group reusable code. Arguments accessed via $1, $2, etc. Return values via echo or return code. Local variables with local keyword.',
            codeExample: {
                language: 'bash',
                code: `# Define function
greet() {
    local name="$1"
    echo "Hello, $name!"
}

# Call function
greet "World"

# Return values
add() {
    local result=$(( $1 + $2 ))
    echo "$result"
}

sum=$(add 5 3)
echo "Sum: $sum"

# Check return code
validate() {
    [[ -n "$1" ]] && return 0 || return 1
}

if validate "test"; then
    echo "Valid"
fi`
            }
        },
        {
            title: 'Input/Output Redirection',
            content: 'Redirect stdout (>), stderr (2>), or both (&>). Append with >>. Pipe output with |. Here documents for multi-line input.',
            codeExample: {
                language: 'bash',
                code: `# Redirect stdout to file
echo "Hello" > output.txt

# Append to file
echo "World" >> output.txt

# Redirect stderr
command 2> errors.log

# Redirect both
command &> all.log
command > out.log 2>&1  # Alternative

# Pipe output
cat file.txt | grep "pattern" | wc -l

# Here document
cat << EOF
This is a
multi-line
string
EOF

# Here string
grep "pattern" <<< "search in this string"`
            }
        },
        {
            title: 'Command Substitution',
            content: 'Execute commands and capture output. Use $(command) syntax (preferred) or backticks. Can be nested.',
            codeExample: {
                language: 'bash',
                code: `# Command substitution
TODAY=$(date +%Y-%m-%d)
FILES=$(ls -1 | wc -l)

echo "Date: $TODAY"
echo "Files: $FILES"

# Nested substitution
DIR_SIZE=$(du -sh $(pwd) | cut -f1)

# In strings
echo "Current user: $(whoami)"
echo "Hostname: $(hostname)"

# Arithmetic
RESULT=$((5 + 3))
DOUBLE=$((RESULT * 2))`
            }
        },
        {
            title: 'String Manipulation',
            content: 'Bash provides built-in string operations: length, substring, replacement, and pattern matching without external commands.',
            codeExample: {
                language: 'bash',
                code: `STRING="Hello World"

# Length
echo \${#STRING}  # 11

# Substring
echo \${STRING:0:5}   # Hello
echo \${STRING:6}     # World

# Replacement
echo \${STRING/World/Bash}  # Hello Bash
echo \${STRING//l/L}        # HeLLo WorLd (all)

# Remove prefix/suffix
FILE="document.tar.gz"
echo \${FILE%.gz}      # document.tar (shortest)
echo \${FILE%%.*}      # document (longest)
echo \${FILE#*.}       # tar.gz (shortest from start)
echo \${FILE##*.}      # gz (longest from start)

# Default values
echo \${UNDEFINED:-default}   # Use default if unset
echo \${UNDEFINED:=default}   # Set default if unset`
            }
        },
        {
            title: 'Exit Codes and Error Handling',
            content: 'Exit codes indicate success (0) or failure (non-zero). Use set options for robust scripts. Trap signals for cleanup.',
            codeExample: {
                language: 'bash',
                code: `#!/bin/bash
set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Check last exit code
if ! command; then
    echo "Command failed with code $?"
    exit 1
fi

# Trap for cleanup
cleanup() {
    echo "Cleaning up..."
    rm -f /tmp/tempfile
}
trap cleanup EXIT
trap 'echo "Interrupted"; exit 1' INT TERM

# Custom exit code
validate_input() {
    [[ -z "$1" ]] && exit 1
    return 0
}

# Error function
die() {
    echo "ERROR: $1" >&2
    exit 1
}

[[ -f "required.txt" ]] || die "File not found"`
            }
        },
        {
            title: 'Process Management',
            content: 'Run commands in background with &. Use jobs, fg, bg to manage. Wait for background processes. Use nohup for persistent processes.',
            codeExample: {
                language: 'bash',
                code: `# Background process
long_running_task &
PID=$!
echo "Started PID: $PID"

# Wait for completion
wait $PID
echo "Task completed with exit code: $?"

# Multiple background jobs
for i in {1..5}; do
    process_file "$i" &
done
wait  # Wait for all

# Check if process running
if kill -0 $PID 2>/dev/null; then
    echo "Process still running"
fi

# Run detached from terminal
nohup ./script.sh > output.log 2>&1 &

# Process substitution
diff <(sort file1.txt) <(sort file2.txt)`
            }
        },
        {
            title: 'Regular Expressions',
            content: 'Use =~ operator in [[ ]] for regex matching. BASH_REMATCH array captures groups. grep, sed, and awk for external regex.',
            codeExample: {
                language: 'bash',
                code: `# Regex match in bash
EMAIL="user@example.com"
if [[ $EMAIL =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
    echo "Valid email"
fi

# Capture groups
VERSION="v1.2.3"
if [[ $VERSION =~ v([0-9]+)\.([0-9]+)\.([0-9]+) ]]; then
    MAJOR=\${BASH_REMATCH[1]}
    MINOR=\${BASH_REMATCH[2]}
    PATCH=\${BASH_REMATCH[3]}
    echo "Major: $MAJOR, Minor: $MINOR, Patch: $PATCH"
fi

# With grep
grep -E "^[0-9]{3}-[0-9]{4}$" phones.txt

# With sed
echo "hello world" | sed 's/world/bash/'`
            }
        },
        {
            title: 'File Testing',
            content: 'Test operators check file existence, type, permissions, and comparisons. Essential for safe file operations.',
            codeExample: {
                language: 'bash',
                code: `# File existence and type
[[ -e "$file" ]]  # Exists
[[ -f "$file" ]]  # Regular file
[[ -d "$dir" ]]   # Directory
[[ -L "$link" ]]  # Symbolic link
[[ -s "$file" ]]  # Non-empty file

# Permissions
[[ -r "$file" ]]  # Readable
[[ -w "$file" ]]  # Writable
[[ -x "$file" ]]  # Executable

# Comparisons
[[ "$file1" -nt "$file2" ]]  # Newer than
[[ "$file1" -ot "$file2" ]]  # Older than
[[ "$file1" -ef "$file2" ]]  # Same file (hard link)

# Practical usage
if [[ -f "$CONFIG" && -r "$CONFIG" ]]; then
    source "$CONFIG"
else
    echo "Config not readable"
fi`
            }
        },
        {
            title: 'Text Processing with AWK',
            content: 'AWK is a powerful text processing tool. Process files line by line, split fields, perform calculations, and format output.',
            codeExample: {
                language: 'bash',
                code: `# Print specific columns
awk '{print $1, $3}' file.txt

# Field separator
awk -F',' '{print $2}' data.csv

# Pattern matching
awk '/error/ {print $0}' log.txt

# Calculations
awk '{sum += $1} END {print "Total:", sum}' numbers.txt

# Conditional processing
awk '$3 > 100 {print $1, $3}' sales.txt

# Built-in variables
awk '{print NR": "$0}' file.txt  # Line numbers
awk 'END {print NR" lines"}' file.txt

# Complex example
ps aux | awk '$3 > 50 {print $2, $11, $3"%"}'`
            }
        },
        {
            title: 'Text Processing with SED',
            content: 'SED (Stream Editor) transforms text streams. Find and replace, delete lines, insert text, and perform in-place editing.',
            codeExample: {
                language: 'bash',
                code: `# Basic substitution
sed 's/old/new/' file.txt        # First occurrence
sed 's/old/new/g' file.txt       # All occurrences

# In-place editing
sed -i 's/old/new/g' file.txt
sed -i.bak 's/old/new/g' file.txt  # With backup

# Delete lines
sed '/pattern/d' file.txt        # Contains pattern
sed '5d' file.txt                # Line 5
sed '1,3d' file.txt              # Lines 1-3

# Insert and append
sed '2i\\New line before' file.txt
sed '2a\\New line after' file.txt

# Multiple operations
sed -e 's/foo/bar/g' -e 's/baz/qux/g' file.txt

# Address ranges
sed '10,20s/old/new/g' file.txt  # Lines 10-20`
            }
        },
        {
            title: 'Arrays and Associative Arrays',
            content: 'Bash supports indexed arrays and associative arrays (dictionaries). Useful for managing collections of related data.',
            codeExample: {
                language: 'bash',
                code: `# Indexed array
declare -a SERVERS=("web1" "web2" "db1")
SERVERS+=("cache1")  # Append

# Iterate
for server in "\${SERVERS[@]}"; do
    echo "Server: $server"
done

# Indices
echo "\${!SERVERS[@]}"  # 0 1 2 3

# Associative array (dictionary)
declare -A CONFIG
CONFIG[host]="localhost"
CONFIG[port]="8080"
CONFIG[env]="production"

echo \${CONFIG[host]}

# Iterate associative array
for key in "\${!CONFIG[@]}"; do
    echo "$key: \${CONFIG[$key]}"
done

# Check if key exists
[[ -v CONFIG[host] ]] && echo "Key exists"`
            }
        },
        {
            title: 'Command Line Arguments',
            content: 'Access script arguments with positional parameters. Use getopts for option parsing. Shift moves through arguments.',
            codeExample: {
                language: 'bash',
                code: `#!/bin/bash
# $0 = script name, $1-$9 = arguments
# $# = number of args, $@ = all args
# $* = all args as single string

echo "Script: $0"
echo "First arg: $1"
echo "All args: $@"
echo "Count: $#"

# Getopts for options
while getopts ":f:v" opt; do
    case $opt in
        f) FILE="$OPTARG" ;;
        v) VERBOSE=true ;;
        \\?) echo "Invalid option: -$OPTARG" >&2 ;;
    esac
done
shift $((OPTIND-1))  # Remaining args

# Long options with getopt
OPTS=$(getopt -o f:vh --long file:,verbose,help -- "$@")
eval set -- "$OPTS"

while true; do
    case "$1" in
        -f|--file) FILE="$2"; shift 2 ;;
        -v|--verbose) VERBOSE=true; shift ;;
        -h|--help) usage; exit 0 ;;
        --) shift; break ;;
    esac
done`
            }
        },
        {
            title: 'Debug Mode',
            content: 'Debug bash scripts with set options and tracing. Identify issues with variable values and command execution flow.',
            codeExample: {
                language: 'bash',
                code: `#!/bin/bash

# Enable debug mode
set -x  # Print commands before execution
set -v  # Print lines as read

# Selective debugging
set -x
problematic_section
set +x

# Or run with debug
# bash -x script.sh

# Debug trap
trap 'echo "DEBUG: Line $LINENO: $BASH_COMMAND"' DEBUG

# Print variable values
echo "DEBUG: VAR=$VAR" >&2

# Check syntax without running
bash -n script.sh

# Verbose mode in script
if [[ "$VERBOSE" == true ]]; then
    set -x
fi

# PS4 for custom debug prefix
export PS4='+(\${BASH_SOURCE}:\${LINENO}): '`
            }
        },
        {
            title: 'Working with JSON (jq)',
            content: 'jq is a powerful JSON processor. Parse, filter, and transform JSON data from APIs and config files.',
            codeExample: {
                language: 'bash',
                code: `# Parse JSON
echo '{"name":"John"}' | jq '.name'

# API response
curl - s api.example.com / users | jq '.[] | .email'

# Filter and format
jq '.items[] | select(.status=="active") | {name, id}' data.json

# Modify JSON
jq '.version = "2.0"' config.json

# Create JSON
jq - n--arg name "$NAME" '{"user": $name}'

# Read into variables
read - r name email << < $(jq - r '.name, .email' user.json)

# Array operations
jq '.servers | length' config.json
jq '.servers[0]' config.json
jq '.servers | map(.host)' config.json

# Combine with shell
for id in $(jq - r '.users[].id' users.json); do
    echo "Processing user: $id"
done`
            }
        },
        {
            title: 'Networking',
            content: 'Bash can interact with network services using curl, wget, netcat, and built-in /dev/tcp. Useful for health checks and API calls.',
            codeExample: {
                language: 'bash',
                code: `# HTTP requests with curl
curl - s https://api.example.com/data
        curl -X POST - d '{"key":"value"}' - H "Content-Type: application/json" url

# Download files
wget - q https://example.com/file.tar.gz
curl - O https://example.com/file.tar.gz

# Check port connectivity
nc - zv localhost 8080
timeout 5 bash - c 'cat < /dev/null > /dev/tcp/localhost/8080' && echo "Open"

# Health check loop
until curl - sf http://localhost:8080/health; do
    echo "Waiting for service..."
    sleep 2
done

# SSH commands
ssh user @host 'command to run'
ssh - o StrictHostKeyChecking = no user @host

# SCP file transfer
scp file.txt user @host: /path/
scp - r directory / user@host: /path/`
            }
        },
        {
            title: 'Parallelism',
            content: 'Run commands in parallel for faster execution. Use background processes, xargs, or GNU parallel for concurrent operations.',
            codeExample: {
                language: 'bash',
                code: `# Background processes with limit
MAX_JOBS = 4
for file in *.txt; do
    ((i = i % MAX_JOBS)); ((i++ == 0)) && wait
    process_file "$file" &
    done
wait

# xargs parallel
find. - name "*.log" | xargs - P4 - I{ } gzip { }

# GNU parallel(if installed)
    parallel - j4 process_file { } ::: *.txt

# Process list in parallel
cat servers.txt | xargs - P10 - I{ } ssh { } 'hostname'

# With job control
job_queue() {
    while [[$(jobs - r | wc - l) - ge $MAX_JOBS]]; do
        sleep 0.1
    done
}

for task in "\${TASKS[@]}"; do
    job_queue
    process "$task" &
    done
wait`
            }
        },
        {
            title: 'Script Best Practices',
            content: 'Write maintainable, portable, and secure scripts. Use shellcheck, proper quoting, and defensive coding.',
            codeExample: {
                language: 'bash',
                code: `#!/usr/bin / env bash
# ^ Use env for portability

# Strict mode
set - euo pipefail
IFS = $'\\n\\t'

# Constants in uppercase
readonly SCRIPT_DIR = "$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
readonly LOG_FILE = "/var/log/script.log"

# Functions before main code
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee - a "$LOG_FILE"
}

# Always quote variables
file = "$1"
[[-f "$file"]] || exit 1

# Use[[]] over[]
# Use $() over backticks
# Use printf over echo for complex output

# Main function pattern
main() {
    log "Starting script"
    # Script logic here
    log "Completed"
}

main "$@"

# Validate with: shellcheck script.sh`
            }
        }
    ],
    questions: [
        { question: 'What does set -euo pipefail do?', answer: `-e: exit on error, -u: error on undefined variables, -o pipefail: pipeline fails if any command fails.
These options make scripts fail fast instead of silently continuing with errors.` },
        { question: 'What is the difference between $@ and $*?', answer: `$@ expands to separate quoted arguments ("$1" "$2"), preserving spaces in args. $* expands to a single string.
In loops, always use "$@" to handle arguments with spaces correctly.` },
        { question: 'How do you handle spaces in filenames?', answer: `Always quote variables: "$file".
Use find with -print0 and xargs with -0.
Set IFS carefully.
Use arrays instead of string splitting.
Avoid for file in $(ls).` },
        { question: 'What is the difference between [ ] and [[ ]]?', answer: '[[ ]] is bash-specific, supports regex (=~), pattern matching, and doesn\'t require quoting variables. [ ] is POSIX but needs careful quoting and escaping.' },
        { question: 'How do you debug a bash script?', answer: `Use set -x for command tracing, set -v for line printing.
Run with bash -x script.sh.
Use trap for debugging.
Check syntax with bash -n.
Use shellcheck for static analysis.` },
        { question: 'What is the difference between sourcing and executing a script?', answer: `Executing (./script.sh) runs in a subshell; changes don't affect parent.
Sourcing (source script.sh or . script.sh) runs in current shell; environment changes persist.
Use source for configs.` },
        { question: 'How do you pass and return values from functions?', answer: `Pass arguments positionally ($1, $2).
Return values via echo and capture with $().
Return codes indicate success/failure (0-255).
Don't use return for data, only status codes.` },
        { question: 'What is a here document?', answer: `Here documents (<<EOF...EOF) provide multi-line input to commands. <<-EOF allows indentation. <<"EOF" prevents variable expansion.
Useful for embedded content, SQL, templates.` },
        { question: 'How do you handle signals in bash?', answer: `Use trap to catch signals: trap cleanup EXIT for cleanup on exit, trap handler SIGINT for Ctrl+C.
Common signals: INT, TERM, HUP, EXIT, ERR.
Trap ERR with set -e for custom error handling.` },
        { question: 'What is process substitution?', answer: `Process substitution <(command) creates a pseudo-file from command output.
Useful when a program requires file input: diff <(sort file1) <(sort file2). >(command) pipes to a process.` },
        { question: 'How do you parse command line arguments?', answer: `Use getopts for short options, getopt for long options.
Access positional args with $1, $2.
Use shift to iterate. $# counts arguments.
Always validate required arguments.` },
        { question: 'What is the difference between && and ;?', answer: `&& runs next command only if previous succeeded (exit 0). ; runs next command regardless of previous result.
Use && for dependent commands, ; for independent.` },
        { question: 'How do you make a script portable?', answer: `Use #!/usr/bin/env bash.
Stick to POSIX when possible.
Check for command availability.
Avoid bash-specific features for /bin/sh.
Test on target systems.
Use printf over echo.` },
        { question: 'What is command substitution?', answer: `$(command) or backticks execute command and substitute output.
Use $() as it's nestable and clearer.
Examples: TODAY=$(date), FILES=$(ls *.txt | wc -l).` },
        { question: 'How do you handle errors in bash?', answer: `Use set -e to exit on errors.
Check $? for last exit code.
Use || for fallback commands.
Use trap ERR for custom handlers.
Validate inputs early.
Use die functions for consistent error messages.` },
        { question: 'What are the best practices for bash scripts?', answer: `Use set -euo pipefail.
Quote all variables.
Use functions.
Add comments and usage docs.
Use shellcheck.
Use meaningful variable names.
Handle cleanup with trap.
Validate inputs.
Use version control.` },
        { question: 'How do you work with JSON in bash?', answer: `Use jq for JSON parsing and manipulation. jq -r for raw output.
Combine with curl for API work.
Use --arg to pass shell variables.
Can create, filter, and transform JSON.` },
        { question: 'What is the difference between local and global variables?', answer: `local variables exist only within a function and don't affect outer scope.
Without local, variables are global.
Always use local in functions to avoid side effects and naming conflicts.` },
        { question: 'How do you run commands in parallel?', answer: `Use & to background processes. wait for completion. xargs -P for parallel processing.
GNU parallel for advanced needs.
Limit concurrent jobs to avoid resource exhaustion.` },
        { question: 'What is shellcheck and why use it?', answer: `Shellcheck is a static analysis tool that finds bugs, portability issues, and style problems in shell scripts.
It catches quoting errors, undefined variables, and common pitfalls.
Essential for CI/CD.` }
    ]
};

export default bashData;
