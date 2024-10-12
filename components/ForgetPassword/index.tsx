"use client";

import React, { useState, ChangeEvent } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../Input";
import styles from "./styles.module.css";
import logo from "../../public/SVG/logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "../Services/ApiServices"; 
import axios from "axios"; 

const ForgetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
    number: "",
    code: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    number: "",
    code: "",
  });

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { password: "", number: "", code: "" };

    if (!/^\d{1,3}$/.test(formData.code)) {
      newErrors.code = "Your country is not supported";
      isValid = false;
    }

    if (!formData.number) {
      newErrors.number = "Phone number cannot be empty";
      isValid = false;
    } else if (!/^\d+$/.test(formData.number) || formData.number.length < 10 || formData.number.length > 11) {
      newErrors.number = "Phone number is wrong. It should be between 10 and 11 digits.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      ...newErrors,
    }));

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      try {
        // Call the forget password API
        const response = await api.forgetPassword({
          mobile: formData.number,
          countryCode: formData.code,
        });
        // Handle successful response
        console.log(response.data.message);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setApiError(error.response.data.message || "Something went wrong");
        } else {
          setApiError("Something went wrong");
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.headerLogo}>
          <Image src={logo} alt="Logo" />
        </div>
        <div className={styles.headrTitle}>
          <IoIosArrowBack
            className={styles.backArrow}
            size={24}
            onClick={() => router.push("/login")} 
          />
          <h2 className={styles.title}>Forget Password</h2>
        </div>
        {apiError && <p className={styles.errorText}>{apiError}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.numberInput}>
            <span>+</span>
            <div className={styles.codeInput}>
              <h3>Code</h3>
              <Input
                type="number"
                placeholder="98"
                value={formData.code}
                onChange={handleInputChange}
                name="code"
                className={`${styles.codeNumber} ${errors.code && styles.errorBorder}`}
              />
              {errors.code && <p className={styles.errorText}>{errors.code}</p>}
            </div>
            <div className={styles.codeInput}>
              <h3>Phone Number</h3>
              <Input
                type="text"
                placeholder="example: 9XXXXXXXXXX"
                value={formData.number}
                onChange={handleInputChange}
                name="number"
                className={`${styles.phoneNumber} ${errors.number && styles.errorBorder}`}
              />
              {errors.number && <p className={styles.errorText}>{errors.number}</p>}
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? <div className={styles.spinner}></div> : "Send Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
