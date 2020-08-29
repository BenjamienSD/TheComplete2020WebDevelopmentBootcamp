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

Branch & checkout  
`git checkout -b <branchname>`  

Merge onto master  
`git checkout master && git merge <branchname>`  

Rebase branch onto master  
`git checkout <branchname> && get rebase master`  

## Moving around in git  

HEAD is the symbolic name for the currently checked out commit -- it's essentially what commit you're working on top of.  

### Detaching head

Detaching HEAD just means attaching it to a commit instead of a branch. This is done by checking out the commit hash.  

HEAD -> master -> C1
`git checkout C1`
HEAD -> C1

## Relative refs ( ^ moving HEAD relative to <name> )  

parent of master  
`master^`  

grandparent of master  
`master^^`

reference HEAD (move up one)  
`git checkout HEAD^`

## Relative refs 2 ( ~n moving up several levels )  

ascend 4 levels  
`git checkout HEAD~4`

## Branch forcing

forcefully move master branch to 3 parents behind HEAD
`git branch -f master HEAD~3`

## Reversing Changes ( reset / revert )  

Reset steps back in time  
C1 -> C2 -> C1

revert creates a new commit that exactly reverses the previous commit  
C1 -> C2 -> C2'

## Moving work around

### git cherry-pick

With the master branch checked out, cherry pick commits from side branch  
`git cherry-pick c2 c4`  
some commit (master*) -> c2' -> c4' (master*)  

## Interactive rebasing ( interactive = -i )

Opens a UI which allows for the reordering and omitting of commits
`git rebase -i HEAD~3`

## Juggling commits ( rebase )

- change commit order  
- amend commit  
- change commit order back  
- checkout and move master

`git rebase -i`
`git commit --amend`
`git rebase -i`  
`git checkout master`
`git branch -f master HEAD`

A lot of reordering can introduce rebase conflicts  

## Juggling commits 2 ( cherry-pick )

`git checkout master`
`git cherry-pick C2`  
`git commit --amend`  
`git cherry-pick C3`  

## Tags

...
