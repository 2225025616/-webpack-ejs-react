import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteSeal, findAllSeals, setDefaultSeal } from "../../../actions/signatureAction";
import Header from "../common/Header";
import Link from "../../commons/LangLink";
import Back from "../common/Back";
import FloatModal from "../common/FloatModal";
import Formatter from "../../../lib/formatter";

@connect(state => {
  return {
    seals: state.signature.seals,
  }
})

export default class SignatureSeal extends Component {
  constructor(props) {
    super(props);
  }

  data = {
    title: '签章管理'
  };

  state = {show: false, seal: {}, loading: true};

  componentWillMount() {
    this.props.dispatch(findAllSeals(() => this.setState({loading: false})));
  }

  setDefault = (id) => {
    return e => this.props.dispatch(setDefaultSeal(id));
  };

  deleteItem = id => {
    return e => {
      this.props.dispatch(deleteSeal(id));
      this.setState({show: false});
    }
  };

  render() {
    const {seals} = this.props, defaultSeal = seals.default, userSeals = seals.userSignature,
      fmt = Formatter.get('yyyy-mm-dd hh:MM');

    return <div className="signatures-seal product-common">
      <Header>
        <Back/>
        <span className="title">{this.data.title}</span>
        <Link to="/mobile/signatures/seals/add" className="my-files">
          <span className="add-member">+</span>
        </Link>
      </Header>
      <article>
        {
          this.state.loading ?
            <div className='loading-wrap'
                 style={{minHeight: 'calc(100vh - 4.2rem)', width: '100vw', margin: '-.9rem 0 0 -.9rem'}}>
              <img src={require('../../../../images/loading.gif')} alt=""/><span>正在加载...</span>
            </div>
            : !defaultSeal || !defaultSeal.fileKey || !userSeals || userSeals.length <= 0 ?
            <div className='no-content-wrap'
                 style={{minHeight: 'calc(100vh - 4.2rem)', width: '100vw', margin: '-.9rem 0 0 -.9rem'}}>
              <img src={require('../../../../images/no-content.png')} alt=""/>
              <span>您还没有签章</span>
            </div>
            : [
              defaultSeal && defaultSeal.fileKey ?
                <section>
                  <div className="seal-content">
                    <div className="img-wrap">
                      <img src={defaultSeal.fileKey}/>
                    </div>
                    <div className="text">
                      <h3>{defaultSeal.fileName}</h3>
                      <p>{fmt.format(defaultSeal.createdAt)}</p>
                    </div>
                  </div>
                  <div className="option">
                    <p>
                      <span className="default checked"/>
                      <span>默认签章</span>
                    </p>
                    <p>
                      <i className="iconfont font-delete"/>
                      <span>删除</span>
                    </p>
                  </div>
                </section>
                : "",
              userSeals && userSeals.map(
                (item, i) =>
                  <section key={i}>
                    <div className="seal-content">
                      <div className="img-wrap">
                        <img src={item.fileKey}/>
                      </div>
                      <div className="text">
                        <h3>{item.fileName}</h3>
                        <p>{fmt.format(item.createdAt)}</p>
                      </div>
                    </div>
                    <div className="option">
                      <p onClick={this.setDefault(item.id)}>
                        <span className="default"/>
                        <span>默认签章</span>
                      </p>
                      <p onClick={e => this.setState({show: true, seal: item})}>
                        <i className="iconfont font-delete"/>
                        <span>删除</span>
                      </p>
                    </div>
                  </section>
              ),
            ]
        }
      </article>
      <FloatModal show={this.state.show} confirmFn={this.deleteItem(this.state.seal.id)}
                  closeFn={e => this.setState({show: false})}>
        <p className="modal-text">确定删除签章 {this.state.seal.fileName}?</p>
      </FloatModal>
    </div>
  }
}