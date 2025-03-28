import React from "react";
import "../../../../css/ui/popUps/newsBox.css";
import close_1 from '../../../../assets/images/table/close_1.svg';

function NewsBox(props) {
  function getText(html) {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  }

  function OnClickTitle(id) {
    window.open(`http://demo.rapoker.club/news.html?newsId=${id}`)
  }
  return (
    <React.Fragment>
      <div className="popCover_1" onClick={(e) => { e.preventDefault(); props.setAction("hideNews"); }}> </div>
      <div className="popup_1">
        <div className="popup_1_in">
          <div className="head">News
            <button className="close_1" onClick={(e) => { e.preventDefault(); props.setAction("hideNews"); }}> <img src={close_1} alt="" /> </button>
          </div>
          <div className="fd p_lr_10">
            {props.data.map((Newsdetail, index) => {
              return (
                <div className="fd p_b_10">
                  <div className="header_5" onClick={(e) => {
                    e.preventDefault()
                    OnClickTitle(Newsdetail.id)
                  }
                  }>
                    {Newsdetail.title}
                  </div>
                  <div className="fd newsContBox">{getText(Newsdetail.content)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default NewsBox;
