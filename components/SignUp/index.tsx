"use client";

import React, { useState, ChangeEvent } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../Input";
import styles from "./styles.module.css";
import logo from "../../public/SVG/logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "../../components/Services/ApiServices"; // Import API functions
import Link from "next/link";
import axios from "axios";

const SigUp: React.FC = () => {
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

    // Validate code
    if (!/^\d{1,3}$/.test(formData.code)) {
      newErrors.code = "Your country code is not valid.";
      isValid = false;
    }

    // Validate phone number
    if (!formData.number) {
      newErrors.number = "Phone number cannot be empty.";
      isValid = false;
    } else if (!/^\d+$/.test(formData.number) || formData.number.length < 10 || formData.number.length > 11) {
      newErrors.number = "Phone number is wrong. It should be between 10 and 11 digits.";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    // Clear previous errors before setting new ones
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
        // Make API call to sign up
        const response = await api.signUp({
          mobile: formData.number,
          countryCode: formData.code,
        });
        
        // Handle successful response
        console.log(response.data);
        // Redirect or show success message as needed
        // router.push('/next-step'); // Redirect to the next step
      } catch (error) {
        // Handle error response
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
        {/* Arrow left */}
        <div className={styles.headrTitle}>
          <IoIosArrowBack
            className={styles.backArrow}
            size={24}
            onClick={() => router.push("/login")} // Navigate back to the main page
          />
          <h2 className={styles.title}>Sign Up</h2>
        </div>
        {apiError && <p className={styles.errorText}>{apiError}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Input for phone number */}
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

          {/* Login button */}
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? <div className={styles.spinner}></div> : "Sign Up"}
          </button>

          <p className={styles.registerText}>
            Already registered?{" "}
            <Link href="/login" className={styles.registerLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SigUp;
