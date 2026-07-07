package com.sys.project.online_sales_management_system.repository;

import com.sys.project.online_sales_management_system.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}