import "../../../../../css/ui/lobby/filterCheckBoxOne.css";
import { withTranslation } from 'react-i18next';
import fileName from "../../../../../jsconfig";
import Screen from "../../../../utils/screen";

function FilterCheckBox(props) {

  const handleCheckboxChange = (event) => {
    props.action("Check1", event.target.value, event.target.checked);
  };

  return (
    <div className="fd d-flex">
      {Screen.getDeviceType().name === "Desktop" && (
        <form
          action="/action_page.php"
          method="get"
          className="d-flex"
          style={{
            alignItems: fileName.name === "Riverpoker" ? 'center' : 'flex-start',
            justifyContent: fileName.name === "Riverpoker" ? 'center' : 'flex-start'
          }}
        >
          <div className="switch-container">
            <label className="switch">
              <input
                type="checkbox"
                name="Full"
                id="Full"
                value="FULL"
                onChange={handleCheckboxChange}
              />
              <span className="slider round"></span>
            </label>
            <label htmlFor="Full" style={{ marginLeft: '3px' }}>
              {props.t('Full')}
            </label>
          </div>

          <div className="switch-container" style={{ marginLeft: '10px' }}>
            <label className="switch">
              <input
                type="checkbox"
                name="Empty"
                id="Empty"
                value="EMPTY"
                onChange={handleCheckboxChange}
              />
              <span className="slider round"></span>
            </label>
            <label htmlFor="Empty" style={{ marginLeft: '3px' }}>
              {props.t('Empty')}
            </label>
          </div>
        </form>
      )}

      {Screen.getDeviceType().name === "Mobile" && (
        <form action="/action_page.php" method="get" className="d-flex">
          <label htmlFor="Full" className="m_l_10 df_ac font_12">
            <input
              className="checkbox-round"
              type="checkbox"
              name="Full"
              id="Full"
              value="FULL"
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
            {props.t('Full')}
          </label>

          <label htmlFor="Empty" className="m_l_10 df_ac font_12">
            <input
              className="checkbox-round"
              type="checkbox"
              name="Empty"
              id="Empty"
              value="EMPTY"
              onChange={handleCheckboxChange}
            />
            {props.t('Empty')}
          </label>
        </form>
      )}
    </div>
  );
}

export default withTranslation()(FilterCheckBox);
