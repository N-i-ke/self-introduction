import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function Contact() { 
    const form = useRef();

    const sendEmail = (e) => { 
        e.preventDefault();
        emailjs
        .sendForm(
          //email.js REACT_APP_TEMPLATE_ID
          "react_contact_detail",
          //email.js REACT_APP_SERVICE_ID
          "react_contact_form",
          form.current,
          //email.js REACT_APP_PUBLIC_KEY
          "OAR2oEySxt3bu59bL"
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

    return (
      <section id="contact">
        <figure className="text-container col2">
          <h2 className="sec-title text-container__title">
            Contact
            <span className="sub-sec-title">Contact</span>
          </h2>
        </figure>
        <div className="contact-wrapper animateed">
                <form className="contact-form" action="#" ref={form} onSubmit={sendEmail}>
            <dl>
              <dt>
                <label for="name">NAME:</label>
              </dt>
              <dd>
                <input id="name" type="text" name="to_name"/>
              </dd>
              <dt>
                <label for="mail">YOUR MAIL:</label>
              </dt>
              <dd>
                <input id="mail" type="text" name="to_email"/>
              </dd>
              <dt>
                <label for="message">MESSAGE:</label>
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
}
export default Contact

