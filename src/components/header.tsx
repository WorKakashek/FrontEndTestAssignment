import React from "react";
import "../styles/header.scss";
import Container from "./container";
import logo from "../assets/logo.png";
import Button from "./button";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__content">
          <img className="header__logo" src={logo} />
          <div className="header__btns">
            <Button text={"Users"} style={{ marginRight: "10px" }} />
            <Button text={"Sign up"} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
