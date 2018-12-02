import React, { Component } from "react";
import {
  findByCollectCode,
  getNotarization,
  postNotarization,
  postProductNotarization
} from "../../actions/notaryAction";
import { reduxForm } from "redux-form";
import FormValidator from "../../utils/FormValidator";
import FormUtil from "../../utils/FormUtil";
import IdUtil from "../../utils/IdUtil";
import T from "i18n-react";
import StorageUtil from "../../utils/StorageUtil";
import BackMenu from "../commons/BackMenu";
import RowInput from "../commons/RowInput";
import RowTextarea from "../commons/RowTextarea";
import RowRadios from "../commons/RowRadios";
import push from "../../utils/push";
import MallProductType from "../../utils/MallProductType.es";


const fields = ["postcode", "address", "caseDescribe", "caseProperty", "lawSuit", "everVerify", "entrust", "delegate"];

let notaryPublicType = "VERIFY";
let notaryPublicId = "1";
let toUploadFileId = "";

const validate = values => {
  return new FormValidator(values)
    .postCode("postcode", (T.translate("notarization.postcode")))
    .nonEmpty("address", (T.translate("notarization.detailed-address")))
    .nonEmpty("caseDescribe", (T.translate("notarization.descrip")))
    .errors;
};

const getInitialValues = state => {
  if (!IdUtil.collectCode(state.router)) {
    return {
      caseProperty: "NORMAL",
      lawSuit: 0,
      everVerify: 0,
      delegate: 1
    };
  }
  else
    return {
      ...state.notary.expanded,
    };
};


@reduxForm({form: "notarization", fields, validate}, state => {
  return {
    initialValues: {
      ... getInitialValues(state)
    },
    notaries: state.notary.info,
    products: state.product.all,
    organizations: state.organization.all,
    params: state.router.params,
    expanded: state.notary.expanded,

    onSubmit: (values, dispatch) => {
      let collectCode = IdUtil.collectCode(state.router);
      let productId = IdUtil.productId(state.router);
      if (productId) {
        dispatch(postProductNotarization(productId, {
          ...values,
          collectCode: collectCode,
          notaryPublicType,
          notaryPublicId,
          type: "ORGANIZATION",
          anos: [StorageUtil.selectedAttestations().map(item => {
            return item.id
          })]
        }));
      }
      else {
        dispatch(postNotarization({
          ...values,
          collectCode: collectCode,
          notaryPublicType,
          notaryPublicId,
          type: "PERSON",
          anos: [StorageUtil.selectedAttestations().map(item => {
            return item.id
          })]
        }, () => {
          dispatch(push(`/notaries`));
        }));
      }
    }
  }
})

export default class Notarization extends Component {

  constructor(props) {
    super(props);
    // this.payId = "";
  };

  state = {
    open: false,
    showPayModal: false,
  };

  // openPayModal = (id) => {
  //   this.payId = id;
  //   this.state.showPayModal = true;
  // };

  // closePayModal = () => {
  //   this.setState({showPayModal: false});
  //   this.props.dispatch(push(`/notaries`));
  // };

  // handlePayNotary = () => {
  //   this.props.dispatch(payNotary(this.payId, ()=> {
  //     this.closePayModal();
  //     this.props.dispatch(push(`/notaries`));
  //   }));
  // };

  componentWillMount() {
    this.props.dispatch(getNotarization())
  };

  componentDidMount() {
    let id = IdUtil.collectCode(this.props);
    if (id) {
      this.props.dispatch(findByCollectCode(id));
    }
  };

  property = e => {
    if (e === "complicate") {
      return "complicate";
    }
    else if (e === "hard") {
      return "hard";
    }
    else {
      return "normal";
    }
  };

  // handleOpen = () => {
  //   this.setState({open: true});
  // };

  // isRealIdCard = e => {
  //   if (e != "") {
  //     return this.handleNext;
  //   }
  //   else {
  //     return this.handleOpen;
  //   }
  // };

  // handleSubmits = () => {
  //   this.props.handleSubmit();
  // };

  // handleUploadFile = (id, e) => {
  //   this.props.dispatch(upLoadFile(id, e.target.files, ()=> {
  //     toUploadFileId = id;
  //     this.forceUpdate();
  //   }));
  // };

  organization = () => {
    const {organizations, products} = this.props;
    let productId = IdUtil.productId(this.props);
    let product = products.find(item => item.id === productId);
    if (product) {
      return organizations.find(item => item.id === product.organizationId);
    }
  };

  render() {
    let collectCode = IdUtil.collectCode(this.props);
    const {fields: {postcode, address, caseDescribe, caseProperty, lawSuit, everVerify, delegate}, notaries, expanded, handleSubmit} = this.props;

    let organization = this.organization();
    let productId = IdUtil.productId(this.props);
    let {products} = this.props;
    let product = products.find(item => item.id === productId);

    const attestations = StorageUtil.selectedAttestations() || [];

    // let toUploadFile = "false";
    // attestations.map(item => {
    //   if(item.id === toUploadFileId){
    //     item.uploadFile = "false";
    //   }
    //   if(item.uploadFile === "true"){
    //     toUploadFile = "true";
    //   }
    // });

    return (
      <div className="container-wrapper" style={{width: '100%'}}>
        <div className="container">
          <BackMenu title="申请出证"/>
          <div className="ctn notary-details">
            <form className="content" onSubmit={handleSubmit}>
              <div className="details user-details">
                <h2>{productId ? T.translate("notarization.product-info") : T.translate("notarization.person-info")}</h2>
                <article>
                  <section>
                    <span>{T.translate("notarization.name")}</span>
                    <p>{productId ? (organization ? organization.contactName : "") : notaries.realName}</p>
                  </section>

                  {
                    productId ?
                      <section>
                        <span className="tdleft">{T.translate("notarization.organization-name")}</span>
                        <p>{(organization ? organization.name : "")}</p>
                      </section>
                      :
                      <section>
                        <span className="tdleft">{T.translate("notarization.idcard")}</span>
                        <p>{notaries.idCard}</p>
                      </section>
                  }

                  <section>
                    <span>{T.translate("notarization.tel")}</span>
                    <p>{notaries.phoneNumber}</p>
                  </section>
                  <section>
                    <span>{T.translate("notarization.postcode")}</span>
                    <RowInput placeholder={T.translate("notarization.writ-code")}
                              type="text" {...FormUtil.extract(postcode)} file={postcode}
                              width="300" height="36"/>
                  </section>
                  <section>
                    <span>{T.translate("notarization.add")}</span>
                    <RowTextarea placeholder={T.translate("notarization.writ-add")} {...FormUtil.extract(address)}
                                file={address}/>
                  </section>
                </article>
              </div>
              <div className="details business-details">
                <h2>{T.translate("notarization.business-info")}</h2>
                <article>
                  <section>
                    <span>{T.translate("notarization.business-type")}</span>
                    <p>{T.translate("notarization.verify")}</p>
                  </section>
                  <section>
                    <span>{T.translate("notarization.list")}</span>
                    {
                      collectCode ?
                        <div>
                          {
                            expanded.list.map((item, i) => {
                              return <p key={i}>{item.ano}</p>
                            })
                          }
                        </div>
                        :
                        <div>
                          {
                            attestations.map((item, i) => {
                              return <p key={i}>{item.id}</p>
                            })
                          }
                        </div>
                    }
                  </section>
                  <section>
                    <span>{T.translate("notarization.descrip")}</span>
                    <RowTextarea placeholder={T.translate("notarization.case-info")}
                                hint={T.translate("notarization.detailed-address")}
                                file={caseDescribe} {...FormUtil.extract(caseDescribe)}/>
                  </section>
                  <section>
                    <span>{T.translate("notarization.property")}</span>
                    <RowRadios file={caseProperty} items={[
                      {value: 'NORMAL', text: T.translate("notarization.normal"), defaultChecked: true},
                      {value: 'COMPLICATE', text: T.translate("notarization.complicate")},
                      {value: 'HARD', text: T.translate("notarization.hard")},
                    ]}/>
                  </section>
                  <section>
                    <span>{T.translate("notarization.lawsuit")}</span>
                    <RowRadios file={lawSuit} items={[
                      {value: '1', text: T.translate("notarization.yes")},
                      {value: '0', text: T.translate("notarization.no"), defaultChecked: true},
                    ]}/>
                  </section>
                  <section>
                    <span>{T.translate("notarization.identify")}</span>
                    <RowRadios file={everVerify} items={[
                      {value: '1', text: T.translate("notarization.yes")},
                      {value: '0', text: T.translate("notarization.no"), defaultChecked: true},
                    ]}/>
                  </section>
                  <section>
                    <span>{T.translate("notarization.entrust")}</span>
                    <RowRadios file={delegate} items={[
                      {value: '1', text: T.translate("notarization.yes"), defaultChecked: true},
                      {value: '0', text: T.translate("notarization.no")},
                    ]}/>
                  </section>
                  <section className="notaryFee">
                    <span>出证费用</span>
                    <div>
                      <p><span>888</span>元/次</p>
                      <span>{T.translate("notarization.tip")}</span>
                    </div>
                  </section>
                </article>
              </div>
              <div className="options">
                <button className="blueButton edit">{T.translate("notarization.submit")}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
;
