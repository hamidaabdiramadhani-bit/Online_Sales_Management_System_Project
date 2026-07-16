package com.sys.project.online_sales_management_system.service;

import com.sys.project.online_sales_management_system.entity.Category;
import com.sys.project.online_sales_management_system.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // ===========================
    // Get All Categories
    // ===========================

    public List<Category> getAllCategories() {

        return categoryRepository.findAll();

    }

    // ===========================
    // Get Category By Id
    // ===========================

    public Category getCategoryById(Long id) {

        return categoryRepository.findById(id).orElse(null);

    }

    // ===========================
    // Save Category
    // ===========================

    public Category saveCategory(Category category) {

        return categoryRepository.save(category);

    }
}