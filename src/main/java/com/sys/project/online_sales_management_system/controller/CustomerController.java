package com.sys.project.online_sales_management_system.controller;


import com.sys.project.online_sales_management_system.entity.Customer;
import com.sys.project.online_sales_management_system.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/customers")
public class CustomerController {


    @Autowired
    private CustomerService customerService;


    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }


    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer){
        return customerService.saveCustomer(customer);
    }
}