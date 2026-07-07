package com.sys.project.online_sales_management_system.service;

import com.sys.project.online_sales_management_system.entity.Customer;
import com.sys.project.online_sales_management_system.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {


    @Autowired
    private CustomerRepository customerRepository;


    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }


    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
}