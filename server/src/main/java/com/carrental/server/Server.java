
package com.carrental.server;

import com.carrental.server.database.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "http://localhost:9090")
@SpringBootApplication
@RestController
public class Server {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CarRepository carRepository;

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

    private static class ReserveForm {
        private Integer userId;
        private Integer carId;
        private String fromDate;
        private String toDate;

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public Integer getCarId() {
            return carId;
        }

        public void setCarId(Integer carId) {
            this.carId = carId;
        }

        public String getFromDate() {
            return fromDate;
        }

        public void setFromDate(String fromDate) {
            this.fromDate = fromDate;
        }

        public String getToDate() {
            return toDate;
        }

        public void setToDate(String toDate) {
            this.toDate = toDate;
        }
    }

    private static class UnReserveForm {
        private Integer carId;

        public Integer getCarId() {
            return carId;
        }

        public void setCarId(Integer carId) {
            this.carId = carId;
        }
    }

    private static class Response {
        private String status;

        public void setStatus(String status) {
            this.status = status;
        }

        public String getStatus() {
            return this.status;
        }
    }

    private static class ResponseLoginSignup {
        private String status;
        private Integer id;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    @PostMapping(path="/signup")
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody ResponseLoginSignup addNewUser(@RequestBody LoginForm loginForm) {
        ResponseLoginSignup responseSignup = new ResponseLoginSignup();

        // Check if email exists
        User user = userRepository.findByEmail(loginForm.email);
        if (user != null) {
            responseSignup.setStatus("exists");
            responseSignup.setId(user.getId());
            return responseSignup;
        }

        User n = new User();
        n.setEmail(loginForm.email);
        n.setPasswordHash(loginForm.passwordHash);
        userRepository.save(n);

        responseSignup.setStatus("added");
        responseSignup.setId(n.getId());
        return responseSignup;
    }

    @PostMapping(path="/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody ResponseLoginSignup checkUser(@RequestBody LoginForm loginForm) {
        ResponseLoginSignup responseLogin = new ResponseLoginSignup();

        // Check if email exists
        User user = userRepository.findByEmail(loginForm.email);
        if (user != null) {
            if (user.getPasswordHash().equals(loginForm.passwordHash)) {
                responseLogin.setStatus("found");
                responseLogin.setId(user.getId());
                return responseLogin;
            } else {
                responseLogin.setStatus("wrong");
                responseLogin.setId(-1);
                return responseLogin;
            }
        }

        responseLogin.setStatus("not found");
        responseLogin.setId(-1);
        return responseLogin;
    }

    @GetMapping(path="/cars")
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody Iterable<Car> getCars() {
        return carRepository.findAll();
    }

    @PostMapping(path="/reserve")
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody Response reserveCar(@RequestBody ReserveForm reserveForm) {
        Response responseReserve = new Response();

        // Check if car exists
        Optional<Car> optionalCar = carRepository.findById(reserveForm.carId);
        if (optionalCar.isPresent()) {
            Car car = optionalCar.get();

            car.setReserved(reserveForm.userId);
            car.setReservedFrom(reserveForm.fromDate);
            car.setReservedTo(reserveForm.toDate);
            carRepository.save(car);

            responseReserve.setStatus("updated");
            return responseReserve;
        }

        responseReserve.setStatus("not found");
        return responseReserve;
    }

    @PostMapping(path="/unreserve")
    @CrossOrigin(origins = "http://localhost:3000")
    public @ResponseBody Response unReserveCar(@RequestBody UnReserveForm unReserveForm) {
        Response responseReserve = new Response();

        // Check if car exists
        Optional<Car> optionalCar = carRepository.findById(unReserveForm.carId);
        if (optionalCar.isPresent()) {
            Car car = optionalCar.get();

            car.setReserved(0);
            car.setReservedFrom("none");
            car.setReservedTo("none");
            carRepository.save(car);

            responseReserve.setStatus("updated");
            return responseReserve;
        }

        responseReserve.setStatus("not found");
        return responseReserve;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping (
        path = "/photos/{image_path}",
        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public void getImage(HttpServletResponse response, @PathVariable String image_path) throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("static/" + image_path);

        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(classPathResource.getInputStream(), response.getOutputStream());
    }
}
