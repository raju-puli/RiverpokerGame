import React, { useMemo } from "react";
import { useTable } from "react-table";
import "../../../../css/ui/popUps/playerlevelInfo.css";
// import close_1 from './../../../../assets/images/table/close_1.svg';
// import My_VipLevel from './../../../../assets/images/table/My_VipLevel.svg';
import { withTranslation } from 'react-i18next';

function PlayerlevelInfo(props) {
  const data = useMemo(() => props.data.data, [props.data.data]);
  const columns = useMemo(() => {
    return [
      {
        Header: props.t("Level"),
        accessor: "level",
      },
      {
        Header: props.t("Need to Earn"),
        accessor: "earn",
        Cell: row => <div style={{ textAlign: "right" }}>{Number(row.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      },
      {
        Header: props.t("By the Date"),
        accessor: "date",
        Cell: row => <div style={{ textAlign: "right" }}>{row.value}</div>
      },
    ];
  }, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    // <div className="playerlevelInfo popup_500">

    //   <div className="header_1 fd">
    //     <img className="col-2" src={My_VipLevel} alt="" />
    //     {props.t("My Vip level")}    <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hidePLI") }}> <img src={close_1} alt="" />  </button>
    //   </div>
    //   <div className="fd p_5">
    //     <div style={{ textAlign: 'center', marginBottom: '5px' }}>
    //       <span className="clr_ff"> {props.t("My Vip level")} : </span> <span className="clr_5">{props.data.level}</span>
    //     </div>
    //     <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    //       <div>
    //         <span className="clr_ff"> {props.t("This Month")} : </span> <span className="clr_5">{Number(props.data.collection1).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
    //       </div>
    //       <div>
    //         <span className="clr_ff">  {props.t("This Year")} : </span> <span className="clr_5">{Number(props.data.collection2).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="fd">
    //     {data.length != 0 && <table className="table_1" cellPadding={0} cellSpacing={0} {...getTableProps()} id="table">
    //       <thead>
    //         {headerGroups.map((headerGroup) => (
    //           <tr {...headerGroup.getHeaderGroupProps()}>
    //             {headerGroup.headers.map((column) => (
    //               <th {...column.getHeaderProps()}>{column.render("Header")}</th>
    //             ))}
    //           </tr>
    //         ))}
    //       </thead>
    //       <tbody {...getTableBodyProps()}>
    //         {rows.map((row) => {
    //           prepareRow(row);
    //           return (
    //             <tr {...row.getRowProps()}>
    //               {row.cells.map((cell) => {
    //                 return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
    //               })}
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>}
    //   </div>
    // </div>

    <div className="game_type_filter_cover" onClick={(e) => { e.preventDefault(); props.setAction("hideMyActiveTourCashTables") }}>
      <div className="game_type_filter" style={{ width: '480px', border: '1px solid #696965' }}>
        <header>
          <span>
            {props.t("My Vip level")}
          </span>
        </header>
        <section className="fd p_10" style={{ maxHeight: '320px' }}>
          <div style={{ textAlign: 'center', marginBottom: '5px' }}>
            <span className="clr_ff"> {props.t("My Vip level")} : </span> <span className="clr_5">{props.data.level}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '5px' }}>
            <div>
              <span className="clr_ff"> {props.t("This Month")} : </span> <span className="clr_5">{Number(props.data.collection1).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
            </div>
            <div>
              <span className="clr_ff">  {props.t("This Year")} : </span> <span className="clr_5">{Number(props.data.collection2).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
            </div>
          </div>
          {data.length && <table className="table_1" cellPadding={0} cellSpacing={0} {...getTableProps()} id="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
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
            </tbody>
          </table>}
          {/* {loaderState && <div className="loaderDiv"> {messageState ? messageState : <span className="m_l_5 loader_3"></span>} </div>} */}
        </section>
        <div className="close_div">
          <button type="button" className="btn_2" onClick={(e) => { e.preventDefault(); props.setAction("hidePLI") }}> close </button>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(PlayerlevelInfo)