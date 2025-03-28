const cw_min = 480 / 20;
const ch_min = 800 / 30;

const seatLayout = {
    2: [
        { x: cw_min * 8.8, y: ch_min * 4.8 },
        //  { x: cw_min * 15, y: ch_min * 9.5 },
        //  { x: cw_min * 15.5, y: ch_min * 17 },
        { x: cw_min * 8.8, y: ch_min * 22.8 },
        //  { x: cw_min * 1.85, y: ch_min * 17 },
        //  { x: cw_min * 2.35, y: ch_min * 9.5 },
    ],
    3: [
        // { x: cw_min * 8.8, y: ch_min * 4.8 },
        { x: cw_min * 15, y: ch_min * 9.5 },
        //  { x: cw_min * 15.5, y: ch_min * 17 },
        { x: cw_min * 8.8, y: ch_min * 22.8 },
        //  { x: cw_min * 1.85, y: ch_min * 17 },
        { x: cw_min * 2.35, y: ch_min * 9.5 },
    ],

    4: [
        // { x: cw_min * 8.8, y: ch_min * 4.8 },
        { x: cw_min * 15, y: ch_min * 9.5 },
        { x: cw_min * 15.5, y: ch_min * 17 },
        // { x: cw_min * 8.8, y: ch_min * 22.8 },
        { x: cw_min * 1.85, y: ch_min * 17 },
        { x: cw_min * 2.35, y: ch_min * 9.5 },
    ],

    5: [
        // { x: cw_min * 8.8, y: ch_min * 4.8 },
        { x: cw_min * 15, y: ch_min * 9.5 },
        { x: cw_min * 15.5, y: ch_min * 17 },
        { x: cw_min * 8.8, y: ch_min * 22.8 },
        { x: cw_min * 1.85, y: ch_min * 17 },
        { x: cw_min * 2.35, y: ch_min * 9.5 },
    ],

    6: [
        { x: cw_min * 8.8, y: ch_min * 4.8 },
        { x: cw_min * 15, y: ch_min * 9.5 },
        { x: cw_min * 15.5, y: ch_min * 17 },
        { x: cw_min * 8.8, y: ch_min * 22.8 },
        { x: cw_min * 1.85, y: ch_min * 17 },
        { x: cw_min * 2.35, y: ch_min * 9.5 },
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
        { x: cw_min * 8.8, y: ch_min * 4.8 },
        { x: cw_min * 15.4, y: ch_min * 8.75 },
        { x: cw_min * 15.5, y: ch_min * 14 },
        { x: cw_min * 15.6, y: ch_min * 19.2 },
        // { x: cw_min * 11.8, y: ch_min * 22.8 },
        { x: cw_min * 8.8, y: ch_min * 22.8 },
        { x: cw_min * 1.8, y: ch_min * 19.2 },
        { x: cw_min * 1.9, y: ch_min * 14 },
        { x: cw_min * 2, y: ch_min * 8.75 },
        // { x: cw_min * 5.6, y: ch_min * 4.8 },
    ],
    9: [
        { x: cw_min * 11.8, y: ch_min * 4.8 },
        { x: cw_min * 15.4, y: ch_min * 8.75 },
        { x: cw_min * 15.5, y: ch_min * 14 },
        { x: cw_min * 15.6, y: ch_min * 19.2 },
        // { x: cw_min * 11.8, y: ch_min * 22.8 },
        { x: cw_min * 8.8, y: ch_min * 22.8 },
        { x: cw_min * 1.8, y: ch_min * 19.2 },
        { x: cw_min * 1.9, y: ch_min * 14 },
        { x: cw_min * 2, y: ch_min * 8.75 },
        { x: cw_min * 5.6, y: ch_min * 4.8 },
    ],

    10: [
        { x: cw_min * 11.8, y: ch_min * 4.8 },
        { x: cw_min * 15.4, y: ch_min * 8.75 },
        { x: cw_min * 15.5, y: ch_min * 14 },
        { x: cw_min * 15.6, y: ch_min * 19.2 },
        { x: cw_min * 11.8, y: ch_min * 22.8 },
        { x: cw_min * 5.6, y: ch_min * 22.8 },
        { x: cw_min * 1.8, y: ch_min * 19.2 },
        { x: cw_min * 1.9, y: ch_min * 14 },
        { x: cw_min * 2, y: ch_min * 8.75 },
        { x: cw_min * 5.6, y: ch_min * 4.8 },
    ],
}

const seatPotLayout = {
    2: [
        { x: cw_min * 10.5, y: ch_min * 5.8 },
        //    { x: cw_min * 15.4, y: ch_min * 10.6 },
        //   { x: cw_min * 15.4, y: ch_min * 18 },
        { x: cw_min * 9.4, y: ch_min * 18.6 },
        //   { x: cw_min * 4, y: ch_min * 18 },
        //    { x: cw_min * 4.4, y: ch_min * 10.6 },
    ],
    3: [
        // { x: cw_min * 10.5, y: ch_min * 5.8 },
        { x: cw_min * 15.4, y: ch_min * 10.6 },
        //   { x: cw_min * 15.4, y: ch_min * 18 },
        { x: cw_min * 9.4, y: ch_min * 18.6 },
        //   { x: cw_min * 4, y: ch_min * 18 },
        { x: cw_min * 4.4, y: ch_min * 10.6 },
    ],

    4: [
        // { x: cw_min * 10.5, y: ch_min * 5.8 },
        { x: cw_min * 15.4, y: ch_min * 10.6 },
        { x: cw_min * 15.4, y: ch_min * 18 },
        //    { x: cw_min * 9.4, y: ch_min * 18.6 },
        { x: cw_min * 4, y: ch_min * 18 },
        { x: cw_min * 4.4, y: ch_min * 10.6 },
    ],

    5: [
        // { x: cw_min * 10.5, y: ch_min * 5.8 },
        { x: cw_min * 15.4, y: ch_min * 10.6 },
        { x: cw_min * 15.4, y: ch_min * 18 },
        { x: cw_min * 9.4, y: ch_min * 18.6 },
        { x: cw_min * 4, y: ch_min * 18 },
        { x: cw_min * 4.4, y: ch_min * 10.6 },
    ],

    6: [
        { x: cw_min * 10.5, y: ch_min * 5.8 },
        { x: cw_min * 15.4, y: ch_min * 10.6 },
        { x: cw_min * 15.4, y: ch_min * 18 },
        { x: cw_min * 9.4, y: ch_min * 18.6 },
        { x: cw_min * 4, y: ch_min * 18 },
        { x: cw_min * 4.4, y: ch_min * 10.6 },
    ],

    7: [
        { x: cw_min * 10.95, y: ch_min * 8 },
        { x: cw_min * 15.25, y: ch_min * 9.5 },
        { x: cw_min * 15.2, y: ch_min * 16.8 },
        { x: cw_min * 13, y: ch_min * 17.1 },
        { x: cw_min * 6.3, y: ch_min * 17.1 },
        { x: cw_min * 4.2, y: ch_min * 16.8 },
        { x: cw_min * 8.4, y: ch_min * 8 },
    ],

    8: [
        { x: cw_min * 10.5, y: ch_min * 5.8 },
        { x: cw_min * 15.4, y: ch_min * 9.68 },
        { x: cw_min * 15.8, y: ch_min * 15 },
        { x: cw_min * 13.2, y: ch_min * 16.2 },
        // { x: cw_min * 12.5, y: ch_min * 18.6 },
        { x: cw_min * 8.6, y: ch_min * 18.8 },
        { x: cw_min * 6.5, y: ch_min * 16.2 },
        { x: cw_min * 4, y: ch_min * 14.85 },
        { x: cw_min * 4.4, y: ch_min * 9.65 },
        // { x: cw_min * 7.6, y: ch_min * 5.8 },
    ],

    9: [
        { x: cw_min * 12, y: ch_min * 5.8 },
        { x: cw_min * 15.4, y: ch_min * 9.68 },
        { x: cw_min * 15.8, y: ch_min * 15 },
        { x: cw_min * 13.2, y: ch_min * 16.2 },
        // { x: cw_min * 12.5, y: ch_min * 18.6 },
        { x: cw_min * 8.6, y: ch_min * 18.8 },
        { x: cw_min * 6.5, y: ch_min * 16.2 },
        { x: cw_min * 4, y: ch_min * 14.85 },
        { x: cw_min * 4.4, y: ch_min * 9.65 },
        { x: cw_min * 7.6, y: ch_min * 5.8 },
    ],
    10: [
        { x: cw_min * 12, y: ch_min * 5.8 },
        { x: cw_min * 15.4, y: ch_min * 9.68 },
        { x: cw_min * 15.8, y: ch_min * 15 },
        { x: cw_min * 13.2, y: ch_min * 16.2 },
        { x: cw_min * 12.5, y: ch_min * 18.6 },
        { x: cw_min * 7.8, y: ch_min * 18.4 },
        { x: cw_min * 6.5, y: ch_min * 16.2 },
        { x: cw_min * 4, y: ch_min * 14.85 },
        { x: cw_min * 4.4, y: ch_min * 9.65 },
        { x: cw_min * 7.6, y: ch_min * 5.8 },
    ],
}

const tablePotLayout = [
    { x: cw_min * 11.05, y: ch_min * 8.8 },
    { x: cw_min * 12.2, y: ch_min * 17.9 },
    { x: cw_min * 9.8, y: ch_min * 17.9 },
    { x: cw_min * 13.8, y: ch_min * 9.6 },
    { x: cw_min * 8, y: ch_min * 9.6 },
    { x: cw_min * 9, y: ch_min * 8 },
    { x: cw_min * 12.9, y: ch_min * 8 },
    { x: cw_min * 14.4, y: ch_min * 14.6 },
    { x: cw_min * 7.4, y: ch_min * 14.6 },
    { x: cw_min * 10, y: ch_min * 10 },
]

const DealerLayout = {
    2: [
        { x: cw_min * 8.6, y: ch_min * 4.2 },
        // { x: cw_min * 14.9, y: ch_min * 8.8 },
        //  { x: cw_min * 15.4, y: ch_min * 13.6 },
        //   { x: cw_min * 15.3, y: ch_min * 16.4 },

        { x: cw_min * 8.6, y: ch_min * 22.2 },
        // { x: cw_min * 10.8, y: ch_min * 22.2 },
        //   { x: cw_min * 7, y: ch_min * 16.4 },
        //  { x: cw_min * 7.1, y: ch_min * 13.6 },
        // { x: cw_min * 7.5, y: ch_min * 8.8 },
        // { x: cw_min * 10.8, y: ch_min * 4.2 },
    ],
    3: [
        // { x: cw_min * 8.6, y: ch_min * 4.2 },
        { x: cw_min * 14.9, y: ch_min * 8.8 },
        //  { x: cw_min * 15.4, y: ch_min * 13.6 },
        //   { x: cw_min * 15.3, y: ch_min * 16.4 },

        { x: cw_min * 8.6, y: ch_min * 22.2 },
        // { x: cw_min * 10.8, y: ch_min * 22.2 },
        //   { x: cw_min * 7, y: ch_min * 16.4 },
        //  { x: cw_min * 7.1, y: ch_min * 13.6 },
        { x: cw_min * 7.5, y: ch_min * 8.8 },
        // { x: cw_min * 10.8, y: ch_min * 4.2 },
    ],

    4: [
        // { x: cw_min * 8.6, y: ch_min * 4.2 },
        { x: cw_min * 14.9, y: ch_min * 8.8 },
        //  { x: cw_min * 15.4, y: ch_min * 13.6 },
        { x: cw_min * 15.3, y: ch_min * 16.4 },

        //   { x: cw_min * 8.6, y: ch_min * 22.2 },
        // { x: cw_min * 10.8, y: ch_min * 22.2 },
        { x: cw_min * 7, y: ch_min * 16.4 },
        //  { x: cw_min * 7.1, y: ch_min * 13.6 },
        { x: cw_min * 7.5, y: ch_min * 8.8 },
        // { x: cw_min * 10.8, y: ch_min * 4.2 },
    ],

    5: [
        // { x: cw_min * 8.6, y: ch_min * 4.2 },
        { x: cw_min * 14.9, y: ch_min * 8.8 },
        //  { x: cw_min * 15.4, y: ch_min * 13.6 },
        { x: cw_min * 15.3, y: ch_min * 16.4 },

        { x: cw_min * 8.6, y: ch_min * 22.2 },
        // { x: cw_min * 10.8, y: ch_min * 22.2 },
        { x: cw_min * 7, y: ch_min * 16.4 },
        //  { x: cw_min * 7.1, y: ch_min * 13.6 },
        { x: cw_min * 7.5, y: ch_min * 8.8 },
        // { x: cw_min * 10.8, y: ch_min * 4.2 },
    ],

    6: [
        { x: cw_min * 8.6, y: ch_min * 4.2 },
        { x: cw_min * 14.9, y: ch_min * 8.8 },
        //  { x: cw_min * 15.4, y: ch_min * 13.6 },
        { x: cw_min * 15.3, y: ch_min * 16.4 },

        { x: cw_min * 8.6, y: ch_min * 22.2 },
        // { x: cw_min * 10.8, y: ch_min * 22.2 },
        { x: cw_min * 7, y: ch_min * 16.4 },
        //  { x: cw_min * 7.1, y: ch_min * 13.6 },
        { x: cw_min * 7.5, y: ch_min * 8.8 },
        // { x: cw_min * 10.8, y: ch_min * 4.2 },
    ],

    7: [
        // { x: cw_min * 8.6, y: ch_min * 4.2 },
        { x: cw_min * 15.2, y: ch_min * 8.2 },
        { x: cw_min * 15.4, y: ch_min * 13.6 },
        { x: cw_min * 15.4, y: ch_min * 18.6 },

        { x: cw_min * 8.6, y: ch_min * 22.2 },
        // { x: cw_min * 10.8, y: ch_min * 22.2 },
        { x: cw_min * 7, y: ch_min * 18.6 },
        { x: cw_min * 7.1, y: ch_min * 13.6 },
        { x: cw_min * 7.2, y: ch_min * 8.2 },
        // { x: cw_min * 10.8, y: ch_min * 4.2 },
    ],

    8: [
        { x: cw_min * 8.6, y: ch_min * 4.2 },
        { x: cw_min * 15.2, y: ch_min * 8.2 },
        { x: cw_min * 15.4, y: ch_min * 13.6 },
        { x: cw_min * 15.4, y: ch_min * 18.6 },

        { x: cw_min * 8.6, y: ch_min * 22.2 },
        // { x: cw_min * 10.8, y: ch_min * 22.2 },
        { x: cw_min * 7, y: ch_min * 18.6 },
        { x: cw_min * 7.1, y: ch_min * 13.6 },
        { x: cw_min * 7.2, y: ch_min * 8.2 },
        // { x: cw_min * 10.8, y: ch_min * 4.2 },
    ],

    9: [
        { x: cw_min * 11.6, y: ch_min * 4.2 },
        { x: cw_min * 15.2, y: ch_min * 8.2 },
        { x: cw_min * 15.4, y: ch_min * 13.6 },
        { x: cw_min * 15.4, y: ch_min * 18.6 },

        { x: cw_min * 8.6, y: ch_min * 22.2 },
        // { x: cw_min * 10.8, y: ch_min * 22.2 },
        { x: cw_min * 7, y: ch_min * 18.6 },
        { x: cw_min * 7.1, y: ch_min * 13.6 },
        { x: cw_min * 7.2, y: ch_min * 8.2 },
        { x: cw_min * 10.8, y: ch_min * 4.2 },
    ],
    10: [
        { x: cw_min * 11.6, y: ch_min * 4.2 },
        { x: cw_min * 15.2, y: ch_min * 8.2 },
        { x: cw_min * 15.4, y: ch_min * 13.6 },
        { x: cw_min * 15.4, y: ch_min * 18.6 },
        { x: cw_min * 11.6, y: ch_min * 22.2 },
        { x: cw_min * 10.8, y: ch_min * 22.2 },
        { x: cw_min * 7, y: ch_min * 18.6 },
        { x: cw_min * 7.1, y: ch_min * 13.6 },
        { x: cw_min * 7.2, y: ch_min * 8.2 },
        { x: cw_min * 10.8, y: ch_min * 4.2 },
    ],
}


const Portrait = { seatLayout, seatPotLayout, tablePotLayout, DealerLayout }

export default Portrait;