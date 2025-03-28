export default class DateUtils {
    constructor() {
        this.FORMAT_MMM_DD_YYYY = "MMM DD YYYY";
        this.FORMAT_MMM_DD_YYYY_HH_MM = "MMM DD YYYY HH:MM";
        this.FORMAT_YYYY_MM_DD_MM_HH_SS = "YYYY-MM-DD HH:MM:SS";
        this.FORMAT_YYYY_MM_DD_MM_HH = "YYYY-MM-DD HH:MM";
        this.FORMAT_MMM_DD_HH_MM = "MMM DD HH:MM";
        this.FORMAT_DD_MMM_HH_MM = "DD MMM HH:MM";
        this.FORMAT_HH_MM = "HH:MM";
        this.FORMAT_MM = "MM";
        this.counter = 0;
    };

    formatDateFromNumber(mSec, formatString) {
        let objDate = new Date(parseInt(mSec));

        let day = this.formatNumber(objDate.getDate().toString());
        let month = objDate.getMonth();
        let fullYear = objDate.getFullYear().toString();
        let hour = this.formatNumber(objDate.getHours().toString());
        let minute = this.formatNumber(objDate.getMinutes().toString());
        let seconds = this.formatNumber(objDate.getSeconds().toString());
        let shortMonthName = this.getShortMonthName(month);

        if (formatString === this.FORMAT_MMM_DD_YYYY_HH_MM) {
            return shortMonthName + " " + day + " " + fullYear + " " + hour + ":" + minute;
        } else if (formatString === this.FORMAT_MMM_DD_HH_MM) {
            return shortMonthName + " " + day + " " + hour + ":" + minute;
        } else if (formatString === this.FORMAT_DD_MMM_HH_MM) {
            return month + "/" + day + " " + hour + ":" + minute;
        } else if (formatString === this.FORMAT_HH_MM) {
            return hour + ":" + minute;
        } else if (formatString === this.FORMAT_MMM_DD_YYYY) {
            return shortMonthName + " " + day + ", " + fullYear;
        } else if (formatString === this.FORMAT_YYYY_MM_DD_MM_HH_SS) {
            return fullYear + "-" + this.formatNumber((month + 1).toString()) + "-" +
                day + " " + hour + ":" + minute + ":" + seconds;
        } else if (formatString === this.FORMAT_YYYY_MM_DD_MM_HH) {
            return fullYear + "-" + this.formatNumber((month + 1).toString()) + "-" +
                day + " " + hour + ":" + minute;
        } else if (formatString === this.FORMAT_MM) {
            return minute;
        } else {
            return "";
        }
    };

    formatNumber(strInp) {
        if (Number(strInp.length) === 1) {
            return "0" + strInp;
        } else {
            return strInp;
        }
    };

    getShortMonthName(month) {
        let monthNames_array = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames_array[month];
    };

    getFullMonthName(month) {
        let monthNames_array = ["January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December"];
        return monthNames_array[month];
    };

    getHoursLeft(d) {
        let curTime = 0;

        if (d instanceof Date)
            curTime = d.valueOf();
        else
            curTime = d;

        curTime /= 1000;
        let hours = (Math.floor(curTime / (60 * 60))) % 24;
        return hours.toString();
    };

    getMinutesLeft(d) {
        let t2 = Math.abs(Number(Date.now()) - Number(d)) / 1000;
        // let sec = Math.trunc(t2 % 60);
        let min = Math.trunc(t2 / 60);
        return min.toString();
    };

    getSecondsLeft(d) {
        let t2 = Math.abs(Number(Date.now()) - Number(d)) / 1000;
        let sec = Math.trunc(t2 % 60);
        // let min = Math.trunc(t2 / 60);
        return sec.toString();
    };

    getUniqueIdentifier() {
        this.counter++
        // console.log(this.counter);
        // return new Date().getTime().toString();
        return this.counter;
    };

    getTimeUTC() {
        let currentDate = new Date();
        return Date.UTC(currentDate.getUTCFullYear(),
            currentDate.getUTCMonth(),
            currentDate.getUTCDate(),
            currentDate.getUTCHours(),
            currentDate.getUTCMinutes(),
            currentDate.getUTCSeconds(),
            currentDate.getUTCMilliseconds())
    };
}