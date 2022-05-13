import { useMemo } from "react";
import { Appear, Table, Paragraph } from "arwes";


const parseDate = (launch_date) => {
  const date = new Date(Date.now());
  launch_date = date.toLocaleString(
      'en-us',
      {
        month:'short',
        year:'numeric',
        day: 'numeric'
      });
  return launch_date
}

function getMarkerColor(launch) {
  const statusColorMap = {
    aborted: 'red',
    success: 'greenyellow'
  }
 return statusColorMap[launch.current_status]
}

const History = props => {
  const tableBody = useMemo(() => {
    return props.launches?.filter((launch) => launch.current_status !== 'upcoming')
      .map((launch) => {
        return <tr key={String(launch.flight_number)}>
          <td>
            <span style={
              {color: getMarkerColor(launch)}
            }>█</span>
          </td>
          <td>{launch.flight_number}</td>
          <td>{parseDate(launch.launch_date)}</td>
          <td>{launch.mission_name}</td>
          <td>{launch.rocket_type}</td>
          <td>{launch.customer?.join(", ")}</td>
        </tr>;
      });
  }, [props.launches]);

  return <article id="history">
    <Appear animate show={props.entered}>
      <Paragraph>History of mission launches including SpaceX launches starting from the year 2006.</Paragraph>
      <Table animate>
        <table style={{tableLayout: "fixed"}}>
          <thead>
            <tr>
              <th style={{width: "2rem"}}></th>
              <th style={{width: "3rem"}}>No.</th>
              <th style={{width: "9rem"}}>Date</th>
              <th>Mission</th>
              <th style={{width: "7rem"}}>Rocket</th>
              <th>Customers</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </Table>
    </Appear>
  </article>;
}
  
export default History;