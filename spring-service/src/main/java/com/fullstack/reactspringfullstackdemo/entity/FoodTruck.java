package com.fullstack.reactspringfullstackdemo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "food_truck")
public class FoodTruck {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private long id;

    @Column(name = "applicant")
    private String applicant;

    @Column(name = "facility_type")
    private String facilityType;

    @Column(name="address")
    private String address;

    @Column(name="location_description")
    private String locationDescription;

    @Column(name="food_items")
    private  String foodItems;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;
}
