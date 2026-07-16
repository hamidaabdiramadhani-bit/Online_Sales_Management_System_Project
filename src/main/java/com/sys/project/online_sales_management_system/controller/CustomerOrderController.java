package com.sys.project.online_sales_management_system.controller;

import jakarta.validation.Valid;
import com.sys.project.online_sales_management_system.dto.CreateOrderRequest;
import com.sys.project.online_sales_management_system.entity.CustomerOrder;
import com.sys.project.online_sales_management_system.service.CustomerOrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class CustomerOrderController {


    @Autowired
    private CustomerOrderService customerOrderService;


    @GetMapping
    public List<CustomerOrder> getAllOrders() {
        return customerOrderService.getAllOrders();
    }

    @GetMapping("/{id}")
public CustomerOrder getOrderById(@PathVariable Long id) {
    return customerOrderService.getOrderById(id);
}


    @PostMapping
public CustomerOrder createOrder(@Valid @RequestBody CreateOrderRequest request) {
    return customerOrderService.createOrder(request);
}

@DeleteMapping("/{id}")
public String deleteOrder(@PathVariable Long id) {
    customerOrderService.deleteOrder(id);
    return "Order deleted successfully";
}

@PutMapping("/{id}")
public ResponseEntity<CustomerOrder> updateOrder(
        @PathVariable Long id,
        @RequestBody CreateOrderRequest request
) {

    CustomerOrder updatedOrder = customerOrderService.updateOrder(id, request);

    return ResponseEntity.ok(updatedOrder);
}

}