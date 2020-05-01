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
    reserved_from VARCHAR(255) NOT NULL,
    reserved_to VARCHAR(255) NOT NULL,
    image_url VARCHAR(255)
);

INSERT INTO car (make, model, prod_year, displacement, horsepower, fuel_type, fuel_economy, price_per_day, reserved, reserved_from, reserved_to, image_url) VALUES ("Skoda", "Octavia", "2013", 1998, 150, "Gasoline", 8, 150, 0, "none", "none", "skoda_octavia.jpg");
INSERT INTO car (make, model, prod_year, displacement, horsepower, fuel_type, fuel_economy, price_per_day, reserved, reserved_from, reserved_to, image_url) VALUES ("Mercedes-Benz", "C-Klasse", "2009", 2200, 180, "Gasoline", 10, 250, 0, "none", "none", "merc_c_klasse.jpg");
INSERT INTO car (make, model, prod_year, displacement, horsepower, fuel_type, fuel_economy, price_per_day, reserved, reserved_from, reserved_to, image_url) VALUES ("Audi", "A8", "2015", 2998, 300, "Gasoline", 13, 400, 0, "none", "none", "audi_a8.jpg");
INSERT INTO car (make, model, prod_year, displacement, horsepower, fuel_type, fuel_economy, price_per_day, reserved, reserved_from, reserved_to, image_url) VALUES ("Volkswagen", "Golf", "2016", 1597, 120, "Diesel", 6, 100, 0, "none", "none", "vw_golf.jpg");