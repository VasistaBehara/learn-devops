const jsonData = {
    name: 'JSON',
    icon: '📋',
    description: 'JavaScript Object Notation - lightweight data interchange format for APIs, configuration, and data storage.',
    concepts: [
        {
            title: 'Basic Syntax',
            content: 'JSON uses key-value pairs in objects {} and ordered lists in arrays []. Keys must be double-quoted strings. No comments allowed.',
            codeExample: {
                language: 'json',
                code: `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}

// Arrays
{
  "colors": ["red", "green", "blue"],
  "numbers": [1, 2, 3, 4, 5]
}

// Nested structure
{
  "user": {
    "name": "John",
    "address": {
      "city": "New York",
      "zip": "10001"
    }
  }
}`
            }
        },
        {
            title: 'Data Types',
            content: 'JSON supports six data types: string, number, boolean, null, object, and array. No undefined, dates, functions, or comments.',
            codeExample: {
                language: 'json',
                code: `{
  "string": "Hello, World!",
  "integer": 42,
  "float": 3.14159,
  "negative": -100,
  "scientific": 1.0e+10,
  "boolean_true": true,
  "boolean_false": false,
  "null_value": null,
  "object": {
    "nested": "value"
  },
  "array": [1, "two", true, null],
  "array_of_objects": [
    {"id": 1, "name": "one"},
    {"id": 2, "name": "two"}
  ]
}`
            }
        },
        {
            title: 'String Escaping',
            content: 'Special characters in strings must be escaped with backslash. Includes quotes, backslash, and control characters.',
            codeExample: {
                language: 'json',
                code: `{
  "quote": "She said \\"Hello\\"",
  "backslash": "C:\\\\Users\\\\name",
  "newline": "Line 1\\nLine 2",
  "tab": "Column1\\tColumn2",
  "unicode": "Symbol: \\u00A9",
  "combined": "Path: C:\\\\data\\\\file.txt\\nStatus: OK"
}

// Escape sequences:
// \\"  - double quote
// \\\\  - backslash
// \\/  - forward slash
// \\b  - backspace
// \\f  - form feed
// \\n  - newline
// \\r  - carriage return
// \\t  - tab
// \\uXXXX - unicode`
            }
        },
        {
            title: 'JSON Schema',
            content: 'JSON Schema defines the structure and validation rules for JSON documents. Used for API documentation and validation.',
            codeExample: {
                language: 'json',
                code: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",
  "required": ["name", "email"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["admin", "user", "guest"]
      }
    }
  }
}`
            }
        },
        {
            title: 'jq Basics',
            content: 'jq is a command-line JSON processor. Filter, transform, and query JSON data. Essential for DevOps scripting.',
            codeExample: {
                language: 'bash',
                code: `# Basic selection
echo '{"name":"John"}' | jq '.name'
# Output: "John"

# Raw output (no quotes)
jq -r '.name'

# Array access
jq '.[0]'          # First element
jq '.[-1]'         # Last element
jq '.[2:5]'        # Slice

# Filter array
jq '.[] | select(.status == "active")'

# Multiple fields
jq '{name: .name, email: .email}'

# From file
jq '.users[] | .name' data.json

# Pretty print
cat ugly.json | jq .

# Compact output
jq -c . data.json`
            }
        },
        {
            title: 'jq Transformation',
            content: 'Transform JSON structure with jq. Create new objects, modify values, and reshape data.',
            codeExample: {
                language: 'bash',
                code: `# Transform objects
jq '.users | map({id, username: .name})'

# Add/modify fields
jq '.version = "2.0"'
jq '.timestamp = now'
jq '.users[0].active = true'

# Delete fields
jq 'del(.password)'
jq 'del(.users[].temp)'

# Conditional transformation
jq 'if .status == "active" then .enabled = true else . end'

# Mathematical operations
jq '.price * .quantity'
jq '.items | add'
jq '.numbers | length'

# String operations
jq '.name | ascii_downcase'
jq '".prefix_" + .id'

# Combine with shell variables
jq --arg name "$USER" '.user = $name'`
            }
        },
        {
            title: 'Working with APIs',
            content: 'JSON is the standard format for REST APIs. Parse responses and construct requests in JavaScript, Python, and shell.',
            codeExample: {
                language: 'bash',
                code: `# Fetch and parse with curl + jq
curl -s 'https://api.example.com/users' | jq '.[] | .name'

# POST JSON data
curl -X POST 'https://api.example.com/users' \\
  -H 'Content-Type: application/json' \\
  -d '{"name": "John", "email": "john@example.com"}'

# From file
curl -X POST 'https://api.example.com/data' \\
  -H 'Content-Type: application/json' \\
  -d @payload.json

# Extract specific fields from response
curl -s api.example.com/user/123 | jq '{
  id: .id,
  name: .profile.name,
  email: .contact.email
}'

# Handle pagination
for page in 1 2 3; do
  curl -s "api.example.com/items?page=$page" | jq '.items[]'
done`
            }
        },
        {
            title: 'JSON in JavaScript',
            content: 'JavaScript natively supports JSON with parse() and stringify(). Handle API responses and create request bodies.',
            codeExample: {
                language: 'javascript',
                code: `// Parse JSON string to object
const data = JSON.parse('{"name": "John", "age": 30}');
console.log(data.name); // "John"

// Convert object to JSON string
const obj = { name: "John", age: 30 };
const json = JSON.stringify(obj);
// '{"name":"John","age":30}'

// Pretty print
JSON.stringify(obj, null, 2);

// With replacer (filter/transform)
JSON.stringify(obj, ['name']); // Only name field
JSON.stringify(obj, (key, value) => 
  key === 'password' ? undefined : value
);

// Fetch API
const response = await fetch('/api/users');
const users = await response.json();

// POST request
await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
});`
            }
        },
        {
            title: 'JSON in Python',
            content: 'Python\'s json module handles JSON encoding and decoding. Works with dictionaries and custom objects.',
            codeExample: {
                language: 'python',
                code: `import json

# Parse JSON string
data = json.loads('{"name": "John", "age": 30}')
print(data['name'])  # John

# Convert to JSON string
obj = {'name': 'John', 'age': 30}
json_str = json.dumps(obj)

# Pretty print
print(json.dumps(obj, indent=2))

# Read from file
with open('data.json') as f:
    data = json.load(f)

# Write to file
with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)

# Custom encoder for dates
from datetime import datetime

class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

json.dumps({'date': datetime.now()}, cls=CustomEncoder)`
            }
        },
        {
            title: 'Common Patterns',
            content: 'Recognize common JSON patterns in APIs and configurations. Pagination, errors, nested resources, and metadata.',
            codeExample: {
                language: 'json',
                code: `// Paginated response
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "next_page": "/api/items?page=2"
  }
}

// Error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      {"field": "email", "message": "Invalid format"}
    ]
  }
}

// API envelope pattern
{
  "success": true,
  "data": { ... },
  "meta": {
    "request_id": "abc-123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}

// Configuration with defaults
{
  "database": {
    "host": "localhost",
    "port": 5432
  },
  "logging": {
    "level": "info",
    "format": "json"
  }
}`
            }
        }
    ],
    questions: [
        { question: 'What is JSON and what is it used for?', answer: `JSON (JavaScript Object Notation) is a lightweight text format for data exchange.
Used in APIs, configuration files, and data storage.
Language-independent, human-readable, widely supported.` },
        { question: 'What are the valid JSON data types?', answer: `Six types: string (double-quoted), number (integer or float), boolean (true/false), null, object (key-value pairs in {}), and array (ordered list in []).
No undefined, Date, or functions.` },
        { question: 'Why must JSON keys be quoted?', answer: `JSON spec requires double quotes around all keys for unambiguous parsing.
Unlike JavaScript objects which allow unquoted keys, JSON is strict for interoperability across languages.` },
        { question: 'Can JSON have comments?', answer: `No.
Standard JSON does not support comments.
Workarounds: use _comment keys, JSONC format (VS Code), or JSON5 extension.
When converting from YAML, comments are stripped.` },
        { question: 'What is the difference between JSON and YAML?', answer: `JSON: stricter syntax, no comments, more portable.
YAML: human-readable, supports comments, anchors, multi-line strings.
YAML is superset of JSON.
JSON better for APIs; YAML for config files.` },
        { question: 'How do you handle dates in JSON?', answer: `JSON has no date type.
Use ISO 8601 string format: "2024-01-15T10:30:00Z".
Parse to Date object in application code.
Some APIs use Unix timestamps (seconds since epoch).` },
        { question: 'What is JSON Schema?', answer: `JSON Schema defines structure and validation rules for JSON documents.
Specifies types, required fields, formats, ranges.
Used for API documentation (OpenAPI), form validation, and data validation.` },
        { question: 'What is jq and why is it useful?', answer: `jq is a command-line JSON processor.
Filter, transform, and query JSON.
Essential for DevOps: parse API responses, extract values in scripts, transform data.
Like sed/awk for JSON.` },
        { question: 'How do you extract nested values with jq?', answer: `Use dot notation: .user.address.city.
For arrays: .[0], .[], .[0:3].
Combine: .users[].name.
Pipe for chaining: .items | map(.name).
Use -r for raw string output.` },
        { question: 'What is JSON.stringify() used for?', answer: `JavaScript function converting objects to JSON strings.
Parameters: value, replacer (filter/transform), space (indentation).
Used for API requests, localStorage, debugging.
Handles nested objects.` },
        { question: 'What is JSON.parse() used for?', answer: `JavaScript function parsing JSON string to object.
Throws SyntaxError on invalid JSON.
Use try/catch for error handling.
Reviver function can transform values during parsing.` },
        { question: 'How do you pretty-print JSON?', answer: `JavaScript: JSON.stringify(obj, null, 2).
Python: json.dumps(obj, indent=2).
Command line: jq . file.json or python -m json.tool.
Most IDEs format JSON automatically.` },
        { question: 'What are common JSON mistakes?', answer: `Trailing commas (invalid), single quotes (must be double), unquoted keys, missing quotes on strings, comments, undefined values.
Use linters and validators to catch errors.` },
        { question: 'How do you merge JSON objects?', answer: `JavaScript: {...obj1, ...obj2} spread or Object.assign(). jq: input1 * input2.
Python: {**dict1, **dict2}.
Deep merge needs recursive logic or libraries.` },
        { question: 'What is JSONL/NDJSON?', answer: `JSON Lines: one JSON object per line, newline-separated.
No outer array wrapper.
Efficient for streaming, logs, and large datasets.
Each line is valid JSON independently.` }
    ]
};

export default jsonData;
