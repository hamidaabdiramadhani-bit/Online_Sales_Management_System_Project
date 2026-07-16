package com.sys.project.online_sales_management_system.controller;


import com.sys.project.online_sales_management_system.repository.CategoryRepository;
import com.sys.project.online_sales_management_system.repository.CustomerOrderRepository;
import com.sys.project.online_sales_management_system.repository.CustomerRepository;
import com.sys.project.online_sales_management_system.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
     private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final CustomerOrderRepository orderRepository;
    private final CategoryRepository categoryRepository;

    public AdminController(
            ProductRepository productRepository,
            CustomerRepository customerRepository,
            CustomerOrderRepository orderRepository,
            CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {

        Map<String, Object> data = new HashMap<>();

        data.put("products", productRepository.count());
        data.put("customers", customerRepository.count());
        data.put("orders", orderRepository.count());
        data.put("categories", categoryRepository.count());

        return data;
    }


}
