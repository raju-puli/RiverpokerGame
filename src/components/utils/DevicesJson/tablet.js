import fileName from "../../../jsconfig";

function tabletproperties() {
    let cw_min = 1000 / 20;
    let ch_min = 650 / 30;
    let details = {
        name: "Tablate",
        width: 1000,
        height: 650,
        style: {
            gameBox: "gameBox1",
            image: "backPixTable1",
            buttonGroup: { width: "100%", float: "right", padding: fileName.name === "Riverpoker" ? '5px 0px 15px 0px' : '5px' },
            checkboxGroup: (fileName.name === "Riverpoker" ? "checkboxGroup" : "checkboxGroup1")
        },
        boardCardPositions: {
            width: '280px',
            height: '83px',
            top: '250px',
            cardScale: 0.96,
            halfwidth: 0.35,
        },
        boardCardXSpace: 46.8,//33,//60
        ritBoardCardPositions: {
            width: '280px',
            height: '83px',
            top: '300px',
            cardScale: 0.96,

        },
        seatProperties: {
            width: 73,
            height: 12.5,
            profileRadius: 28,
            panelWidth: 100,
            panelHeight: 61,
            padddings: { x1: 13, y1: 18, x2: 19, y2: 6, x3: 12, y3: 6, x4: 16, y4: 18 },
            cardScale: 0.9,
            cardY: 53,
            cardXpadding: 10,
            dealerAdjustment: 10,
            delaerSize: 18,
            blindsTextOne: "SB",
            blindsTextTwo: "BB",
        },
        cardStyle: {
            frontCardStyle: "CardDefault",
            backCardStyle: [689, 0, 53, 73],
        },
        seatLayout: {
            2: [{ x: cw_min * 16.5, y: ch_min * 13.5 }, { x: cw_min * 1.2, y: ch_min * 13.5 }],

            4: [{ x: cw_min * 14, y: ch_min * 5.5 }, { x: cw_min * 14, y: ch_min * 20 },
            { x: cw_min * 4.5, y: ch_min * 20 }, { x: cw_min * 4.5, y: ch_min * 5.5 }],

            5: [{ x: cw_min * 8.75, y: ch_min * 6 }, { x: cw_min * 16.5, y: ch_min * 14 },
            { x: cw_min * 12, y: ch_min * 19 + 40 }, { x: cw_min * 5.5, y: ch_min * 19 + 40 },
            { x: cw_min * 1.2, y: ch_min * 14 }],

            6: [{ x: cw_min * 12.3, y: ch_min * 4.8 }, { x: cw_min * 16.5, y: ch_min * 13 },
            { x: cw_min * 12, y: ch_min * 20.5 }, { x: cw_min * 6.5, y: ch_min * 20.5 },
            { x: cw_min * 1.2, y: ch_min * 13 }, { x: cw_min * 6.51, y: ch_min * 4.8 }],

            7: [{ x: cw_min * 9.4, y: ch_min * 5.5 }, { x: cw_min * 15.8, y: ch_min * 9 },
            { x: cw_min * 16, y: ch_min * 17 }, { x: cw_min * 12.3, y: ch_min * 20.8 },
            { x: cw_min * 6.5, y: ch_min * 20.8 }, { x: cw_min * 2, y: ch_min * 17 },
            { x: cw_min * 2, y: ch_min * 9 }],

            8: [{ x: cw_min * 12.3, y: ch_min * 5.5 }, { x: cw_min * 16, y: ch_min * 9 },
            { x: cw_min * 16, y: ch_min * 17 }, { x: cw_min * 12.3, y: ch_min * 20.8 },
            { x: cw_min * 6.5, y: ch_min * 20.8 }, { x: cw_min * 2, y: ch_min * 17 },
            { x: cw_min * 2, y: ch_min * 9 }, { x: cw_min * 6.5, y: ch_min * 5.5 }],

            9: [
                { x: cw_min * 10.3, y: ch_min * 4.6 }, { x: cw_min * 14, y: ch_min * 6 },
                { x: cw_min * 16, y: ch_min * 12.5 }, { x: cw_min * 14, y: ch_min * 19 },
                { x: cw_min * 10.8, y: ch_min * 20.3 }, { x: cw_min * 6.5, y: ch_min * 20.8 },
                { x: cw_min * 3, y: ch_min * 19 },
                { x: cw_min * 3, y: ch_min * 6 }, { x: cw_min * 6.5, y: ch_min * 4.6 }],

            10: [{ x: cw_min * 10.3, y: ch_min * 4.6 }, { x: cw_min * 14, y: ch_min * 6 },
            { x: cw_min * 16, y: ch_min * 12.5 }, { x: cw_min * 14, y: ch_min * 19 },
            { x: cw_min * 10.8, y: ch_min * 20.3 }, { x: cw_min * 6.5, y: ch_min * 20.8 },
            { x: cw_min * 3, y: ch_min * 19 }, { x: cw_min * 1.2, y: ch_min * 12.5 },
            { x: cw_min * 3, y: ch_min * 6 }, { x: cw_min * 6.5, y: ch_min * 4.6 }],
        },
        seatPotLayout: {
            2: [{ x: cw_min * 15, y: ch_min * 8.5 }, { x: cw_min * 4.5, y: ch_min * 8.5 }],


            4: [{ x: cw_min * 15, y: ch_min * 7.5 }, { x: cw_min * 15, y: ch_min * 15 },
            { x: cw_min * 5.5, y: ch_min * 15 }, { x: cw_min * 5.5, y: ch_min * 7.5 }],

            5: [{ x: cw_min * 9.75, y: ch_min * 8 }, { x: cw_min * 16, y: ch_min * 16 },
            { x: cw_min * 13, y: ch_min * 17.5 }, { x: cw_min * 6.5, y: ch_min * 17.5 },
            { x: cw_min * 4, y: ch_min * 16 }],

            6: [{ x: cw_min * 14.5, y: ch_min * 6.5 }, { x: cw_min * 15, y: ch_min * 10.5 },
            { x: cw_min * 14.5, y: ch_min * 15.7 }, { x: cw_min * 5.5, y: ch_min * 15.2 },
            { x: cw_min * 4, y: ch_min * 10.5 }, { x: cw_min * 5.5, y: ch_min * 6.5 }],

            7: [{ x: cw_min * 8.85, y: ch_min * 6.2 }, { x: cw_min * 14.3, y: ch_min * 9.2 },
            { x: cw_min * 14.3, y: ch_min * 12 },
            { x: cw_min * 11.2, y: ch_min * 17.8 }, { x: cw_min * 5.5, y: ch_min * 17.8 },
            { x: cw_min * 4.5, y: ch_min * 12 },
            { x: cw_min * 4.5, y: ch_min * 9.2 }],

            8: [{ x: cw_min * 11.2, y: ch_min * 6.2 }, { x: cw_min * 14.3, y: ch_min * 9.2 },
            { x: cw_min * 14.3, y: ch_min * 12 },
            { x: cw_min * 11.2, y: ch_min * 17.8 }, { x: cw_min * 5.5, y: ch_min * 17.8 },
            { x: cw_min * 4.5, y: ch_min * 12 },
            { x: cw_min * 4.5, y: ch_min * 9.2 }, { x: cw_min * 5.3, y: ch_min * 6.2 }],
            9: [
                { x: cw_min * 9.5, y: ch_min * 4 },
                { x: cw_min * 14.5, y: ch_min * 9 },
                { x: cw_min * 15, y: ch_min * 14 },
                { x: cw_min * 14.7, y: ch_min * 19 },
                { x: cw_min * 11, y: ch_min * 18 },
                { x: cw_min * 6, y: ch_min * 18 },
                { x: cw_min * 2.8, y: ch_min * 19 },
                { x: cw_min * 1, y: ch_min * 14 },
                { x: cw_min * 3.2, y: ch_min * 9 },
            ],

            10: [{ x: cw_min * 9.2, y: ch_min * 5.5 }, { x: cw_min * 12.8, y: ch_min * 7.8 },
            { x: cw_min * 14.3, y: ch_min * 11 }, { x: cw_min * 14, y: ch_min * 14 },
            { x: cw_min * 10.3, y: ch_min * 15.3 }, { x: cw_min * 8, y: ch_min * 15.3 },
            { x: cw_min * 4.0, y: ch_min * 14 }, { x: cw_min * 3.7, y: ch_min * 10.8 },
            { x: cw_min * 4.5, y: ch_min * 8.1 }, { x: cw_min * 5.6, y: ch_min * 6.4 }],

        },
        tablePotLayout: [
            { x: cw_min * 9.8, y: ch_min * 5 }, { x: cw_min * 13.8, y: ch_min * 8.5 },
            { x: cw_min * 13.8, y: ch_min * 10.5 }, { x: cw_min * 13.8, y: ch_min * 12.3 },
            { x: cw_min * 13.8, y: ch_min * 14.3 }, { x: cw_min * 6, y: ch_min * 14.3 },
            { x: cw_min * 6, y: ch_min * 12.2 }, { x: cw_min * 6, y: ch_min * 10.3 },
            { x: cw_min * 6, y: ch_min * 8.5 }, { x: cw_min * 6, y: ch_min * 10.5 }],
        boardCardsPosition: {
            x: 1100,
            y: 160,
            halfwidth: 0.35,
        },
        RitboardCardsPosition: {
            x: 1100,
            y: 210,
            halfwidth: 0.35,
        },
        handstrength: {
            position: {
                y: fileName.name === "Riverpoker" ? 60 : 40
            }
        }
    }
    return details;
}
export default tabletproperties;