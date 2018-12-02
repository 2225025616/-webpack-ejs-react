import React, { Component } from "react";
import { findAllNotaries } from "../../actions/notaryPublicAction";
import Formatter from "../../lib/formatter";
import Page from "../../constants/Page";
import { connect } from "react-redux";
import Paginate from "react-paginate";
import NotaryInfo from "../commons/NotaryInfo";
import { findByCollectCode } from "../../actions/notaryAction";

@connect(
  state => {
    return {all: state.notaryPublic.all};
  }
)
export default class Notarized extends Component {
  componentDidMount() {
    this.props.dispatch(findAllNotaries({size: 15, page: 0}));
  }

  handlePageClick = e => {
    this.props.dispatch(findAllNotaries({size: 15, page: e.selected}))
  };

  handleOpen = e => {
    this.props.dispatch(findByCollectCode(e));
  };

  render() {
    let {all} = this.props;

    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    return <div className="container-wrapper">
      <div className="container notary-container">
        <div className="notary-content notary-contents">
          <div className="notary-list">
            <div className="title">
              <span style={{width: "30%"}}>公证提取码</span>
              <span style={{width: "28%"}}>申请时间</span>
              <span style={{width: "17%"}}>出证时间</span>
              <span style={{width: "15%"}}>公证员</span>
              <span style={{width: "10%"}}>操作</span>
            </div>

          </div>
          { !all.totalPage ?
            <div className="notary-list">
              <img
                src={require("images/members/placeholder-attestations-list.png")}/>
              <p className="font">没有相关公证信息</p>
            </div> :
            <div className="notary-list">
              { all.list.map(item => {
                return <div>
                  <div key={item.id} className="item">
                    <div style={{width: "30%"}}>
                      <span className="font-weight">{item.collectCode}</span>
                    </div>
                    <div style={{width: "28%"}}>
                      <span>{fmt.format(item.createdAt)}</span>
                    </div>
                    <div style={{width: "17%"}}>
                      <span>{fmt.format(item.commitAt)}</span>
                    </div>
                    <div style={{width: "15%"}}>
                      <span>匿名</span>
                    </div>
                    <div style={{width: "10%"}}>
                      <p className="notary-detail" onClick={e => this.handleOpen(item.collectCode)}>查看</p>
                    </div>
                  </div>
                  <NotaryInfo collectCode={item.collectCode}/>
                </div>
              })
              }
              <div className="notary-paginate">
                <Paginate previousLabel={"<"}
                          nextLabel={">"}
                          breakLable={<a href="">...</a>}
                          pageNum={all.totalPage}
                          forceSelected={all.pageNo}
                          marginPagesDisplayed={Page.PAGE_DISPLAY}
                          pageRangeDisplayed={Page.RANGE_DISPLAY}
                          clickCallback={this.handlePageClick}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}/>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  }
}
