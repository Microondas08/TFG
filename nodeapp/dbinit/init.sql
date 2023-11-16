CREATE DATABASE IF NOT EXISTS resilience;
USE resilience;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  userId int(11) NOT NULL AUTO_INCREMENT,
  userName varchar(100) NOT NULL,
  nickname varchar(50) NOT NULL,
  surname varchar(100) NOT NULL,
  password varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  rol int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY(userId)
) AUTO_INCREMENT=1;
