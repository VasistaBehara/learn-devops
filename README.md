# DevOps Learning Hub 🚀

A modern, interactive web application for learning DevOps tools and preparing for technical interviews. Built with React and Vite.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **8 DevOps Learning Paths**: AWS, GCP, Azure, Terraform, Ansible, Git, Docker, Kubernetes
- **Comprehensive Content**: 80+ key concepts with code examples
- **Interview Preparation**: 120+ Q&As with detailed answers
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

## Tech Stack

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Vite 5** - Build tool
- **Prism.js** - Syntax highlighting
- **CSS Custom Properties** - Theming

## Adding Content

Edit files in `src/data/` to add or modify content:

```javascript
// src/data/toolname.js
export default {
  id: 'toolname',
  name: 'Tool Name',
  icon: '🔧',
  concepts: [
    {
      title: 'Concept Title',
      content: 'Explanation...',
      codeExample: { language: 'bash', code: '...' }
    }
  ],
  questions: [
    { question: 'Question?', answer: 'Answer...' }
  ]
};
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning and development.
