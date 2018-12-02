import React, { Component } from "react";
import { findNotaryList } from "../../actions/notaryPublicAction";
import Formatter from "../../lib/formatter";
import Page from "../../constants/Page";
import { connect } from "react-redux";
import Paginate from "react-paginate";
import NotaryInfo from "../commons/NotaryInfo";
import { findByCollectCode } from "../../actions/notaryAction";
import StorageUtil from "../../utils/StorageUtil";
import push from "../../utils/push";

@connect(
  state => {
    return {all: state.notaryPublic.all};
  }
)
export default class NotaryList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(findNotaryList({size: 15, page: 0}));
  }

  handlePageClick = e => {
    this.props.dispatch(findNotaryList({size: 15, page: e.selected}))
  };

  handleOpen = e => {
    this.props.dispatch(findByCollectCode(e));
  };

  handlePublic = e => {
    StorageUtil.collectCode(e);
    this.props.dispatch(push('/notary/public'));
  };

  render() {
    let {all} = this.props;

    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    return <div className="container-wrapper">
      <div className="container notary-container">
        <div className="notary-content notary-contents">
          <div className="notary-list">
            <div className="title">
              <span style={{width: "18%"}}>公证提取码</span>
              <span style={{width: "18%"}}>申请时间</span>
              <span style={{width: "18%"}}>出证时间</span>
              <span style={{width: "10%"}}>费用</span>
              <span style={{width: "12%"}}>公证员</span>
              <span style={{width: "24%"}}>操作</span>
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
                  <div key={item.id} className="item" onClick={e => this.handleOpen(item.collectCode) }>
                    <div style={{width: "18%"}}>
                      <span className="font-weight">{item.collectCode}</span>
                    </div>
                    <div style={{width: "18%"}}>
                      <span>{fmt.format(item.createdAt)}</span>
                    </div>
                    <div style={{width: "18%"}}>
                      <span>{fmt.format(item.commitAt)}</span>
                    </div>
                    <div style={{width: "10%"}}>
                      <span>{item.amount}</span>
                      <span className="paid">{ item.payStatus === "YES" ? "(已付款)" : ""}</span>
                    </div>
                    <div style={{width: "12%"}}>
                      <span>匿名</span>
                    </div>
                    <div style={{width: "24%"}}>
                      { item.payStatus === "YES" ?
                        <p className="list-to-notary" onClick={e => this.handlePublic(item.collectCode)}>出证</p>
                        : ""
                      }
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
