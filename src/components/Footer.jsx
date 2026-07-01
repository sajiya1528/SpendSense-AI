import { APP_NAME } from '../utils/constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span>&copy; {year} {APP_NAME}. All rights reserved.</span>
        <div className="d-flex gap-3">
          <a href="#" className="text-secondary text-decoration-none small">
            Privacy
          </a>
          <a href="#" className="text-secondary text-decoration-none small">
            Terms
          </a>
          <a href="#" className="text-secondary text-decoration-none small">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
