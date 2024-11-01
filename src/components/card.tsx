// Card.tsx
import React from "react";
import "../styles/card.scss";

interface CardProps {
  name: string;
  position: string;
  email: string;
  phone: string;
  photo: string;
}

const Card: React.FC<CardProps> = ({ name, position, email, phone, photo }) => {
  return (
    <div className="card">
      <img src={photo} alt={name} className="card__photo" />
      <h3 className="card__name">{name}</h3>
      <p className="card__position">{position}</p>
      <p className="card__email">{email}</p>
      <p className="card__phone">{phone}</p>
    </div>
  );
};

export default Card;
