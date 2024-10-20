import React, { useRef } from "react";
import SectionTitle from "./SectionTitle";
import emailjs from "emailjs-com";
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

  form {
    margin: 0 auto;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
  }

  dt {
    padding: 10px;
    text-align: left;
  }

  dd {
    margin-left: 0;
  }

  p {
    margin-top: 40px;
    padding-bottom: 20px;
    text-align: center;
    font-family: "Quicksand", sans-serif;
  }

  #name,
  #mail {
    padding-top: 10px;
    padding-bottom: 10px;
    border: none;
    border-radius: 4px;
    width: 98%;
  }

  #message {
    padding-top: 20px;
    padding-bottom: 20px;
    border: none;
    border-radius: 4px;
    width: 98%;
    margin-bottom: 20px;
  }

  #button {
    padding: 10px;
    border: 2px solid #dc143c;
    background-color: #dc143c;
    color: #fff;
    border-radius: 7px;
    width: 200px;
    margin: 0 auto;
    font-family: "Montserrat Subrayada", sans-serif;
    transition: all 0.5s;
  }

  #button:hover {
    color: #dc143c;
    border: 2px solid #fff;
    background-color: #fff;
    transition: all 0.5s;
  }

  @media screen and (max-width: 1000px) {
    .sub-sec-title {
      left: 40%;
    }
  }

  @media screen and (max-width: 600px) {
    form {
      max-width: 300px;
    }

    .sub-sec-title {
      left: 30%;
    }
  }

  @media screen and (max-width: 480px) {
    form {
      max-width: 300px;
    }

    .sub-sec-title {
      left: 25%;
    }
  }
`;

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null); // useRefに型を指定

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "react_contact_detail", // email.js REACT_APP_TEMPLATE_ID
          "react_contact_form", // email.js REACT_APP_SERVICE_ID
          form.current, // 送信するフォーム
          "OAR2oEySxt3bu59bL" // email.js REACT_APP_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <ContactSection id="contact">
      <SectionTitle mainTitle="Contact" subTitle="Contact" />
      <ContactWrapper className="contact-wrapper animated">
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <dl>
            <dt>
              <label htmlFor="name">NAME:</label>
            </dt>
            <dd>
              <input id="name" type="text" name="to_name" />
            </dd>
            <dt>
              <label htmlFor="mail">YOUR MAIL:</label>
            </dt>
            <dd>
              <input id="mail" type="email" name="to_email" />
            </dd>
            <dt>
              <label htmlFor="message">MESSAGE:</label>
            </dt>
            <dd>
              <textarea id="message" name="message"></textarea>
            </dd>
          </dl>
          <input id="button" type="submit" />
        </form>
      </ContactWrapper>
    </ContactSection>
  );
};

export default Contact;
