import { useMemo } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/tLobby/tableData.css";

import { withTranslation } from 'react-i18next'
function TableData(props) {
  const columns = useMemo(() => {
    return [
      {
        Header: "Players",
        accessor: "players",
      },
      {
        Header: "Chips",
        accessor: "chips",
      }
    ]
  }, []);
  const data = useMemo(() => props.data, [props.data]);


  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  return (
    <div className="fd">
      <div className="fd" style={{ border: '1px solid var(--bdr)', marginTop: '3px' }}>
        <table id="tableData_table" style={{ maxHeight: '115px', overflow: 'auto', }} className="table_1" cellPadding={0} cellSpacing={0} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          {rows.length !== 0 ?
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody> :
            <tbody>
              <tr>
                <td colSpan={2} className="text_center"> No players yet </td>
              </tr>
            </tbody>
          }

        </table>
      </div>
    </div>
  );
}
export default withTranslation()(TableData);