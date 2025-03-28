import "../../../../../css/ui/table/waitListTable.css";

export default function WaitListTable(props) {

	return (
		<table className="fd" border={1} cellPadding="1" cellSpacing="1">
			<thead>
				<tr className="clr_river">
					<th>Position</th>
					<th>Player</th>
				</tr>
			</thead>
			<tbody>
				{(() => {
					let i = 0,
						cnt = props.data.length,
						rows = [];
					for (i; i < cnt; i++) {
						rows.push(
							<tr key={i}>
								<td>{props.data[i].id}</td>
								<td>{props.data[i].name}</td>
							</tr>
						);
					}
					return rows;
				})()}
			</tbody>
		</table>
	);
}
