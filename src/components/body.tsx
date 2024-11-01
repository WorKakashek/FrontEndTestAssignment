import React from "react";
import Container from "./container";
import "../styles/body.scss";
import background from "../assets/background.png";
import TextImage from "./textimage";
import UsersList from "./getRequest";
import PostRequest from "./postRequest";

const Body: React.FC = () => {
  return (
    <div className="body">
      <Container>
        <div className="body__content">
          <TextImage
            title={"Test assignment for front-end developer"}
            paragraph={
              "What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving."
            }
            imageUrl={background}
          />
        </div>

        <UsersList />

        <div>
          <PostRequest />
        </div>
      </Container>
    </div>
  );
};

export default Body;
