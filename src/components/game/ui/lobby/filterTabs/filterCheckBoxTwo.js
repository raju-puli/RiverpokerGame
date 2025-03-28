import "../../../../../css/ui/lobby/filterCheckBoxOne.css";
import { withTranslation } from 'react-i18next';
import Screen from "../../../../utils/screen";
import fileName from "../../../../../jsconfig";

function FilterCheckBoxTwo(props) {
  const style = {
    position: "absolute",
    left: "50vw",
    top: '10vh'
  };

  const handleChange = (event) => {
    props.action("Check2", event.target.value, event.target.checked);
  };

  return (
    <div className="fd" style={style}>
      {Screen.getDeviceType().name === "Desktop" && (
        <form action="/action_page.php" method="get" style={{
          width: "max-content",
          display: fileName.name === "Riverpoker" ? 'flex' : '',
          alignItems: fileName.name === "Riverpoker" ? 'center' : '',
          justifyContent: fileName.name === "Riverpoker" ? 'center' : ''
        }}>
          <label className="switch">
            <input
              type="checkbox"
              name="UpComingOnly"
              value="UpComingOnly"
              onChange={handleChange}
            />
            <span className="slider round"></span>
          </label>
          <span style={{ marginLeft: '3px' }}>{props.t("Show Upcoming Only")}</span>
        </form>
      )}
      {Screen.getDeviceType().name === "Mobile" && (
        <form action="/action_page.php" method="get">
          <label htmlFor="UpComingOnly" className="m_l_10 pointer df_ac font_12">
            <input
              className="checkbox-round"
              type="checkbox"
              name="UpComingOnly"
              value="UpComingOnly"
              onChange={handleChange}
            />
            {props.t("Show Upcoming Only")}
          </label>
        </form>
      )}
    </div>
  );
}

export default withTranslation()(FilterCheckBoxTwo);
