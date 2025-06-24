import React from "react";
import SectionTitle from "./SectionTitle";
import styled from "styled-components";

// Styled components
const ContactSection = styled.section`
  padding-top: 20px;
  background-color: #808080;
  text-align: center;
`;

const ContactWrapper = styled.div`
  padding-top: 0px;
  margin-bottom: 0;
  font-family: "Montserrat Subrayada", sans-serif;

  .contact-info {
    margin: 0 auto;
    max-width: 600px;
    padding-bottom: 50px;
  }

  .contact-text {
    margin-top: 40px;
    padding-bottom: 20px;
    text-align: center;
    font-family: "Quicksand", sans-serif;
    color: #fff;
    line-height: 1.8;
    font-size: 1.1rem;
  }

  .google-form-button {
    padding: 15px 30px;
    border: 2px solid #dc143c;
    background-color: #dc143c;
    color: #fff;
    border-radius: 7px;
    font-family: "Montserrat Subrayada", sans-serif;
    font-size: 1.1rem;
    text-decoration: none;
    display: inline-block;
    margin-top: 20px;
    transition: all 0.5s;
    cursor: pointer;
  }

  .google-form-button:hover {
    color: #dc143c;
    border: 2px solid #fff;
    background-color: #fff;
    transition: all 0.5s;
  }

  .form-features {
    margin-top: 30px;
    color: #fff;
    font-family: "Quicksand", sans-serif;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .form-features ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
  }

  .form-features li {
    margin: 5px 0;
    padding-left: 20px;
    position: relative;
  }

  .form-features li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #4CAF50;
    font-weight: bold;
  }

  @media screen and (max-width: 1000px) {
    .sub-sec-title {
      left: 40%;
    }
  }

  @media screen and (max-width: 600px) {
    .contact-info {
      max-width: 300px;
    }

    .sub-sec-title {
      left: 30%;
    }

    .contact-text {
      font-size: 1rem;
    }

    .google-form-button {
      font-size: 1rem;
      padding: 12px 25px;
    }
  }

  @media screen and (max-width: 480px) {
    .contact-info {
      max-width: 300px;
    }

    .sub-sec-title {
      left: 25%;
    }
  }
`;

const Contact: React.FC = () => {
  return (
    <ContactSection id="contact">
      <SectionTitle mainTitle="Contact" subTitle="Contact" />
      <ContactWrapper className="contact-wrapper animated">
        <div className="contact-info">
          <p className="contact-text">
            お問い合わせは以下ボタンからGoogleフォームにアクセスしてください。
            <br />
            お気軽にご連絡ください。
          </p>
          
          <a 
            href="https://docs.google.com/forms/d/14xlSmgOBjRniA-eGkcnvbUB025-Yzt0Q8f4iQlZ2DnE/viewform" 
            target="_blank" 
            rel="noopener noreferrer"
            className="google-form-button"
          >
            お問い合わせフォームを開く
          </a>
        </div>
      </ContactWrapper>
    </ContactSection>
  );
};

export default Contact;
