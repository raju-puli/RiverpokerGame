import React, { useMemo } from "react";
import { useTable } from "react-table";
import { withTranslation } from 'react-i18next';
import "../../../../css/ui/popUps/tourneyInfo.css";

const TournamentInfo = React.memo((props) => {
  // console.log(props)
  // currentLevelIndex
  const extractText = (element) => {
    if (typeof element === 'string') {
      return element;
    }
    if (Array.isArray(element)) {
      return element.map(extractText).join('');
    }
    if (element && typeof element === 'object' && element.props && element.props.children) {
      return extractText(element.props.children);
    }
    return '';
  };

  const transformedData = props.data.info.map(item => ({
    level: item.level,
    stakes: extractText(item.stakes.props.children),
  }));

  const columns = useMemo(
    () => [
      {
        Header: props.t("Level"),
        accessor: "level",
      },
      {
        Header: props.t("Stakes"),
        accessor: "stakes",
      },
    ],
    [props.t]
  );

  const data = useMemo(() => transformedData, [transformedData]);

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, rows, prepareRow } = tableInstance;

  const getRowBackgroundColor = (row, index) => {
    const currentLevel = Number(props.data.currentLevelIndex);
    // const rowLevel = Number(row.original.level.props.children.props.children[0]);
    if (row.original.level.props.children.props.children[0] === "Break") {
      return "rgba(119, 119, 119, 0.54)";
    }
    if (index === currentLevel) {
      return "rgba(119, 119, 119, 0.54)";
    }
    if (index % 2 === 0) {
      return "rgba(0, 0, 0, 0.1)";
    }
    return "";
  };

  return (
    <div className="fd info_container">
      <div className="d-flex p_t_5 p_b_5" style={{ flexDirection: 'column' }}>
        <span className="df_al_jsb p_5 white_space_no">Current prize pool : <span className="clr_river_green"> {props.prizeInfo.prizePool}</span></span>
        <span className="df_al_jsb p_5 white_space_no">Entries : <span className="clr_river_green"> {props.prizeInfo.entries}</span></span>
        <span className="df_al_jsb p_5 white_space_no">Addon Count : <span className="clr_river_green"> {props.prizeInfo.addonCount}</span></span>
        <span className="df_al_jsb p_5 white_space_no">Rebuy Count : <span className="clr_river_green"> {props.prizeInfo.rebuyCount}</span></span>
        <span className="df_al_jsb p_5 white_space_no">Current places paid : <span className="clr_river_green"> {props.prizeInfo.placesPaid}</span></span>
        <div className="prizeInfo_payment p_5" dangerouslySetInnerHTML={{ __html: props.prizeInfo.payment }} />
        {props.reEntryTable.isTourneyRetry &&
          <div className="p_t_5" style={{ borderTop: '1px solid gray' }}>
            <div className="df_al_jsb m_b_5">Maximum Re-Entry Count :<span className="clr_river_green"> &nbsp; {props.reEntryTable.maxRetryCount}</span></div>
            <div className="df_al_jsb ">No.Of Retries :<span className="clr_river_green"> &nbsp; {props.reEntryTable.noOfRetries}</span></div>
          </div>
        }
      </div>
      <div className="p_t_5 p_b_5" style={{ borderTop: '1px solid gray' }}>
        <div className="df_al_jsb m_b_5 white_space_no">Starting Chips :<span className="clr_river_green"> &nbsp; {Number(props.data.data.startingChips).toLocaleString("en-US")}</span></div>
        {props.data.data?.rebuys &&
          <div className="df_al_jsb m_b_5 white_space_no">Rebuy :<span className="clr_river_green"> &nbsp; {props.data.data.rebuys}</span></div>
        }
        {props.data.data?.addons &&
          <div className="df_al_jsb white_space_no">Addon :<span className="clr_river_green"> &nbsp; {props.data.data.addons}</span></div>
        }
      </div>
      <div className="p_t_5 p_b_10" style={{ borderTop: '1px solid gray' }}>
        <table id="info_table" {...getTableProps()} style={{ width: '100%' }}>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()} style={{ background: getRowBackgroundColor(row, index) }}>
                  {row.cells.map((cell, i) => (
                    <td key={i} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default withTranslation()(TournamentInfo);
