const cw_min = 800 / 20;
const ch_min = 480 / 30;

const seatLayout = {
    2: [
        { x: cw_min * 16.2, y: ch_min * 15.5 },
        { x: cw_min * 0.5, y: ch_min * 15.5 }
    ],
    3: [
        { x: cw_min * 15.8, y: ch_min * 10.2 },
        { x: cw_min * 15.8, y: ch_min * 20.6 },
        { x: cw_min * 0.5, y: ch_min * 15.5 },
    ],

    4: [
        { x: cw_min * 11.5, y: ch_min * 8 },
        { x: cw_min * 11.5, y: ch_min * 22.8 },
        { x: cw_min * 5.1, y: ch_min * 22.8 },
        { x: cw_min * 5.1, y: ch_min * 8 },
    ],

    5: [
        { x: cw_min * 11.5, y: ch_min * 8 },
        { x: cw_min * 16.2, y: ch_min * 15.5 },
        { x: cw_min * 11.5, y: ch_min * 22.8 },
        { x: cw_min * 5.1, y: ch_min * 22.8 },
        { x: cw_min * 5.1, y: ch_min * 8 },
    ],

    6: [
        { x: cw_min * 11.5, y: ch_min * 8 },
        { x: cw_min * 16.2, y: ch_min * 15.5 },
        { x: cw_min * 11.5, y: ch_min * 22.8 },
        { x: cw_min * 5.1, y: ch_min * 22.8 },
        { x: cw_min * 0.5, y: ch_min * 15.5 },
        { x: cw_min * 5.1, y: ch_min * 8 },
    ],

    7: [
        { x: cw_min * 11.5, y: ch_min * 8 },
        { x: cw_min * 15.8, y: ch_min * 10.2 },
        { x: cw_min * 15.8, y: ch_min * 20.6 },
        { x: cw_min * 11.5, y: ch_min * 22.8 },
        { x: cw_min * 5.1, y: ch_min * 22.8 },
        { x: cw_min * 0.5, y: ch_min * 15.5 },
        { x: cw_min * 5.1, y: ch_min * 8 },
    ],

    8: [
        { x: cw_min * 11.5, y: ch_min * 8 },
        { x: cw_min * 15.8, y: ch_min * 10.2 },
        { x: cw_min * 15.8, y: ch_min * 20.6 },
        { x: cw_min * 11.5, y: ch_min * 22.8 },
        { x: cw_min * 5.1, y: ch_min * 22.8 },
        { x: cw_min * 0.9, y: ch_min * 20.6 },
        { x: cw_min * 0.9, y: ch_min * 10.2 },
        { x: cw_min * 5.1, y: ch_min * 8 },
    ],
    9: [
        { x: cw_min * 11.5, y: ch_min * 8 },
        { x: cw_min * 15.8, y: ch_min * 10.2 },
        { x: cw_min * 16.2, y: ch_min * 15.5 },
        { x: cw_min * 15.8, y: ch_min * 20.6 },
        { x: cw_min * 11.5, y: ch_min * 22.8 },
        { x: cw_min * 5.1, y: ch_min * 22.8 },
        { x: cw_min * 0.9, y: ch_min * 20.6 },
        { x: cw_min * 0.9, y: ch_min * 10.2 },
        { x: cw_min * 5.1, y: ch_min * 8 },
    ],

    10: [
        { x: cw_min * 11.5, y: ch_min * 8 },
        { x: cw_min * 15.8, y: ch_min * 10.2 },
        { x: cw_min * 16.2, y: ch_min * 15.5 },
        { x: cw_min * 15.8, y: ch_min * 20.6 },
        { x: cw_min * 11.5, y: ch_min * 22.8 },
        { x: cw_min * 5.1, y: ch_min * 22.8 },
        { x: cw_min * 0.9, y: ch_min * 20.6 },
        { x: cw_min * 0.5, y: ch_min * 15.5 },
        { x: cw_min * 0.9, y: ch_min * 10.2 },
        { x: cw_min * 5.1, y: ch_min * 8 },
    ],
}

const seatPotLayout = {
    2: [
        { x: cw_min * 15.6, y: ch_min * 15 },
        { x: cw_min * 3.82, y: ch_min * 15 },
    ],
    3: [
        { x: cw_min * 15.25, y: ch_min * 9.5 },
        { x: cw_min * 15.2, y: ch_min * 16.8 },
        { x: cw_min * 3.82, y: ch_min * 15 },
    ],

    4: [
        { x: cw_min * 10.95, y: ch_min * 8 },
        { x: cw_min * 13, y: ch_min * 17.1 },
        { x: cw_min * 6.3, y: ch_min * 17.1 },
        { x: cw_min * 8.4, y: ch_min * 8 },
    ],

    5: [
        { x: cw_min * 10.95, y: ch_min * 8 },
        { x: cw_min * 15.6, y: ch_min * 13.8 },
        { x: cw_min * 13, y: ch_min * 17.1 },
        { x: cw_min * 6.3, y: ch_min * 17.1 },
        { x: cw_min * 8.4, y: ch_min * 8 },
    ],

    6: [
        { x: cw_min * 10.95, y: ch_min * 8 },
        { x: cw_min * 15.6, y: ch_min * 13.8 },
        { x: cw_min * 13, y: ch_min * 17.1 },
        { x: cw_min * 6.3, y: ch_min * 17.1 },
        { x: cw_min * 3.82, y: ch_min * 13.8 },
        { x: cw_min * 8.4, y: ch_min * 8 },
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
        { x: cw_min * 10.95, y: ch_min * 8 },
        { x: cw_min * 15.25, y: ch_min * 9.5 },
        { x: cw_min * 15.2, y: ch_min * 16.8 },
        { x: cw_min * 13, y: ch_min * 17.1 },
        { x: cw_min * 6.3, y: ch_min * 17.1 },
        { x: cw_min * 4.2, y: ch_min * 16.8 },
        { x: cw_min * 4.2, y: ch_min * 9.5 },
        { x: cw_min * 8.4, y: ch_min * 8 },
    ],

    9: [
        { x: cw_min * 10.95, y: ch_min * 8 },
        { x: cw_min * 15.25, y: ch_min * 9.5 },
        { x: cw_min * 15.6, y: ch_min * 13.8 },
        { x: cw_min * 15.2, y: ch_min * 16.8 },
        { x: cw_min * 13, y: ch_min * 17.1 },
        { x: cw_min * 6.3, y: ch_min * 17.1 },
        { x: cw_min * 4.2, y: ch_min * 16.8 },
        { x: cw_min * 4.2, y: ch_min * 9.5 },
        { x: cw_min * 8.4, y: ch_min * 8 },
    ],
    10: [
        { x: cw_min * 10.95, y: ch_min * 8 },
        { x: cw_min * 15.25, y: ch_min * 9.5 },
        { x: cw_min * 15.6, y: ch_min * 13.8 },
        { x: cw_min * 15.2, y: ch_min * 16.8 },
        { x: cw_min * 13, y: ch_min * 17.1 },
        { x: cw_min * 6.3, y: ch_min * 17.1 },
        { x: cw_min * 4.2, y: ch_min * 16.8 },
        { x: cw_min * 3.82, y: ch_min * 13.8 },
        { x: cw_min * 4.2, y: ch_min * 9.5 },
        { x: cw_min * 8.4, y: ch_min * 8 },
    ],
}

const tablePotLayout = [
    { x: cw_min * 9.7, y: ch_min * 8.8 },
    { x: cw_min * 13.2, y: ch_min * 12 },
    { x: cw_min * 6.2, y: ch_min * 12 },
    { x: cw_min * 13.5, y: ch_min * 15.2 },
    { x: cw_min * 6, y: ch_min * 15.2 },
    { x: cw_min * 12.4, y: ch_min * 16.4 },
    { x: cw_min * 7.1, y: ch_min * 16.4 },
    { x: cw_min * 12.1, y: ch_min * 10.8 },
    { x: cw_min * 7.25, y: ch_min * 10.8 },
    { x: cw_min * 10, y: ch_min * 10 },
];


const DealerLayout = {
    2: [
        { x: cw_min * 15.85, y: ch_min * 14.5 },
        { x: cw_min * 4, y: ch_min * 14.5 },
    ],
    3: [
        { x: cw_min * 15.5, y: ch_min * 8.8 },
        { x: cw_min * 15.5, y: ch_min * 20 },
        { x: cw_min * 3.92, y: ch_min * 14.2 },
    ],

    4: [
        { x: cw_min * 11.2, y: ch_min * 7.4 },
        // { x: this.cw_min * 15.5, y: this.ch_min * 9.2 },
        // { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
        // { x: this.cw_min * 15.5, y: this.ch_min * 20 },
        { x: cw_min * 11.2, y: ch_min * 21 },
        { x: cw_min * 8.6, y: ch_min * 21 },
        // { x: this.cw_min * 4.35, y: this.ch_min * 20 },
        // { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
        // { x: this.cw_min * 4.32, y: this.ch_min * 9.2 },
        { x: cw_min * 8.56, y: ch_min * 7.4 },
    ],

    5: [
        { x: cw_min * 11.2, y: ch_min * 7.4 },
        // { x: this.cw_min * 15.5, y: this.ch_min * 9.2 },
        { x: cw_min * 15.95, y: ch_min * 13.2 },
        // { x: this.cw_min * 15.5, y: this.ch_min * 20 },
        { x: cw_min * 11.2, y: ch_min * 21 },
        { x: cw_min * 8.6, y: ch_min * 21 },
        // { x: this.cw_min * 4.35, y: this.ch_min * 20 },
        // { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
        // { x: this.cw_min * 4.32, y: this.ch_min * 9.2 },
        { x: cw_min * 8.56, y: ch_min * 7.4 },
    ],

    6: [
        { x: cw_min * 11.2, y: ch_min * 7.4 },
        // { x: this.cw_min * 15.5, y: this.ch_min * 9.2 },
        { x: cw_min * 15.95, y: ch_min * 13.2 },
        // { x: this.cw_min * 15.5, y: this.ch_min * 20 },
        { x: cw_min * 11.2, y: ch_min * 21 },
        { x: cw_min * 8.6, y: ch_min * 21 },
        // { x: this.cw_min * 4.35, y: this.ch_min * 20 },
        { x: cw_min * 3.9, y: ch_min * 13.2 },
        // { x: this.cw_min * 4.32, y: this.ch_min * 9.2 },
        { x: cw_min * 8.56, y: ch_min * 7.4 },
    ],

    7: [
        { x: cw_min * 11.2, y: ch_min * 7.4 },
        { x: cw_min * 15.5, y: ch_min * 9.2 },
        // { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
        { x: cw_min * 15.5, y: ch_min * 20 },
        { x: cw_min * 11.2, y: ch_min * 21 },
        { x: cw_min * 8.6, y: ch_min * 21 },
        // { x: this.cw_min * 4.35, y: this.ch_min * 20 },
        { x: cw_min * 3.9, y: ch_min * 13.2 },
        // { x: this.cw_min * 4.32, y: this.ch_min * 9.2 },
        { x: cw_min * 8.56, y: ch_min * 7.4 },
    ],

    8: [
        { x: cw_min * 11.2, y: ch_min * 7.4 },
        { x: cw_min * 15.5, y: ch_min * 9 },
        // { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
        { x: cw_min * 15.5, y: ch_min * 20 },
        { x: cw_min * 11.2, y: ch_min * 21 },
        { x: cw_min * 8.6, y: ch_min * 21 },
        { x: cw_min * 4.35, y: ch_min * 20 },
        // { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
        { x: cw_min * 4.32, y: ch_min * 9 },
        { x: cw_min * 8.56, y: ch_min * 7.4 },
    ],

    9: [
        { x: cw_min * 11.2, y: ch_min * 7.4 },
        { x: cw_min * 15.5, y: ch_min * 9 },
        { x: cw_min * 15.95, y: ch_min * 13.2 },
        { x: cw_min * 15.5, y: ch_min * 20 },
        { x: cw_min * 11.2, y: ch_min * 21 },
        { x: cw_min * 8.6, y: ch_min * 21 },
        { x: cw_min * 4.35, y: ch_min * 20 },
        // { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
        { x: cw_min * 4.32, y: ch_min * 9 },
        { x: cw_min * 8.56, y: ch_min * 7.4 },
    ],
    10: [
        { x: cw_min * 11.2, y: ch_min * 7.4 },
        { x: cw_min * 15.5, y: ch_min * 9 },
        { x: cw_min * 15.95, y: ch_min * 13.2 },
        { x: cw_min * 15.5, y: ch_min * 20 },
        { x: cw_min * 11.2, y: ch_min * 21 },
        { x: cw_min * 8.6, y: ch_min * 21 },
        { x: cw_min * 4.35, y: ch_min * 20 },
        { x: cw_min * 3.9, y: ch_min * 13.2 },
        { x: cw_min * 4.32, y: ch_min * 9 },
        { x: cw_min * 8.56, y: ch_min * 7.4 },
    ],
}


const Landscape = { seatLayout, seatPotLayout, tablePotLayout, DealerLayout }

export default Landscape;