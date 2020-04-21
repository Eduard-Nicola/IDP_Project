DROP DATABASE IF EXISTS carrental;

CREATE DATABASE IF NOT EXISTS carrental;
USE carrental;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS car (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    prod_year INT NOT NULL,
    displacement INT NOT NULL,
    horsepower INT NOT NULL,
    fuel_type VARCHAR(255) NOT NULL,
    fuel_economy DECIMAL(10,1) NOT NULL,
    price_per_day DECIMAL(13, 4) NOT NULL,
    reserved INT NOT NULL,
    image_url VARCHAR(255)
);

CREATE TABLE user_cars (
    user_id VARCHAR(255) NOT NULL,
    car_id VARCHAR(255) NOT NULL
);
ALTER TABLE user_cars ADD PRIMARY KEY(user_id);