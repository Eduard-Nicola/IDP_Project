package com.carrental.server.database;

import javax.persistence.*;

@Entity
@Table(name="car")
public class Car {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String make;
    private String model;
    private Integer prodYear;
    private Integer displacement;
    private Integer horsepower;
    private String fuelType;
    private Float fuelEconomy;
    private Float pricePerDay;
    private Integer reserved;
    private String reservedFrom;
    private String reservedTo;

    public String getReservedFrom() {
        return reservedFrom;
    }

    public void setReservedFrom(String reservedFrom) {
        this.reservedFrom = reservedFrom;
    }

    public String getReservedTo() {
        return reservedTo;
    }

    public void setReservedTo(String reservedTo) {
        this.reservedTo = reservedTo;
    }

    private String imageUrl;

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getProdYear() {
        return prodYear;
    }

    public void setProdYear(Integer prodYear) {
        this.prodYear = prodYear;
    }

    public Integer getDisplacement() {
        return displacement;
    }

    public void setDisplacement(Integer displacement) {
        this.displacement = displacement;
    }

    public Integer getHorsepower() {
        return horsepower;
    }

    public void setHorsepower(Integer horsepower) {
        this.horsepower = horsepower;
    }

    public Float getFuelEconomy() {
        return fuelEconomy;
    }

    public void setFuelEconomy(Float fuelEconomy) {
        this.fuelEconomy = fuelEconomy;
    }

    public Float getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(Float pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public Integer getReserved() {
        return reserved;
    }

    public void setReserved(Integer reserved) {
        this.reserved = reserved;
    }
}