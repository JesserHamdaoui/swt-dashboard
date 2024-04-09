import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="copyright">
        &copy; Copytight{" "}
        <strong>
          <span>Smart Wind Turbine</span>
        </strong>
        . All Rights Reserved
      </div>
      <strong>
        <span>ISS196 Project Freshman 2 - 2024</span>
      </strong>
      <div className="names">
        <span>Ilyess Jamouci</span>
        <span>Ahmed Said</span>
        <span>Mahdi Fakhfakh</span>
        <span>Brahim Ammous</span>
        <span className="last-item">Jesser Hadmoui</span>
      </div>
      <div className="credits">
        Inspired from{" "}
        <a href="https://www.buymeacoffee.com/dstudiotech">
          DStudio Technology
        </a>
      </div>
    </footer>
  );
};

export default Footer;
