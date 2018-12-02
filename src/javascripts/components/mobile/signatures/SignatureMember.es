import React, { Component } from "react";
import { connect } from "react-redux";
import { findSignatureMembers } from "../../../actions/signatureAction";
import Header from "../common/Header";
import Link from "../../commons/LangLink";
import push from "../../../utils/push";
import FloatModal from "../common/FloatModal.es";
import { deleteSignatureMember } from "../../../actions/signatureAction.es";

@connect(state => {
  return {
    members: state.signature.members,
  }
})

export default class SignatureMember extends Component {

  constructor(props) {
    super(props);
    this.keyWord = "";
    this.state = {
      loading: true,
      showNav: false,
      showOperator: false,
      showModal: false,
      member: {}
    }
  }

  componentWillMount() {
    this.props.dispatch(findSignatureMembers(() => this.setState({loading: false})));
  }

  getFirstName = (name) => {
    return name.substr(0, 1);
  };

  handleKeyWorkChange = e => {
    this.keyWord = e.target.value;
    this.forceUpdate();
  };

  test = () => {
    this.props.dispatch(push(`/mobile/signatures/profile`));
  };

  toggle = e => {
    let showNav = !this.state.showNav;
    this.setState({showNav})
  };

  delMember = () => {
    this.props.dispatch(deleteSignatureMember(this.state.member.id,
      () => {
        this.closeModal();
      }));
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  render() {
    const {members} = this.props;

    return <div className="signatures-member product-common">
      <Header>
        <span className="back" onClick={this.test}/>
        <span className="title">联系人</span>
        <div className="operator">
          <span className="add-member" onClick={this.toggle}>+</span>
          {
            this.state.showNav ?
              <div className='wrap'>
                <Link to="/mobile/signatures/members/add">添加联系人</Link>
                <span onClick={e => this.setState({showOperator: true, showNav: false})}>编辑联系人</span>
              </div>
              : ''
          }
        </div>
      </Header>
      {/*<input placeholder="搜索联系人姓名、账号" value={this.keyWord} onChange={this.handleKeyWorkChange}/>*/}
      <article>
        {
          this.state.loading ?
            <div className='loading-wrap'
                 style={{minHeight: 'calc(100vh - 4.2rem - 4rem)'}}>
              <img src={require('../../../../images/loading.gif')} alt=""/><span>正在加载...</span>
            </div>
            : members.length > 0 ?
            members.map(
              (item, i) =>
                <section key={i}>
                  <span className="first-name">{this.getFirstName(item.linkName)}</span>
                  <aside>
                    <p className="name">{item.linkName}</p>
                    <p className="phone">{item.linkPhone}</p>
                  </aside>
                  {
                    this.state.showOperator ?
                      <div className='operator-wrap'>
                        <Link to={`/mobile/signatures/members/${item.id}/edit`} className='btn-edit'>编辑</Link>
                        <button className='btn-del' onClick={e => this.setState({member: item, showModal: true})}>删除
                        </button>
                      </div>
                      : ''
                  }
                </section>
            ) : <div className='no-content-wrap'
                     style={{minHeight: 'calc(100vh - 4.2rem - 4rem)'}}>
              <img src={require('../../../../images/no-content.png')} alt=""/>
              <span className='no-member'>暂无联系人<br/>请点击右上角‘+’添加</span>
            </div>
        }
      </article>
      <FloatModal show={this.state.showModal} confirmFn={this.delMember} closeFn={this.closeModal}>
        <span className='del-member'>确定删除联系人 {this.state.member.linkName}?</span>
      </FloatModal>
    </div>
  }
}