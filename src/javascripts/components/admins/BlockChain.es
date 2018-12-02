import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { deleteBlockDocument, getBlockChain, uploadDocument } from "../../actions/adminAction";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import LoadingButton from "../commons/LoadingButton";
import { toastr } from "react-redux-toastr";
import Formatter from "../../lib/formatter";
import Paginate from "react-paginate";
import AttestationUtil from "../../utils/AttestationUtil";
import LanguageUtil from "../../utils/LanguageUtil";

const fields = ["name"];

@reduxForm({form: "evidence", fields}, state => {
  return {
    blockChain: state.admin.blockChain,
    blockChainItem: state.admin.blockChainItem
  }
})

export default class BlockChain extends Component {
  constructor(props) {
    super(props);
    this.wantToSend = {};
    this.pageNo = 0;
  }

  state = {
    showAddModal: false,
    showDeleteModal: false,
    pageSize: 10,
  };

  file = '';
  fileName = '';

  componentDidMount() {
    this.doQuery();
  }

  doQuery(props) {
    let page = this.pageNo;
    this.props.dispatch(getBlockChain({pageSize:this.state.pageSize,
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
  
  openAddModal = (e) => {
    this.forceUpdate();
    this.setState({showAddModal: true});
  };

  closeAddModal = () => {
    this.setState({showAddModal: false});
  };

  openDeleteModal = (e) => {
    this.wantToSend = e;
    this.forceUpdate();
    this.setState({showDeleteModal: true});
  };

  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  };

  setFile = (e) => {
    this.file = e.target.files;
    this.fileName = this.file[0].name;
    this.forceUpdate();
  };

  addDocument = () => {
    const {fields: {name}} = this.props;
    if (!name.value)
      toastr.error("请输入名称");
    else if (this.fileName == '')
      toastr.error("请上传文件");
    else {
      this.props.dispatch(uploadDocument(name.value, this.file, () => {
        this.closeAddModal();
      }));
    }
  };

  deleteDocument = () => {
    this.props.dispatch(deleteBlockDocument(this.wantToSend.id, () => {
      this.closeDeleteModal();
    }));
  };

  render() {
    const {fields: {name}, blockChain} = this.props;
    let fmt = Formatter.get("yyyy-mm-dd hh:MM:ss");

    return <article className="web-item">
      <button type="button" onClick={this.openAddModal}>添加</button>
      <table className="admin-table">
        <thead>
        <tr>
          <th style={{width: 450}}>标题</th>
          <th>上传时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {blockChain.list ? blockChain.list.map(item => {
          return <tr key={item.id}>
            <td className="block-title">{item.title}</td>
            <td>{fmt.format(item.createdAt)}</td>
            <td className="operate">
              <p onClick={e => this.openDeleteModal(item)}>删除</p>
              <a target="blank" href={AttestationUtil.viewBlockDoc(item) + "&lang=" + LanguageUtil.lang}>
                <p>查看</p>
              </a>
            </td>
          </tr>
        }) : ""}
        </tbody>
      </table>
      <div className="table-page">
        <div>
          <label className="sum">共 <span className="total-items">{blockChain.totalItems}</span> 条数据</label>
          <select value={this.state.pageSize} onChange={this.queryByPageSize}>
            <option value ="10">10</option>
            <option value ="20">20</option>
            <option value ="50">50</option>
            <option value ="100">100</option>
          </select>
          <label className="page-unit">条/页</label>
        </div>
        {blockChain.totalPage > 0 ? <Paginate previousLabel={"<"}
                                              nextLabel={">"}
                                              breakLable={<a href="">...</a>}
                                              pageNum={blockChain.totalPage}
                                              forceSelected={blockChain.pageNo}
                                              marginPagesDisplayed={5}
                                              pageRangeDisplayed={2}
                                              clickCallback={this.handlePageClick}
                                              containerClassName={"pagination"}
                                              subContainerClassName={"pages pagination"}
                                              activeClassName={"active"}/> : ""}
      </div>
      {this.state.showAddModal ?
        <ModalContainer onClose={this.closeAddModal}>
          <ModalDialog onClose={this.closeAddModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <form autoComplete="off">
              <h1 className="admin-table-title">添加区块链文档</h1>
              <article className="modal-content add-block-chain">
                <section>
                  <span className="title">名称</span>
                  <input placeholder="请输入名称" type="text" {...(name)}/>
                </section>
                <section>
                  <span className="title">文件</span>
                  <div className="file-content">
                    <button>上传文件</button>
                    <input type="file" accept=".pdf" onChange={this.setFile}/>

                  </div>
                  <p className="file-name">{this.fileName}</p>
                </section>
                <section>
                  <span className="title"></span>
                  <LoadingButton className={name.value && this.fileName ? 'blueButton' : 'disable'}
                                 onClick={this.addDocument}
                                 label="提交"
                                 type="button"
                                 loadingLabel="提交中..."/>
                </section>
              </article>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}

      {this.state.showDeleteModal ?
        <ModalContainer onClose={this.closeDeleteModal}>
          <ModalDialog onClose={this.closeDeleteModal} width={665} className="example-dialog"
                       dismissOnBackgroundClick={true}>
            <h1 className="admin-table-title">删除区块链文档</h1>
            <form className="model-confirm">
              <p>是否删除:<span className="delete-item">{this.wantToSend.title}</span>?</p>
              <div className="button-group">
                <button type="button" className="yes" onClick={this.deleteDocument}>删除</button>
                <button type="button" className="no" onClick={this.closeDeleteModal}>取消</button>
              </div>
            </form>
          </ModalDialog>
        </ModalContainer>
        : null}
    </article>
  }
}