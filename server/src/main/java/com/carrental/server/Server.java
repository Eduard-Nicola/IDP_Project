
package com.carrental.server;

import com.carrental.server.database.Car;
import com.carrental.server.database.CarRepository;
import com.carrental.server.database.User;
import com.carrental.server.database.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.IOUtils;

import javax.servlet.http.HttpServletResponse;

@SpringBootApplication
@RestController
public class Server {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CarRepository carRepository;
    private static Logger logger = LoggerFactory.getLogger(Server.class);

    public static void main(String[] args) {
        SpringApplication.run(Server.class, args);
    }

    private static class LoginForm {
        private String email;
        private String passwordHash;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPasswordHash() {
            return passwordHash;
        }

        public void setPasswordHash(String passwordHash) {
            this.passwordHash = passwordHash;
        }
    }

    private static class ResponseLoginSignup {
        private String status;

        public void setStatus(String status) {
            this.status = status;
        }

        public String getStatus() {
            return this.status;
        }
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    @PostMapping(path="/signup")
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody ResponseLoginSignup addNewUser(@RequestBody LoginForm loginForm) {
        ResponseLoginSignup responseLogin = new ResponseLoginSignup();

        // Check if email exists
        User user = userRepository.findByEmail(loginForm.email);
        if (user != null) {
            responseLogin.setStatus("exists");
            return responseLogin;
        }

        User n = new User();
        n.setEmail(loginForm.email);
        n.setPasswordHash(loginForm.passwordHash);
        userRepository.save(n);

        responseLogin.setStatus("added");
        return responseLogin;
    }

    @PostMapping(path="/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody ResponseLoginSignup checkUser(@RequestBody LoginForm loginForm) {
        ResponseLoginSignup responseLogin = new ResponseLoginSignup();

//        logger.info("Email is " + loginForm.email);
//        logger.info("Password is " + loginForm.passwordHash);

        // Check if email exists
        User user = userRepository.findByEmail(loginForm.email);
        if (user != null) {
            if (user.getPasswordHash().equals(loginForm.passwordHash)) {
                responseLogin.setStatus("found");
                return responseLogin;
            } else {
                responseLogin.setStatus("wrong");
                return responseLogin;
            }
        }

        responseLogin.setStatus("not found");
        return responseLogin;
    }

    @GetMapping(path="/cars")
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody Iterable<Car> getCars() {
        return carRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping (
        path = "/{image_path}",
        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public void getImage(HttpServletResponse response, @PathVariable String image_path) throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("static/" + image_path);

        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(classPathResource.getInputStream(), response.getOutputStream());
    }
}
