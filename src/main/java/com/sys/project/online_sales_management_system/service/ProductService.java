package com.sys.project.online_sales_management_system.service;

import com.sys.project.online_sales_management_system.entity.Product;
import com.sys.project.online_sales_management_system.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id).orElse(null);

        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setQuantity(product.getQuantity());

            return productRepository.save(existingProduct);
        }

        return null;
    }

    
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}