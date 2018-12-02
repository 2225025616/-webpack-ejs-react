import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import T from "i18n-react";
import FileUtil from "../../utils/FileUtil";
import { listProducts } from "../../actions/productAction";

@connect(state => {
  return {all: state.product.all}
})

export default class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(listProducts());
  }

  render() {
    const {all} = this.props;
    return <div className="container-wrapper">
      <div className="container product-list">
        <p className="table-name">{T.translate("product.summary")}</p>
        <Link to={`/products/new`}>
          <button className="blueButton add-product">+&nbsp; {T.translate("product.add")}</button>
        </Link>
        { all.map((item, index) => {
          return <Link to={`/products/over-view/${item.id}`} className="item" key={index}>
            <div>
              <p>{T.translate("product.name")}</p>
              <p>{item.name}</p>
            </div>
            <hr/>
            <div>
              <p>{T.translate("product.url")}</p>
              <p className="website">{item.website ? item.website : T.translate("product.no-url") }</p>
            </div>
            <hr/>
            <div>
              <p>{T.translate("product.status")}</p>
              <p>
                {item.live ? <span className="on-line">{T.translate("product.online")}</span> :
                  <span>{T.translate("product.offline")}</span>}
              </p>
            </div>
            <hr/>
            <div>
              <p>{T.translate("product.data")}</p>
              <p>{item.saveRecords > 0 ? item.saveRecords : 0}{T.translate("product.strip")}</p>
            </div>
            <hr/>
            <div>
              <p>{T.translate("product.data-volume")}</p>
              <p>{FileUtil.humanableSize(item.dataSize)}</p>
            </div>
          </Link>
        }) }
      </div>
    </div>;
  }
}
