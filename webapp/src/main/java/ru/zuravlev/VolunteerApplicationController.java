package ru.zuravlev;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class VolunteerApplicationController {

    private static final DateTimeFormatter RU_DATE_FORMAT = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    private final VolunteerApplicationRepository repository;

    public VolunteerApplicationController(VolunteerApplicationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> submitApplication(@RequestBody CreateApplicationRequest request) {
        if (request == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Пустой запрос"));
        }

        String corp = request.getCorp() == null ? "" : request.getCorp().trim().toLowerCase(Locale.ROOT);
        if (!"umbrella".equals(corp) && !"murkoff".equals(corp)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Некорректная корпорация: укажите umbrella или murkoff"));
        }

        String fullName = trimOrEmpty(request.getFullName());
        if (fullName.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Укажите полное имя (ФИО)"));
        }

        if (request.getAge() == null || request.getAge() < 18 || request.getAge() > 80) {
            return ResponseEntity.badRequest().body(Map.of("error", "Возраст должен быть от 18 до 80 лет"));
        }

        String email = trimOrEmpty(request.getEmail());
        if (email.isEmpty() || !email.contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Укажите корректную электронную почту"));
        }

        String phone = trimOrEmpty(request.getPhone());
        if (phone.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Укажите номер телефона"));
        }

        if (!request.isAgreedToTerms()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Необходимо согласие с условиями программы"));
        }

        String program = trimOrEmpty(request.getProgram());
        if (program.isEmpty()) {
            program = "umbrella".equals(corp) ? "Иммунизация «Прародитель-Т»" : "Программа «Новый Старт»";
        }

        String motivation = trimOrEmpty(request.getMotivation());
        if (motivation.length() > 1000) {
            motivation = motivation.substring(0, 1000);
        }

        String code = generateUniqueCode(corp);

        VolunteerApplication entity = new VolunteerApplication();
        entity.setCorp(corp);
        entity.setFullName(fullName);
        entity.setAge(request.getAge());
        entity.setEmail(email);
        entity.setPhone(phone);
        entity.setProgram(program);
        entity.setMotivation(motivation);
        entity.setNeedsAccommodation(request.isNeedsAccommodation());
        entity.setNeedsTransfer(request.isNeedsTransfer());
        entity.setAgreedToTerms(true);
        entity.setStatus("ЗАРЕГИСТРИРОВАНО");
        entity.setCreatedAt(LocalDateTime.now());

        if ("umbrella".equals(corp)) {
            entity.setVolunteerNumber("АМБРЕЛЛА-БИО-" + code);
            entity.setFacility("Медицинский исследовательский корпус Арклей, Блок C");
            entity.setAssignedRole("Ассистент превентивных био-испытаний");
            entity.setClearanceLevel("Уровень 1-B (Био-Скрининг)");
            entity.setIssuedDate(LocalDate.now().format(RU_DATE_FORMAT));
            entity.setBarcode("*АМБРЕЛЛА-" + code + "*");
        } else {
            entity.setVolunteerNumber("МЕРКОФФ-ЗАБОТА-" + code);
            entity.setFacility("Санаторно-оздоровительный комплекс Синьявского, Корпус С-1");
            entity.setAssignedRole("Участник программы социальной адаптации «Новый Старт»");
            entity.setClearanceLevel("Полный пансион (Сектор Синьявского)");
            entity.setIssuedDate("14.11.1959 г.");
            entity.setBarcode("*МЕРКОФФ-ЗАБОТА-" + code + "*");
        }

        VolunteerApplication saved = repository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApplicationResponse.from(saved));
    }

    @GetMapping
    public List<ApplicationResponse> listApplications() {
        return repository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(ApplicationResponse::from)
                .toList();
    }

    @GetMapping("/{volunteerNumber}")
    public ResponseEntity<?> getByVolunteerNumber(@PathVariable String volunteerNumber) {
        return repository.findByVolunteerNumber(volunteerNumber)
                .<ResponseEntity<?>>map(app -> ResponseEntity.ok(ApplicationResponse.from(app)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Заявка не найдена")));
    }

    @GetMapping("/stats")
    public Map<String, Long> stats() {
        long umbrella = repository.countByCorp("umbrella");
        long murkoff = repository.countByCorp("murkoff");
        return Map.of(
                "total", umbrella + murkoff,
                "umbrella", umbrella,
                "murkoff", murkoff
        );
    }

    private String generateUniqueCode(String corp) {
        String prefix = "umbrella".equals(corp) ? "АМБРЕЛЛА-БИО-" : "МЕРКОФФ-ЗАБОТА-";
        for (int attempt = 0; attempt < 25; attempt++) {
            String candidate = String.valueOf(ThreadLocalRandom.current().nextInt(1000, 10000));
            if (!repository.existsByVolunteerNumber(prefix + candidate)) {
                return candidate;
            }
        }
        return String.valueOf(System.currentTimeMillis() % 100000);
    }

    private static String trimOrEmpty(String value) {
        return value == null ? "" : value.trim();
    }

    public static class CreateApplicationRequest {
        private String corp;
        private String fullName;
        private Integer age;
        private String email;
        private String phone;
        private String program;
        private String motivation;
        private boolean needsAccommodation;
        private boolean needsTransfer;
        private boolean agreedToTerms;

        public CreateApplicationRequest() {
        }

        public String getCorp() {
            return corp;
        }

        public void setCorp(String corp) {
            this.corp = corp;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public Integer getAge() {
            return age;
        }

        public void setAge(Integer age) {
            this.age = age;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getProgram() {
            return program;
        }

        public void setProgram(String program) {
            this.program = program;
        }

        public String getMotivation() {
            return motivation;
        }

        public void setMotivation(String motivation) {
            this.motivation = motivation;
        }

        public boolean isNeedsAccommodation() {
            return needsAccommodation;
        }

        public void setNeedsAccommodation(boolean needsAccommodation) {
            this.needsAccommodation = needsAccommodation;
        }

        public boolean isNeedsTransfer() {
            return needsTransfer;
        }

        public void setNeedsTransfer(boolean needsTransfer) {
            this.needsTransfer = needsTransfer;
        }

        public boolean isAgreedToTerms() {
            return agreedToTerms;
        }

        public void setAgreedToTerms(boolean agreedToTerms) {
            this.agreedToTerms = agreedToTerms;
        }
    }

    public static class ApplicationResponse {
        private String id;
        private String volunteerNumber;
        private String fullName;
        private Integer age;
        private String email;
        private String phone;
        private String corp;
        private String facility;
        private String assignedRole;
        private String clearanceLevel;
        private String bloodType;
        private String motivation;
        private boolean needsAccommodation;
        private boolean needsTransfer;
        private String issuedDate;
        private String barcode;
        private String status;
        private String createdAt;

        public ApplicationResponse() {
        }

        public static ApplicationResponse from(VolunteerApplication entity) {
            ApplicationResponse dto = new ApplicationResponse();
            dto.id = "pass-" + entity.getId();
            dto.volunteerNumber = entity.getVolunteerNumber();
            dto.fullName = entity.getFullName();
            dto.age = entity.getAge();
            dto.email = entity.getEmail();
            dto.phone = entity.getPhone();
            dto.corp = entity.getCorp();
            dto.facility = entity.getFacility();
            dto.assignedRole = entity.getAssignedRole();
            dto.clearanceLevel = entity.getClearanceLevel();
            dto.bloodType = entity.getProgram();
            dto.motivation = entity.getMotivation();
            dto.needsAccommodation = entity.isNeedsAccommodation();
            dto.needsTransfer = entity.isNeedsTransfer();
            dto.issuedDate = entity.getIssuedDate();
            dto.barcode = entity.getBarcode();
            dto.status = entity.getStatus();
            dto.createdAt = entity.getCreatedAt() == null ? null : entity.getCreatedAt().toString();
            return dto;
        }

        public String getId() {
            return id;
        }

        public String getVolunteerNumber() {
            return volunteerNumber;
        }

        public String getFullName() {
            return fullName;
        }

        public Integer getAge() {
            return age;
        }

        public String getEmail() {
            return email;
        }

        public String getPhone() {
            return phone;
        }

        public String getCorp() {
            return corp;
        }

        public String getFacility() {
            return facility;
        }

        public String getAssignedRole() {
            return assignedRole;
        }

        public String getClearanceLevel() {
            return clearanceLevel;
        }

        public String getBloodType() {
            return bloodType;
        }

        public String getMotivation() {
            return motivation;
        }

        public boolean isNeedsAccommodation() {
            return needsAccommodation;
        }

        public boolean isNeedsTransfer() {
            return needsTransfer;
        }

        public String getIssuedDate() {
            return issuedDate;
        }

        public String getBarcode() {
            return barcode;
        }

        public String getStatus() {
            return status;
        }

        public String getCreatedAt() {
            return createdAt;
        }
    }
}
