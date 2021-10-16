import React from "react";
import "./Card.css";

const Card = ({ image, remaining }) => {
    const setAngle = () => {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        const angle = remaining % 2 === 0 ? `rotate(${randomNumber}deg)` : `rotate(-${randomNumber}deg)`;
        return { transform: angle };
    }

    const style = setAngle();
    return (
        <div style={style} className="Card">
            <img src={image} alt="card"/>
        </div>
    );
};

export default Card;