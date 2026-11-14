package ru.zuravlev;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello World!";
    }

    @GetMapping("/calc")
    public Result calc(@RequestParam(defaultValue = "0") int a,
                       @RequestParam(defaultValue = "0") int b) {
        return new Result(a, b, (long) a + b);
    }

    // Внутренний класс Result с необходимыми конструкторами, геттерами и сеттерами
    public static class Result {
        private int a;
        private int b;
        private long result;

        // Конструктор без аргументов (нужен для сериализации/десериализации Jackson)
        public Result() {
        }

        // Конструктор со всеми полями (исправляет ошибку компиляции)
        public Result(int a, int b, long result) {
            this.a = a;
            this.b = b;
            this.result = result;
        }

        public int getA() {
            return a;
        }

        public void setA(int a) {
            this.a = a;
        }

        public int getB() {
            return b;
        }

        public void setB(int b) {
            this.b = b;
        }

        public long getResult() {
            return result;
        }

        public void setResult(long result) {
            this.result = result;
        }
    }
}