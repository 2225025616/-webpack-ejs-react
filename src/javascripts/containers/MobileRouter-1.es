import React, { Component } from "react";
import { IndexRoute, Route, RouterContext } from "react-router";
import { ReduxRouter } from "redux-router";
import { useScroll } from "react-router-scroll";

import Mobile from "./Mobile";
import Home from "../components/mobile/Home";
import BaoquanVisa from "../components/mobile/production/BaoquanVisa";
import CreditRecords from "../components/mobile/production/CreditRecords";
import ElectronicCertificate from "../components/mobile/production/ElectronicCertificate";
import PrivatisationDeployment from "../components/mobile/production/PrivatisationDeployment";
import Forensic from "../components/mobile/production/Forensic";

import NewsList from "../components/mobile/news/NewsList";
import News from "../components/mobile/news/News";

import SignIn from "../components/mobile/user/SignIn";
import SignUp from "../components/mobile/user/SignUp";
import PasswordReset from "../components/mobile/user/PasswordReset";
import Tos from "../components/mobile/user/Tos";
import AccountSettings from "../components/mobile/user/AccountSettings";
import Balance from "../components/mobile/user/Balance";
import Certification from "../components/mobile/user/Certification";
import EmailBound from "../components/mobile/user/EmailBound";
import Messages from "../components/mobile/user/Messages";
import Recharge from "../components/mobile/user/Recharge";

import Attestations from "../components/mobile/attestation/Attestations";
import Attestation from "../components/mobile/attestation/Attestation";

import Notaries from "../components/mobile/attestation/Notaries";
import Notary from "../components/mobile/attestation/Notary";

import SignatureProfile from "../components/mobile/signatures/SignatureProfile";
import SignatureInfo from "../components/mobile/signatures/SignatureInfo";
import SignatureSign from "../components/mobile/signatures/SignatureSign";
import SignatureMember from "../components/mobile/signatures/SignatureMember";
import SignatureMemberEdit from "../components/mobile/signatures/SignatureMemberEdit";
import SignatureSeal from "../components/mobile/signatures/SignatureSeal";
import SignatureSealAdd from "../components/mobile/signatures/SignatureSealAdd";
import SignatureList from "../components/mobile/signatures/SignatureList";
import OrderList from "../components/mobile/order/OrderList";
import Order from "../components/mobile/order/Order";
import Mall from "../components/mobile/mall/Mall.es";

const mobileRoute = 'mobile';

const RoutingContext = (props) => {
  return useScroll().renderRouterContext(<RouterContext {...props}/>, props)
};

export default class MobileRouter1 extends Component {
  render() {
    return <ReduxRouter RoutingContext={RoutingContext}>
      <Route path="/" component={Mobile}>
        <IndexRoute component={Home}/>
        <Route path={`${mobileRoute}`}>
          <IndexRoute component={Home}/>

          <Route path='sign-in' component={SignIn}/>
          <Route path='sign-up' component={SignUp}/>
          <Route path='password' component={PasswordReset}/>
          <Route path='tos' component={Tos}/>
          <Route path='settings' component={AccountSettings}/>
          <Route path='balance' component={Balance}/>
          <Route path='certification' component={Certification}/>
          <Route path='email-bound' component={EmailBound}/>
          <Route path='messages' component={Messages}/>
          <Route path='recharge' component={Recharge}/>

          <Route path='production/baoquan-visa' component={BaoquanVisa}/>
          <Route path='production/credit-records' component={CreditRecords}/>
          <Route path='production/electronic-certificate' component={ElectronicCertificate}/>
          <Route path='production/privatisation-deployment' component={PrivatisationDeployment}/>
          <Route path='production/forensic' component={Forensic}/>

          <Route path='attestations/list' component={Attestations}/>
          <Route path='attestations/:attestationId' component={Attestation}/>

          <Route path='mall' component={Mall}/>

          <Route path='notaries/list' component={Notaries}/>
          <Route path='notaries/add' component={Notary}/>
          <Route path='notaries/:collectCode' component={Notary}/>
          <Route path='notaries/:collectCode/edit' component={Notary}/>

          <Route path='signatures/profile' component={SignatureProfile}/>
          <Route path='signatures/list' component={SignatureList}/>
          <Route path='signatures/members' component={SignatureMember}/>
          <Route path='signatures/members/add' component={SignatureMemberEdit}/>
          <Route path='signatures/members/:id/edit' component={SignatureMemberEdit}/>
          <Route path='signatures/seals' component={SignatureSeal}/>
          <Route path='signatures/seals/add' component={SignatureSealAdd}/>
          <Route path='signatures/:id' component={SignatureInfo}/>
          <Route path='signatures/:id/sign' component={SignatureSign}/>

          <Route path='news-list' component={NewsList}/>
          <Route path='news/:id' component={News}/>

          <Route path='order-list' component={OrderList}/>
          <Route path='order/:id' component={Order}/>
          <Route path='order/:id/paid' component={Order}/>
        </Route>
      </Route>
    </ReduxRouter>;
  }
}
