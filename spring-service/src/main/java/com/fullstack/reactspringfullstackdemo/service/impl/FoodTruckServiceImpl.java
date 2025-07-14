package com.fullstack.reactspringfullstackdemo.service.impl;

import com.fullstack.reactspringfullstackdemo.entity.FoodTruck;
import com.fullstack.reactspringfullstackdemo.playload.FoodTruckDto;
import com.fullstack.reactspringfullstackdemo.playload.FoodTruckResponse;
import com.fullstack.reactspringfullstackdemo.service.FoodTruckService;
import com.fullstack.reactspringfullstackdemo.repository.FoodTruckRepository;
import com.fullstack.reactspringfullstackdemo.utils.FoodTruckSpecifications;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class FoodTruckServiceImpl  implements FoodTruckService {

    private final FoodTruckRepository foodTruckRepository;
    private final ModelMapper mapper;

    public FoodTruckServiceImpl(FoodTruckRepository foodTruckRepository, ModelMapper mapper) {
        this.foodTruckRepository = foodTruckRepository;
        this.mapper = mapper;
    }
    @Override
    public FoodTruckResponse getAllFoodTrucks(int pageNo, int pageSize, String sortBy, String sortDir,String filter){
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        if(pageNo>0)  pageNo = pageNo-1;

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Specification<FoodTruck> spec = FoodTruckSpecifications.nameContains(filter);

        Page<FoodTruck> trucks = foodTruckRepository.findAll(spec, pageable);

        // get content for page object
        List<FoodTruck> listOfTrucks = trucks.getContent();

        List<FoodTruckDto> content= listOfTrucks.stream().map(truck -> mapToDTO(truck)).collect(Collectors.toList());

        FoodTruckResponse truckResponse = new FoodTruckResponse();
        truckResponse.setContent(content);
        truckResponse.setPageNo(trucks.getNumber());
        truckResponse.setPageSize(trucks.getSize());
        truckResponse.setTotalElements(trucks.getTotalElements());
        truckResponse.setTotalPages(trucks.getTotalPages());
        truckResponse.setLast(trucks.isLast());

        return truckResponse;
    }

    // convert Model into DTO
    private FoodTruckDto mapToDTO(FoodTruck truck){
        return mapper.map(truck, FoodTruckDto.class);
    }
}