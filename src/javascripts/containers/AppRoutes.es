import requireAuth from "./requireAuth";
import requireUserAuth from "./requireUserAuth";
import requireOrgAuth from "./requireOrgAuth";
import requireOrgChildrenAuth from "./requireOrgChildrenAuth";
import requireCommonPageAuth from "./requireCommonPageAuth";
import member from "./member";//无sidebar
import orgSignMember from "./orgSignMember";//企业签约sidebar
import settingMember from "./settingMember";//帐号管理sidebar
import orgAttestationMember from "./orgAttestationMember";//企业保全sidebar
import head from "./head";
import notary from "./notary";
import App from "./App";

// Hook for server
if (typeof require.ensure !== 'function') {
  require.ensure = function (dependencies, callback) {
    callback(require)
  }
}

const AppRoutes = [
  {
    path: '/',
    component: App,
    indexRoute: {
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          const factory = [], module = require('../components/website-show/home/Home');
          let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
          cb(null, moduleF);
        }, 'Home')
      }
    },
    childRoutes: [
      {
        path: 'home',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/home/Home');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Home')
        }
      },
      {
        path: 'marketing',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/marketing');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'marketing')
        }
      },
      {
        path: 'CFCA',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/CFCA');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'CFCA')
        }
      },
      {
        path: 'production/list',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/production/ProductionsList');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ProductionList')
        }
      },
      {
        path: 'production/electronic-certificate',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/production/ElectronicCertificate');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ElectronicCertificate')
        }
      },
      {
        path: 'production/baoquan-visa',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/production/BaoquanVisa');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'BaoquanVisa')
        }
      },
      {
        path: 'production/web-forensics',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/production/WebForensics');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'WebForensics')
        }
      },
      {
        path: 'production/credit-records',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/production/CreditRecords');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'CreditRecords')
        }
      },
      {
        path: 'service/list',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/service/ServicesList');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ServicesList')
        }
      },
      {
        path: 'service/forensic',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/service/Forensic');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Forensic')
        }
      },
      {
        path: 'service/privatisation-deployment',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/service/PrivatisationDeployment');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'PrivatisationDeployment')
        }
      },
      {
        path: 'solution/finance',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/solution/FinanceSolution');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'FinanceSolution')
        }
      },
      {
        path: 'solution/big-data-trade',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/solution/BigDataTradeSolution');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'BigDataTradeSolution')
        }
      },
      {
        path: 'solution/intellectual-property',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/solution/IntellectualPropertySolution');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'IntellectualPropertySolution')
        }
      },
      {
        path: 'solution/e-government-affair',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/solution/EGovernmentAffairSolution');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'EGovernmentAffairSolution')
        }
      },
      {
        path: 'solution/security-traceability',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/solution/SecurityTraceabilitySolution');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'SecurityTraceabilitySolution')
        }
      },
      {
        path: 'solution/public-benefit',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/solution/PublicBenefitSolution');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'PublicBenefitSolution')
        }
      },
      {
        path: 'solution/point',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/solution/PointSolution');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'PointSolution')
        }
      },
      {
        path: 'other/about-us',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/AboutUs');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'AboutUs')
        }
      },
      {
        path: 'other/contact',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/Contact');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Contact')
        }
      },
      {
        path: 'other/industry-news',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/IndustryNews');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'IndustryNews')
        }
      },
      {
        path: 'other/industry-news/:newsId',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/News');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'News')
        }
      },
      {
        path: 'other/media-reports/:newsId',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/News');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'News')
        }
      },
      {
        path: 'other/media-reports',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/MediaReports');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'MediaReports')
        }
      },
      {
        path: 'other/block-documents',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/BlockDocuments');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'BlockDocuments')
        }
      },
      {
        path: 'other/block-documents/:documentId',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/BlockDocument');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'BlockDocument')
        }
      },
      {
        path: 'other/query',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/Query');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Query')
        }
      },
      {
        path: 'other/dashboard',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/Dashboard');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Dashboard')
        }
      },
      {
        path: 'other/help-document',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/help-document/HelpDocument');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'HelpDocument')
        }
      },
      {
        path: 'other/dengbao',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/website-show/others/DengBao');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'DengBao')
        }
      },
      {
        path: 'sign-in',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/users/UserLoginForm');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'UserLoginForm')
        }
      },
      {
        path: 'sign-up/:per',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/users/UserRegistryForm');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'UserRegistryForm')
        }
      },
      {
        path: 'kyc',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/users/UserKycForm');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'UserKycForm')
        }
      },
      {
        path: 'reset-password/:per',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/users/UserResetPasswordForm');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'UserResetPasswordForm')
        }
      },
      {
        path: 'pay',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/users/Pay');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Pay')
        }
      },
      {
        path: 'pay/result',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/users/PayResult');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'PayResult')
        }
      },
      {
        path: 'order/:id',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/users/Order');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Order')
        }
      },
      {
        path: 'order/:id/pay',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/users/OrderPay');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'OrderPay')
        }
      },
      {
        path: 'recharge/pay',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/users/OrderPay');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'OrderPay')
        }
      },
      {
        path: 'mall',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/mall/Mall');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Mall')
        }
      },
      {//账单 没用了
        path: 'trade/records',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/users/TradeRecords');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'TradeRecords')
        }
      },
      {
        path: 'sign-up/hint',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/users/Hint');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Hint')
        }
      },
      {//好像没用了
        path: 'test',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/commons/Sidebar');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Sidebar')
        }
      },
      {//404
        path: 'error',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/commons/ErrorPage');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ErrorPage')
        }
      },
      {
        path: 'tos',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [head], module = require('../components/commons/Tos');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Tos')
        }
      },
/*      {
        path: 'console',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth],
              module = require('../components/attestations/AttestationSummary');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'AttestationSummary')
        }
      },*/
/*      {
        path: 'profile',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/users/UserProfile');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'UserProfile')
        }
      },*/
      {
        path: 'order-management',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth], module = require('../components/users/Management');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'OrderManagement')
        }
      },
      {
        path: 'setting',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth], module = require('../components/users/Setting');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Setting')
        }
      },
      {
        path: 'user-kyc',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/users/UserAuthentication');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'UserAuthentication')
        }
      },
      {
        path: 'attestations',//个人原创保全
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth, requireUserAuth], module = require('../components/attestations/Attestations');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Attestations')
        }
      },
      {
        path: 'org-attestations/list',//企业原创保全
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [orgAttestationMember, requireAuth, requireOrgAuth], module = require('../components/attestations/Attestations');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Attestations')
        }
      },
      {
        path: 'org-attestations',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth, requireOrgAuth], module = require('../components/attestations/OrgAttestations');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Attestations')
        }
      },
/*      {
        path: 'attestation/profile',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/attestations/AttestationProfile');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'AttestationProfile')
        }
      },*/
      {
        path: 'attestations/by-product/:productId',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/users/UserAttestations');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'UserAttestations')
        }
      },
/*      {
        path: 'attestations/upload',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/users/UserUploadAttestation');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'UserUploadAttestation')
        }
      },*/
/*      {
        path: 'attestations/summary',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/attestations/AttestationSummary');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'AttestationSummary')
        }
      },*/
      {
        path: 'attestations/:attestationId',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [head], module = require('../components/attestations/Attestation');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Attestation')
        }
      },
      {
        path: 'org-attestation/count',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [orgAttestationMember, requireAuth, requireOrgChildrenAuth], module = require('../components/attestations/OrgAttestationCount');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'OrgAttestationCount')
        }
      },
/*      {
        path: 'products',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/products/ProductList');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ProductList')
        }
      },*/
      {
        path: 'products/new',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth, requireOrgChildrenAuth], module = require('../components/products/NewProduct');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'NewProduct')
        }
      },
      {
        path: 'products/over-view/:productId',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth, requireOrgChildrenAuth], module = require('../components/products/ProductOverview');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ProductOverview')
        }
      },
/*      {
        path: 'products/:productId/attestations',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/products/ProductAttestations');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ProductAttestations')
        }
      },*/
      {
        path: 'products/:productId/notaries',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/products/ProductNotary');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ProductNotary')
        }
      },
      {
        path: 'products/:productId/notarization',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/notarization/ProductNotarization');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ProductNotarization')
        }
      },
      {
        path: 'products/:productId/notarization/:collectCode/edit',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/notarization/ProductNotarization');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ProductNotarization')
        }
      },
      {
        path: 'products/:productId/notaries/:collectCode',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/products/ProductNotaryDetails');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ProductNotaryDetails')
        }
      },
      {
        path: 'organizations/:organizationId/api-keys',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/members/ApiKey');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'ApiKey')
        }
      },
      {
        path: 'organizations/new',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/members/OrganizationProfile');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'OrganizationProfile')
        }
      },
/*      {//创建企业页面，以后没用
        path: 'organizations/:organizationId',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/members/OrganizationProfile');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'OrganizationProfile')
        }
      },*/
      /*{
       path: 'organizations/:organizationId/kyc',
       getComponent: (nextState, cb) => {
       require.ensure([], require => {
       const factory = [member, requireAuth], module = require('../components/members/Kyc');
       let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
       cb(null, moduleF);
       }, 'Kyc')
       }
       },*/
      {
        path: 'organizations/:organizationId/kyc',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/members/OrganizationKyc');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'OrganizationKyc')
        }
      },
      {
        path: 'organizations/:organizationId/orgKeyManagement',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth, requireOrgAuth], module = require('../components/members/orgKeyManagement');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'orgKeyManagement')
        }
      },
      {
        path: 'organizations/:organizationId/orgMemberManagement',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth, requireOrgAuth], module = require('../components/members/orgMemberManagement');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'orgMemberManagement')
        }
      },
      {
        path: 'organizations/:organizationId/members',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/members/Member');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Member')
        }
      },
      {
        path: 'organizations/:organizationId/callback',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/members/Callback');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Callback')
        }
      },
/*      {我的出证列表暂时隐藏
        path: 'notaries',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth], module = require('../components/commons/BaseNotary');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'BaseNotary')
        }
      },*/
      {
        path: 'notaries/:collectCode',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/commons/NotaryDetails');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'NotaryDetails')
        }
      },
      {
        path: 'notifications',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth], module = require('../components/commons/Notification');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Notification')
        }
      },
      {
        path: 'notary/public',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [notary, requireAuth], module = require('../components/notaries/Notary');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Notary')
        }
      },
      {
        path: 'notary/public/list',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [notary, requireAuth], module = require('../components/notaries/NotaryList');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'NotaryList')
        }
      },
      {
        path: 'notary/notarized',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [notary, requireAuth], module = require('../components/notaries/Notarized');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Notarized')
        }
      },
      {
        path: 'notarization',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/notarization/Notarization');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Notarization')
        }
      },
      {
        path: 'notarization/:collectCode/edit',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth], module = require('../components/notarization/Notarization');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Notarization')
        }
      },
      {
        path: 'evidences',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth, requireCommonPageAuth], module = require('../components/evidence/Evidences');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Evidences')
        }
      },
      {
        path: 'evidences/lists',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth, requireCommonPageAuth], module = require('../components/evidence/EvidenceDetail');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'EvidenceDetail')
        }
      },
      {
        path: 'signatures', //企业合同管理
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [orgSignMember, requireAuth, requireOrgChildrenAuth], module = require('../components/signature/Signatures');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Signatures')
        }
      },
      {
        path: 'signatures/personal', //个人合同管理
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth, requireUserAuth], module = require('../components/signature/Signatures');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'Signatures')
        }
      },
      /* {4.0上线暂时先隐藏起来！！！！之后需要的！！！！！！！！
       path: 'signatures/profile',
       getComponent: (nextState, cb) => {
         require.ensure([], require => {
           const factory = [orgSignMember, requireAuth, requireOrgChildrenAuth], module = require('../components/signature/SignatureProfile');
           let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
           cb(null, moduleF);
         }, 'SignatureProfile')
       }
     },
     {
       path: 'signatures/:signatureId/info',
       getComponent: (nextState, cb) => {
         require.ensure([], require => {
           const factory = [orgSignMember, requireAuth], module = require('../components/signature/SignatureInfo');
           let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
           cb(null, moduleF);
         }, 'SignatureInfo')
       }
     },
     {
       path: 'signatures/:signatureId/add-seal',
       getComponent: (nextState, cb) => {
         require.ensure([], require => {
           const factory = [orgSignMember, requireAuth], module = require('../components/signature/SignatureAddSeal');
           let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
           cb(null, moduleF);
         }, 'SignatureAddSeal')
       }
     },
     {
       path: 'signatures/member',
       getComponent: (nextState, cb) => {
         require.ensure([], require => {
           const factory = [orgSignMember, requireAuth, requireOrgChildrenAuth], module = require('../components/signature/SignatureMember');
           let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
           cb(null, moduleF);
         }, 'SignatureMember')
       }
     },*/
      {
        path: 'signatures/official-seal',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [orgSignMember, requireAuth, requireOrgChildrenAuth], module = require('../components/signature/SignatureOfficialSeal');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'SignatureOfficialSeal')
        }
      },
      {
        path: 'signatures/authorize',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth, requireUserAuth], module = require('../components/signature/signatureAuthorize');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'signatureAuthorize')
        }
      },
      {
        path: 'signatures/:signatureId',//企业合同详情 之后加权限判断
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [orgSignMember, requireAuth], module = require('../components/signature/SignatureDetail');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'SignatureDetail')
        }
      },
      {
        path: 'signatures/personal/:signatureId',//个人合同详情 之后加权限判断
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [settingMember, requireAuth], module = require('../components/signature/SignatureDetail');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'SignatureDetail')
        }
      },
      {
        path: 'org-sign',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [orgSignMember, requireAuth, requireOrgChildrenAuth], module = require('../components/signature/EnterpriseSign');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'EnterpriseSign')
        }
      },
      {
        path: 'org-statistic',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [member, requireAuth, requireOrgChildrenAuth], module = require('../components/attestations/OrgChart');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'OrgChart')
        }
      },
    ]
  }
];

export default AppRoutes;
