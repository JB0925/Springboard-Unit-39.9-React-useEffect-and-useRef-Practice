import React, { useState, useEffect, useRef } from "react";
import "./CardDisplay.css";
import Card from "./Card";
import { v4 as uuid } from "uuid";
import axios from "axios";

const CardDisplay = () => {
    const [deckId, setDeckId] = useState(null);
    const [playingCards, setPlayingCards] = useState([]);
    const [cardsRemaining, setCardsRemaining] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const timerRef = useRef();

    useEffect(() => {
        /** Code to run Part 1 */

    //     async function getCard() {
    //         const url = "http://deckofcardsapi.com/api/deck/new/"
    //         const drawUrl = `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    //         if (cardsRemaining === null) {
    //             const cardResponse = await axios.get(url);
    //             const { deck_id, remaining } = cardResponse.data;
    //             setDeckId(deck_id);
    //             setCardsRemaining(remaining);
    //         } else {
    //             cardsRemaining === 0 ? alert("No more cards to draw!")
    //             :
    //             await axios.get(drawUrl)
    //             .then(data => setPlayingCards([...playingCards, data.data.cards[0].image]));
    //         }
    //     };
    //     getCard();
    // }, [cardsRemaining]
        
        const url = "http://deckofcardsapi.com/api/deck/new/"
        axios.get(url)
        .then(data => {
            const { deck_id, remaining } = data.data;
            setDeckId(deck_id);
            setCardsRemaining(remaining);
        })
    },[]);

    /** Part 1's handleClick method */
    // const handleClick = () => {
    //     setCardsRemaining(cardsRemaining => cardsRemaining - 1);
    // };

    const handleClick = async() => {
        const drawUrl = `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
        if (isClicked) {
            clearInterval(timerRef.current);
            setIsClicked(!isClicked);
        } else {
            setIsClicked(!isClicked);
            timerRef.current = setInterval(async() => {
                setCardsRemaining(cardsRemaining => cardsRemaining - 1);
                const cardDraw = await axios.get(drawUrl);
                if (cardDraw.data.remaining === 0) {
                    clearInterval(timerRef.current);
                    setTimeout(() => {
                        alert("No more cards to draw!");
                    }, 500);
                    setBtnDisabled(!btnDisabled);
                };
                setPlayingCards(currentCards => {
                    const newCards = [...currentCards, cardDraw.data.cards[0].image];
                    return newCards;
                });
            }, 1000);
        };
    };

    const allCards = playingCards.map(card => <Card 
                                                image={card}
                                                remaining={cardsRemaining}
                                                key={uuid()}  />)
    
    const btnText = isClicked ? "Stop Drawing" : "Start Drawing";
    return (
        <div className="CardDisplay">
            <div className="CardDisplay-show">
                {allCards}
            </div>
            <button disabled={btnDisabled} onClick={handleClick}>{btnText}</button>
        </div>
    )
};

export default CardDisplay;
