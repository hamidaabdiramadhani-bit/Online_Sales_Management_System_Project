package com.sys.project.online_sales_management_system.Config;

import com.sys.project.online_sales_management_system.entity.Category;
import com.sys.project.online_sales_management_system.entity.Customer;
import com.sys.project.online_sales_management_system.entity.Product;
import com.sys.project.online_sales_management_system.entity.User;
import com.sys.project.online_sales_management_system.repository.CategoryRepository;
import com.sys.project.online_sales_management_system.repository.CustomerRepository;
import com.sys.project.online_sales_management_system.repository.ProductRepository;
import com.sys.project.online_sales_management_system.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsersAndCatalog(
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByUsername("admin").isEmpty()) {

                User admin = new User();

                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");

                userRepository.save(admin);

                System.out.println("Admin account created.");
            }

            if (userRepository.findByUsername("user").isEmpty()) {

                User user = new User();

                user.setUsername("user");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRole("USER");

                userRepository.save(user);

                System.out.println("User account created.");
            }

            if (categoryRepository.count() == 0) {
                Category electronics = new Category();
                electronics.setName("Electronics");
                categoryRepository.save(electronics);

                Category fashion = new Category();
                fashion.setName("Fashion");
                categoryRepository.save(fashion);

                Category home = new Category();
                home.setName("Home");
                categoryRepository.save(home);

                System.out.println("Starter categories created.");
            }

            if (productRepository.count() == 0) {
                Category electronics = categoryRepository.findAll().stream()
                        .filter(category -> "Electronics".equals(category.getName()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Electronics category not found"));

                Category fashion = categoryRepository.findAll().stream()
                        .filter(category -> "Fashion".equals(category.getName()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Fashion category not found"));

                Category home = categoryRepository.findAll().stream()
                        .filter(category -> "Home".equals(category.getName()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Home category not found"));

                Product headphones = new Product();
                headphones.setName("Wireless Headphones");
                headphones.setDescription("Noise-cancelling over-ear headphones");
                headphones.setPrice(180000.0);
                headphones.setQuantity(15);
                headphones.setCategory(electronics);
                productRepository.save(headphones);

                Product smartwatch = new Product();
                smartwatch.setName("Smart Watch");
                smartwatch.setDescription("Fitness and notification smart watch");
                smartwatch.setPrice(220000.0);
                smartwatch.setQuantity(10);
                smartwatch.setCategory(electronics);
                productRepository.save(smartwatch);

                Product sneakers = new Product();
                sneakers.setName("Running Sneakers");
                sneakers.setDescription("Comfortable everyday running shoes");
                sneakers.setPrice(90000.0);
                sneakers.setQuantity(20);
                sneakers.setCategory(fashion);
                productRepository.save(sneakers);

                Product lamp = new Product();
                lamp.setName("LED Desk Lamp");
                lamp.setDescription("Adjustable brightness desk lamp");
                lamp.setPrice(50000.0);
                lamp.setQuantity(12);
                lamp.setCategory(home);
                productRepository.save(lamp);

                System.out.println("Starter products created.");
            }

            if (customerRepository.count() == 0) {
                Customer customer = new Customer();
                customer.setFirstName("Anna");
                customer.setLastName("Mosha");
                customer.setEmail("anna@example.com");
                customer.setPhone("0712345678");
                customerRepository.save(customer);

                System.out.println("Starter customer created.");
            }

        };

    }

}