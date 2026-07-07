package com.sys.project.online_sales_management_system.service;

import com.sys.project.online_sales_management_system.entity.CustomerOrder;
import com.sys.project.online_sales_management_system.repository.CustomerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerOrderService {


    @Autowired
    private CustomerOrderRepository customerOrderRepository;


    public List<CustomerOrder> getAllOrders() {
        return customerOrderRepository.findAll();
    }


    public CustomerOrder saveOrder(CustomerOrder order) {
        return customerOrderRepository.save(order);
    }
}