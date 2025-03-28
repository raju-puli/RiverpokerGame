import fileName from "../../../jsconfig";


function mobileproperties() {
    let cw_min = 500 / 20;
    let ch_min = 880 / 30;
    let details = {
        name: "Mobile",
        width: 500,
        height: 880,
        style: {
            gameBox: "gameBox",
            image: fileName.name !== "Leader_bet" ? "backPixTable" : "backPixTable_lb",
            buttonGroup: { width: "100%", float: "left" },
            checkboxGroup: fileName.name === "Leader_bet" ? "checkboxGroup1" : "checkboxGroup"
        },
        //     boardCardPositions: {
        //         width: 53,
        //         height: 73,
        //         top: 295,
        //         cardScale: 0.7,
        //         halfwidth: 0.5,
        //    },
        // boardCardXSpace: 33,
        boardCardPositions: {
            width: 53,
            height: 73,
            top: 295,
            cardScale: (fileName.name === "Leader_bet" ? 0.93 : (fileName.name === "Riverpoker" ? 0.85 : 0.7)),
            halfwidth: 0.5,
        },
        boardCardXSpace: (fileName.name === "Leader_bet" ? 47 : (fileName.name === "Riverpoker" ? 42 : 33)),

        ritBoardCardPositions: {
            width: "190px",
            height: "63px",
            top: "335px",
            cardScale: (fileName.name === "Leader_bet" ? 0.93 : (fileName.name === "Riverpoker" ? 0.85 : 0.7)),
            halfwidth: 0.5,
        },
        seatProperties: {
            width: 73,
            height: 12.5,
            profileRadius: 28,
            panelWidth: 100,
            panelHeight: 61,
            padddings: { x1: 13, y1: 18, x2: 19, y2: 6, x3: 12, y3: 6, x4: 16, y4: 18 },
            cardScale: 0.75,
            cardY: 53,
            cardXpadding: 18,
            dealerAdjustment: 5,
            delaerSize: 26,
            blindsTextOne: "SB",
            blindsTextTwo: "BB",
        },
        cardStyle: {
            frontCardStyle: "CardDefault",
            backCardStyle: [689, 0, 53, 73],
        },
        seatLayout: {
            2: [
                { x: cw_min * 7.65, y: ch_min * 5 },
                { x: cw_min * 7.65, y: ch_min * 22.3 },
            ],
            3: [
                { x: cw_min * 7.65, y: ch_min * 5 },
                { x: cw_min * 14.9, y: ch_min * 15.3 },
                { x: cw_min * 0.65, y: ch_min * 15.3 },
            ],

            4: [
                { x: cw_min * 14.36, y: ch_min * 10 },
                { x: cw_min * 15, y: ch_min * 20.3 },
                { x: cw_min * 0.5, y: ch_min * 20.3 },
                { x: cw_min * 0.5, y: ch_min * 10 },
            ],

            5: [
                { x: cw_min * 7.65, y: ch_min * 5 },
                { x: cw_min * 14.9, y: ch_min * 10 },
                { x: cw_min * 15, y: ch_min * 20.3 },
                { x: cw_min * 0.5, y: ch_min * 20.3 },
                { x: cw_min * 0.5, y: ch_min * 10 },
            ],

            6: [
                { x: cw_min * 14.36, y: ch_min * 10 },
                { x: cw_min * 15, y: ch_min * 20.2 },
                { x: cw_min * 7.65, y: ch_min * 22.3 },
                { x: cw_min * 0.5, y: ch_min * 20.2 },
                { x: cw_min * 0.5, y: ch_min * 10 },
                { x: cw_min * 7.65, y: ch_min * 5 },
            ],

            7: [
                { x: cw_min * 14.5, y: ch_min * 8 },
                { x: cw_min * 15, y: ch_min * 14 },
                { x: cw_min * 15, y: ch_min * 20.3 },
                { x: cw_min * 0.5, y: ch_min * 20.3 },
                { x: cw_min * 0.4, y: ch_min * 14 },
                { x: cw_min * 0.4, y: ch_min * 8 },
                { x: cw_min * 7.65, y: ch_min * 5 },
            ],

            8: [
                { x: cw_min * 15.1, y: ch_min * 14 },
                { x: cw_min * 15, y: ch_min * 20.2 },
                { x: cw_min * 7.65, y: ch_min * 22.3 },
                { x: cw_min * 0.4, y: ch_min * 20.2 },
                { x: cw_min * 0.4, y: ch_min * 14 },
                { x: cw_min * 0.4, y: ch_min * 8 },
                { x: cw_min * 7.65, y: ch_min * 5 },
                { x: cw_min * 14.5, y: ch_min * 8 },
            ],

            10: [
                { x: cw_min * 11, y: ch_min * 5 },
                { x: cw_min * 14.5, y: ch_min * 8.5 },
                { x: cw_min * 15, y: ch_min * 13.5 },
                { x: cw_min * 15, y: ch_min * 20 },
                { x: cw_min * 11, y: ch_min * 23.5 },
                { x: cw_min * 4.6, y: ch_min * 23.5 },
                { x: cw_min * 0.5, y: ch_min * 20 },
                { x: cw_min * 0.5, y: ch_min * 13.5 },
                { x: cw_min * 0.5, y: ch_min * 8.5 },
                { x: cw_min * 4.5, y: ch_min * 5 },
            ],
        },

        seatLayout_lb: {
            2: [
                { x: cw_min * 7.4, y: ch_min * 3 },
                { x: cw_min * 7.4, y: ch_min * 22.3 },
            ],
            3: [
                { x: cw_min * 7.65, y: ch_min * 3 },
                { x: cw_min * 14.65, y: ch_min * 15.3 },
                { x: cw_min * 0, y: ch_min * 15.3 },
            ],

            4: [
                { x: cw_min * 14.1, y: ch_min * 8 },
                { x: cw_min * 14.65, y: ch_min * 18 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.5, y: ch_min * 8 },
            ],

            5: [
                { x: cw_min * 7.65, y: ch_min * 3 },
                { x: cw_min * 14.65, y: ch_min * 12 },
                { x: cw_min * 7.45, y: ch_min * 22.3 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0, y: ch_min * 8 }
            ],

            6: [
                { x: cw_min * 14.1, y: ch_min * 8 },
                { x: cw_min * 14.65, y: ch_min * 18 },
                { x: cw_min * 7.4, y: ch_min * 22.3 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.5, y: ch_min * 8 },
                { x: cw_min * 7.4, y: ch_min * 3 },
            ],

            7: [
                { x: cw_min * 14.1, y: ch_min * 8 },
                { x: cw_min * 14.65, y: ch_min * 18 },
                { x: cw_min * 7.45, y: ch_min * 22.3 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0, y: ch_min * 13 },
                { x: cw_min * 0.5, y: ch_min * 8 },
                { x: cw_min * 7.65, y: ch_min * 3 },
            ],

            8: [
                { x: cw_min * 14.5, y: ch_min * 13 },
                { x: cw_min * 14.65, y: ch_min * 18 },
                { x: cw_min * 7.45, y: ch_min * 22.3 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.1, y: ch_min * 13 },
                { x: cw_min * 0.5, y: ch_min * 8 },
                { x: cw_min * 7.65, y: ch_min * 3 },
                { x: cw_min * 14.1, y: ch_min * 8 },
            ],
            9: [
                { x: cw_min * 7.5, y: ch_min * 3 },
                { x: cw_min * 14.1, y: ch_min * 8 },
                { x: cw_min * 14.5, y: ch_min * 13 },
                { x: cw_min * 14.65, y: ch_min * 18 },
                { x: cw_min * 10.5, y: ch_min * 22.5 },
                { x: cw_min * 4.5, y: ch_min * 22.5 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.1, y: ch_min * 13 },
                { x: cw_min * 0.5, y: ch_min * 8 },
            ],

            10: [
                { x: cw_min * 10.5, y: ch_min * 3 },
                { x: cw_min * 14.1, y: ch_min * 8 },
                { x: cw_min * 14.5, y: ch_min * 13 },
                { x: cw_min * 14.65, y: ch_min * 18 },
                { x: cw_min * 10.5, y: ch_min * 22.5 },
                { x: cw_min * 4.5, y: ch_min * 22.5 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.1, y: ch_min * 13 },
                { x: cw_min * 0.5, y: ch_min * 8 },
                { x: cw_min * 4.3, y: ch_min * 3 },
            ],
        },

        seatLayout_rv: {
            2: [
                { x: cw_min * 7.5, y: ch_min * 4.8 },
                { x: cw_min * 7.5, y: ch_min * 22.3 },
            ],
            3: [
                { x: cw_min * 7.5, y: ch_min * 4.8 },
                { x: cw_min * 14.65, y: ch_min * 15.3 },
                { x: cw_min * 0, y: ch_min * 15.3 },
            ],

            4: [
                { x: cw_min * 14.2, y: ch_min * 8 },
                { x: cw_min * 14.88, y: ch_min * 18 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.8, y: ch_min * 8 },
            ],

            5: [
                { x: cw_min * 7.5, y: ch_min * 4.8 },
                { x: cw_min * 14.6, y: ch_min * 12 },
                { x: cw_min * 7.5, y: ch_min * 22.3 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.8, y: ch_min * 8 }
            ],

            6: [
                { x: cw_min * 14.2, y: ch_min * 8 },
                { x: cw_min * 14.88, y: ch_min * 18 },
                { x: cw_min * 7.5, y: ch_min * 22.3 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.8, y: ch_min * 8 },
                { x: cw_min * 7.5, y: ch_min * 4.8 },
            ],

            7: [
                { x: cw_min * 14.2, y: ch_min * 8 },
                { x: cw_min * 14.88, y: ch_min * 18 },
                { x: cw_min * 7.5, y: ch_min * 22.3 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.3, y: ch_min * 13 },
                { x: cw_min * 0.8, y: ch_min * 8 },
                { x: cw_min * 7.5, y: ch_min * 4.8 },
            ],

            8: [
                { x: cw_min * 14.62, y: ch_min * 13 },
                { x: cw_min * 14.88, y: ch_min * 18 },
                { x: cw_min * 7.5, y: ch_min * 22.3 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.3, y: ch_min * 13 },
                { x: cw_min * 0.8, y: ch_min * 8 },
                { x: cw_min * 7.51, y: ch_min * 4.8 },
                { x: cw_min * 14.2, y: ch_min * 8 },
            ],
            9: [
                { x: cw_min * 7.5, y: ch_min * 4.8 },
                { x: cw_min * 14.2, y: ch_min * 8 },
                { x: cw_min * 14.62, y: ch_min * 13 },
                { x: cw_min * 14.88, y: ch_min * 18 },
                { x: cw_min * 10.5, y: ch_min * 22.5 },
                { x: cw_min * 4.5, y: ch_min * 22.5 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.3, y: ch_min * 13 },
                { x: cw_min * 0.8, y: ch_min * 8 },
            ],

            10: [
                { x: cw_min * 10.5, y: ch_min * 4.8 },
                { x: cw_min * 14.2, y: ch_min * 8 },
                { x: cw_min * 14.62, y: ch_min * 13 },
                { x: cw_min * 14.88, y: ch_min * 18 },
                { x: cw_min * 10.5, y: ch_min * 22.5 },
                { x: cw_min * 4.5, y: ch_min * 22.5 },
                { x: cw_min * 0, y: ch_min * 18 },
                { x: cw_min * 0.3, y: ch_min * 13 },
                { x: cw_min * 0.8, y: ch_min * 8 },
                { x: cw_min * 4.3, y: ch_min * 4.8 },
            ],
        },
        seatPotLayout: {
            2: [
                { x: cw_min * 13.1, y: ch_min * 5 },
                { x: cw_min * 13.1, y: ch_min * 20.5 },
            ],
            3: [
                { x: cw_min * 9.7, y: ch_min * 6.18 },
                { x: cw_min * 16.5, y: ch_min * 17.3 },
                { x: cw_min * 2.5, y: ch_min * 17.3 },
            ],

            4: [
                { x: cw_min * 16.4, y: ch_min * 11.2 },
                { x: cw_min * 16.2, y: ch_min * 21.5 },
                { x: cw_min * 3, y: ch_min * 21.5 },
                { x: cw_min * 2.8, y: ch_min * 11.2 },
            ],

            5: [
                { x: cw_min * 9.7, y: ch_min * 6.18 },
                { x: cw_min * 16.3, y: ch_min * 11.15 },
                { x: cw_min * 16.2, y: ch_min * 21.5 },
                { x: cw_min * 3, y: ch_min * 21.5 },
                { x: cw_min * 2.8, y: ch_min * 11.15 },
            ],

            6: [
                { x: cw_min * 16.3, y: ch_min * 11.18 },
                { x: cw_min * 16.4, y: ch_min * 21.39 },
                { x: cw_min * 9.7, y: ch_min * 23.48 },
                { x: cw_min * 2.8, y: ch_min * 21.39 },
                { x: cw_min * 2.8, y: ch_min * 11.18 },
                { x: cw_min * 9.7, y: ch_min * 6.18 },
            ],

            7: [
                { x: cw_min * 16, y: ch_min * 9.18 },
                { x: cw_min * 16.8, y: ch_min * 15.2 },
                { x: cw_min * 16.3, y: ch_min * 21.5 },
                { x: cw_min * 3, y: ch_min * 21.5 },
                { x: cw_min * 2.2, y: ch_min * 15.2 },
                { x: cw_min * 3.1, y: ch_min * 9.18 },
                { x: cw_min * 9.7, y: ch_min * 6.18 },
            ],

            8: [
                { x: cw_min * 16.8, y: ch_min * 15.2 },
                { x: cw_min * 16.2, y: ch_min * 21.4 },
                { x: cw_min * 7.2, y: ch_min * 22.9 },
                { x: cw_min * 3, y: ch_min * 21.4 },
                { x: cw_min * 2.3, y: ch_min * 15.2 },
                { x: cw_min * 3, y: ch_min * 9.18 },
                { x: cw_min * 9.7, y: ch_min * 6.1 },
                { x: cw_min * 16, y: ch_min * 9.18 },
            ],

            10: [
                { x: cw_min * 12.5, y: ch_min * 6.1 },
                { x: cw_min * 14.5, y: ch_min * 9.1 },
                { x: cw_min * 16.8, y: ch_min * 14.7 },
                { x: cw_min * 16.6, y: ch_min * 21.2 },
                { x: cw_min * 12, y: ch_min * 24.7 },
                { x: cw_min * 7, y: ch_min * 24.7 },
                { x: cw_min * 2.5, y: ch_min * 21.2 },
                { x: cw_min * 2.42, y: ch_min * 14.7 },
                { x: cw_min * 4.9, y: ch_min * 9.1 },
                { x: cw_min * 6.4, y: ch_min * 6.1 },
            ],
        },

        seatPotLayout_lb: {
            2: [
                { x: cw_min * 9.5, y: ch_min * 4 },
                { x: cw_min * 9.2, y: ch_min * 17.9 },
            ],
            3: [
                { x: cw_min * 9.5, y: ch_min * 4 },
                { x: cw_min * 15, y: ch_min * 16.3 },
                { x: cw_min * 3.3, y: ch_min * 16.3 },
            ],

            4: [
                { x: cw_min * 15, y: ch_min * 9 },
                { x: cw_min * 14, y: ch_min * 18.9 },
                { x: cw_min * 4, y: ch_min * 18.9 },
                { x: cw_min * 3.1, y: ch_min * 9 },
            ],

            5: [
                { x: cw_min * 9.5, y: ch_min * 4 },
                { x: cw_min * 15, y: ch_min * 13 },
                { x: cw_min * 9.2, y: ch_min * 17.9 },
                { x: cw_min * 4, y: ch_min * 18.9 },
                { x: cw_min * 3.1, y: ch_min * 9 },
            ],

            6: [
                { x: cw_min * 15, y: ch_min * 9 },
                { x: cw_min * 14, y: ch_min * 18.9 },
                { x: cw_min * 9.2, y: ch_min * 17.9 },
                { x: cw_min * 3, y: ch_min * 18.9 },
                { x: cw_min * 3.1, y: ch_min * 9 },
                { x: cw_min * 9.5, y: ch_min * 4 },
            ],

            7: [
                { x: cw_min * 15, y: ch_min * 9 },
                { x: cw_min * 14, y: ch_min * 18.9 },
                { x: cw_min * 9.2, y: ch_min * 17.9 },
                { x: cw_min * 3, y: ch_min * 18.9 },
                { x: cw_min * 1.2, y: ch_min * 13.95 },
                { x: cw_min * 3.1, y: ch_min * 9 },
                { x: cw_min * 9.5, y: ch_min * 4 },
            ],
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
            8: [
                { x: cw_min * 15, y: ch_min * 13.95 },
                { x: cw_min * 14, y: ch_min * 19 },
                { x: cw_min * 8, y: ch_min * 18 },
                { x: cw_min * 3, y: ch_min * 19 },
                { x: cw_min * 1.2, y: ch_min * 13.95 },
                { x: cw_min * 3.4, y: ch_min * 8.95 },
                { x: cw_min * 9.5, y: ch_min * 4 },
                { x: cw_min * 15, y: ch_min * 8.95 },
            ],

            10: [
                { x: cw_min * 12.5, y: ch_min * 4 },
                { x: cw_min * 14.5, y: ch_min * 9 },
                { x: cw_min * 15, y: ch_min * 14 },
                { x: cw_min * 14.7, y: ch_min * 19 },
                { x: cw_min * 11, y: ch_min * 18 },
                { x: cw_min * 6, y: ch_min * 18 },
                { x: cw_min * 2.8, y: ch_min * 19 },
                { x: cw_min * 1, y: ch_min * 14 },
                { x: cw_min * 3.2, y: ch_min * 9 },
                { x: cw_min * 5, y: ch_min * 4 },
            ],
        },
        seatPotLayout_rv: {
            2: [
                { x: cw_min * 8.5, y: ch_min * 5.8 },
                { x: cw_min * 9.2, y: ch_min * 17.9 },
            ],
            3: [
                { x: cw_min * 8.5, y: ch_min * 5.8 },
                { x: cw_min * 15.2, y: ch_min * 16.3 },
                { x: cw_min * 1.5, y: ch_min * 16.3 },
            ],

            4: [
                { x: cw_min * 14.5, y: ch_min * 9 },
                { x: cw_min * 14, y: ch_min * 18.9 },
                { x: cw_min * 4, y: ch_min * 18.9 },
                { x: cw_min * 3.1, y: ch_min * 9 },
            ],

            5: [
                { x: cw_min * 8.5, y: ch_min * 5.8 },
                { x: cw_min * 14.8, y: ch_min * 13 },
                { x: cw_min * 9.2, y: ch_min * 17.9 },
                { x: cw_min * 4, y: ch_min * 18.9 },
                { x: cw_min * 3.1, y: ch_min * 9 },
            ],

            6: [
                { x: cw_min * 14.5, y: ch_min * 9 },
                { x: cw_min * 14, y: ch_min * 18.9 },
                { x: cw_min * 9.2, y: ch_min * 17.9 },
                { x: cw_min * 3, y: ch_min * 18.9 },
                { x: cw_min * 3.1, y: ch_min * 9 },
                { x: cw_min * 8.5, y: ch_min * 5.8 },
            ],

            7: [
                { x: cw_min * 15, y: ch_min * 9 },
                { x: cw_min * 14, y: ch_min * 18.9 },
                { x: cw_min * 9.2, y: ch_min * 17.9 },
                { x: cw_min * 3, y: ch_min * 18.9 },
                { x: cw_min * 1.2, y: ch_min * 13.95 },
                { x: cw_min * 3.1, y: ch_min * 9 },
                { x: cw_min * 8.5, y: ch_min * 5.8 },
            ],
            9: [
                { x: cw_min * 8.5, y: ch_min * 5.8 },
                { x: cw_min * 14.5, y: ch_min * 9 },
                { x: cw_min * 15, y: ch_min * 14 },
                { x: cw_min * 14.7, y: ch_min * 19 },
                { x: cw_min * 11, y: ch_min * 18 },
                { x: cw_min * 6, y: ch_min * 18 },
                { x: cw_min * 2.8, y: ch_min * 19 },
                { x: cw_min * 1, y: ch_min * 14 },
                { x: cw_min * 3.2, y: ch_min * 9 },
            ],
            8: [
                { x: cw_min * 15, y: ch_min * 13.95 },
                { x: cw_min * 14, y: ch_min * 19 },
                { x: cw_min * 8, y: ch_min * 18 },
                { x: cw_min * 3, y: ch_min * 19 },
                { x: cw_min * 1.2, y: ch_min * 13.95 },
                { x: cw_min * 3.4, y: ch_min * 8.95 },
                { x: cw_min * 8.5, y: ch_min * 5.8 },
                { x: cw_min * 14.5, y: ch_min * 8.95 },
            ],

            10: [
                { x: cw_min * 12.5, y: ch_min * 5.8 },
                { x: cw_min * 14.5, y: ch_min * 9 },
                { x: cw_min * 15, y: ch_min * 14 },
                { x: cw_min * 14.7, y: ch_min * 19 },
                { x: cw_min * 11, y: ch_min * 18 },
                { x: cw_min * 6, y: ch_min * 18 },
                { x: cw_min * 2.8, y: ch_min * 19 },
                { x: cw_min * 1, y: ch_min * 14 },
                { x: cw_min * 3.2, y: ch_min * 9 },
                { x: cw_min * 5, y: ch_min * 5.8 },
            ],
        },


        tablePotLayout: [
            { x: cw_min * 9.5, y: ch_min * 10 },
            { x: cw_min * 12.5, y: ch_min * 10 },
            { x: cw_min * 13, y: ch_min * 17.8 },
            { x: cw_min * 13.6, y: ch_min * 19 },
            { x: cw_min * 6.5, y: ch_min * 17.8 },
            { x: cw_min * 9.8, y: ch_min * 23.5 },
            { x: cw_min * 5.9, y: ch_min * 19 },
            { x: cw_min * 6.5, y: ch_min * 10.2 },
            { x: cw_min * 9.8, y: ch_min * 5.5 },
            { x: cw_min * 10, y: ch_min * 10 },
        ],

        tablePotLayout_lb: [
            { x: cw_min * 9.5, y: ch_min * 8.8 },
            { x: cw_min * 12.5, y: ch_min * 9.5 },
            { x: cw_min * 12.5, y: ch_min * 16.5 },
            { x: cw_min * 9.5, y: ch_min * 16.5 },
            { x: cw_min * 12.5, y: ch_min * 6.8 },
            { x: cw_min * 6.5, y: ch_min * 16.5 },
            { x: cw_min * 6.5, y: ch_min * 9.5 },
            { x: cw_min * 6.2, y: ch_min * 6.8 },
            { x: cw_min * 9.8, y: ch_min * 5.5 },
            { x: cw_min * 10, y: ch_min * 9.5 },
        ],
        tablePotLayout_rv: [
            { x: cw_min * 9.5, y: ch_min * 8.8 },
            { x: cw_min * 12.5, y: ch_min * 9.5 },
            { x: cw_min * 12.5, y: ch_min * 16.5 },
            { x: cw_min * 9.5, y: ch_min * 16.5 },
            { x: cw_min * 12.5, y: ch_min * 7.4 },
            { x: cw_min * 6.5, y: ch_min * 16.5 },
            { x: cw_min * 6.5, y: ch_min * 9.5 },
            { x: cw_min * 6.2, y: ch_min * 7.4 },
            { x: cw_min * 9.5, y: ch_min * 5.5 },
            { x: cw_min * 10, y: ch_min * 9.5 },
        ],


        boardCardsPosition: {
            x: (fileName.name === "Leader_bet" ? 254 : (fileName.name === "Riverpoker" ? 318 : 450)),
            y: ((fileName.name === "Leader_bet" || fileName.name === "Riverpoker") ? 320 : 335),
            halfwidth: 0.5,
        },
        RitboardCardsPosition: {
            x: (fileName.name === "Leader_bet" ? 254 : (fileName.name === "Riverpoker" ? 318 : 450)),
            y: ((fileName.name === "Leader_bet" || fileName.name === "Riverpoker") ? 350 : 365),
            halfwidth: 0.5,
        },
        // boardCardsPosition: {
        //     x: 450,
        //     y: 335,
        //     halfwidth: 0.5,
        // },
        // RitboardCardsPosition: {
        //     x: 450,
        //     y: 365,
        //     halfwidth: 0.5,
        // },
        handstrength: {
            position: {
                y: fileName.name === "Leader_bet" ? 70 : (fileName.name === "Riverpoker" ? 20 : 0)
            }
        }
    }
    return details;
}
export default mobileproperties;