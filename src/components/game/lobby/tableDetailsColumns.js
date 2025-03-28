import UM from "../../../../utils/utilityMethods";

const Columns = [
  {
    Header: "Player",
    accessor: "player",
  },
  {
    Header: "Chips",
    accessor: "chips",
    Cell: row => <span style={{ textAlign: "right", visibility: row.value !== undefined ? 'visible' : 'hidden' }}>{UM.numberWithCommas(row.value)}</span>
  }
]
export default Columns;