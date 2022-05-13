import { useMemo } from "react";
import { 
  withStyles,
  Appear,
  Link,
  Paragraph,
  Table,
  Words,
} from "arwes";

import Clickable from "../components/Clickable";

const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none",
  },
});

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

const Upcoming = props => {
  const { 
    entered,
    launches,
    classes,
    abortLaunch,
  } = props;

  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.current_status === 'upcoming')
      .map((launch) => {
        return <tr key={String(launch.flight_number)}>
          <td>
            <Clickable style={{color:"red"}}>
              <Link className={classes.link} onClick={() => abortLaunch(launch.flight_number)}>
                ✖
              </Link>
            </Clickable>
          </td>
          <td>{launch.flight_number}</td>
          <td>{parseDate(launch.launch_date)}</td>
          <td>{launch.mission_name}</td>
          <td>{launch.rocket_type}</td>
          <td>{launch.destination_planet.kepler_name}</td>
        </tr>;
      });
  }, [launches, abortLaunch, classes.link]);

  return <Appear id="upcoming" animate show={entered}>
    <Paragraph>Upcoming missions including both SpaceX launches and newly scheduled Zero to Mastery rockets.</Paragraph>
    <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>
    <Table animate show={entered}>
      <table style={{tableLayout: "fixed"}}>
        <thead>
          <tr>
            <th style={{width: "3rem"}}></th>
            <th style={{width: "3rem"}}>No.</th>
            <th style={{width: "10rem"}}>Date</th>
            <th style={{width: "11rem"}}>Mission</th>
            <th style={{width: "11rem"}}>Rocket</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </Table>
  </Appear>;
}

export default withStyles(styles)(Upcoming);