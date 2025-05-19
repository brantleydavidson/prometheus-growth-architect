# Prometheus Growth Architect - Team Onboarding Guide

## Initial Setup

### 1. Install Required Software
- Download and install [Cursor](https://cursor.sh/)
- Download and install [Git](https://git-scm.com/downloads)
- Download and install [Node.js](https://nodejs.org/) (LTS version)

### 2. Configure Git (First Time Only)
Open Terminal and run these commands (replace with your information):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@teamprometheus.co"
```

### 3. Clone the Repository
```bash
# Open Terminal
# Navigate to where you want to store the project
cd ~/Desktop  # or any preferred location

# Clone the repository
git clone https://github.com/brantleydavidson/prometheus-growth-architect.git

# Move into the project directory
cd prometheus-growth-architect
```

### 4. Open in Cursor
- Open Cursor
- Click "File" → "Open Folder"
- Navigate to and select the `prometheus-growth-architect` folder

### 5. Install Dependencies
```bash
# In Terminal, make sure you're in the project directory
npm install
```

## Development Workflow

### 1. Starting Your Work Day
```bash
# Always start by updating your branch
git checkout feature/your-name  # replace with your branch (brantley, andrew, or shelby)
git pull origin feature/your-name
git pull origin develop  # to get latest changes from develop
```

### 2. Making Changes
1. Create a new branch for your feature (if needed):
   ```bash
   git checkout -b feature/your-name/feature-description
   ```

2. Make your changes in Cursor

3. Save your work and commit:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin feature/your-name/feature-description
   ```

### 3. Submitting Your Work
1. Go to GitHub repository
2. Click "Pull Request"
3. Select:
   - Base: `develop`
   - Compare: your feature branch
4. Add description of changes
5. Request review from team members

## Cursor Tips

### Essential Shortcuts
- `Cmd + P`: Quick file search
- `Cmd + Shift + P`: Command palette
- `Cmd + B`: Toggle sidebar
- `Cmd + J`: Toggle terminal
- `Cmd + /`: Comment/uncomment code

### Git Integration in Cursor
1. Click the Source Control icon in the sidebar (or press `Cmd + Shift + G`)
2. You'll see:
   - Changes
   - Branches
   - Pull Requests
   - Sync Status

### Using AI Features
- `Cmd + K`: Open AI chat
- `Cmd + L`: Generate code
- `Cmd + I`: Inline code completion

## Best Practices

### Code Style
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Git Commit Messages
Format:
```
type: short description

- type: feat, fix, docs, style, refactor, test, chore
- description: present tense, no period at end
```

Examples:
```
feat: add user authentication
fix: resolve login form validation
docs: update README with new setup instructions
```

### Branch Naming
- Feature: `feature/your-name/feature-description`
- Bug fix: `fix/your-name/bug-description`
- Documentation: `docs/your-name/doc-description`

## Getting Help

### Common Issues
1. **Merge Conflicts**
   ```bash
   git status  # see conflicting files
   # Resolve conflicts in Cursor
   git add .
   git commit -m "Resolve merge conflicts"
   ```

2. **Lost Changes**
   ```bash
   git reflog  # see recent actions
   git reset --hard HEAD@{1}  # go back to previous state
   ```

### Need Help?
- Check the [Cursor Documentation](https://cursor.sh/docs)
- Ask in team chat
- Create an issue in GitHub

## Next Steps
1. Complete this setup
2. Make a test commit
3. Create a test pull request
4. Get familiar with Cursor's AI features

Remember: When in doubt, ask! It's better to ask questions than to make assumptions. 