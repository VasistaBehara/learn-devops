import { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-hcl';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-docker';

function CodeBlock({ language, code }) {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Map language names
    const languageMap = {
        'hcl': 'hcl',
        'terraform': 'hcl',
        'tf': 'hcl',
        'bash': 'bash',
        'sh': 'bash',
        'shell': 'bash',
        'yaml': 'yaml',
        'yml': 'yaml',
        'json': 'json',
        'python': 'python',
        'py': 'python',
        'javascript': 'javascript',
        'js': 'javascript',
        'dockerfile': 'docker',
        'docker': 'docker'
    };

    const prismLanguage = languageMap[language?.toLowerCase()] || 'bash';

    return (
        <div className="code-block">
            <div className="code-header">
                <span className="code-language">{language || 'code'}</span>
                <button className="code-copy" onClick={handleCopy}>
                    {copied ? '✓ Copied!' : 'Copy'}
                </button>
            </div>
            <div className="code-content">
                <pre>
                    <code ref={codeRef} className={`language-${prismLanguage}`}>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
}

export default CodeBlock;
