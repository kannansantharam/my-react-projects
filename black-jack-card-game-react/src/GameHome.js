import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Score from './Score';
import { Button } from '@material-ui/core';
function GameHome() {
    const [drawnCard, setDrawnCard] = useState([]);
    const [deck, setDeck] = useState([]);
    const [curretPlayer, setCurretPlayer] = useState('Player')
    const [currentPlayerScore, setCurrentPlayerScore] = useState(0)
    const [totalPlayerScore, setTotalPlayerScore] = useState(0)
    const [currentDealerScore, setCurrentDealerScore] = useState(0)
    const [totalDealerScore, setTotalDealerScore] = useState(0)

    useEffect(() => {
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((data) => {
                setDeck(data.data);
            })
    }, [])
    function calculateTotalValue(cards, type) {
        if (!cards.length) {
            return
        }
        let getValue = {
            QUEEN: 10,
            KING: 10,
            JACK: 10,
            ACE: 1
        }
        let totalValue = cards.reduce((total, card) => {
            return total = total + getValue[card.value] ? getValue[card.value] : parseInt(card.value)
        }, 0);
        type === "Player" ?
            setCurrentPlayerScore(totalValue) : setCurrentDealerScore(totalValue);
        //currentPlayerScore = currentPlayerScore ? currentPlayerScore : 0;
        totalValue = parseInt(totalPlayerScore) + parseInt(totalValue);
        console.log("total score ", totalValue)
        if (totalValue > 21) {
            totalValue = "You Lost, Total points " + totalValue;
        }
        type === "Player" ?
            setTotalPlayerScore(totalValue) : setTotalDealerScore(totalValue);
    }
    const drawCards = async (e, type) => {
        setCurretPlayer(type)
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
            .then((data) => {
                setDrawnCard(data.data.cards);
                calculateTotalValue(data.data.cards, type);
                if (type === "Player") {
                    setCurretPlayer("Dealer")
                    setTimeout(() => {
                        drawCards(e, "Dealer")
                    }, 2000)
                } else {
                    setCurretPlayer("Player")
                }

            })
    }
    return (
        <div>
            <h1>Welcome to Cards Game</h1>
            <div className='main-section'>
                <p>There are two players, Player and Dealer</p>
                <h5>Player plays first, click on the button to draw cards </h5>
            </div>
            <div className="main-button-section">
                As a Player you have an choice, click on the <i>Hit</i> button to play or
                <i> Stand</i> button to give chance to the Dealer
                <br />
                <Button variant="contained" color="primary" onClick={e => drawCards(e, "Player")}>Hit (Play)</Button>
                <Button variant="contained" color="primary" onClick={e => drawCards(e, "Dealer")}> Stand (Give chance to Dealer)</Button>

                <div className='drawing-cards'>
                    <p>Your current score is {currentPlayerScore}</p>
                    <p>Dealer's current score is {currentDealerScore}</p>
                    <i>{curretPlayer} drawing cards...</i>
                </div>
            </div>
            <br />
            <div className='score-section'>
                <Score playerScore={totalPlayerScore} dealerScore={totalDealerScore}></Score>
            </div>
        </div >
    )
}
export default GameHome;