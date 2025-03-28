import React, { useState } from 'react'
import frontFrame0 from '../../../../../assets/images/table/cards/Cards_Atlas_Set1_icon.png';
import frontFrame1 from '../../../../../assets/images/table/cards/Cards_Atlas_Set2_icon.png';
import frontFrame2 from '../../../../../assets/images/table/cards/Cards_Atlas_Set3_icon.png';
import frontFrame3 from '../../../../../assets/images/table/cards/Cards_Atlas_Set4_icon.png';
import frontFrame4 from '../../../../../assets/images/table/cards/Cards_Atlas_Set5_icon.png';

import backFrame0 from '../../../../../assets/images/table/cards/BackIcon_one.png';
import backFrame1 from '../../../../../assets/images/table/cards/BackIcon_two.png';
import backFrame2 from '../../../../../assets/images/table/cards/BackIcon_three.png';
import backFrame3 from '../../../../../assets/images/table/cards/BackIcon_four.png';
import backFrame4 from '../../../../../assets/images/table/cards/BackIcon_five.png';
import "../../../../../css/ui/popUps/settings/cardThemes.css";

function CardThemes(props) {

    const [activeCardFront, setActiveCardFront] = useState(1)
    const [activeCardback, setActiveCardBack] = useState(1)

    function cardFront(e) {
        props.showCard(e)
    }
    function cardBack(e) {
        props.showBackframe(e)
    }


    return (
        <div className="cardthemes">
            <div className="frontthemes">
                <div className={activeCardFront === 0 ? "imgforegroundActive" : 'imgforeground'}
                    onClick={() => { cardFront('default'); setActiveCardFront(0); }} >
                    <img src={frontFrame0} id="front1" className="aj" alt='' />

                </div>
                <div className={activeCardFront === 1 ? "imgforegroundActive" : 'imgforeground'}
                    onClick={() => { cardFront('frontCard1'); setActiveCardFront(1); }} >
                    <img src={frontFrame1} id="front1" className="aj" alt='' />

                </div>
                <div className={activeCardFront === 2 ? "imgforegroundActive" : 'imgforeground'}
                    onClick={() => { cardFront('frontCard2'); setActiveCardFront(2); }}>
                    <img src={frontFrame2} id="front2" onClick={(e) => cardFront(e)} alt='' />

                </div>
                <div className={activeCardFront === 3 ? "imgforegroundActive" : 'imgforeground'}
                    onClick={() => { cardFront('frontCard3'); setActiveCardFront(3); }}>
                    <img src={frontFrame3} id="front3" alt='' />

                </div>
                <div className={activeCardFront === 4 ? "imgforegroundActive" : 'imgforeground'}
                    onClick={() => { cardFront('frontCard4'); setActiveCardFront(4); }}>
                    <img src={frontFrame4} id="front4" alt='' />

                </div>
            </div>
            <div className="backthemes">
                <div className={activeCardback === 0 ? "imgbackgroundActive" : 'imgbackground'}
                    onClick={() => { cardBack("default"); setActiveCardBack(0); }}>
                    <img src={backFrame0} id="back1" alt='' />

                </div>
                <div className={activeCardback === 1 ? "imgbackgroundActive" : 'imgbackground'}
                    onClick={() => { cardBack("backcard1"); setActiveCardBack(1); }}>
                    <img src={backFrame1} id="back1" alt='' />

                </div>
                <div className={activeCardback === 2 ? "imgbackgroundActive" : 'imgbackground'}
                    onClick={() => { cardBack("backcard2"); setActiveCardBack(2); }}>
                    <img src={backFrame2} id="back2" alt='' />

                </div>
                <div className={activeCardback === 3 ? "imgbackgroundActive" : 'imgbackground'}
                    onClick={() => { cardBack("backcard3"); setActiveCardBack(3); }}>
                    <img src={backFrame3} id="back3" alt='' />

                </div>
                <div className={activeCardback === 4 ? "imgbackgroundActive" : 'imgbackground'}
                    onClick={() => { cardBack("backcard4"); setActiveCardBack(4); }}>
                    <img src={backFrame4} id="back4" alt='' />

                </div>
            </div>
        </div>

    )

}
export default CardThemes

