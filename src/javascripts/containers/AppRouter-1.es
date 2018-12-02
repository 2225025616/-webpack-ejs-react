import React, { Component } from "react";
import { IndexRoute, Route, RouterContext } from "react-router";
import { ReduxRouter } from "redux-router";
import { useScroll } from "react-router-scroll";
import App from "./App";
import requireAuth from "./requireAuth";
import UserLoginForm from "../components/users/UserLoginForm";
import UserRegistryForm from "../components/users/UserRegistryForm";
import UserResetPasswordForm from "../components/users/UserResetPasswordForm";
import UserAttestations from "../components/users/UserAttestations";
import UserUploadAttestation from "../components/users/UserUploadAttestation";
import Pay from "../components/users/Pay";
import PayResult from "../components/users/PayResult";
import OrderManagement from "../components/users/Management";
import AttestationSummary from "../components/attestations/AttestationSummary";
import Attestations from "../components/attestations/Attestations";
import Hint from "../components/users/Hint";
import Sidebar from "../components/commons/Sidebar";
import ErrorPage from "../components/commons/ErrorPage";
import Tos from "../components/commons/Tos";
import BaseNotary from "../components/commons/BaseNotary";
import NotaryDetails from "../components/commons/NotaryDetails";
import NewProduct from "../components/products/NewProduct";
import ProductList from "../components/products/ProductList";
import ProductOverview from "../components/products/ProductOverview";
import ProductNotary from "../components/products/ProductNotary";
import ProductNotaryDetails from "../components/products/ProductNotaryDetails";
import ApiKey from "../components/members/ApiKey";
import Management from "../components/members/Management";
import UserProfile from "../components/users/UserProfile";
import UserAuthentication from "../components/users/UserAuthentication";
import Setting from "../components/users/Setting";
import OrganizationProfile from "../components/members/OrganizationProfile";
import Member from "../components/members/Member";
import Help from "../components/members/Help";
import Attestation from "../components/attestations/Attestation";
import Notification from "../components/commons/Notification";
import Notary from "../components/notaries/Notary";
import NotaryList from "../components/notaries/NotaryList";
import Notarized from "../components/notaries/Notarized";
import Notarization from "../components/notarization/Notarization";
import ProductNotarization from "../components/notarization/ProductNotarization";
import member from "./member";
import head from "./head";
import notary from "./notary";
import OrganizationKyc from "../components/members/OrganizationKyc";
import Evidences from "../components/evidence/Evidences";
import Home from "../components/website-show/home/Home";
import MarketingPage from "../components/website-show/marketing";
import ProductionsList from "../components/website-show/production/ProductionsList";
import ElectronicCertificate from "../components/website-show/production/ElectronicCertificate";
import BaoquanVisa from "../components/website-show/production/BaoquanVisa";
import CreditRecords from "../components/website-show/production/CreditRecords";
import ServicesList from "../components/website-show/service/ServicesList";
import Forensic from "../components/website-show/service/Forensic";
import PrivatisationDeployment from "../components/website-show/service/PrivatisationDeployment";
import FinanceSolution from "../components/website-show/solution/FinanceSolution";
import BigDataTradeSolution from "../components/website-show/solution/BigDataTradeSolution";
import IntellectualPropertySolution from "../components/website-show/solution/IntellectualPropertySolution";
import EGovernmentAffairSolution from "../components/website-show/solution/EGovernmentAffairSolution";
import SecurityTraceabilitySolution from "../components/website-show/solution/SecurityTraceabilitySolution";
import PublicBenefitSolution from "../components/website-show/solution/PublicBenefitSolution";
import PointSolution from "../components/website-show/solution/PointSolution";
import AboutUs from "../components/website-show/others/AboutUs";
import Contact from "../components/website-show/others/Contact";
import IndustryNews from "../components/website-show/others/IndustryNews";
import News from "../components/website-show/others/News";
import MediaReports from "../components/website-show/others/MediaReports";
import BlockDocuments from "../components/website-show/others/BlockDocuments";
import BlockDocument from "../components/website-show/others/BlockDocument";
import Query from "../components/website-show/others/Query";
import Dashboard from "../components/website-show/others/Dashboard";
import MarketingMobPage from "../components/website-show/marketing-mob";
import HelpDocument from "../components/website-show/help-document/HelpDocument";
import DengBao from "../components/website-show/others/DengBao";
import SignatureProfile from "../components/signature/SignatureProfile";
import SignatureInfo from "../components/signature/SignatureInfo";
import SignatureAddSeal from "../components/signature/SignatureAddSeal";
import SignatureMember from "../components/signature/SignatureMember";
import Signatures from "../components/signature/Signatures";
import SignatureDetail from "../components/signature/SignatureDetail";
import SignatureOfficialSeal from "../components/signature/SignatureOfficialSeal";
import CFCA from "../components/website-show/CFCA";
import Mall from "../components/mall/Mall.es";
import Order from "../components/users/Order.es";
import OrderPay from "../components/users/OrderPay.es";
import OrgAttestationCount from "../components/attestations/OrgAttestationCount.es";
import AttestationProfile from "../components/attestations/AttestationProfile.es";
// import EvidenceDetail from "../components/evidence/EvidenceDetail";

const RoutingContext = (props) => {
  return useScroll().renderRouterContext(<RouterContext {...props}/>, props)
};

export default class AppRouter extends Component {
  render() {
    return <ReduxRouter RoutingContext={RoutingContext}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="home" component={Home}/>
        <Route path="production/list" component={ProductionsList}/>
        <Route path="production/electronic-certificate" component={ElectronicCertificate}/>
        <Route path="production/baoquan-visa" component={BaoquanVisa}/>
        <Route path="production/credit-records" component={CreditRecords}/>
        <Route path="service/list" component={ServicesList}/>
        <Route path="service/forensic" component={Forensic}/>
        <Route path="service/privatisation-deployment" component={PrivatisationDeployment}/>

        <Route path="solution/finance" component={FinanceSolution}/>
        <Route path="solution/big-data-trade" component={BigDataTradeSolution}/>
        <Route path="solution/intellectual-property" component={IntellectualPropertySolution}/>
        <Route path="solution/e-government-affair" component={EGovernmentAffairSolution}/>
        <Route path="solution/security-traceability" component={SecurityTraceabilitySolution}/>
        <Route path="solution/public-benefit" component={PublicBenefitSolution}/>
        <Route path="solution/point" component={PointSolution}/>

        <Route path="other/about-us" component={AboutUs}/>
        <Route path="other/contact" component={Contact}/>
        <Route path="other/industry-news" component={IndustryNews}/>
        <Route path="other/industry-news/:newsId" component={News}/>
        <Route path="other/media-reports" component={MediaReports}/>
        <Route path="other/media-reports/:newsId" component={News}/>
        <Route path="other/block-documents" component={BlockDocuments}/>
        <Route path="other/block-documents/:documentId" component={BlockDocument}/>
        <Route path="other/query" component={Query}/>
        <Route path="other/dashboard" component={Dashboard}/>
        <Route path="other/dengbao" component={DengBao}/>
        <Route path="other/help-document" component={HelpDocument}/>

        <Route path="test" component={Sidebar}/>
        <Route path="marketing" component={MarketingPage}/>
        <Route path="marketing/mobile" component={MarketingMobPage}/>
        <Route path="CFCA" component={CFCA}/>
        <Route path="sign-up" component={UserRegistryForm}/>
        <Route path="sign-in" component={UserLoginForm}/>
        <Route path="sign-up/hint" component={Hint}/>
        <Route path="reset-password" component={UserResetPasswordForm}/>
        <Route path="tos" component={head(Tos)}/>
        <Route path="error" component={requireAuth(head(ErrorPage))}/>
        <Route path="console" component={requireAuth(head(member(AttestationSummary)))}/>

        <Route path="order-management" component={member(OrderManagement)}/>
        <Route path="help" component={requireAuth(member(Help))}/>
        {/*  <Route path="kyc" component={requireAuth(member(UserKycForm))}/>  */}
        <Route path="notaries" component={requireAuth(member(BaseNotary))}/>
        <Route path="notaries/:collectCode" component={requireAuth(member(NotaryDetails))}/>
        <Route path="notifications" component={requireAuth(member(Notification))}/>
        <Route path="profile" component={requireAuth(member(UserProfile))}/>
        <Route path="user-kyc" component={requireAuth(member(UserAuthentication))}/>
        <Route path="setting" component={requireAuth(member(Setting))}/>
        <Route path="pay" component={requireAuth(member(Pay))}/>
        <Route path="pay/result" component={requireAuth(member(PayResult))}/>
        <Route path="order/:id" component={requireAuth(member(Order))}/>
        <Route path="order/:id/pay" component={OrderPay}/>
        <Route path="recharge/pay" component={OrderPay}/>

        <Route path="mall" component={requireAuth(member(Mall))}/>

        <Route path="attestations/by-product/:productId" component={requireAuth(member(UserAttestations))}/>
        <Route path="attestations/summary" component={requireAuth(member(AttestationSummary))}/>
        <Route path="attestations" component={requireAuth(member(Attestations))}/>
        <Route path="attestations/upload" component={requireAuth(member(UserUploadAttestation))}/>
        <Route path="attestations/:attestationId" component={head(Attestation)}/>

        <Route path="products/over-view/:productId" component={requireAuth(member(ProductOverview))}/>
        <Route path="products/:productId/notaries" component={requireAuth(member(ProductNotary))}/>
        <Route path="products/new" component={requireAuth(member(NewProduct))}/>
        <Route path="products/:productId/notarization" component={requireAuth(member(ProductNotarization))}/>
        <Route path="products/:productId/notarization/:collectCode/edit"
               component={requireAuth(member(ProductNotarization))}/>
        <Route path="products" component={requireAuth(member(ProductList))}/>
        <Route path="products/:productId/notaries/:collectCode" component={requireAuth(member(ProductNotaryDetails))}/>

        <Route path="org-attestation/count" component={requireAuth(member(OrgAttestationCount))}/>
        <Route path="attestation/profile" component={requireAuth(member(AttestationProfile))}/>

        <Route path="organizations/:organizationId/api-keys" component={requireAuth(member(ApiKey))}/>
        <Route path="organizations/new" component={requireAuth(member(OrganizationProfile))}/>
        <Route path="organizations/:organizationId" component={requireAuth(member(OrganizationProfile))}/>
        <Route path="organizations/:organizationId/kyc" component={requireAuth(member(OrganizationKyc))}/>
        {/*  <Route path="organizations/:organizationId/kyc" component={requireAuth(member(Kyc))}/> */}
        <Route path="organizations/:organizationId/management" component={requireAuth(member(Management))}/>
        <Route path="organizations/:organizationId/members" component={requireAuth(member(Member))}/>

        <Route path="notary/public" component={requireAuth(notary(Notary))}/>
        <Route path="notary/public/list" component={requireAuth(notary(NotaryList))}/>
        <Route path="notary/notarized" component={requireAuth(notary(Notarized))}/>

        <Route path="notarization" component={requireAuth(member(Notarization))}/>
        <Route path="notarization/:collectCode/edit" component={requireAuth(member(Notarization))}/>
        <Route path="evidences" component={requireAuth(member(Evidences))}/>

        <Route path="signatures/profile" component={requireAuth(member(SignatureProfile))}/>
        <Route path="signatures/:signatureId/info" component={requireAuth(member(SignatureInfo))}/>
        <Route path="signatures/:signatureId/add-seal" component={requireAuth(member(SignatureAddSeal))}/>
        <Route path="signatures/member" component={requireAuth(member(SignatureMember))}/>
        <Route path="signatures/official-seal" component={requireAuth(member(SignatureOfficialSeal))}/>
        <Route path="signatures" component={requireAuth(member(Signatures))}/>
        <Route path="signatures/:signatureId" component={requireAuth(member(SignatureDetail))}/>
      </Route>
    </ReduxRouter>;
  }
}
