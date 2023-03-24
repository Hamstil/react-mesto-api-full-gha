import React from "react";

function Footer() {
  const fullYear = new Date();

  return (
    <footer className="footer page__footer">
      <p className="footer__paragraph">
        © {fullYear.getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
