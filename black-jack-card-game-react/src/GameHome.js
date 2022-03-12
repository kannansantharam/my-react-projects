import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Score from './Score';
import { Button } from '@material-ui/core';
import './App.css';
function GameHome() {
    const [maxScore, setMaxScore] = useState(21);
    const [deck, setDeck] = useState([]);
    const [curretPlayer, setCurretPlayer] = useState('Player')
    const [currentPlayerScore, setCurrentPlayerScore] = useState(0)
    const [totalPlayerScore, setTotalPlayerScore] = useState(0)
    const [currentDealerScore, setCurrentDealerScore] = useState(0)
    const [totalDealerScore, setTotalDealerScore] = useState(0)
    const [image, setImage] = useState({ first: '', second: '' })
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
        setImage({
            first: cards[0].image,
            second: cards[1].image
        })

        let totalValue = cards.reduce((total, card) => {
            return total = total + (getValue[card.value] ? getValue[card.value] : parseInt(card.value))
        }, 0);
        if (type === "Player") {
            setCurrentPlayerScore(totalValue);
            totalValue = parseInt(totalPlayerScore) + parseInt(totalValue);
            setTotalPlayerScore(totalValue)
        } else {
            setCurrentDealerScore(totalValue);
            totalValue = parseInt(totalDealerScore) + parseInt(totalValue);
            setTotalDealerScore(totalValue);
        }
        // type === "Player" ?
        //     setCurrentPlayerScore(totalValue) : setCurrentDealerScore(totalValue);

        // totalValue = parseInt(totalPlayerScore) + parseInt(totalValue);
        // type === "Player" ?
        //     setTotalPlayerScore(totalValue) : setTotalDealerScore(totalValue);
        if (totalValue > parseInt(maxScore)) {
            // totalValue = "You Lost, Total points " + totalValue;
            document.querySelector(".game-over-section").classList.remove("hide");
            document.querySelector(".main-button-section").classList.add("hide")
            return
        }

        return totalValue;
    }
    const drawCard = async () => {
        return await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
    }
    const drawDealerCards = async () => {
        try {
            onPlayerChoice("Dealer")
            let data = await drawCard()
            let cards = data.data.cards;
            let total = calculateTotalValue(cards, "Dealer");
            console.log("t ", total)
            if (total <= 17) {
                setTimeout(() => {
                    drawDealerCards()
                }, 1500)
            } else {
                onPlayerChoice("Player")
            }
        }
        catch (ex) {
            console.error(ex);
        }
    }
    const drawCards = async (type) => {
        try {
            setCurretPlayer(type);
            let data = await drawCard();
            console.log(data.data.cards)
            let totalValues = calculateTotalValue(data.data.cards, type);
            if (!totalValues) {
                return
            }
            if (type === "Player") {
                setCurretPlayer("Dealer")
                setTimeout(() => {
                    document.querySelector(".dealer-playing").classList.remove("hide");
                    document.querySelector(".player-playing").classList.add("hide");
                    document.querySelector(".drawCardsBtn").style.display = "none"
                    setTimeout(function () {
                        drawCards("Dealer");
                    }, 3000)

                }, 1000)
            } else {
                document.querySelector(".dealer-playing").classList.add("hide")
                document.querySelector(".player-playing").classList.remove("hide")
                document.querySelector(".drawCardsBtn").style.display = "block"
                setCurretPlayer("Player")
            }
        }
        catch (ex) {
            console.error(ex)
        }
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
            document.querySelector(".dealer-playing").classList.add("hide")
            document.querySelector(".player-playing").classList.remove("hide");
            document.querySelector(".drawCardsBtn").style.display = "block"
        } else {
            document.querySelector(".dealer-playing").classList.remove("hide")
            document.querySelector(".player-playing").classList.add("hide");
            document.querySelector(".drawCardsBtn").style.display = "none"
            //drawCards("Dealer")
        }
    }
    function gameMaxScore(e) {
        setMaxScore(e.target.value)
    }
    return (
        <div>
            <div className="max-score">
                Max score to end the game<input value={maxScore} onChange={(e) => gameMaxScore(e)} />
            </div>
            <h1>Welcome to Cards Game</h1>

            <div className='main-section'>
                <p>There are two players, Player and Dealer</p>
            </div>
            <div className='game-over-section hide'>
                <p>Oops! <b>{curretPlayer}</b> lost as the total points in hand is greater than {maxScore}.
                    <br /><br />    Click on the below button to restart the game</p>

                <Button variant="contained" className="primary " color="primary" onClick={restartGame}> Restart the game</Button>
            </div>
            <div className="main-button-section">
                <p className="initial-button"><b>Player plays first,</b> and as a Player you have an choice, click on the <i>Hit</i> button to play or
                    <i> Stand</i> button to give chance to the Dealer<i style={{ fontSize: "12px", }}> (note: the dealer will play until he/she gets total score of 17)</i></p>

                <Button variant="contained" className="primary initial-button" color="primary" onClick={() => onPlayerChoice("Player")}>Hit (Play)</Button>
                <Button variant="contained" className="primary initial-button" color="primary" onClick={() => drawDealerCards()}> Stand (Give chance to Dealer)</Button>

                <div className='drawing-cards hide'>
                    <p className="dealer-playing hide"><i>Dealer drawing the cards...</i></p>
                    <p className="player-playing hide">It's your turn, draw the cards</p>
                    <Button variant="contained" className="primary hide drawCardsBtn" color="primary" onClick={() => drawCards("Player")}> Draw cards</Button>
                    <p>Your current score is {currentPlayerScore}</p>
                    <p>Dealer's current score is {currentDealerScore}</p>
                    <div className='current-card-images'>
                        <div className="first-image">
                            <img src={image.first} width="100" loading="lazy" />
                        </div>
                        <div className="second-image">
                            <img src={image.second} width="100" loading="lazy" />
                        </div>
                    </div>
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