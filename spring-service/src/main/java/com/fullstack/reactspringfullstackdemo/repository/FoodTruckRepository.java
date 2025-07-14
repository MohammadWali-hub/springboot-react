package com.fullstack.reactspringfullstackdemo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.fullstack.reactspringfullstackdemo.entity.FoodTruck;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodTruckRepository  extends JpaRepository<FoodTruck,Long>  {
    Page<FoodTruck> findAll(Specification<FoodTruck> spc, Pageable pageable);
}
