# DJANGO-REACT-MongoDB Template (Docker edition)

This template has been created as a tool to speed up the process of creation and hosting of a fullstack app.

DISCLAIMER : THIS TEMPLATE HAS BEEN CREATED FOR PERSONNAL USE AS A SIDE PROJECT IT DOES NOT NECESSERILY FEATURES THE BEST DEVLOPMENT PRACTICES. ITS ONLY GOAL IS TO PROVIDE SOME BOILERPLATE CODE FOR A FAST DEPLOYMENT OF A SIMPLE FULLSTACK APP.



# TEMPLATE SETUP PROCEDURE

This setup procedure is suitable for a freshly cloned folder (from git) on a fresh machine.

REQUIREMENTS :

=> PYTHON 3.10.4 OR LATER ;

=> NODE.JS 12.22.9 OR LATER ;

=> NPM 8.15.0 OR LATER ;

All other required packages and dependencies will be installed during the setup process. You'll find the full list of required packages in the requirement.txt and package.json files.



# A - Environement setup

Upon downloading of this template the first step is to ensure the correct environment is set up.


A.1 - Django environement setup

It is highly recommended to use this app in a virtual environement to ensure a proper python dependency management :

=>Go in the main app directory and run the command :

$ pip3 install pipenv       (if not already installed)

$ pipenv shell

=>Then all the packages the project needs to work have to be installed. The list of theses packages resides in the requirement.txt file (or Pifile see note). To install all packages from the requirement.txt file use the command :

$ pipenv install -r ./requirements.txt

This requirement.txt will be used by Heroku to know which dependencies to install to run your python app.


A.2 - Javascript environement setup

All javascript dependencies are listed in the package.json file.

=>To install all javascript dependencies, navigate to the main directory and run the command :
    
$ npn install

This command will install all dependencies listed in the package.json file



# B - Launching the developpement environement

Both Django and React have their own develpmentevironement that need to be launched in order tu run the code.


B.1 - Django

=> (Option 1) Django developement server 

To launch the Django web server be sure to have the virtual environment up and running then naviguate in the main directory and use the command :

$ python3 manage.py runserver

This command will launch the python server that will be avaiblable at the following address (local) : 127.0.0.1:8000

In this template Django is configured to serve the API via the /api route. It's also configured to serve the React app on the root address however this features requires to generate a live build. Without a live build the root adress (127.0.0.1:8000) leads to nothing. Heroku take care of all the live build creation. However if you want to generate a live build manually, refer to the "manual live build" section of this document.

=> (Option 2) Gunicorn production server  

Although gunicorn will be used as a production server it is possible to use it instead of the stock Django dev server.

To launch the gunicorn server for production use the following command in the root directory of the app :

$ gunicorn backend.wsgi:application --bind 0.0.0.0:8000


B.2 - React

To launch the react devlopment environment simply use the following command in the main directory :

npm start

The React development environement has it's own webserver accessible via the adress :

localhost:3000

In this template Django is configured to serve the React app on its root address however this require  a live build. While on a development build use the localhost address.



# C - Creation of the .env file

To run this template requires two environement variables, the MONGO_URI to connect to the DB and the DJANGO SECRET. For security reasons those variables are not directly set in the source code of the app. In a devloppement environement they are stored in a .env file and in production they are directly stored in Heroku. This is excluded from the github repository in order not to expose those variables to internet.

So to use the present template it is necessary to :

=> Create a .env file at the root of the project ;

=> Add the mongo URI with the following syntaxe :

MONGO_URI=YOUR_MONGO_URI

=> Generate and add a new Django secret key with the following syntaxe :

SECRET_KEY=YOUR_SECRET_KEY

Note : if a python virtual environement is running DJango may not detect the new .env file. To solve this issue kill the environement and launch it again.

This template is a very simple app that only use two environement variables however more complex apps will use many more (hashing key, token key, etc...)   



# UPDATING DEPENDENCIES

# A. Python dependencies

If you wish to install new Django dependencies this requirement.txt file will NOT update itself automatically to update it use the following command :

$ pip freeze > requirement.txt

In the root folder of this template there are two files named Pipfile and Pipfile.lock. The standard Pipfile serves roughly the same purpose as the requirement.txt file for heroku. However the pipfile WILL take precedence so keep it up to date aswell. To update it copy the list of dependencies from the requirement.txt and paste it in the packages section of the pipfile. You must change the format of packages name :
Packages names in requirement.txt : Django==4.0.6
packages names in pipfile : Django="4.0.6"

To generate the Pipfile.lock that will be used by heroku use the following command :

$ pipenv update

The requirement.txt and Pipfile.lock serves roughly the same purpose (for heroku) but the use of Pipfile.lock is considered a better practice.



# B. Node dependencies

The package.json update itself automatically when new dependencies are installed.



# DESCRIPTION OF THE MAIN COMPONENTS OF THE APP

This section contains a brief decription of all part of the app. All file within those parts are commented so refer to those files for further instructions.



# A. 'api' folder :

This folder contains the main api of the app.  It's role is to handle http requests from the frontend, interrogate the DB and send a response back with required data. Its main components are :
=> A routing file 'urls.py' ;
=> A file used to setup mongoDB 'utils.py' and ;
=> A file responsible for request handling annd db calls 'views.py'.



# B. 'backend' folder :

This folder contains the backbone of the django app, the server. Its role is to listen for request on the urls of the app and route the traffic either to the frontend or to the api. Its main components are :
=> A routing file 'urls.py' ;
=> The main Django settings file 'settings.py'.



# C. 'node_modules' folder :

This folder contains all the file of node modules and packages required for the JS side of the app (the frontend) to work. This file is excluded from github and is generated locally using the command '$ npm install' (see node.js setup section of the guide).

This folder is auto generated based on the list of packages listed in the package.json file.



# D. 'public' folder :

This folder is one of the main component of a react app. Its main component is the 'index.html' file. This file served by the react developpement server of the Django server in production contains all the react app in its only div called the root.

This file is usually not to be modified.



# E. 'src' folder :

This folder contains all the react JS logic of the app. Its main components are :
=> The index.js file which is the main react JS file that links the App component to the index.html file and the Redux state manager ;
=> The 'component' folder that contains all react and redux JS files (react components, redux store and redux slices) ;  
=> The CSS folder that contains custom css files.

This folder is only used in a devloppement environement. When switching in production and using the '$ npm run build' commmand (heroku does it automatically), the script will bundle all CSS and JS files and store them into a 'static' folder inside the public folder.



# F. Loose files :

=> .gitignore : This file lists all files and folder that  are to be left aside from git uploads.

=> manage.py : This Django file contains mutliple scripts used to administrate a Django app. The main scripts (used in this template) are :
- runserver : launch the django server ;
- collectstatic : this script bundles all files into statics files that will be used by the app in production ;

=> package.json and package-lock.json : Those are configuration files for any node.js app. They defines :
- All packages the app needs
- All npm scripts like '$ npm start' or 'npm run build'.

=> requirements.txt, pipfile and pipfile.lock : Those files lists all python dependencies and packages required by the app to run. The pipfile files are generated from the requirement.txt file.

=> runtime.txt : This file tells Heroku which version of python is used by the app.

=> dockerfile : This file contains all the instructions required by docker to build a container image.

=> .dockerignore : This file lists all files and folder to leave aside the image building process




# DOCKER IMAGE BUILDING PROCEDURE

# A. Creating a live build

Generating a manual live build is quite straight forward :
=> The first step requires to naviguate with the console in the main directory and run the command :

$ npm run build

This command will bundle all the react code into static files and store them into a "build" folder in the root  directory.

=> The second command generates static files used by the python side of the app. Make sure to be in a virtual environment AND in the root folder when you use this :

$ python3 manage.py collectstatic

This will generate a staticfiles folder a the root of the app using the content of the build folder generated by the previous operation. At this point the Django server will serve the React app on its root address (/) without the need to launch the react developement server.


# B. Updating the dockerfile

In order to move to a developpement build it's necessary to transfer the ENV variables to the container.

To do this add them to the dockerfile between the line COPY and the line RUN :

ENV SECRET_KEY=your_django_secret_key
ENV MONGO_URI=your_mongo_uri



# C. Building and running the image

The app is composed of two containers. The main app container and the nginx container. To launch both containers concurrently use the following command :

$ docker-compose up -d

To bring the app down use this command :

$ docker-compose down 

