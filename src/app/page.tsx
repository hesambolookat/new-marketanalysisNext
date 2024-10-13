import React from "react";
import Header from "../../components/Header"; 
import Footer from "../../components/Footer";
import Main from "../../components/Main";  
import styles from "./page.module.css"; 

const Page: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <Main />    
      <Footer />
    </div>
  );
};

export default Page;
