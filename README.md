# DJANGO-REACT-POSTGRES Template

## Template setup procedure

Requirements :
+ PYTHON 3.1.12 or later ;
+ NODE.JS 18.17.1 or later ;
+ NPM 9.6.7 or later ;
+ Docker engine ;

### A - Environement setup

#### A.1 - Django environement setup

It is highly recommended to use this app in a virtual environement to ensure a proper python dependency management.

All python packages are listed in the requirements.txt file

In the root directory of the app run the following commands :

```
pip3 install pipenv
pipenv shell
pipenv install -r ./requirements.txt
```


#### A.2 - Javascript environement setup

All javascript dependencies are listed in the package.json file.

In the frontend directory of the app run the following command :

```  
npm install
```

#### A.3 - Creating the .env file

In the root directory of the app, create a .env file to store the following environment variables :

```
#Django secret key

SECRET_KEY="your secret key"
ALLOWED_ORIGINS=http://localhost:3000 http://127.0.0.1:3000 http://localhost:8000 http://127.0.0.1:8000 http://localhost
ALLOWED_HOSTS=0.0.0.0 127.0.0.1 localhost

# Database variables

SQL_HOST=db # This is the name of the DB container
SQL_PORT=5432
DATABASE=postgres
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=dbname
DATABASE_URL=postgresql://username:password@db:5432/dbname
```


### B - Preparing and launching a developpement environement

#### B.1 - Django

##### Creation of the database

Before launching the Django devlopment environement the database must be created with the following commands :

```
python3 manage.py makemigrations
python3 manage.py migrate
```

Note: Those commands will need to be reran each time app models are updated created or deleted.

##### Creation of the admin superuser

In order to access Django's administration interface you first need to create a new admin user with the following command :

```
python manage.py initadmin
```
You'll then be able to access the admin interface using the following credentials:
username: admin
password: admin

This step requires a working database.


##### Running the devlopment web-server

Before launching Django's web-server, please ensure :
+ The virtual environment is running, 
+ Packages are installed, 
+ Environments variables are setup, 
+ The DB has been created,
+ A superuser has been setup

Launch Django's devlopment web-server with the following command :

```
python3 manage.py runserver
```

This command will launch the python server that will be avaiblable locally on the loopback address :

```
127.0.0.1:8000/
```

Please note however that without creating a frontend build Django will have nothing to serve on the root address. This Django app template is configured to serve the React UI on the root address. However this requires to generate a react build and a staticfiles folder. See the section about generating a build for further instructions.

Django's administration interface is accessible on the following address : 

```
127.0.0.1:8000/admin/
```

#### B.2 - React

To launch the react devlopment environment simply use the following command in the main directory :

```
npm start
```

The React development environement has it's own webserver accessible via the address : 

```
localhost:3000
```


## Updating dependencies and packages

### A. Python dependencies

The requirement.txt file lists all packages used in the app. However it does not update automatically when a new package is added.

To add a new python package to the development environment use the following command :

```
pipenv install <name of the package>
```

This will update the pipfile which lists all packages aswell.

However when building a docker image the the requirements.txt file is use for the the purpose of retrieving the list of packages.

For this reason it is advised to update this file each time a new package is installed. To update this file use the following command :

```
pip freeze > requirement.txt
```

### B. Node dependencies

The package.json update itself automatically when new dependencies are installed.

To install a Node dependency use the following command :

```
npm install <name of the dependency>
```

Some Node dependencies are only useful in devlopment. In order to avoid downloading those dependencies in a production context save them as dev dependecies :

```
npm install --save-dev <name of the dependency>
```

## Running tests

This template comes with a complete suite of unit, intregration and e2e tests that covers both the frontend and the backend.

### Django tests

To run Django's test suite run the following command :
```
coverage run --source='.' manage.py test | coverage report
```

Note: If you run theses tests on a freshy clone repository you may encounter a "missing staticfiles directory" error message. You can ignore it.

### React tests

Reacts tests are seperated in two suites. One for unit and integration tests :
```
npm test
```
Note: React integration tests require a blank post Dev DB table. Some tests will fail if this table contain records before running the tests suite.  

And one for e2e tests:
```
npm run test:e2e
```

By default all React files are included in the coverage report. However it may be useful to exclude some files from such reports. To do so add the following line at the top of the document you want excluded :
```
/* istanbul ignore file */
```

If a file has been deleted since the last test run, it is advised to clear the test cache in order to avoid error message in the test report. Clear the cache with the following command :
```
npm run test-clear-cache
```


## Docker image build procedure

This app template is built to be deployed as a group of containers. This procedure requires first to build the frontend then to create docker images using docker compose.

### A. Creating a React build


To create a react build go in the frontend folder and run the following command :
```
npm run build
```

This command will bundle all the react code into static files and store them into a "build" folder in the frontend directory.

### B. Generate Django's static files

The second step is to generates static files that will be served by Django on the root app address. Go to the root derictory of the app and run the following command :
```
python3 manage.py collectstatic
```



### C. Building and running the image

The app is composed of two containers. The main app container and the nginx container. To launch both containers concurrently use the following command :
```
docker-compose up -d --build #docker-compose v1
docker compose up -d --build #docker-compose v2
```
Once containers are running the app should be accessible at the following address:
```
localhost #(port 80 to go through nginx, 8000 to reach Django directly) or
<IP of your machine>:80
```
Troubleshooting: By default Django's DEBUG mode is activated. If when trying to reach the aforementioned address you get a disallowed host error. This means you need to add the IP address of your machine to the list of allowed hosts in the .env file.


To bring the app down use this command :

```
docker-compose down #docker-compose v1
docker compose down #docker-compose v2
```

The process of build images and launching the app will automatically create the DB and all necessary tables.

This app template comes with and optional adminer container available, once launched, at the following address:
```
localhost:8080
```
The login to this database explorer use the DB credentials defined ine your .env file.

### D.Admin account

An admin account is automatically created the first time the app is brought up. Credentials for this account are the following:
username: admin
password: admin

Upon first login on the administrative area it is recommanded to create a new admin account and delete this default one.

## Random tips

#### Settings.py debug mode

+ The setting.py contain a DEBUG option that allows Django to display debug information in the browser when an app endpoint is accessed and an error is thrown.

This option should be set to False in prodution.

#### Removing Adminer for production

+ To remove Adminer simply remove is from the docker-compose file.