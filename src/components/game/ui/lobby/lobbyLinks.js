import '../../../../css/ui/lobby/lobbylinks.css';
// import casino from '../../../../assets/images/lobby/LinksHeader/casino.svg'
// import sports from '../../../../assets/images/lobby/LinksHeader/sport.svg'
// import horse from '../../../../assets/images/lobby/LinksHeader/bt_horses.png'
import { withTranslation } from 'react-i18next';
import Config from '../../../../config';
import Screen from '../../../utils/screen';
// import logo from '../../../../assets/images/lobby/Untitled-4.png'
import fileName from '../../../../jsconfig';
const LobbyLinks = (props) => {
    var config = new Config();
    // window.open(`https://${window.location.host}/deposit?wsession=${ws}`);
    return (
        <div className="fd">
            <div className='row bg_new_1'>
                {/* {Screen.getDeviceType().name==="Desktop"&&<img className="logomain" src={logo} />} */}
                {(Screen.getDeviceType().name === "Desktop" && fileName.name !== "Leader_bet") &&

                    <button htmlFor="casino col-4" className='spanimage' value="casino" onClick={() => {
                        var ws = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid;
                        var sid = (ws).split(".")[1]

                        // window.open(`https://${window.location.host}/client-redirect?LANG=en&sid=${sid}&to=slots`)
                        // window.open(`https://demo.rapoker.club/client-redirect?LANG=en&sid=${sid}&to=slots`)
                        // console.log(`https://demo.rapoker.club/client-redirect?LANG=en&sid=${sid}&to=slots`)
                        // console.log(window.location.origin)

                        window.open(config.URL_Environment.proxy.baseUrl + config.URL_Environment.url.gotoSlots)

                    }}>
                        {/* <img id='casino' src={logo} alt="casino"></img> */}
                    </button>
                }
                {(Screen.getDeviceType().name === "Mobile" && fileName.name === "Lapoker") && (
                    <div className='lobbylinkmain col-6'>
                        <button htmlFor="casino" className='spanimage' value="casino" onClick={() => {
                            var ws = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid;
                            var sid = (ws).split(".")[1]

                            // window.open(`https://${window.location.host}/client-redirect?LANG=en&sid=${sid}&to=slots`)
                            // window.open(`https://demo.rapoker.club/client-redirect?LANG=en&sid=${sid}&to=slots`)
                            // console.log(`https://demo.rapoker.club/client-redirect?LANG=en&sid=${sid}&to=slots`)
                            // console.log(window.location.origin)

                            window.open(config.URL_Environment.proxy.baseUrl + config.URL_Environment.url.gotoSlots)

                        }}>
                            {/* <img id='casino' src={casino} alt="casino"></img> */}
                            <span id='casino'>{props.t('CASNIO')}</span>
                        </button>
                        <button htmlFor='sports' className='spanimage' value="sports" onClick={() => {

                            var ws = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid;
                            var sid = (ws).split(".")[1]

                            // https://demo.rapoker.club?client-redirect?LANG=en&sid=84eb2306-ef89-43dd-93c7-e978054048ab.c3d4eecc02a64447-8a614ea627bdbcb4&to=slots
                            // window.open(`https://demo.rapoker.club/client-redirect?LANG=en&sid=${sid}&to=sports`)
                            // window.open(`https://${window.location.host}/client-redirect?LANG=en&sid=${sid}&to=sports`)
                            window.open(config.URL_Environment.proxy.baseUrl + config.URL_Environment.url.gotoSports)

                        }}>
                            {/* <img id='sports' src={sports} alt="sports"></img> */}
                            <span id='sports'>{props.t('SPORTS')}</span>
                        </button>
                        <button htmlFor='horse' className='spanimage' value="horse" onClick={() => {

                            var ws = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid;
                            var sid = (ws).split(".")[1]

                            // window.open(`https://${window.location.host}/client-redirect?LANG=en&sid=${sid}&to=horseracing`)
                            // window.open(`https://demo.rapoker.club/client-redirect?LANG=en&sid=${sid}&to=horseracing`)
                            // window.open(`https://${window.location.host}/client-redirect?LANG=en&sid=${ws}&to=horseracing`)
                            window.open(config.URL_Environment.proxy.baseUrl + config.URL_Environment.url.gotoHorses)

                        }}>
                            {/* <img id='horse' src={horse} alt="horse"></img> */}
                            <span id='horse'>{props.t('HORSES')}</span>
                        </button>
                    </div>)
                }
            </div>
        </div>
    )
}
export default withTranslation()(LobbyLinks);