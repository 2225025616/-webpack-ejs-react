import React, { Component } from "react";
import { connect } from "react-redux";
import T from "i18n-react";
import Link from "../commons/LangLink";
import { listProducts,destroyProduct } from "../../actions/productAction";
import CommonAttestationList from "../members/CommonAttestationList";
import format from "../../utils/format";
import { ModalContainer, ModalDialog } from "react-modal-dialog";

const style = {
  section: {
    marginRight: 0,
  },
};

@connect(state => {
  return {
    products: state.product.all,
  }
})
export default class OrgAttestationCount extends Component {
  constructor(props) {
    super(props);
    this.deleteItem=''
  }
state={
  showDeleteModal: false,
}
  productId = "";

  componentDidMount() {
    this.props.dispatch(listProducts());
  }

  deleteProduce=(PId)=>{
    this.props.dispatch(destroyProduct(PId,()=>{
      this.closeDeleteModal();
    }));
  }

  openDeleteModal = PId => {
    this.deleteItem = PId;
    this.forceUpdate();
    this.setState({showDeleteModal: true});
    console.log(this.deleteItem)
  };

  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  };
  render() {
    let { products} = this.props;

    return <div className="container-wrapper" style={{flex: 1}}>
      <div className="container member-container org-attestations-profile" style={{width: 'auto'}}>
        <p className="table-name">
          {T.translate("sidebar.org-attestation")}
        </p>
        <div className="member-content">
          <h2>{T.translate("product.org-products")}</h2>
          <p className="introduce">{T.translate("product.org-products-tip")}</p>
          {/*<p className="introduce">本页统计数据截止到昨天</p>*/}
          <article className="products-list">
            <Link className="add-product section" to={`/products/new`}>
              <img src={require('../../../images/components/product/add-product.png')} alt=""/>
              <p>{T.translate("product.add")}</p>
            </Link>
            {products.map((item, index) => {
              return <section key={index} className="produce">
                <div className="top">
                  <p className="product-name">
                    {item.name}
                  </p>
                  {
                    item.live ?
                      <span className="online-status status">{T.translate("product.online")}</span>
                      : <span className="offline-status status">{T.translate("product.offline")}</span>
                  }
                  <Link to={`/products/over-view/${item.id}?active=1`} className="btn">
                    <span className="setting">模板设置</span>
                  </Link>
                  <span className="delete-produce" onClick={()=>this.openDeleteModal(item.id)}>删除产品</span>
                  {this.state.showDeleteModal ?
                    <ModalContainer onClose={this.closeDeleteModal}>
                      <ModalDialog onClose={this.closeDeleteModal} width={665} className="example-dialog"
                                   dismissOnBackgroundClick={true}>
                        <h1>{T.translate("user.remind")}</h1>
                        <form className="confirm">
                          <p>是否确认删除此产品？</p>
                          <div className="button-group">
                            <button type="button" className="yes"
                                    onClick={()=>this.deleteProduce(this.deleteItem)}>{T.translate("notification.delete")}</button>
                            <button type="button" className="no"
                                    onClick={this.closeDeleteModal}>{T.translate("common.cancel")}</button>
                          </div>
                        </form>
                      </ModalDialog>
                    </ModalContainer>
                    : null}
                </div>
                <p className="info-item">
                  <span className="name">{T.translate("product.url")}</span>
                  <span className="value">{item.website ? item.website : T.translate("product.no-url")}</span>
                </p>
          {/*      <p className="info-item">
                  <span className="name">{T.translate("product.data")}</span>
                <span
                  className="value">{item.saveRecords > 0 ? item.saveRecords : 0}{T.translate("product.strip")}</span>
                </p>
                <p className="info-item">
                  <span className="name">{T.translate("product.data-volume")}</span>
                  <span className="value">{item.dataSize ? format.fBytes(item.dataSize) : '0 B'}</span>
                </p>*/}
                <div className="bottom-btn">
                  <Link to={`/products/over-view/${item.id}?active=0`} className="btn">产品信息</Link>
                  <Link to={`/products/over-view/${item.id}?active=1`} className="btn">产品模板</Link>
                  <Link to={`/products/over-view/${item.id}?active=3`} className="btn">保全列表</Link>
                </div>
              </section>
            })}
          </article>
{/*          <CommonAttestationList size="5" haveInput="0" type="org"/>*/}
        </div>
      </div>
    </div>
  }
}
