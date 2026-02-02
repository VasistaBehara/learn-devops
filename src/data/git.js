export default {
    id: 'git',
    name: 'Git',
    icon: '📚',
    description: 'Distributed version control system for tracking changes in source code during development.',
    concepts: [
        {
            title: 'Git Basics',
            content: `Git is a distributed VCS. Each clone has full history. Three areas: Working directory, Staging (index), Repository.

Commits are snapshots with parent references forming a DAG. Branches are lightweight pointers to commits.`,
            codeExample: {
                language: 'bash', code: `git init                  # Initialize repo
git clone <url>           # Clone remote
git add .                 # Stage changes
git commit -m "message"   # Commit staged
git status                # Check state
git log --oneline         # View history` }
        },
        {
            title: 'Branching Strategies',
            content: `Branches isolate development. Popular strategies: GitFlow (develop, feature, release, hotfix), GitHub Flow (main + feature branches), Trunk-Based (main with short-lived branches).

Fast-forward merges keep linear history. Merge commits show branch integration.`,
            codeExample: {
                language: 'bash', code: `git branch feature/login   # Create branch
git checkout feature/login # Switch branch (or git switch)
git checkout -b feature/x  # Create and switch
git branch -d feature/x    # Delete merged branch
git branch -D feature/x    # Force delete` }
        },
        {
            title: 'Merging',
            content: `Combines branches. Fast-forward if no divergence. Three-way merge creates merge commit. Recursive strategy handles complex cases.

Resolve conflicts manually: edit files, git add, git commit. Use mergetool for GUI resolution.`,
            codeExample: {
                language: 'bash', code: `git checkout main
git merge feature/login     # Merge feature into main
git merge --no-ff feature/x # Force merge commit
git merge --abort           # Cancel merge with conflicts` }
        },
        {
            title: 'Rebasing',
            content: `Replays commits on new base. Creates linear history. Interactive rebase (rebase -i) for editing, squashing, reordering commits.

Never rebase shared/pushed branches. Use for cleaning local history before push.`,
            codeExample: {
                language: 'bash', code: `git checkout feature
git rebase main           # Rebase feature onto main
git rebase -i HEAD~3      # Interactive: last 3 commits
git rebase --continue     # After resolving conflicts
git rebase --abort        # Cancel rebase` }
        },
        {
            title: 'Remote Operations',
            content: `Remotes are remote repo references. origin is default. Fetch downloads without merging. Pull = fetch + merge (or rebase with --rebase).

Push uploads local commits. Upstream tracking links local to remote branches.`,
            codeExample: {
                language: 'bash', code: `git remote add origin <url>
git fetch origin            # Download changes
git pull origin main        # Fetch and merge
git push origin main        # Upload commits
git push -u origin feature  # Push and set upstream` }
        },
        {
            title: 'Stashing',
            content: `Temporarily saves uncommitted changes. Useful for switching context without committing WIP. Stack of stashes (LIFO).

Pop applies and removes. Apply keeps stash. Drop removes without applying.`,
            codeExample: {
                language: 'bash', code: `git stash                # Stash changes
git stash list           # List stashes
git stash pop            # Apply and remove latest
git stash apply stash@{1} # Apply specific stash
git stash drop stash@{0}  # Remove stash` }
        },
        {
            title: 'Resetting & Reverting',
            content: `Reset moves HEAD and optionally changes staging/working dir. Soft: keep changes staged. Mixed: unstage. Hard: discard all.

Revert creates new commit undoing changes. Safe for shared history.`,
            codeExample: {
                language: 'bash', code: `git reset --soft HEAD~1   # Undo commit, keep staged
git reset --mixed HEAD~1  # Undo commit, unstage
git reset --hard HEAD~1   # Undo commit, discard changes
git revert <commit>       # Create undo commit` }
        },
        {
            title: 'Cherry-Pick',
            content: `Applies specific commits to current branch. Creates new commit with same changes. Useful for hotfixes or selective backports.

Can cherry-pick range: A..B (exclusive of A). Use -x to record source commit in message.`,
            codeExample: {
                language: 'bash', code: `git cherry-pick abc123     # Apply single commit
git cherry-pick A..B       # Apply range
git cherry-pick -n abc123  # Apply without committing
git cherry-pick --abort    # Cancel cherry-pick` }
        },
        {
            title: 'Git Hooks',
            content: `Scripts triggered by Git events. Client-side: pre-commit, commit-msg, pre-push. Server-side: pre-receive, post-receive.

.git/hooks/ directory. Use for linting, testing, enforcing conventions. husky popular for npm projects.`,
            codeExample: {
                language: 'bash', code: `# .git/hooks/pre-commit
#!/bin/sh
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed"
  exit 1
fi` }
        },
        {
            title: 'Tags',
            content: `Mark specific commits. Lightweight (just pointer) or annotated (full object with message). Used for releases.

Push tags explicitly: git push --tags or git push origin v1.0.`,
            codeExample: {
                language: 'bash', code: `git tag v1.0              # Lightweight tag
git tag -a v1.0 -m "Release" # Annotated tag
git tag -a v1.0 abc123    # Tag specific commit
git push origin v1.0      # Push single tag
git push --tags           # Push all tags` }
        }
    ],
    questions: [
        { question: 'What is the difference between merge and rebase?', answer: `Merge: Combines branches with merge commit, preserves history.
Rebase: Replays commits on new base, linear history.
Use merge for shared branches, rebase for local cleanup.` },
        { question: 'Explain git reset vs git revert.', answer: `Reset: Moves HEAD, rewrites history, dangerous for shared commits.
Revert: Creates new commit undoing changes, safe for shared history.
Use revert for pushed commits.` },
        { question: 'What is a detached HEAD?', answer: `HEAD points to commit instead of branch.
Changes won't be on any branch.
Create branch to save work: git checkout -b new-branch.
Common when checking out tags/commits.` },
        { question: 'How do you resolve merge conflicts?', answer: `Git marks conflicts in files.
Edit to keep desired changes.
Remove conflict markers.
Stage (git add) resolved files.
Complete with git commit.
Use mergetool for GUI.` },
        { question: 'What is git stash used for?', answer: `Temporarily saves uncommitted changes.
Allows switching branches without losing work.
Stack-based (LIFO).
Pop to restore.
Useful for context switching.` },
        { question: 'Explain the three-tree architecture.', answer: `Working Directory: Actual files.
Staging Area (Index): Next commit snapshot.
Repository: Committed history. git add moves to staging, git commit to repository.` },
        { question: 'What is git cherry-pick?', answer: `Applies specific commit to current branch.
Creates new commit.
Useful for hotfixes, backports.
Doesn't move branches, just copies changes.` },
        { question: 'How does git bisect work?', answer: `Binary search for bug introduction.
Mark good/bad commits.
Git checks out middle.
Repeat until finding first bad commit.
Automate with git bisect run <script>.` },
        { question: 'What is the difference between fetch and pull?', answer: `Fetch: Downloads from remote, doesn't merge.
Pull: Fetch + merge (or rebase with --rebase).
Fetch is safer, allows review before merging.` },
        { question: 'Explain GitFlow branching strategy.', answer: `main: Production releases. develop: Integration branch. feature/*: New features from develop. release/*: Release preparation. hotfix/*: Production fixes.
Formal but complex.` },
        { question: 'What is git reflog?', answer: `Records all HEAD movements.
Recovery tool for "lost" commits.
Shows reset, rebase, checkout history.
Commits reachable for ~30 days. git reflog + git reset for recovery.` },
        { question: 'How do you squash commits?', answer: `Interactive rebase: git rebase -i HEAD~n.
Change pick to squash (s) on commits to combine.
Edit combined message.
Creates cleaner history.` },
        { question: 'What are Git submodules?', answer: `Repositories inside repositories.
Track specific commits.
Use for shared libraries. git submodule add/update.
Alternative: Git subtree or package managers.` },
        { question: 'How do you undo a pushed commit?', answer: `git revert: Safe, creates new commit.
Force push (dangerous): git reset + git push -f.
Revert preserves history, force rewrite causes issues for others.` },
        { question: 'What is git blame?', answer: `Shows who last modified each line.
Git blame <file>. -L for line range.
Useful for understanding code history, finding who to ask.
Watch for reformatting commits.` }
    ]
};
