package com.fullstack.reactspringfullstackdemo.controller;

import com.fullstack.reactspringfullstackdemo.playload.FoodTruckDto;
import com.fullstack.reactspringfullstackdemo.playload.FoodTruckResponse;
import com.fullstack.reactspringfullstackdemo.service.FoodTruckService;
import com.fullstack.reactspringfullstackdemo.utils.AppConstants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * <p>Food truck Controller,Just a small RESTFull demo  </p>
 *
 * @author clayton.wang
 * @date Created in 2024-30-02 20:49
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/food-trucks")
public class FoodTruckController {
    private final FoodTruckService truckService;

    public FoodTruckController(FoodTruckService truckService) {
        this.truckService = truckService;
    }

    // get all food trucks rest api
    @GetMapping
    public FoodTruckResponse getAllPosts(
            @RequestParam(value = "pageno", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false)
            int pageNo,
            @RequestParam(value = "pagesize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false)
            int pageSize,
            @RequestParam(value = "sortby", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false)
            String sortBy,
            @RequestParam(value = "sortdir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false)
            String sortDir,
            @RequestParam(value = "filter", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false)
            String filter
    ) {
        return truckService.getAllFoodTrucks(pageNo, pageSize, sortBy, sortDir, filter);
    }

    // get food truck by id
    @GetMapping("/{id}")
    public ResponseEntity<FoodTruckDto> getPostById(@PathVariable(name = "id") long id) {
        // to do
        // return ResponseEntity.ok(truckService.getPostById(id));
        return null;
    }
}
