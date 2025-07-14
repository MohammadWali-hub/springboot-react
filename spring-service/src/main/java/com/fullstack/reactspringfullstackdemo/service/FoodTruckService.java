package com.fullstack.reactspringfullstackdemo.service;

import com.fullstack.reactspringfullstackdemo.playload.FoodTruckResponse;

public interface FoodTruckService {
    FoodTruckResponse getAllFoodTrucks(int pageNo, int pageSize, String sortBy, String sortDir,String filter);
}
