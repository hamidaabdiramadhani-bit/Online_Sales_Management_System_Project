package com.sys.project.online_sales_management_system.service;

import com.sys.project.online_sales_management_system.entity.CustomerOrder;
import com.sys.project.online_sales_management_system.repository.CustomerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sys.project.online_sales_management_system.dto.CreateOrderRequest;
import com.sys.project.online_sales_management_system.entity.Customer;
import com.sys.project.online_sales_management_system.entity.OrderItem;
import com.sys.project.online_sales_management_system.entity.Product;
import com.sys.project.online_sales_management_system.repository.CustomerRepository;
import com.sys.project.online_sales_management_system.repository.ProductRepository;
import com.sys.project.online_sales_management_system.repository.OrderItemRepository;

import java.time.LocalDateTime;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerOrderService {


    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Autowired
private CustomerRepository customerRepository;

@Autowired
private ProductRepository productRepository;

@Autowired
private OrderItemRepository orderItemRepository;

    public List<CustomerOrder> getAllOrders() {
        return customerOrderRepository.findAll();
    }

public CustomerOrder getOrderById(Long id) {
    return customerOrderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
}

    public CustomerOrder saveOrder(CustomerOrder order) {
        return customerOrderRepository.save(order);
    }
    @Transactional
public CustomerOrder createOrder(CreateOrderRequest request) {

    Customer customer = customerRepository.findById(request.getCustomerId())
            .orElseThrow(() -> new RuntimeException("Customer not found"));

    Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

    if (product.getQuantity() < request.getQuantity()) {
    throw new RuntimeException("Insufficient stock");
}
    CustomerOrder order = new CustomerOrder();

order.setCustomer(customer);
order.setOrderDate(java.time.LocalDateTime.now());

Double total = product.getPrice() * request.getQuantity();

order.setTotalAmount(total);

CustomerOrder savedOrder = customerOrderRepository.save(order);


OrderItem item = new OrderItem();

item.setOrder(savedOrder);
item.setProduct(product);
item.setQuantity(request.getQuantity());
item.setUnitPrice(product.getPrice());

orderItemRepository.save(item);


savedOrder.getItems().add(item);

product.setQuantity(product.getQuantity() - request.getQuantity());
productRepository.save(product);

customerOrderRepository.save(savedOrder);

return savedOrder;

    }
}