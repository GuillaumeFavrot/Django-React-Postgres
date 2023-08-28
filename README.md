# DJANGO-REACT-POSTGRES Template `#0c4b33`

## Template setup procedure `#0c4b33`

Requirements :
+ PYTHON 3.1.12 or later ;
+ NODE.JS 18.17.1 or later ;
+ NPM 9.6.7 or later ;

### A - Environement setup `#0c4b33`

Upon downloading of this template the first step is to ensure the correct environment is set up.


#### A.1 - Django environement setup `#0c4b33`

It is highly recommended to use this app in a virtual environement to ensure a proper python dependency management.

All python packages are listed in the requirements.txt file

In the root directory of the app run the following commands :

```
pip3 install pipenv
pipenv shell
pipenv install -r ./requirements.txt
```


#### A.2 - Javascript environement setup `#0c4b33`

All javascript dependencies are listed in the package.json file.

In the frontend directory of the app run the following command :

```  
npn install
```

#### A.3 - Creating the .env file `#0c4b33`

In the root directory of the app, create a .env file to store the following environment variables :

```
#Django secret key

SECRET_KEY="your secret key"
ALLOWED_ORIGINS=http://localhost:3000 http://127.0.0.1:3000 http://localhost:8000 http://127.0.0.1:8000 http://localhost
ALLOWED_HOSTS=0.0.0.0 127.0.0.1

# Database variables

SQL_HOST=db
SQL_PORT=5432
DATABASE=postgres
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=dbname 
DATABASE_URL=postgresql://username:password@db:5432/dbname
```


### B - Launching a developpement environement `#0c4b33`

#### B.1 - Django `#0c4b33`

If the virtual environment is running, packages are installed and envirments variables are setup, launch Django's devlopment web-server with the following command

```
python3 manage.py runserver
```

This command will launch the python server that will be avaiblable locally on the loopback address : 127.0.0.1:8000

This Django template is configured to serve the React UI on the root address. However this requires to generate a react build and a staticfiles folder. See the section about generating a build for further instructions.

##### Django's administration interface `#0c4b33`

Django's administration interface is accessible on the following address : 127.0.0.1:8000/admin/

![#0c4b33]In order to access it you first need to create a new superuser with the following command :

```
python manage.py createsuperuser
```

This step however requires a working database. See database setup for further instructions.

#### B.2 - React `#0c4b33`

To launch the react devlopment environment simply use the following command in the main directory :

npm start

The React development environement has it's own webserver accessible via the adress :

localhost:3000


# C - Creation of the .env file

This template requires two sets of environement variables, database variables and the DJANGO SECRET.

=> Create a .env file at the root of the project ;

=> Add the following DB variables :
    "NAME": "mydatabase",
    "USER": "mydatabaseuser",
    "PASSWORD": "mypassword",
    "HOST": "db", => This is the name of the DB container
    "PORT": "5432",

=> Generate and add a new Django secret key with the following syntaxe :

SECRET_KEY=YOUR_SECRET_KEY

Note : if a python virtual environement is running DJango may not detect the new .env file. To solve this issue kill the environement and launch it again.


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


# MAKING MODEL CHANGES

1) Change your models in models.py

2) Run python manage.py makemigrations

3) Run python manage.py migrate

# REACT SPECIFIC DOCUMENTATION

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).