package edu.bingo.employee.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name = "role")
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank
    @Enumerated(EnumType.STRING)
    @Column(name = "role_type")
    private AvailableRoles name;


    public Role() {

    }

    public Role(AvailableRoles name) {
        this.name = name;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AvailableRoles getName() {
        return this.name;
    }

    public void setName(AvailableRoles name) {
        this.name = name;
    }

}
