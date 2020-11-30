# TurnApp (WEB)

###### This project is an application about manage employee turns, inside this a user could register employees, shedules, turns, identification types and categories, these will be used to create employees and turns, and they will be saved and loaded according to Tenant.

##### "Tenant" is the way we talk about a contract or parent user who will use the platform

## For the project to work locally, we need install:
#### Node JS: https://nodejs.org/es/

#### Angular CLI: https://cli.angular.io/
#### GIT: https://git-scm.com/

#### run command git clone https://github.com/CJGalvis/turnapp-web

##### After having everthing you need installed and clone the repository, we will proceed to install the project dependencies running the command "npm i" after running project with the command "ng serve --open"

## (Optinal) Automatic deploy

#### For this process we need create an account in Heroku Platform, create an application and connect with github repository.
#### this process is possible thanks to the file "Procfile", this is the file charger of automatically deploying on the heroku platform. NOTE: before to make push to master branch, we should run ":

#### ng build --prod

#### git add .

#### git commit -m "message"
#### git push origin master

#### For any questions, contact the email: cjgm1596@gmail.com
