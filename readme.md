CoffeeChat
===========

Submodules
----------
All of the code for this site is now in GitHub submodules. What this means is we have separate repositories that store our different code bases. Below is a list of our current submodules.

Coffee-Chat--iOS
    Owner: NDHApps
    Contact: nicholashall2016@u.northwestern.edu 
    Description: iOS code 
coffee-chat-web
    Owner: GregChan
    Contact: gregorychan2016@gmail.com
    Description: all of the code for the coffee chat website and backend

Initial Setup
---------
To setup the submodules, pull the coffee-chat repository by running:

```
git clone https://github.com/nuvention-web/coffee-chat.git
```

This should create a local copy of the repository with each of the submodules as directories. Each of these directories should be empty. Run the following commands to initialize the submodules and pull the most recent code.

```
$ git submodule init
$ git submodule update
```

For each submodule, this should pull the most recent repo. 

Development
---------
To develop using these submodules, use each submodule directory as you would a regular git repository. Be sure to check that you are within a submodule directory before pushing changes. And as for any other development process, make sure you are on your own feature branch. 

Note:
The head of the submodule is separate from master and dev for each submodule. For any submodule, be sure to checkout dev and branch off of dev before continuing development. Check your current branch with:

```
$ git branch
```


