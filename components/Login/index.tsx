"use client";

import React, { useState, ChangeEvent } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../Input";
import styles from "./styles.module.css";
import logo from "../../public/SVG/logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import axios from "axios";
import { api } from "../Services/ApiServices";
import ErrorMessage from "../ErroMessage/ErrorMessage";  // Import ErrorMessage component

const LoginComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
    number: "",
    code: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      api.login(formData.number, formData.password, formData.code).then((res) => {
        const accessToken = res?.data?.data?.accessToken;
        document.cookie = `accessToken=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60};`;
        router.push("/");
      }).catch((err) => {
        setApiError(err?.response?.data?.message || "An error occurred while logging in.");
          setLoading(false);
      })
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <div className={styles.headerLogo}>
            <Link href="/" passHref>
              <Image src={logo} alt="Logo" width={150} height={50} />
            </Link>
          </div>

          <div className={styles.headerTitle}>
            <Link href="/" passHref>
              <span className={styles.backArrow} title="Home">
                <IoIosArrowBack size={24} />
              </span>
            </Link>
            <h2 className={styles.title}>Login</h2>
          </div>

          {/* API error message with "api" type */}
          <ErrorMessage message={apiError} type="api" />

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.numberInput}>
              <span>+</span>
              <div className={styles.codeInput}>
                <Input
                  label="Code"
                  type="number"
                  placeholder="98"
                  value={formData.code}
                  onChange={handleInputChange}
                  name="code"
                  className={styles.codeNumber}
                />
                {/* Validation error message */}
                <ErrorMessage message={errors.code} type="validation" />
              </div>

              <div className={styles.phoneInput}>
                <Input
                  label="Phone Number"
                  type="text"
                  placeholder="example: 9XXXXXXXXXX"
                  value={formData.number}
                  onChange={handleInputChange}
                  name="number"
                  className={styles.phoneNumber}
                />
                {/* Validation error message */}
                <ErrorMessage message={errors.number} type="validation" />
              </div>
            </div>

            <div className={styles.passwordInput}>
              <h3>Password</h3>
              <div className={styles.passwordContainer}>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  className={styles.password}
                />
                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEye size={24} /> : <IoEyeOff size={24} />}
                </span>
              </div>
              {/* Validation error message */}
              <ErrorMessage message={errors.password} type="validation" />
            </div>

            <div className={styles.forgotPassword}>
              <Link href="/ForgetPassword" className={styles.forgotPasswordLink}>
                Forget Password?
              </Link>
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? <div className={styles.spinner}></div> : "Sign in"}
            </button>

            <p className={styles.registerText}>
              Haven’t registered yet?{" "}
              <Link href="/SignUp" className={styles.registerLink}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
