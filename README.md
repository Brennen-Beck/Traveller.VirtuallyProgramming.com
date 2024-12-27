# Traveller.VirtuallyProgramming.com
 My Traveller Web App

This is the website code for my front-end web app for my Traveller game. Technically, it's the entire website including pages that are not part of the web app, but currently the landing page is the only such page and even it shares a menu with the web app, which is sort of the 2.0 version of my "Traveller Trade Calculator". Although that being said, there is a C# Windows Forms app which is literally the "Traveller Trade Calculator 2.0". The web app and Windows Forms app do roughly the same end and literally manipulate the same database.

My initial release of this is a work in progress as I'm still learning JS and front end development. So, I'm certain everything will eventually change here.

This launches with Index.html. The videos and images folders are excluded as part of gitignore; they will be backed up elsewhere and currently the serve almost no purpose except decoration with the exception of the site logo and Traveller Compatible logo. One could argue that even those are decorative. But part of the reason for excluding them is that I have not sized them efficiently yet and so the files are overly large.

This is currently Vanilla JS. I may move to React or something later when I get better at this, but for now it's all done the hard way. The navigation menu is a separate "component" although there is nothing currently implemented as an actual component. I was thinking of wrapping some of the "components" in to actual components, which is one of the changes prompting me to create a Git repository before I do major surgery on the site.

The site is currently working although it requires the Web API to be running as well as the SQL Server. Both are currently hosted on my local machine and so is this website. I expect to deploy all of them to the Internet soon, which is another reason I created this repository.
