import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Score from './Score';
import { Button } from '@material-ui/core';
import './App.css';
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
        type === "Player" ?
            setTotalPlayerScore(totalValue) : setTotalDealerScore(totalValue);
        if (totalValue > 21) {
            // totalValue = "You Lost, Total points " + totalValue;
            document.querySelector(".game-over-section").classList.remove("hide");
            document.querySelector(".main-button-section").classList.add("hide")
            return
        }

        return totalValue;
    }
    const drawCards = async (type) => {

        setCurretPlayer(type);
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
            .then((data) => {
                //setDrawnCard(data.data.cards);
                let totalValues = calculateTotalValue(data.data.cards, type);
                if (!totalValues) {
                    return
                }
                if (type === "Player") {
                    document.querySelector(".drawCardsBtn").innerHTML = "Dealer drawing the cards, hold on"
                    setCurretPlayer("Dealer")
                    setTimeout(() => {
                        drawCards("Dealer");
                    }, 2000)
                } else {
                    document.querySelector(".drawCardsBtn").innerHTML = "Your turn! Draw Cards"
                    setCurretPlayer("Player")
                }

            })
    }
    function restartGame() {
        window.location.reload()
    }
    function onPlayerChoice(type) {
        document.querySelectorAll(".initial-button").forEach(function (value) {
            value.style.display = "none";
        });
        document.querySelector(".drawing-cards").classList.remove("hide")
        if (type === "Player") {
            document.querySelector(".drawCardsBtn").innerHTML = "Your turn! Draw cards";
        } else {
            document.querySelector(".drawCardsBtn").innerHTML = "Dealer draws the cards, hold on";
            drawCards("Dealer")
        }
    }
    return (
        <div>
            <h1>Welcome to Cards Game</h1>

            <div className='main-section'>
                <p>There are two players, Player and Dealer</p>
            </div>
            <div className='game-over-section hide'>
                <h3>Oops! {curretPlayer} lost. Click on the below button to restart the game</h3>
                <Button variant="contained" className="primary " color="primary" onClick={restartGame}> Restart the game</Button>
            </div>
            <div className="main-button-section">
                <p className="initial-button"><b>Player plays first,</b> and as a Player you have an choice, click on the <i>Hit</i> button to play or
                    <i> Stand</i> button to give chance to the Dealer</p>

                <Button variant="contained" className="primary initial-button" color="primary" onClick={() => onPlayerChoice("Player")}>Hit (Play)</Button>
                <Button variant="contained" className="primary initial-button" color="primary" onClick={() => onPlayerChoice("Dealer")}> Stand (Give chance to Dealer)</Button>

                <div className='drawing-cards hide'>
                    <p className="dealer-playing hide">{curretPlayer} drawing the cards</p>
                    <p className="player-playing hide">It's your turn, draw the cards</p>
                    <Button variant="contained" className="primary hide drawCardsBtn" color="primary" onClick={() => drawCards("Player")}> Your turn! Draw cards</Button>
                    <p>Your current score is {currentPlayerScore}</p>
                    <p>Dealer's current score is {currentDealerScore}</p>
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