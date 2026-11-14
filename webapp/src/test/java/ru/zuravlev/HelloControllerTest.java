package ru.zuravlev;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static org.hamcrest.Matchers.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloControllerTest {

    @LocalServerPort
    int port;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
    }

    @Test
    public void testHello() {
        when().get("/api/hello")
              .then()
              .statusCode(200)
              .body(is("Hello World!"));
    }

    @Test
    public void testSiteIndex() {
        when().get("/")
              .then()
              .statusCode(200);
    }

    @Test
    public void testCalc() {
        given().param("a", 100)
               .param("b", 200)
               .when().get("/calc")
               .then()
               .statusCode(200)
               .body("a", is(100))
               .body("b", is(200))
               .body("result", is(300));
    }
}