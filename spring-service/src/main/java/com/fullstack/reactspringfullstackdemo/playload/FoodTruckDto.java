package com.fullstack.reactspringfullstackdemo.playload;

import jakarta.persistence.Column;
import lombok.Data;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Data
public class FoodTruckDto {
    private long id;

    // Applicant should not be null or empty
    // Applicant should have at least 2 characters
    @NotEmpty
    @Size(min = 2, message = "Applicant should have at least 2 characters")
    private String applicant;

    // Address should be not null or empty
    // Address should have at least 2 characters
    @NotEmpty
    @Size(min = 2, message = "Address should have at least 2 characters")
    private String address;

    // FacilityType should not be null or empty
    @NotEmpty
    private String facilityType;

    // FoodItems should not be null or empty
    @NotEmpty
    private String foodItems;

    private String locationDescription;

    @NotEmpty
    private Double latitude;

    @NotEmpty
    private Double longitude;
}
