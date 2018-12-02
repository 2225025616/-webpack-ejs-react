import React, { Component } from "react";
import { connect } from "react-redux";
import Link from '../commons/LangLink';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { deleteNew, getNews, publishNews } from "../../actions/adminAction";
import AdminRoute from './AdminRoute'
import Formatter from "../../lib/formatter";
import Paginate from "react-paginate";
import push from "../../utils/push";

@connect(
  state => {
    return {news: state.admin.news}
  }
)

export default class NewsList extends Component {
  constructor(props) {
    super(props);
    this.wantToSend = {};
    this.pageNo = 0;
  }

  state = {
    showDeleteModal: false,
    showViewModal: false,
    pageSize: 10,
  };

  componentWillMount() {
    this.doQuery();
  }

  doQuery(props) {
    let page = this.pageNo;
    this.props.dispatch(getNews({pageSize:this.state.pageSize,
      page,
    }));
  }

  handlePageClick = e => {
    this.pageNo = e.selected;
    this.doQuery(this.props);
  };

  queryByPageSize = (e) => {
    var value = e.target.value;
    if (this.state.pageSize != value) {
      this.state.pageSize = value;
      this.pageNo = 0;
      this.doQuery(this.props);
    }
  };

  openDeleteModal = (e) => {
    this.wantToSend = e;
    this.forceUpdate();
    this.setState({showDeleteModal: true});
  };

  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  };

  openViewModal = (e) => {
    this.wantToSend = e;
    this.forceUpdate();
    this.setState({showViewModal: true});
  };

  closeViewModal = () => {
    this.setState({showViewModal: false});
  };

  getType = (type) => {
    if (type === 'Report')
      return '保全咨询';
    else if (type === 'Media') {
      return '媒体报道';
    }
  };

  deleteNews = () => {
    this.props.dispatch(deleteNew(this.wantToSend.id, () => {
      this.closeDeleteModal();
    }));
  };

  toEdit = (id) => {
    let adminRoute = AdminRoute.adminRoute();
    this.props.dispatch(push(`/${adminRoute}/news/${id}`));
  };

  toPublish = (item) => {
    this.props.dispatch(publishNews(item));
  };

  render() {
    let {news} = this.props;
    let adminRoute = AdminRoute.adminRoute();
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <article className="web-item">
      <Link to={`/${adminRoute}/news/new`}>
        <button>添加</button>
      </Link>
      <table className="admin-table">
        <thead>
        <tr>
          <th>标题</th>
          <th>上传时间</th>
          <th>归属</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {news.list ? news.list.map(item => {
          return <tr key={item.id}>
            <td>{item.title}</td>
            <td>{fmt.format(item.createdAt)}</td>
            <td>{this.getType(item.type)}</td>
            <td className="operate">
              <p onClick={e => this.openViewModal(item)}>预览</p>
              <p onClick={e => this.toEdit(item.id)}>编辑</p>
              <p onClick={e => this.openDeleteModal(item)}>删除</p>
              <p onClick={e => this.toPublish(item)}>{item.status === "Publish" ? "取消发布" : "发布新闻"}</p>
            </td>
          </tr>
        }) : ""}
        </tbody>
      </table>
      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{news.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="50">50</option>
            <option value ="100">100</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        {news.totalPage > 0 ? <Paginate previousLabel={"<"}
                                        nextLabel={">"}
                                        breakLable={<a href="">...</a>}
                                        pageNum={news.totalPage}
                                        forceSelected={news.pageNo}
                                        marginPagesDisplayed={5}
                                        pageRangeDisplayed={2}
                                        clickCallback={this.handlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"}/> : ""}
      </div>
      {this.state.showDeleteModal ?
        <ModalContainer onClose={this.closeDeleteModal}>
          <ModalDialog onClose={this.closeDeleteModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1 className="admin-table-title">删除新闻</h1>
            <form className="model-confirm">
              <p>是否删除:<span className="delete-item">{this.wantToSend.title}</span>?</p>
              <div className="button-group">
                <button type="button" className="yes" onClick={this.deleteNews}>删除</button>
                <button type="button" className="no" onClick={this.closeDeleteModal}>取消</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}

      {this.state.showViewModal ?
        <ModalContainer onClose={this.closeViewModal}>
          <ModalDialog onClose={this.closeViewModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1 className="admin-table-title">预览</h1>
            <article className="admin-news-html">
              <div dangerouslySetInnerHTML={{__html: this.wantToSend.text}}/>
            </article>
          </ModalDialog>
        </ModalContainer>
        : null}
    </article>
  }
}