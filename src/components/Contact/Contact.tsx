import React from "react";
import SectionTitle from "../SectionTitle";
import styled from "styled-components";
import { useLocale, type Locale } from "../../contexts/LocaleContext";

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
    padding-bottom: 100px;
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

type ContactCopy = {
  subTitle: string;
  description: React.ReactNode;
  buttonLabel: string;
};

const copy: Record<Locale, ContactCopy> = {
  ja: {
    subTitle: "お問い合わせ",
    description: (
      <>
        お問い合わせは以下ボタンからGoogleフォームにアクセスしてください。
        <br />
        お気軽にご連絡ください。
      </>
    ),
    buttonLabel: "お問い合わせフォームを開く",
  },
  en: {
    subTitle: "Contact",
    description: (
      <>
        Please use the Google Form below to get in touch.
        <br />
        Feel free to reach out about anything.
      </>
    ),
    buttonLabel: "Open contact form",
  },
};

const Contact: React.FC = () => {
  const { locale } = useLocale();
  const c = copy[locale];

  return (
    <ContactSection id="contact">
      <SectionTitle mainTitle="Contact" subTitle={c.subTitle} />
      <ContactWrapper className="contact-wrapper" lang={locale}>
        <div className="contact-info">
          <p className="contact-text">{c.description}</p>
          <a
            href="https://docs.google.com/forms/d/14xlSmgOBjRniA-eGkcnvbUB025-Yzt0Q8f4iQlZ2DnE/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="google-form-button cursor-target"
          >
            {c.buttonLabel}
          </a>
        </div>
      </ContactWrapper>
    </ContactSection>
  );
};

export default Contact;
