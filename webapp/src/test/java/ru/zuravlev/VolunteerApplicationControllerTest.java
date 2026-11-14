package ru.zuravlev;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.startsWith;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class VolunteerApplicationControllerTest {

    @LocalServerPort
    int port;

    @Autowired
    VolunteerApplicationRepository repository;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        repository.deleteAll();
    }

    @Test
    public void testSubmitAndFetchApplication() {
        String volunteerNumber = given()
                .contentType(ContentType.JSON)
                .body(Map.of(
                        "corp", "murkoff",
                        "fullName", "Морозов Виктор Павлович",
                        "age", 31,
                        "email", "morozov@example.org",
                        "phone", "+7 (999) 000-19-59",
                        "program", "Программа «Новый Старт»",
                        "motivation", "Ищу поддержку",
                        "needsAccommodation", true,
                        "needsTransfer", true,
                        "agreedToTerms", true
                ))
                .when()
                .post("/api/applications")
                .then()
                .statusCode(201)
                .body("corp", equalTo("murkoff"))
                .body("fullName", equalTo("Морозов Виктор Павлович"))
                .body("volunteerNumber", startsWith("МЕРКОФФ-ЗАБОТА-"))
                .extract()
                .path("volunteerNumber");

        given()
                .when()
                .get("/api/applications/" + volunteerNumber)
                .then()
                .statusCode(200)
                .body("email", equalTo("morozov@example.org"));

        given()
                .when()
                .get("/api/applications/stats")
                .then()
                .statusCode(200)
                .body("murkoff", greaterThanOrEqualTo(1));
    }

    @Test
    public void testRejectInvalidAge() {
        given()
                .contentType(ContentType.JSON)
                .body(Map.of(
                        "corp", "umbrella",
                        "fullName", "Тест",
                        "age", 12,
                        "email", "test@example.org",
                        "phone", "123456",
                        "agreedToTerms", true
                ))
                .when()
                .post("/api/applications")
                .then()
                .statusCode(400);
    }
}
