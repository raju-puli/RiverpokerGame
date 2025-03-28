import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/popUps/myBuddies.css";
// import closeIcon from '../../../../assets/images/lobby/close_icon.svg';
// import close_1 from '../../../../assets/images/table/close_1.svg';
import { withTranslation } from 'react-i18next';

const MyBuddies = (props) => {
  const [btnState, setBtnState] = useState(true);
  const [buddyName, setBuddyName] = useState(undefined);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const columns = useMemo(() => [
    {
      Header: props.t("Nickname"),
      accessor: "name",
    },
    {
      Header: props.t("Country"),
      accessor: "id",
    },
  ], [props]);

  const data = useMemo(() => props.data, [props.data]);

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, rows, prepareRow } = tableInstance;

  const handleRowClick = (row) => {
    setSelectedRowId(row.id);
    setBuddyName(row.original.name);
    setBtnState(false);
  };

  useEffect(() => {
    if (!selectedRowId) {
      setBtnState(true);
      setBuddyName(undefined);
    }
  }, [selectedRowId]);

  return (
    <React.Fragment>
      {props.data[0] === "No buddies to show" ? <span className="tourneyDescription_text">{props.data[0]}</span> :
        <>
          <div className="fd p_10">
            <table className="table_1" {...getTableProps()} id="table">
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  const isSelected = selectedRowId === row.id;
                  return (
                    <tr
                      {...row.getRowProps()}
                      style={{ backgroundColor: isSelected ? "#0e5c63" : "transparent" }}
                      onClick={() => handleRowClick(row)}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>
                          {cell.render("Header")}:
                          <span style={{ color: "#fff" }}>{cell.render("Cell")}</span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <footer className="fd p_5" style={{ alignItems: 'flex-end' }}>
            <button
              className="btn_2 fd"
              disabled={btnState}
              onClick={(e) => {
                e.preventDefault();
                props.network.send(`<RemoveBuddy player="${buddyName}" network="rp1"/>`);
                setSelectedRowId(null);
              }}
            >
              {props.t("Remove Selected")}
            </button>
          </footer>
        </>
      }
    </React.Fragment>
  );
};

export default withTranslation()(MyBuddies);