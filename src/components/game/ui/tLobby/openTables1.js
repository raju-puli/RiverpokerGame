import { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/tLobby/openTables.css";
import { withTranslation } from 'react-i18next';

function OpenTables1(props) {
  // const [showJoinButton, setShowJoinButton] = useState(true);
  // const [showButtonWatch, setshowButtonWatch] = useState(true);
  // const [id, setId] = useState(undefined);
  // const [type, setType] = useState(undefined);
  // const [callOnce, setCallonce] = useState(true);
  // const [callMyTableDetails, setcallMyTableDetails] = useState(true);
  // const [gameTableIds, setGameTableIds] = useState(props.gameTableid)
  const [prevRow, setPrevRow] = useState("");
  const columns = useMemo(() => {
    return [
      {
        Header: "Table",
        accessor: "table",
      },
      // {
      //   Header: "Players",
      //   accessor: "players",
      // },
      // {
      //   Header: "Largest",
      //   accessor: "largest",
      // },
      // {
      //   Header: "Smallest",
      //   accessor: "smallest",
      // },
    ];
  }, []);
  const data = useMemo(() => props.data, [props.data]);
  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, rows, prepareRow } = table;


  useEffect(() => {
    let r = document.getElementsByTagName("tr");
    for (let i = 0; i < r.length; i++) {
      let row = r[i];
      row.onclick = () => {
        if (row.dataset.id !== undefined) {
          setPrevRow(row.dataset.id);
          props.network.send(`<GetTableDetails id="${row.dataset.id}" type="${row.dataset.type}"/>`);
        }
      }
    }
  }, [props.data]);


  return (
    <div className="fd info_continer" style={{ overflow: 'auto', maxHeight: '45vh' }}>
      <table cellPadding={0} cellSpacing={0} {...getTableProps()} className="fd openTable" >
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className={`pointer ${row.original.id === props.gameTableid ? "active-table" : ""}`} data-id={row.original.id} onClick={(e) => props.updateTableId(prevRow)} data-type={row.original.type} {...row.getRowProps()} style={{ boxShadow: "black 0px 0px 10px inset", background: row.original.id === prevRow ? "linear-gradient(rgb(151 151 151 / 79%), rgba(0, 0, 0, 0.747))" : "rgb(96 96 96 / 62%)" }}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!rows.length && <span className="tourneyDescription_text">No Tables to Show</span>}
    </div>
  );
}
export default withTranslation()(OpenTables1);
