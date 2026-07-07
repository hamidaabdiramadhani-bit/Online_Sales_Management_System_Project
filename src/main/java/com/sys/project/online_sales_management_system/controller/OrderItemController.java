package com.sys.project.online_sales_management_system.controller;

import com.sys.project.online_sales_management_system.entity.OrderItem;
import com.sys.project.online_sales_management_system.service.OrderItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {


    @Autowired
    private OrderItemService orderItemService;


    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }


    @PostMapping
    public OrderItem addOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.saveOrderItem(orderItem);
    }
}