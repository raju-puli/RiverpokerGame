import React from 'react';
import "../../../../../css/ui/popUps/settings/tableThemes.css";

// import carpet1_icon from '../../../../../assets/images/table/carpets/Carpet1_icon.png'
// import carpet2_icon from '../../../../../assets/images/table/carpets/Carpet2_icon.png'
// import carpet3_icon from '../../../../../assets/images/table/carpets/Carpet3_icon.png'
// import carpet4_icon from '../../../../../assets/images/table/carpets/Carpet4_icon.png'
// import carpet5_icon from '../../../../../assets/images/table/carpets/Carpet5_icon.png'


// import carpet1 from '../../../../../assets/images/table/carpets/carpetPreview_1.jpg'
// import carpet2 from '../../../../../assets/images/table/carpets/carpetPreview_2.png'
// import carpet3 from '../../../../../assets/images/table/carpets/carpetPreview_3.png'
// import carpet4 from '../../../../../assets/images/table/carpets/carpetPreview_4.png'
// import carpet5 from '../../../../../assets/images/table/carpets/carpetPreview_5.png'
// import table1 from '../../../../../assets/images/table/tables/tablePreview_1.png';
// import table2 from '../../../../../assets/images/table/tables/tablePreview_2.png'
// import table3 from '../../../../../assets/images/table/tables/tablePreview_3.png'
// import table4 from '../../../../../assets/images/table/tables/tablePreview_4.png'
// import table5 from '../../../../../assets/images/table/tables/tablePreview_5.png'

function TableThemes(props) {


    // function setCarpet(e) {
    //     document.getElementById('carpetimg').src = e;
    // }
    // function setTable(e) {
    //     document.getElementById('tableimg').src = e;
    // }

    return (
        <div className="tableThemes">
            <div className="selectionPanel">
                {/* <div className="selectionLeft">
                    <header className="Theader">Background</header>
                    <div className="leftImages">

                        <img src={carpet1_icon} alt="carpet1_icon" onClick={() => { setCarpet(carpet1); props.carpetChild("carpet1") }} id="carpet1" />
                        <img src={carpet2_icon} alt="carpet2_icon" onClick={() => { setCarpet(carpet2); props.carpetChild("carpet2") }} />
                        <img src={carpet3_icon} alt="carpet3_icon" onClick={() => { setCarpet(carpet3); props.carpetChild("carpet3") }} />
                        <img src={carpet4_icon} alt="carpet4_icon" onClick={() => { setCarpet(carpet4); props.carpetChild("carpet4") }} />
                        <img src={carpet5_icon} alt="carpet5_icon" onClick={() => { setCarpet(carpet5); props.carpetChild("carpet5") }} />
                    </div>
                </div> */}
                {/* <div className="selectionRight">
                    <header className="Theader">Table Colour</header>
                    <div className="rightImages">
                        <img src={table1_icon} alt="table1_icon" onClick={() => { setTable(table1); props.tableChild("table1") }} id="table1" />
                        <img src={table2_icon} alt="table2_icon" onClick={() => { setTable(table2); props.tableChild("table2") }} />
                        <img src={table3_icon} alt="table3_icon" onClick={() => { setTable(table3); props.tableChild("table3") }} />
                        <img src={table4_icon} alt="table4_icon" onClick={() => { setTable(table4); props.tableChild("table4") }} />
                        <img src={table5_icon} alt="table5_icon" onClick={() => { setTable(table5); props.tableChild("table5") }} />
                    </div>
                </div> */}
            </div>
            <div className="previewPanel">
                <div className="carpetimg">
                    {/* <img id="carpetimg" src={carpet1} alt='' /> */}
                    <div className='carpetdiv'></div>
                </div>
                {/* <div className="tableimg">
                    <img id="tableimg" src={table1} alt='' />
                </div> */}
            </div>
        </div>

    )

}
export default TableThemes