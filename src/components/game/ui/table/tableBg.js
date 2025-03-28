import { useEffect, useState } from "react";

import carpet1 from "../../../../assets/images/table/carpets/Carpet1.jpg";
import carpet2 from "../../../../assets/images/table/carpets/Carpet2.png";
import carpet3 from "../../../../assets/images/table/carpets/Carpet3.png";
import carpet4 from "../../../../assets/images/table/carpets/Carpet4.png";
import carpet5 from "../../../../assets/images/table/carpets/Carpet5.png";

import "../../../../css/ui/table/tableBg.css"

export const TableBg = (props) => {

    useEffect(() => {
        switch (props.themes.carpet) {
            case "carpet1":
                setCarpet(carpet1);
                break;
            case "carpet2":
                setCarpet(carpet2);
                break;
            case "carpet3":
                setCarpet(carpet3);
                break;
            case "carpet4":
                setCarpet(carpet4);
                break;
            case "carpet5":
                setCarpet(carpet5);
                break;
            default:
                break;
        }
        switch (props.themes.table) {
            case "table1":
                setTable(table1);
                break;
            case "table2":
                setTable(table2);
                break;
            case "table3":
                setTable(table3);
                break;
            case "table4":
                setTable(table4);
                break;
            case "table5":
                setTable(table5);
                break;
            default:
                break;
        }
    }, [props]);

    return (
        <div className="gameBg">
            {/* <div className="carpetBg" >
                <div className="DivTableWaterMark">
                    <img className="TableWaterMark" src={TableWaterMark} alt="" />
                </div>
            </div> */}
        </div>
    )
}