package com.fullstack.reactspringfullstackdemo.utils;

import com.fullstack.reactspringfullstackdemo.entity.FoodTruck;
import org.springframework.data.jpa.domain.Specification;

public class FoodTruckSpecifications {
    public static Specification<FoodTruck> nameContains(String searchTerm) {
        String field;
        String value;
        if(searchTerm.contains("=")){
            String [] tmp = searchTerm.split("=");
            if(tmp.length > 1){
                field = tmp[0];
                value = tmp[1];
            }else {
                field = tmp[0];
                value = "";
            }

        } else {
            value = "";
            field = "applicant";
        }
        return (root, query, cb) -> cb.like(root.get(field), "%" + value + "%");
    }
}