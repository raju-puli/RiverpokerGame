import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/popUps/inviteBuddies.css";
import closeIcon from '../../../../assets/images/lobby/close_icon.svg';
import Config from "../../../../config";

export const InviteBuddies = (props) => {
  var config = new Config();

  const [btnState, setBtnState] = useState(true);

  const columns = useMemo(() => {
    return [
      {
        Header: "Nickname",
        accessor: "nickname",
      },
      {
        Header: "Country",
        accessor: "country",
      },
    ];
  }, []);
  const data = useMemo(() => props.buddyData, [props.buddyData]);

  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, rows, prepareRow } = tableInstance;

  function onRowClick(row) {
    setBtnState(false);
    console.log(data[row.index]);
  }
  function InviteFrnd() {
    var body = { face: "", ip: "", subject: "", message: "", mailsList: "" };

    var path = config.URL_Environment.apiPath.invteFrnd_Api;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", path, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("siteid", "rapoker");
    xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
    console.log(JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
    xhr.addEventListener("load", (e) => {
      buddyDataHandler(e);
    });
    if (body) {
      console.log("sending with body");
      xhr.send(JSON.stringify(body));
    } else {
      console.log("sending without body");
      xhr.send();
    }
    function buddyDataHandler() {
      console.log("the invite response is");
      console.log(data);
      // console.log(data.target.response);
    }
  }

  return (
    <div className="alert_cover">
      <div className="mytable popup_500">
        <button
          className="closeBtn_1"
          onClick={(e) => {
            e.preventDefault();
            props.setAction("hideInvitePlayers");
          }}
        >
          <img src={closeIcon} alt="" />
        </button>
        <div className="header_1 fd"> Invite Buddies </div>
        <div className="tableBox fd">
          <div className="tableBoxrow1">
            <div>
              Name:<span>{props.tableData.name}</span>
            </div>
            <div>
              Game:<span>{props.tableData.game}</span>
            </div>
          </div>
          <div className="tableBoxrow2">
            <div>
              Seats:<span>seats</span>
            </div>
            <div>
              Stakes:<span>{props.tableData.stakes}</span>
            </div>
            <div>
              P/F:<span>{props.tableData.pf}</span>
            </div>
            <div>
              Wait:<span>wait</span>
            </div>
          </div>
        </div>
        <div className="outputbox">
          <table {...getTableProps()} id="table">
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} onClick={() => onRowClick(row)}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render("Header")}:<span style={{ color: "#fff" }}>{cell.render("Cell")}</span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="fd inpElm p_lr_15">
          <div className="fd">
            <label>Enter message to your buddies</label>
          </div>
          <input type="text" />
        </div>
        <footer className="fd p_15">
          <button className="btn_1 wid_auto float_right" disabled={btnState} onClick={(e) => InviteFrnd(e)}>
            Invite
          </button>
        </footer>
      </div>
    </div>
  );
};
export default InviteBuddies;
