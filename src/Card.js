import React from "react";
import "./Card.css";

const Card = ({ image, name }) => {
    return (
        <div className="Card">
            <img src={image} alt="name"/>
        </div>
    );
};

export default Card;