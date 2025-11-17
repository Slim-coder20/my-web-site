"use client";
import styles from "./contact.module.css";

export default function ContactForm() {

  return (
    <div className={styles.contactFormContainer}>
      <form className={styles.contactForm} >
        <div className={styles.contactFormGroup}>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.contactFormInput}
          />
        </div>
        <div className={styles.contactFormGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.contactFormInput}
          />
        </div>
        <div className={styles.contactFormGroup}>
          <label htmlFor="subject">Sujet</label>
          <select
            id="subject"
            name="subject"
            className={styles.contactFormInput}
          >
            <option value="Demande de contact">Demande de contact</option>
            <option value="Demande de collaboration">
              Demande de collaboration
            </option>
            <option value="Demande de concert">Demande de concert</option>
            <option value="Demande de presse">Demande de presse</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className={styles.contactFormGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            className={styles.contactTextarea}
          />
        </div>
        <button type="submit" className={styles.contactFormButton}>
          Envoyer
        </button>
      </form>
    </div>
  );
}
