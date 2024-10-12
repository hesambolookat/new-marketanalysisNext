import React from 'react';
import Image from 'next/image';  
import styles from './styles.module.css'; 
import business from '../../public/SVG/business.svg';
import predict from '../../public/SVG/predict.svg';
import ml from '../../public/SVG/ml.svg';
import arrowRight from '../../public/SVG/arrow-right.svg';
import sample from '../../public/videos/sample.mp4';

const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>NEW knows what you are looking for</div>
        
        <div className={styles.cards}>
          <div className={styles.card}>
            <Image src={business} alt="Market Trends Analysis" />  
            <h3>Market Trends Analysis</h3>
            <p>Mapping market trends can be a game-changer for any business. Monitoring changes in the market will help you to identify patterns and opportunities.</p>
          </div>
          <div className={styles.card}>
            <Image src={predict} alt="Risk Management" />  
            <h3>Risk Management</h3>
            <p>With NEW, Protect your asset and reputation in the increasing complexities of the business environment.</p>
          </div>
          <div className={styles.card}>
            <Image src={ml} alt="Advanced Machine Learning" />  
            <h3>Advanced Machine learning in market and business</h3>
            <p>NEW is a platform leverages machine learning and statistical models to make changes in the mineral trade industry.</p>
          </div>
        </div>

        <p className={styles.title}>Video on NEW</p>

        <div className={styles.videoSection}>
          <div className={styles.patternContLtr}></div>

          <div className={styles.descriptionCont}>
            <p className={styles.description}>
              NEW, a novel AI model that uses cutting-edge machine learning techniques to predict Iron ore prices. NEW is revolutionizing AI technology in business at all levels. Your AI partner that predicts Iron ore prices for develop and transfer your business.
            </p>
            <p className={styles.descriptionSecond}>Here are some advantages choosing NEW as your AI partner:</p>
            <div className={styles.descriptionLi}>
              <Image src={arrowRight} alt="arrowRight" />  
              <p>
                Alongside AL, ML statistical learning and historical data, we used the strong background of Dr. Keyvan Jafari Tehrani in mineral trade and business to model the market behaviors.
              </p>
            </div>
            <div className={styles.descriptionLi}>
              <Image src={arrowRight} alt="arrowRight" />  
              <p>NEW is adjusted to the market movements, therefore, it will help you grow your business by finding opportunities and managing risks.</p>
            </div>
            <div className={styles.descriptionLi}>
              <Image src={arrowRight} alt="arrowRight" />  
              <p>NEW will warn you if there is a risk of sudden fluctuation.</p>
            </div>
          </div>

          <div className={styles.videoContainer}>
            <div className={styles.videoPlayer}>
              <video controls>
                <source src={sample} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className={styles.description}>Please click on this video to see more.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
