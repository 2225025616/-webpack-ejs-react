import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import Paginate from "react-paginate";
import cx from "classnames";
import { findUploadAttestationByUser } from "../../actions/attestationAction";
import push from "../../utils/push";
import LoadingButton from "../commons/LoadingButton";
import Link from "../commons/LangLink";
import Formatter from "../../lib/formatter";
import Page from "../../constants/Page";
import UploadModal from "../attestations/UploadModal";
import FileTypeIcon from "../commons/FileTypeIcon";
import FileUtil from "../../utils/FileUtil";
import StorageUtil from "../../utils/StorageUtil";

const styles = {
  checkBox: {
    marginTop: 30
  },
  icon: {
    fill: "#03a9f4"
  },
  submit: {
    marginTop: -9,
    minWidth: 80,
    height: 34
  },
  notaryBtn: {
    position: "absolute",
    bottom: 32,
    minWidth: 140,
    height: 35
  },
  uploadBtn: {
    position: "absolute",
    right: 16,
    bottom: 16
  },
  select: {
    width: 140,
    height: 50,
    marginLeft: 15,
    fontSize: 14
  },
  flatBtn: {
    marginLeft: 8,
    padding: "0 8px",
  },
};

@connect(state => {
  return {
    attestations: state.attestation.upload,
    params: state.router.params
  }
})
export default class UserUploadAttestations extends Component {
  constructor(props) {
    super(props);
    this.selectedItems = {};
    this.resetCondition();
  }

  componentDidMount() {
    this.doQuery(this.props);
  }

  doQuery = (props) => {
    let period = this.period;
    let pageNo = this.pageNo;

    this.props.dispatch(findUploadAttestationByUser({
      pageNo: this.pageNo,
      pageSize: 6,
      period
    }));
  };

  resetCondition() {
    this.period = "";
    this.pageNo = 0;
  }

  handleAttestationQuery = e => {
    if (e)
      e.preventDefault();

    this.doQuery(this.props);
  };

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  selectItem(e) {
    if (!this.selectedItems[e.id]) {
      this.selectedItems[e.id] = e;
    } else {
      delete this.selectedItems[e.id];
    }

    this.forceUpdate();
  }

  selectedCount() {
    let len = Object.keys(this.selectedItems).length;
    if (len > 0) {
      return "(" + len + ")";
    } else {
      return "";
    }
  }

  queryByPeriod = (value) => {
    if (this.period !== value) {
      this.period = value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  handleToNotaries = () => {
    let result = [];
    for (let item in this.selectedItems) {
      result.push(this.selectedItems[item]);
    }

    this.toNotary(result);
  };

  toNotary(items) {
    StorageUtil.selectedAttestations(items);
    this.props.dispatch(push('/notarization'));
  }

  handleToNotary = (item) => {
    this.toNotary([item]);
  };

  handleOpen = () => {
    this.refs.upload.show();
  };

  render() {
    let {attestations} = this.props;

    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");
    let type = this.props.id;
    let name = this.props.name;

    return <div className="container-wrapper">
      <div className="container">
        <form onSubmit={this.handleAttestationQuery} className="attestations-search">

          <ul className="breadcrumb">
            <li>{T.translate("sidebar.user-attestation")}</li>
            <li>{T.translate("sidebar.my-attestation")}</li>
            <li>{T.translate("user.my-upload")}</li>
          </ul>
          <UploadModal ref="upload"/>
          <div className="search-filter">
            <a className={cx("filter-require", {active: this.period === ""})}
               onClick={e => this.queryByPeriod('')}>{T.translate("attestation.all")}</a>
            <a className={cx("filter-require", {active: this.period === "week"})}
               onClick={e => this.queryByPeriod('week')}>{T.translate("attestation.week")}</a>
            <a className={cx("filter-require", {active: this.period === "month"})}
               onClick={e => this.queryByPeriod('month')}>{T.translate("attestation.month")}</a>
          </div>

          <LoadingButton onTouchTap={this.handleToNotaries} type="button"
                         disabled={this.selectedCount() <= 0}
                         label={T.translate("attestation.notary") + `${this.selectedCount()}`}
                         style={styles.notaryBtn}
          />
          <button label={T.translate("common.upload-file")}
                  onClick={this.handleOpen}
                  style={styles.uploadBtn}
          />
        </form>

        <div className="search-result">
          {attestations.totalPage === 0 ?
            <div className="table-placeholder" colSpan="6">
              <img
                src={require("images/members/placeholder-attestations-list.png")}/><br/>
              {T.translate("common.no-info")}
            </div>
            :
            attestations.list.map(item => {
              return <div className="search-content">
                <div>
                  <input type="checkbox" checked={!!this.selectedItems[item.id]}
                         onClick={e => this.selectItem(item)}
                         iconStyle={styles.icon}
                         style={styles.checkBox}/>
                </div>
                <div>
                  <FileTypeIcon fileName={item.fileName}/>
                </div>
                <div className="content-info">
                  <p className="file-name">{item.fileName}</p>
                  <p
                    className="file-size">{FileUtil.humanableSize(item.fileSize)}<span>{fmt.format(item.createdAt)}</span>
                  </p>
                  <p className="file-hash">{item.id}</p>
                </div>
                <div className="content-status upload-btn-layout">
                  <div className="item-btn">
                    <Link to={`/attestations/${item.id}` }>
                      <button>{T.translate("attestation.details")}</button>
                    </Link>

                    <button style={styles.flatBtn}
                            onTouchTap={e => this.handleToNotary(item)}>{T.translate("attestation.notary")}</button>
                  </div>
                </div>
              </div>;
            })
          }

          { attestations.totalPage > 0 ? <Paginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLable={<a href="">...</a>}
            pageNum={attestations.totalPage}
            forceSelected={attestations.pageNo}
            marginPagesDisplayed={Page.PAGE_DISPLAY}
            pageRangeDisplayed={Page.RANGE_DISPLAY}
            clickCallback={this.handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          /> : "" }

        </div>
      </div>
    </div>
  }
};
