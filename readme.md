CoffeeChat
===========

Team Members
----------
- Greg Chan - Full-stack Developer
- Tara Chang - Business Strategist
- Avery Fisher - Designer
- Nick Hall - Front-end / Mobile iOS Developer
- Mukai Lu - Back-end Developer
- Jason Lustbader - Back-end / Mobile iOS Developer 
- Chinye Osamusali - Content Strategist
- Holliday Shuler - Front-end Developer

Overview
----------
We believe that, at any career stage, by providing people with a way to make meaningful connections and conversations, we will offer value for participants in the form of professional growth.

We are building a platform that is designed to facilitate making connections within specific communities, such as Women’s iLab, on a web platform with the goal of going mobile.

In order to pilot effectively, we are working within the Northwestern student and alumni network, but we are looking forward to bringing the product back to its roots of women’s leadership once we lock down the usability and functionalities

Progress
----------
Currently, we have a partially integrated front-end and back-end. 

Directory Structure
----------
####Submodules
All of the code for this site is now in GitHub submodules. What this means is we have separate repositories that store our different code bases. Below is a list of our current submodules.

Coffee-Chat--iOS

Owner: NDHApps

Contact: nicholashall2016@u.northwestern.edu 

Description: iOS code 

coffee-chat-web

Owner: GregChan

Contact: gregorychan2016@gmail.com

Description: all of the code for the coffee chat website and backend

#####Web Directory Structure
```
coffee-chat-web
	db: database connections
	logs: server log location
	public
		js: front-end javascript
		css: styles
		images: pictures and images
	resources
		wild: frontend resource server	
			(handles requests from browsers and returns web pages)
		cat: backend resource server
			(handles requests from frontend resource server and returns json data)
		elf: backend server
			 (not accessible from outside)
			 (handles more serious business logic: e.g. DB)
	views
		(views that are templated on the front-end)
		includes: partials that are not full web pages
```


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


