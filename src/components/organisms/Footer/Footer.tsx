import { Typography } from "../../atoms";
import { styleConfig } from "./Footer.config";

const Footer = () => {
  return (
    <footer className={styleConfig.wrapper}>
      <Typography variant="h6">SIMS PPOB @2025 All Right Reserved</Typography>
    </footer>
  );
};

export default Footer;
