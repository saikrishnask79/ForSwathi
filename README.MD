# In your project folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main


# After Any code changes
git status
git add .
git commit -m "Fixed spelling mistake in apology"
git push origin main


# Create a Git Repo
1. Go to github.com
2. Click on "New repository"
3. Enter the repository name
4. Click on "Create repository"

# Deploy to GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings"
3. Click on "Pages" in the left sidebar
4. Under "Source", select "main"
5. Click on "Save"