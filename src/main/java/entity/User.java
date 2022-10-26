package entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="User")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="user_id")
    private int user_id;

    @Column(name="first_name")
    private String first_name;

    @Column(name="last_name")
    private String last_name;

    @Column(name="email")
    private String email;

    @Column(name="address")
    private String address;

    @Column(name="contact_number")
    private int contact_number;

    @Column(name="dob")
    private Date dob;

    @Column(name="gender")
    private String gender;

    @Column(name="account_type")
    private String account_type;

    @Column(name="Date_created")
    private Date Date_created;

    public int getUser_id() {
        return user_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public int getContact_number() {
        return contact_number;
    }

    public Date getDob() {
        return dob;
    }

    public String getGender() {
        return gender;
    }

    public String getAccount_type() {
        return account_type;
    }

    public Date getDate_created() {
        return Date_created;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setContact_number(int contact_number) {
        this.contact_number = contact_number;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setAccount_type(String account_type) {
        this.account_type = account_type;
    }

    public void setDate_created(Date Date_created) {
        this.Date_created = Date_created;
    }
}
