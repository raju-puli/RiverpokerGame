const Columns =[
    {
      Header: "Player",
      accessor: "player",
    },
    {
      Header: "Chips",
      accessor: "chips",
      Cell: row => <span style={{ textAlign: "right", visibility: row.value !== undefined ? 'visible' : 'hidden' }}>{Number(row.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    }
  ]
export default Columns;