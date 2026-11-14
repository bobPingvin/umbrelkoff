package ru.zuravlev;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "volunteer_applications")
public class VolunteerApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    private String volunteerNumber;

    @Column(nullable = false, length = 32)
    private String corp;

    @Column(nullable = false, length = 180)
    private String fullName;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false, length = 180)
    private String email;

    @Column(nullable = false, length = 64)
    private String phone;

    @Column(nullable = false, length = 200)
    private String program;

    @Column(length = 1000)
    private String motivation;

    @Column(nullable = false)
    private boolean needsAccommodation;

    @Column(nullable = false)
    private boolean needsTransfer;

    @Column(nullable = false)
    private boolean agreedToTerms;

    @Column(nullable = false, length = 255)
    private String facility;

    @Column(nullable = false, length = 255)
    private String assignedRole;

    @Column(nullable = false, length = 160)
    private String clearanceLevel;

    @Column(nullable = false, length = 32)
    private String issuedDate;

    @Column(nullable = false, length = 64)
    private String barcode;

    @Column(nullable = false, length = 64)
    private String status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public VolunteerApplication() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVolunteerNumber() {
        return volunteerNumber;
    }

    public void setVolunteerNumber(String volunteerNumber) {
        this.volunteerNumber = volunteerNumber;
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

    public String getFacility() {
        return facility;
    }

    public void setFacility(String facility) {
        this.facility = facility;
    }

    public String getAssignedRole() {
        return assignedRole;
    }

    public void setAssignedRole(String assignedRole) {
        this.assignedRole = assignedRole;
    }

    public String getClearanceLevel() {
        return clearanceLevel;
    }

    public void setClearanceLevel(String clearanceLevel) {
        this.clearanceLevel = clearanceLevel;
    }

    public String getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(String issuedDate) {
        this.issuedDate = issuedDate;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
