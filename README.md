# DevOps Learning Hub 🚀

A modern, interactive web application for learning DevOps tools and preparing for technical interviews. Built with React and Vite.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **13 DevOps Learning Paths**: AWS, GCP, Azure, Terraform, Ansible, Git, Docker, Kubernetes, Jenkins, GitLab, GitHub Actions, Linux, SRE
- **Comprehensive Content**: 150+ key concepts with code examples
- **Interview Preparation**: 210+ Q&As with detailed answers
- **Dark Mode**: Toggle between light and dark themes
- **Search**: Filter concepts and questions within each tool
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Syntax Highlighting**: Beautiful code examples with Prism.js

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/learn-devops.git
cd learn-devops

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React context (theme)
├── data/             # Tool content (concepts, Q&As)
├── pages/            # Page components
├── App.jsx           # Main app with routing
├── App.css           # Component styles
└── index.css         # Global styles & theme
```

---

## 📝 How to Add/Edit Content Manually

### Adding Concepts to an Existing Tool

1. Open the tool's data file in `src/data/` (e.g., `aws.js`, `docker.js`)
2. Find the `concepts` array and add a new object:

```javascript
{
  title: 'Your Concept Title',
  content: `Explanation of the concept. Can be multiple paragraphs.

Use backticks for multi-line content. Second paragraph here.`,
  codeExample: {
    language: 'bash',  // bash, yaml, python, javascript, json, etc.
    code: `your code example here
can be multiple lines`
  }
}
```

### Adding Interview Q&As

1. Find the `questions` array in the same data file
2. Add a new object:

```javascript
{
  question: 'Your interview question?',
  answer: `The detailed answer. Can include multiple paragraphs.

Include key points and practical examples.`
}
```

### ⚠️ Important: Escaping Special Characters

When using template literals (backticks), you MUST escape:
- Dollar signs in shell/CI variables: `\$VARIABLE` instead of `$VARIABLE`
- GitHub Actions expressions: `\${{ }}` instead of `${{ }}`

Example:
```javascript
// ❌ WRONG - will cause JavaScript errors
code: `echo $HOME`
code: `key: ${{ secrets.TOKEN }}`

// ✅ CORRECT - escaped
code: `echo \\$HOME`
code: `key: \\${{ secrets.TOKEN }}`
```

### Adding a New Tool

1. Create a new file `src/data/newtool.js`:

```javascript
export default {
  id: 'newtool',           // URL-friendly ID (lowercase, no spaces)
  name: 'New Tool Name',   // Display name
  icon: '🔧',              // Emoji icon
  description: 'Brief description of the tool.',
  concepts: [
    // Add 10-20 concepts here
  ],
  questions: [
    // Add 15-25 Q&As here
  ]
};
```

2. Import in `src/pages/ToolPage.jsx`:

```javascript
import newtoolData from '../data/newtool';

const toolsData = {
  // ... existing tools
  newtool: newtoolData,
};
```

3. Add to navigation in `src/components/Sidebar.jsx`:

```javascript
const tools = [
  // ... existing tools
  { id: 'newtool', name: 'New Tool', icon: '🔧' },
];
```

4. Add to homepage in `src/pages/HomePage.jsx`:

```javascript
const tools = [
  // ... existing tools
  {
    id: 'newtool',
    name: 'New Tool Name',
    icon: '🔧',
    description: 'Brief description here.',
    conceptCount: 10,      // Update with actual count
    questionCount: 15,     // Update with actual count
    color: '#hexcolor'     // Brand color
  }
];
```

5. Update stats in `HomePage.jsx` hero section if needed.

---

## Tech Stack

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Vite 5** - Build tool
- **Prism.js** - Syntax highlighting
- **CSS Custom Properties** - Theming

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning and development.
