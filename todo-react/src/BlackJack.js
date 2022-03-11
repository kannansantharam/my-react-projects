import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
function BlackJack() {
    const [deck, setDeck] = useState([]);
    const [drawnCard, setDrawnCard] = useState([]);
    let [playerTotal, setPlayerTotal] = useState();
    useEffect(() => {
        console.log("triggerd");
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then((data) => {
                console.log(data.data)
                setDeck(data.data)
            })
    }, [])
    const drawCards = async () => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
            .then((data) => {
                setDrawnCard(data.data.cards)
                calculateTotalValue(data.data.cards)
            })
    }
    function calculateTotalValue(cards) {
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
        }, 0)

        playerTotal = playerTotal ? playerTotal : 0;
        totalValue = parseInt(playerTotal) + parseInt(totalValue);
        console.log('ttotal vale', totalValue);
        if (totalValue > 21) {
            totalValue = "You Lost, Total points " + totalValue;
        }
        setPlayerTotal(totalValue);
    }
    return (
        <div>
            <div className='main-container'>
                <h1>Deck of Cards</h1>
                <div className='button-container'>
                    <p>Click to Shuffle the Cards</p>
                    <p>{deck.deck_id} created successfully</p>
                    <button onClick={drawCards}>Draw Crads</button>
                </div>
                <div className='drawn-cards'>
                    <p>Total value {playerTotal}</p>
                </div>
            </div>
        </div>
    )
}
export default BlackJack;