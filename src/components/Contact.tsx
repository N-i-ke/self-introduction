import React, { useRef } from "react";
import SectionTitle from "./SectionTitle";
import emailjs from "emailjs-com";

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
    <section id="contact">
      <SectionTitle mainTitle="Contact" subTitle="Contact" />
      <div className="contact-wrapper animated">
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
      </div>
    </section>
  );
};

export default Contact;
