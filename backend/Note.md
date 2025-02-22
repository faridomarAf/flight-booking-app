## All sequlize command:=> [https://github.com/sequelize/cli/blob/main/README.md]

## Notes: 
1: Controllers: controllers should not never directly tallk to models
2: Services have business logic, they dont directly tallk to models
3: So now we aks our self, who tallks to models, the answer is 'Repository' directory.

## Install MySQL: brew install mysql

## start MySQL: brew services start mysql

## to enter to your mysql database: [mysql -u root -p], '-u' asking for your mysql username, which by default you database username is 'root', and '-p' is asking for password of your mysql, which by default your mysql does not provided a password, just enter to go to your mysql


## show databases; used to show your databases

## to go inside your data base: use Flights, [Flights] is the name of your databases which it listed already by 'show databases'

## 

1: sequelized installed:=> npm install sequelize

2:mysql2 installed:=> npm install mysql2

3:sequelize-cli

4:to Initialize Sequelize:=> npx sequelize init

5: to create database: npx sequelize db:create

6: to create table, it just create a model file: npx sequelize model:generate --name Airplane --attributes modelNumber:string,capacity:integer

7: to apply the pending migration to db: npx sequelize db:migrate

8: to see our all databases:=> SHOW DATABASES;

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| Flights            |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+

9: to enter inside the specific data base, for example to enter inside 'Flights' data base:=> [use Flights]

10: to see our tables insid [Flights] the database:=> show tables;

example: tables inside the 'Flights' are as below:

mysql> show tables;
+-------------------+
| Tables_in_flights |
+-------------------+
| Airplanes         |
| SequelizeMeta     |
+-------------------+

11: to see the table details:=> desc 'name-of-table' => desc Airplanes; [Airplains is name of the table];

## Example as below:

desc Airplanes;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| modelNumber | varchar(255) | NO   |     | NULL    |                |
| capacity    | int          | YES  |     | NULL    |                |
| createdAt   | datetime     | NO   |     | NULL    |                |
| updatedAt   | datetime     | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+

12: to undo the migration:=> sequelize db:migrate:undo

13: to undo or revert all migration: sequelize db:migrate:undo:all 

14: Note, after each 'undo', when some changes we did in our model, we should run the [npx sequelize db:migrate] to create the tables

15: to see our enteries inside the table:=> 'select * from Airplanes;' [airplanes is a table inside Flights Database]

output: 
+----+-------------+----------+---------------------+---------------------+
| id | modelNumber | capacity | createdAt           | updatedAt           |
+----+-------------+----------+---------------------+---------------------+
|  1 | airbus230   |      340 | 2025-02-17 09:30:35 | 2025-02-17 09:30:35 |
+----+-------------+----------+---------------------+---------------------+

