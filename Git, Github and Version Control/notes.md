# Git, Github and Version Control

## Local repositories

Initialize git  
`git init`

Examine staging area (untracked files in red)  
`git status`

Add file to staging area  
`git add <filename>`

Add all to staging area
`git add .`

Remove file from staging area  
`git rm --cached <filename>`

Commit file from staging area to local repository. Convention states that commit messages are written in present tense.
`git commit -m "commit message"`

Examine commit history  
`git log`

Examine differences between versions
`git diff <filename>`

Revert to previous version of file
`git checkout <filename>`

## Remote repositories

Create repository on Github
Then add remote to local repository.
`git remote add origin <url.git>`

Push local repository to remote repository. The -u option links up the local and remote, origin is name of remote, master is name of branch.
`git remote -u origin master`

## Branching and merging

creating local branch
`git branch <branchname>`

Examine branches
`git branch`

Merge onto master
`git checkout master && git merge <branchname>`
`:q!`
