package com.sys.project.online_sales_management_system;

import com.sys.project.online_sales_management_system.repository.CategoryRepository;
import com.sys.project.online_sales_management_system.repository.CustomerRepository;
import com.sys.project.online_sales_management_system.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("dev")
class DataInitializerTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void initializerSeedsCatalogAndCustomerData() {
        assertThat(categoryRepository.count()).isGreaterThan(0);
        assertThat(productRepository.count()).isGreaterThan(0);
        assertThat(customerRepository.count()).isGreaterThan(0);
    }
}
