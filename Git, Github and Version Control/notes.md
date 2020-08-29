# Git, Github and Version Control

note: C1, C2, etc are placeholders for commit hashes

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

## Branching and merging

creating local branch  
`git branch <branchname>`

Examine branches  
`git branch`

Branch && checkout  
`git checkout -b <branchname>`

Merge onto master  
`git checkout master && git merge <branchname>`

Rebase branch onto master  
`git rebase master <branchname>`

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

You can checkout a tag, tags mark milestones  
`git tag v1 C2`

## git describe

`git describe <ref>`

output => `<tag>_<numCommits>_g<hash>`

`tag`: nearest tag near current  
`numCommits`: n° of commits nearest tag is removed from current  
`hash`: hash of current

## Specifying parents

`git checkout master` => C1  
`git checkout master^2` => C2

create bugWork branch on location relative to master\* (1 up, second branch, 1 up)
`git branch bugWork master~^2~`

## Remote repositories

### git remote

Create repository on Github  
Then add remote to local repository.  
`git remote add origin <url.git>`

Push local repository to remote repository. The -u option links up the local and remote, origin is name of remote, master is name of branch.  
`git remote -u origin master`

### git clone

create local copy of remote repo  
`git clone`  
creates a new branch in the local repo called: origin/master

### git fetch

download data from remote  
`git fetch`

### git pull

Once you have new commits available locally, you can incorporate them as if they were just normal commits on other branches, using cherry-pick, rebase, merge, etc...  
download and merge data from remote  
`git pull` = `git fetch && git merge origin/master`

### git push

note: the behavior of git push with no arguments varies depending on one of git's settings called push.default

## Diverging history

### Rebase

Imagine you pull a remote repo and make local commits to it, but in the meantime the remote repo also has commits done to it. You can't push your local commits because your local repo is outdated compared to the remote.  
First you have to update the local repo to match the state of the remote.

`git fetch`  
`git rebase origin/master`
`git push`

Basically adding all the remote commits to your local repo, adding your commits, and sending those to the remote

### Merge

`git fetch`  
`git merge origin/master`  
`git push`

### git pull --rebase

`git pull` is shorthand for a fetch and a merge.  
`git pull --rebase` is shorthand for a fetch and a rebase.

## Remote rejected ( locked master )

When working on larger project and the master is locked, pull requests are required in order to merge commits.  
If you commit directly to master locally and try pushing you will be greeted with a message similar to this:  
`! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)`

Instead you must create a branch, push that branch and make a pull request.  
Also reset your master back to be in sync with the remote otherwise you may have issues next time you do a pull and someone else's commit conflicts with yours.

Reset your master back to be in sync with the remote  
`git reset --hard origin/master`

Checkout latest local commit, create branch  
`git checkout -b <newBranch> C2`

Push the new branch on the origin
`git push origin feature`

## Remote repositories ( advanced )

### Merging feature branches

Some developers only push and pull when on the master branch -- that way master always stays updated to what is on the remote (origin/master).

### Using rebase

get latest remote commit (origin/master)  
`git fetch`

append feature 1  
`git rebase origin/master feature1`

append feature 2  
`git rebase feature1 feature2`

append featere 3  
`git rebase feature2 feature3`

set local master to lastest local commit  
`git rebase master feature3`

push master to remote  
`git push`

## Rebase vs Merge

clean commit tree vs accurate representation of commit history.

### Using merge

`git checkout master`  
`git pull`  
`git merge feature1`  
`git merge feature2`  
`git merge feature3`  
`git push`

## Remote tracking

create new branch that tracks origin/master  
`git checkout -b totallyNotMaster origin/master`  
or  
`git branch -u o/master foo`
