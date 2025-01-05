import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialLinks}>
          <h4>Connect with Me:</h4>
          <a href="https://github.com/akhil4826" target="_blank" rel="noopener noreferrer">
            Github
          </a>
          <a href="mailto:akhilteotia19@gmail.com">Email Me</a>
        </div>
        <div className={styles.message}>
          <p>Building friendships, one connection at a time 💛</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>
          © {new Date().getFullYear()} Akhil Teotia. Made with ❤️ for TuteDude.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
