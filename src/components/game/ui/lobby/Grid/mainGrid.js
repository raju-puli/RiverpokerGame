import React, { useMemo, useState, useEffect, useRef } from "react";
import "../../../../../css/ui/lobby/mainGrid.css";
import Columns from "./mainGridColumns";
import { useTable, useRowSelect, useSortBy } from "react-table";
import { withTranslation } from 'react-i18next';
import eventEmitter from "../../../../utils/eventEmitter";
// import fileName from "../../../../../jsconfig";
// import Config from "../../../../../config";

export const MainGrid = (props) => {
    // const config = new Config();
    const columns = useMemo(() => Columns.Columns1, []);
    const data = useMemo(() => props.data, [props.data]);

    const scrollContainerRef = useRef(null);

    const table = useTable(
        { columns, data, initialState: {} },
        useSortBy,
        useRowSelect
    );

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
    } = table;

    const [prevRow, setPrevRow] = useState(null);

    useEffect(() => {
        function handleScrollEvent() {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
        eventEmitter.on("reload_cash_games", handleScrollEvent);
        return () => eventEmitter.off("reload_cash_games", handleScrollEvent);
    }, []);

    const [singleClick, setSingleClick] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 1200) {
                setSingleClick(false);
            } else {
                setSingleClick(true);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const { mytables, network, setAction, setOpenAction } = props;

    useEffect(() => {
        const rows = document.getElementsByTagName("tr");

        Array.from(rows).forEach(row => {
            const id = row.dataset.id;
            const type = row.dataset.type;
            const isSeated = mytables.some(table => row.innerText.includes(table.name));
            row.classList.toggle("seated", isSeated);

            if (type === "SINGLE_TABLE") {
                row.onclick = () => {
                    if (prevRow) {
                        prevRow.style.borderLeft = null;
                        prevRow.style.backgroundImage = null;
                        prevRow.style.background = null;
                        prevRow.style.borderRight = null;
                    }

                    if (id) {
                        network.send(`<GetTableDetails id="${id}" type="${type}"/>`);
                        if (singleClick) {
                            network.send(`<OpenTable id="${id}" type="${type}"/>`);
                            setAction("mainGridDblClick");
                        }
                        row.style.borderLeft = "2px solid #3ba14c";
                        row.style.borderRight = "2px solid #3ba14c";
                        // row.style.borderBottom = "1px solid #3ba14c";
                        // row.style.backgroundImage = "linear-gradient(rgb(127 23 20 / 21%), rgb(233 80 51 / 26%), rgb(127 23 20 / 21%))";
                        // row.style.backgroundImage = "linear-gradient(rgb(59 161 76 / 20%), rgb(0 255 43 / 20%), rgb(59 161 76 / 20%))";

                        // row.style.backgroundImage = "linear-gradient(#2a394d 0%, #101010b0 100%, #2a394d 0%)";
                        row.style.backgroundImage = "linear-gradient(rgb(63 86 117) 0%, #101010b0 100%, rgb(63 86 117) 0%)";
                        // row.style.background = "rgb(59 161 76 / 7%)";
                    }
                    setPrevRow(row);

                    if (!singleClick) {
                        setOpenAction("openSideMiniTable");
                        row.ondblclick = () => {
                            if (id) {
                                network.send(`<OpenTable id="${id}" type="${type}"/>`);
                                setAction("mainGridDblClick");
                            }
                        };
                    }
                };
            }
        });

        return () => {
            Array.from(rows).forEach(row => {
                row.onclick = null;
            });
        };
    }, [prevRow, mytables, network, setAction, setOpenAction, singleClick]);


    const openDropDown = (e) => {
        console.log(e.target.name)
        const tabs = ["table_filter", "stakes_filter", "seats_filter"];
        tabs.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            const game_type_filter = document.getElementById("game_type_filter");
            const sort_fliter = document.getElementById("Stake_Sort_Fliter");
            const sort_fliter1 = document.getElementById("Seats_Sort_Fliter");

            if (element.id === e.target.name) {
                if (element.classList.contains("rotate_smooth")) {
                    element.classList.remove('rotate_smooth');
                } else {
                    if (element.id === "table_filter" && game_type_filter) {
                        game_type_filter.style.display = 'flex';
                    } else if (element.id === "seats_filter" && sort_fliter1) {
                        sort_fliter1.style.display = 'flex';
                    } else if (element.id === "stakes_filter" && sort_fliter) {
                        sort_fliter.style.display = 'flex'
                    }
                    element.classList.add('rotate_smooth');
                }
            } else {
                element.classList.remove('rotate_smooth');
            }
        });
    };


    return (
        <div className="mainGrid mainGridOverflow" ref={scrollContainerRef}>
            <table id="mainGrid_table_rv" {...getTableProps()}>
                <thead>
                    <div className="df table_header_row" style={{ width: '100%', alignItems: 'center' }}>
                        <span style={{ marginRight: '75px' }}></span>
                        <div className="df row" style={{ color: '#ffff', padding: '0px 0px 0px 15px' }}>
                            <button className="table_type_dropdown col-lg-4 col-xl-4 bold">Name</button>
                            <button className="table_type_dropdown col-lg-2 col-xl-2 bold" name="table_filter">Game</button>

                            <button className="table_type_dropdown col-lg-2 col-xl-2 df_al bold" name="stakes_filter" onClick={(e) => openDropDown(e)}>
                                Stakes
                                <span className="m_l_5" id="stakes_filter" >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b79301">
                                        <path d="M480-328 225-583h510L480-328Z" />
                                    </svg>
                                </span>
                            </button>
                            <button className="table_type_dropdown col-lg-1 col-xl-1 df_al bold" name="seats_filter" onClick={(e) => openDropDown(e)}>
                                {/* Plrs. */}
                                {window.innerWidth < 1335 && props.lobbyMiniTableOpenState ? "Plrs." : "Players"}

                                <span className="m_l_5" id="seats_filter" >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b79301">
                                        <path d="M480-328 225-583h510L480-328Z" />
                                    </svg>
                                </span>
                            </button>

                            <button className="table_type_dropdown col-lg-1 col-xl-1 bold">Avg.Pot</button>
                            <button className="table_type_dropdown col-lg-1 col-xl-1 bold">P/F</button>
                            <button className="table_type_dropdown col-lg-1 col-xl-1 bold">H/hr</button>
                        </div>
                    </div>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        if (row.original.name !== "No Table Matching Your Search Criteria") {
                            return (
                                <tr
                                    key={row.original.id}
                                    data-id={row.original.id}
                                    data-type={row.original.type}
                                    data-password={row.original.password}
                                    data-runtwice={row.original.runtwice}
                                    data-jackpot={row.original.jackpot}
                                    {...row.getRowProps()}
                                >
                                    {row.cells.map((cell, i) => (
                                        <td key={i} {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        } else {
                            return (
                                <tr key="NOtables">
                                    <td colSpan={columns.length} style={{ width: '100%', textAlign: 'center' }}>
                                        {row.original.name}
                                    </td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div >
    );
};

export default withTranslation()(MainGrid);
