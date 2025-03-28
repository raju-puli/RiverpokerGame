import { useMemo } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/tLobby/prizeInfo.css";
import { withTranslation } from 'react-i18next';
import Screen from "../../../utils/screen";

import UM from "../../../utils/utilityMethods";

function PrizeInfo(props) {
  const columns = useMemo(() => {
    return [
      {
        Header: props.t("Place"),
        accessor: "place",
      },
      {
        Header: props.t("Amount"),
        accessor: "amount",
      },
    ];
  }, []);
  const data = useMemo(() => props.data.data, [props.data.data]);
  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;


  return (
    <>
      {Screen.getDeviceType().name === "Mobile" && <div className="fd">
        <div className="header_5">{props.t("Prize Info")}</div>
        <div className="fd">
          <div className="fd m_b_15">
            <div className="row">
              <div className="col-6 p_l_0">
                <div className="box_prize">
                  <span>{UM.numberWithCommas(props.data.prizePool)}</span> <br></br>
                  <span className="sub_head"> {props.t("Current Prize Pool")} </span>
                </div>
              </div>
              <div className="col-6 p_r_0">
                <div className="box_prize">
                  <span>{UM.numberWithCommas(props.data.placesPaid)}</span> <br></br>
                  <span className="sub_head"> {props.t("Current Places Paid")} </span>
                </div>
              </div>
            </div>
          </div>
          <table className="prizeEntries fd" cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr >
                <td >
                  <div className="boxPE">
                    <span className="clr_4 font_15"> {UM.numberWithCommas(props.data.entries)}</span> <br></br>
                    <span className="txt_clr_3"> {props.t("Entries")} </span>
                  </div>
                </td>
                <td >
                  <div className="boxPE">
                    <span className="clr_4 font_15"> {UM.numberWithCommas(props.data.rebuys)}</span> <br></br>
                    <span className="txt_clr_3"> {props.t("Rebuys")} </span>
                  </div>
                </td>
                <td >
                  <div className="boxPE">
                    <span className="clr_4 font_15"> {UM.numberWithCommas(props.data.addons)}</span> <br></br>
                    <span className="txt_clr_3"> {props.t("Addons")}  </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="fd m_t_15" style={{ display: rows.length !== 0 ? 'block' : 'none' }}>
          <table id="prizeInfo_table" className="table_1" cellPadding={0} cellSpacing={0} {...getTableProps()}>
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
                  <td colSpan={2} className="text_center"> {props.t("No Place yet")} </td>
                </tr>
              </tbody>
            }
          </table>
        </div>
      </div>}
      {Screen.getDeviceType().name === "Desktop" && <div className="fd gridborded">
        <div className="fd">
          <span className="df_jc clr_5 txt_clr_3">
            prize Info
          </span>
        </div>
        <div className="df_jc_ac p_5">
          <span className="col-6 d_flex jcs">Current Prize pool :</span><span className="col-6 d_flex jce">{UM.numberWithCommas(props.data.prizePool)}</span>
        </div>
        <div className="df_jc_ac p_5">
          <span className="col-6 d_flex jcs">Entries  :</span><span className="col-6 d_flex jce">{props.data.entries}</span>
        </div>
        <div className="df_jc_ac p_5">
          <span className="col-6 d_flex jcs">Rebuys :</span><span className="col-6 d_flex jce">{props.data.rebuys}</span>
        </div>
        <div className="df_jc_ac p_5">
          <span className="col-6 d_flex jcs"> Addons :</span><span className="col-6 d_flex jce">{props.data.addons}</span>
        </div>
        <div className="df_jc_ac p_5">
          <span className="col-6 d_flex jcs">Current place Paid :</span><span className="col-6 d_flex jce">{props.data.placesPaid}</span>
        </div>
      </div>}
    </>
  );
}
export default withTranslation()(PrizeInfo)