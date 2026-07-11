package com.sys.project.online_sales_management_system.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private Integer quantity;


    @Column(nullable = false)
    private Double unitPrice;


    @JsonBackReference
@ManyToOne
@JoinColumn(name = "order_id", nullable = false)
private CustomerOrder order;


    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;


    public OrderItem() {
    }


    public OrderItem(Long id, Integer quantity, Double unitPrice,
                     CustomerOrder order, Product product) {

        this.id = id;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.order = order;
        this.product = product;
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public Integer getQuantity() {
        return quantity;
    }


    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


    public Double getUnitPrice() {
        return unitPrice;
    }


    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }


    public CustomerOrder getOrder() {
        return order;
    }


    public void setOrder(CustomerOrder order) {
        this.order = order;
    }


    public Product getProduct() {
        return product;
    }


    public void setProduct(Product product) {
        this.product = product;
    }
}