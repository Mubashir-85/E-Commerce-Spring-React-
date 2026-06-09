package com.Backend.Controller;

import com.Backend.Model.Product;
import com.Backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService service;
    @RequestMapping("/")
    public String greet() {
        return "Hello World";
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(){

        return service.getAllProducts();

    }
    public Product getProductById(@PathVariable int id){
        return service.getProductById(id);
    }


}
