import { useMemo, } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/tLobby/participants.css";
import { withTranslation } from 'react-i18next';

function Participants(props) {
  const columns = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "nickName",
      },
      // {
      //   Header: "Chips",
      //   accessor: "chips",
      // },
      // {
      //   Header: "Place",
      //   accessor: "place",
      // },
      // {
      //   Header: "KOB",
      //   accessor: "knockoutFee",
      // }
    ]
  }, []);
  const data = useMemo(() => props.data, [props.data]);
  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, rows, prepareRow } = table;
  // const [spin, setSpin] = useState(false);
  // const rotate = () => {
  //   setSpin(true)
  //   setTimeout(() => {
  //     setSpin(false)
  //   }, 3000);
  // }
  return (
    <div className="fd info_continer" style={{ overflow: 'auto', maxHeight: '45vh' }}>
      <table id="participants_table" cellPadding={0} cellSpacing={0} {...getTableProps()}>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={row.original.nickName.props.children[1].props.children === props.playerName ? "add_bg" : ""}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!rows.length && <span className="tourneyDescription_text">No Players to Show</span>}
    </div>
  );
}
export default withTranslation()(Participants);