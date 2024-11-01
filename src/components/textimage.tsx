import React from "react";
import "../styles/textimage.scss";
import Button from "./button";

interface TextImageProps {
  title: string; // Заголовок
  paragraph: string; // Текст параграфа
  imageUrl: string; // Путь до картинки
}

const TextImage: React.FC<TextImageProps> = ({
  title,
  paragraph,
  imageUrl,
}) => {
  return (
    <div className="image-with-text">
      <img src={imageUrl} alt={title} className="image-with-text__image" />
      <div className="image-with-text__overlay">
        <h2 className="image-with-text__title">{title}</h2>
        <p className="image-with-text__paragraph">{paragraph}</p>
        <Button text="Sign up" />
      </div>
    </div>
  );
};

export default TextImage;
