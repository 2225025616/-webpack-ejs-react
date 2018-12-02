import React, { Component } from "react";
import { IndexRoute, Route } from "react-router";
import { ReduxRouter } from 'redux-router';
import adminAuth from './adminAuth';
import AdminRoute from '../components/admins/AdminRoute';
import Admin from "./Admin";

import AdminOrganizationKyc from "../components/admins/OrganizationKyc";
import AdminUserKyc from "../components/admins/UserKyc";
import AdminTemplates from "../components/admins/Templates";
import AdminUser from "../components/admins/AdminUser";
import NotaryUser from "../components/admins/NotaryUser";
import AdminApiRequest from "../components/admins/AdminApiRequest";
import AdminRegistryForm from "../components/admins/AdminRegistryForm";
import AdminLoginForm from "../components/admins/AdminLoginForm";
import ResetTemplateState from "../components/admins/ResetTemplateState";
import UserConsults from "../components/admins/UserConsults";
import WebManagement from "../components/admins/WebManagement";
import AddNews from "../components/admins/AddNews";
import AdminAttestations from "../components/admins/AdminAttestations";
import AdminSignatures from "../components/admins/AdminSignatures";
import DataCenter from "../components/admins/DataCenter";
import DataProducts from "../components/admins/DataProducts";
import GoChains from "../components/admins/GoChains";
import OrgSignAuthorize from "../components/admins/OrgSignAuthorize";
import Packages from "../components/admins/Packages";
import AddPackage from "../components/admins/NewPackage";
import OrgChainData from "../components/admins/OrgChainData";
import Dashboard from "../components/admins/Dashboard/Dashboard";

import AdminBar from "./AdminBar";

export default class AdminRouter extends Component {
  render() {
    let adminRoute = AdminRoute.adminRoute(); // URL 乱入英文
    return <ReduxRouter>
      <Route path="/" component={Admin}>
        <IndexRoute component={AdminLoginForm}/>

{/*        <Route path={`${adminRoute}/sign-up`} component={(AdminRegistryForm)}/> // admin端注册隐藏了*/}
        <Route path={`${adminRoute}/sign-in`} component={(AdminLoginForm)}/>

        <Route path={`${adminRoute}/user-kyc`} component={adminAuth(AdminBar(AdminUserKyc))}/>
        <Route path={`${adminRoute}/organization-kyc`} component={adminAuth(AdminBar(AdminOrganizationKyc))}/>
        <Route path={`${adminRoute}/templates`} component={adminAuth(AdminBar(AdminTemplates))}/>
        <Route path={`${adminRoute}/templates/reset-state`} component={adminAuth(AdminBar(ResetTemplateState))}/>
        <Route path={`${adminRoute}/users`} component={adminAuth(AdminBar(AdminUser))}/>
        <Route path={`${adminRoute}/notary-users`} component={adminAuth(AdminBar(NotaryUser))}/>
        <Route path={`${adminRoute}/api/request`} component={adminAuth(AdminBar(AdminApiRequest))}/>
        <Route path={`${adminRoute}/user/consults`} component={adminAuth(AdminBar(UserConsults))}/>
        <Route path={`${adminRoute}/web-management`} component={adminAuth(AdminBar(WebManagement))}/>
        <Route path={`${adminRoute}/news/new`} component={adminAuth(AdminBar(AddNews))}/>
        <Route path={`${adminRoute}/news/:newsId`} component={adminAuth(AdminBar(AddNews))}/>
        <Route path={`${adminRoute}/attestations`} component={adminAuth(AdminBar(AdminAttestations))}/>
        <Route path={`${adminRoute}/signatures`} component={adminAuth(AdminBar(AdminSignatures))}/>
        <Route path={`${adminRoute}/data-center`} component={adminAuth(AdminBar(DataCenter))}/>
        <Route path={`${adminRoute}/data-products`} component={adminAuth(AdminBar(DataProducts))}/>
        <Route path={`${adminRoute}/gochains`} component={adminAuth(AdminBar(GoChains))}/>
        <Route path={`${adminRoute}/org-sign-authorize`} component={adminAuth(AdminBar(OrgSignAuthorize))}/>
        <Route path={`${adminRoute}/packages`} component={adminAuth(AdminBar(Packages))}/>
        <Route path={`${adminRoute}/packages/new`} component={adminAuth(AdminBar(AddPackage))}/>
        <Route path={`${adminRoute}/packages/:packageId`} component={adminAuth(AdminBar(AddPackage))}/>
        <Route path={`${adminRoute}/org-chain-data`} component={adminAuth(AdminBar(OrgChainData))}/>
        <Route path={`${adminRoute}/dashboard`} component={adminAuth(AdminBar(Dashboard))}/>
      </Route>
    </ReduxRouter>;
  }
}
