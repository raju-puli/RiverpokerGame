import React, { useMemo, useState, useEffect, useRef } from "react";
import "../../../../../css/ui/lobby/mainGrid.css";
import Columns from "./mainGridColumnsTourney";
import { useTable, useRowSelect, useSortBy } from "react-table";
import eventEmitter from "../../../../utils/eventEmitter";

export const MainGridTourney = (props) => {
  const data = useMemo(() => props.data, [props.data]);
  const columns = useMemo(() => Columns.Columns1, []);

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
  const [style, setStyle] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (props.data[0].name === "No Tournament(s) Matching Your Search Criteria") {
      setStyle(true);
    } else {
      setStyle(false);
    }
  }, [props.data]);

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
    eventEmitter.on("reload_tournament_games", handleScrollEvent);
    return () => eventEmitter.off("reload_tournament_games", handleScrollEvent);
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


  const { tabledata, network, setAction, setOpenAction } = props;

  useEffect(() => {
    const rows = document.getElementsByTagName("tr");

    Array.from(rows).forEach(row => {
      const id = row.dataset.id;
      const type = row.dataset.type;
      const isSeated = data.some(table => row.innerText.includes(table.name));
      row.classList.toggle("seated", isSeated);

      if (type === "SCHEDULED_TOURNAMENT") {
        row.onclick = () => {
          if (prevRow) {
            // prevRow.style.borderBottom = null;
            prevRow.style.borderLeft = null;
            prevRow.style.borderRight = null;
            prevRow.style.backgroundImage = null;
          }

          if (id) {
            network.send(`<GetTableDetails id="${id}" type="${type}"/>`);
            // row.style.borderBottom = "1px solid #3ba14c";
            row.style.borderLeft = "2px solid #3ba14c";
            row.style.borderRight = "2px solid #3ba14c";
            // row.style.backgroundImage = "linear-gradient(#2a394d 0%, #101010b0 100%, #2a394d 0%)";
            row.style.backgroundImage = "linear-gradient(rgb(63 86 117) 0%, #101010b0 100%, rgb(63 86 117) 0%)";

            if (singleClick) {
              network.send(`<OpenTable id="${id}" type="${type}"/>`);
              setAction("mainGridDblClick");
            }
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
  }, [prevRow, tabledata, network, data, setAction, setOpenAction, singleClick]);

  const openDropDown = (e) => {
    if (e.target.name === "stakes_filter") {
      const Stake_Sort_Fliter_Tab = document.getElementById("Stake_Sort_Fliter");
      const stakes_filter_toggle = document.getElementById("tourney_stakes_filter_toggle");
      if (Stake_Sort_Fliter_Tab) {
        Stake_Sort_Fliter_Tab.style.display = 'flex';
        stakes_filter_toggle.classList.add('rotate_smooth');
      }
    } else {
      const Seats_Sort_Fliter = document.getElementById("Seats_Sort_Fliter");
      const tourney_seats_filter_toggle = document.getElementById("tourney_seats_filter_toggle");
      if (Seats_Sort_Fliter) {
        Seats_Sort_Fliter.style.display = 'flex';
        tourney_seats_filter_toggle.classList.add('rotate_smooth');
      }
    }
  };

  return (
    <div className="mainGrid mainGridOverflow" ref={scrollContainerRef}>
      <table id="mainGrid_table_rv" {...getTableProps()}>
        <thead>
          <div className="df table_header_row" style={{ width: '100%', alignItems: 'center' }}>
            <span style={{ width: '70px' }}></span>
            <div className="df row" style={{ color: '#ffff', padding: '0px 0px 0px 15px' }}>
              <button className="table_type_dropdown col-lg-2 col-xl-2 col-xxl-1 bold">Date / Time</button>
              {/* <button className="table_type_dropdown col-lg-1 col-xl-1 col-xxl-1 bold">Time</button> */}
              <button className="table_type_dropdown col-lg-3 col-xl-3 col-xxl-2 bold">Name</button>
              <button className="table_type_dropdown col-lg-2 col-xl-2 col-xxl-2 bold">Game</button>
              <button className="table_type_dropdown df_al col-lg-2 col-xl-2 col-xxl-2 bold" name="stakes_filter" onClick={(e) => openDropDown(e)}>Buy-In
                <span className="m_l_5" id="tourney_stakes_filter_toggle">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b79301">
                    <path d="M480-328 225-583h510L480-328Z" />
                  </svg>
                </span>
              </button>
              <button className="table_type_dropdown col-lg-1 col-xl-1 col-xxl-2 bold">Players</button>
              <button className="table_type_dropdown df_al col-lg-2 col-xl-2 col-xxl-2 bold" name="seats_filter" onClick={(e) => openDropDown(e)}>Status
                <span className="m_l_5" id="tourney_seats_filter_toggle">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b79301">
                    <path d="M480-328 225-583h510L480-328Z" />
                  </svg>
                </span></button>
              {/* <button className="table_type_dropdown col-lg-1 col-xl-1 col-xxl-1 bold">Date</button>
              <button className="table_type_dropdown col-lg-1 col-xl-1 col-xxl-1 bold">Time</button> */}
            </div>
          </div>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                data-id={row.original.id}
                data-type={row.original.type}
                // {...row.getRowProps({ onClick: handleRowClick(row) })}
                {...row.getRowProps()}
              >
                {row.cells.map(cell => (
                  <td key={cell.id} {...cell.getCellProps()} style={{ textAlign: style ? 'center' : '' }}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MainGridTourney;
