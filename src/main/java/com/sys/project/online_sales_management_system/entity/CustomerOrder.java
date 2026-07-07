package com.sys.project.online_sales_management_system.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class CustomerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private LocalDateTime orderDate;


    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;


    public CustomerOrder() {
    }


    public CustomerOrder(Long id, LocalDateTime orderDate, Customer customer) {
        this.id = id;
        this.orderDate = orderDate;
        this.customer = customer;
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public LocalDateTime getOrderDate() {
        return orderDate;
    }


    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }


    public Customer getCustomer() {
        return customer;
    }


    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}