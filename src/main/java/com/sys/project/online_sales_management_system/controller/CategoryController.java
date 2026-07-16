package com.sys.project.online_sales_management_system.controller;

import jakarta.validation.Valid;
import com.sys.project.online_sales_management_system.entity.Category;
import com.sys.project.online_sales_management_system.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // ==========================
    // Get All Categories
    // ==========================

    @GetMapping
    public List<Category> getAllCategories() {

        return categoryService.getAllCategories();

    }

    

@PostMapping
public Category addCategory(@Valid @RequestBody Category category) {
    return categoryService.saveCategory(category);
}
}