"use client";


import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import logo from "../../public/SVG/logo.svg";
import globeIcon from "../../public/SVG/globe.svg";
import downArrow from "../../public/SVG/down-arrow.svg";
import upArrow from "../../public/SVG/up-arrow.svg";
import mobile from "../../public/images/trade2.png";
import Button from "../Bottuns/Buttons";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>("EN");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <Image src={logo} alt="Logo" />
        </div>
        <div className={styles.headerNav}>
          <Image
            src={globeIcon}
            alt="Globe"
            className={styles.headerGlobeIcon}
          />
          <div className={styles.headerDropdown}>
            <button
              className={styles.headerDropdownButton}
              onClick={toggleDropdown}
            >
              {selectedLang}
              <Image
                src={isOpen ? upArrow : downArrow}
                alt="Arrow"
                className={styles.headerDropdownArrow}
              />
            </button>
            <div
              className={`${styles.headerDropdownContent} ${
                isOpen ? styles.show : ""
              }`}
            >
              <a onClick={() => handleLangChange("EN")} href="#">
                EN
              </a>
              <a onClick={() => handleLangChange("FA")} href="#">
                FA
              </a>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <a href="/login">
              <Button variant="login">Login</Button>
            </a>
            <a href="/SignUp">
              <Button variant="signup">Sign up</Button>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.paternCont}></div>

        <div className={styles.patern}>
          <div className={styles.content}>
            <div className={styles.text}>
              <h1>
                <span style={{ fontWeight: "500" }}>THE </span>
                <span style={{ fontWeight: "700" }}>FUTURE </span>
                <span style={{ fontWeight: "500" }}>OF </span>
                <span style={{ fontWeight: "700" }}>MINERAL MARKET </span>
                <span style={{ fontWeight: "500" }}>IS HERE WITH </span>
              </h1>
              <h2>
                <span className={styles.bounce}>N</span>
                <span className={styles.bounce}>E</span>
                <span className={styles.bounce}>W</span>
                <span className={styles.bounce}>i</span>
                <span className={styles.bounce}>s</span>
                <span className={styles.bounce}>N</span>
                <span className={styles.bounce}>E</span>
                <span className={styles.bounce}>W</span>
              </h2>

              <p>
                NEW, an innovative and user-friendly AI model that uses
                cutting-edge machine learning techniques to predict Iron ore
                prices and analyze the market. NEW is revolutionizing AI
                technology in business at all levels. Your AI partner!
              </p>
              <p className={styles.tryButton}>Try it now!</p>
            </div>
            <div className={styles.mobileMockup}>
              <Image
                src={mobile}
                loading="lazy"
                decoding="async"
                alt="Mobile Mockup"
              />
              <div className={styles.triangleCont}>
                <div className={styles.triangleLeft}></div>
                <div className={styles.triangleRight}></div>
              </div>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
