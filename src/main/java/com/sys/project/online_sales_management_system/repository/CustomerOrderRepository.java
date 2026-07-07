package com.sys.project.online_sales_management_system.repository;

import com.sys.project.online_sales_management_system.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {

}