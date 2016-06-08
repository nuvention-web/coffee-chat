CoffeeChat
===========

Team Members
----------
- Greg Chan - Developer
- Tara Chang - Business Strategist
- Avery Fisher - Designer
- Nick Hall - Developer
- Mukai Lu - Developer
- Jason Lustbader - Developer 
- Chinye Osamusali - Content Strategist
- Holliday Shuler - Developer

Overview
----------
We simplify your development program by cutting out the tedious matching process with our algorithm, allowing your team members to better achieve their goals. We help companies who are  serious about their employees’ growth manage, track, and facilitate internal professional development programs

Make Connections: Automatically or manually match people on your team to align  to your program goals

Manage Development: See who is matching, when they are  matching and how they respond to their match

Improve Performance: Improve your development programs based on the feedback from the matches in the system



Progress
----------
Our front and back ends are fully integrated on a web platform

Directory Structure
----------
####Submodules
All of the code for this site is now in GitHub submodules. What this means is we have separate repositories that store our different code bases. Below is a list of our current submodules.

Coffee-Chat--iOS

Owner: NDHApps

Contact: nicholashall2016@u.northwestern.edu 

Description: iOS code (abandoned)

coffee-chat-web

Owner: GregChan

Contact: gregorychan2016@gmail.com

Description: all of the code for the coffee chat website and backend

#####Web Directory Structure
```
coffee-chat-web
	documents: sql files
	logs: server log location
	node_modules: modules supporting external functionalities integrated on the site
	public
		js: front-end javascript
		css: styles
		images: pictures and images
		fonts: fonts used in css
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
		email-templates: templates for email notifications
		error: error message pages
		mixins: file partial to enable editable text
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


