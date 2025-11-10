package com.smartprescription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DoctorInformation Entity
 * 
 * Stores doctor's profile and chamber information.
 * Used for prescription header/footer.
 */
@Entity
@Table(name = "DoctorInformation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorInformation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String docname;
    private String docdegree;
    
    @Column(name = "docname_bangla")
    private String docnameBangla;
    
    @Column(name = "docdegree_bangla")
    private String docdegreeBangla;
    
    @Column(length = 500)
    private String docdetail;
    
    @Column(name = "docdetail_bangla", length = 500)
    private String docdetailBangla;
    
    @Column(name = "moredetail_bangla", length = 500)
    private String moredetailBangla;
    
    private String chamber;
    
    @Column(name = "chamber_location")
    private String chamberLocation;
    
    @Column(name = "visit_date")
    private String visitDate;
    
    @Column(name = "visit_time")
    private String visitTime;
    
    @Column(name = "chamber_phone")
    private String chamberPhone;
    
    @Column(length = 500)
    private String outro;
    
    private Integer leftremain;
    private Integer rightremain;
}
