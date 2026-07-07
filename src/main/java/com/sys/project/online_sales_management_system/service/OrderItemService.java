package com.sys.project.online_sales_management_system.service;

import com.sys.project.online_sales_management_system.entity.OrderItem;
import com.sys.project.online_sales_management_system.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {


    @Autowired
    private OrderItemRepository orderItemRepository;


    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }


    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }
}