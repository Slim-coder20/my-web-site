import styles from "./contact.module.css";
import ContactForm from "@/components/ContactForm/ContactForm";
export default function Contact() {
  // création du formulaire de contact côté client //
  return <div className={styles.contactContainer}>
    <ContactForm />

  </div>;
}
