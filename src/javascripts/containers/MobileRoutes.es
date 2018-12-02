import Mobile from "./Mobile";
import requireAuth from "./requireAuthMobile";
import MarketingMobPage from "../components/mobile/MarketingMobPage.es";

// Hook for server
if (typeof require.ensure !== 'function') {
  require.ensure = function (dependencies, callback) {
    callback(require)
  }
}

const MobileRoutes = [
  {
    path: '/',
    component: Mobile,
    indexRoute: {
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          const factory = [], module = require('../components/mobile/Home');
          let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
          cb(null, moduleF);
        }, 'Home')
      }
    },
    childRoutes: [
      {
        path: 'marketing/mobile',
        getComponent: (nextState, cb) => {
          require.ensure([], require => {
            const factory = [], module = require('../components/mobile/MarketingMobPage');
            let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
            cb(null, moduleF);
          }, 'MarketingMobPage')
        }
      },
      {
        path: 'mobile',
        indexRoute: {
          getComponent: (nextState, cb) => {
            require.ensure([], require => {
              const factory = [], module = require('../components/mobile/Home');
              let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
              cb(null, moduleF);
            }, 'Home')
          }
        },
        childRoutes: [
          {
            path: 'marketing',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/MarketingMobPage');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'MarketingMobPage')
            }
          },
          {
            path: 'sign-in',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/user/SignIn');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignIn')
            }
          },
          {
            path: 'sign-up',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/user/SignUp');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignUp')
            }
          },
          {
            path: 'password',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/user/PasswordReset');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'PasswordReset')
            }
          },
          {
            path: 'tos',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/user/Tos');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Tos')
            }
          },
          {
            path: 'settings',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/user/AccountSettings');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Settings')
            }
          },
          {
            path: 'balance',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/user/Balance');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Balance')
            }
          },
          {
            path: 'certification',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/user/Certification');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Certification')
            }
          },
          {
            path: 'email-bound',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/user/EmailBound');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'EmailBound')
            }
          },
          {
            path: 'messages',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/user/Messages');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Messages')
            }
          },
          {
            path: 'recharge',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/user/Recharge');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Recharge')
            }
          },
          {
            path: 'production/baoquan-visa',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/production/BaoquanVisa');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'BaoquanVisa')
            }
          },
          // {
          //   path: 'production/credit-records',
          //   getComponent: (nextState, cb) => {
          //     require.ensure([], require => {
          //       const factory = [], module = require('../components/mobile/production/CreditRecords');
          //       let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
          //       cb(null, moduleF);
          //     }, 'CreditRecords')
          //   }
          // },
          {
            path: 'production/electronic-certificate',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/production/ElectronicCertificate');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'ElectronicCertificate')
            }
          },
          // {
          //   path: 'production/privatisation-deployment',
          //   getComponent: (nextState, cb) => {
          //     require.ensure([], require => {
          //       const factory = [], module = require('../components/mobile/production/PrivatisationDeployment');
          //       let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
          //       cb(null, moduleF);
          //     }, 'PrivatisationDeployment')
          //   }
          // },
          {
            path: 'production/forensic',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/production/Forensic');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Forensic')
            }
          },
          {
            path: 'attestations/list',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/attestation/Attestations');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Attestations')
            }
          },
          {
            path: 'attestations/:attestationId',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/attestation/Attestation');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Attestation')
            }
          },
          {
            path: 'mall',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/mall/Mall');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Mall')
            }
          },
          {
            path: 'notaries/list',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/attestation/Notaries');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Notaries')
            }
          },
          {
            path: 'notaries/add',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/attestation/Notary');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Notary')
            }
          },
          {
            path: 'notaries/:collectCode',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/attestation/Notary');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Notary')
            }
          },
          {
            path: 'notaries/:collectCode/edit',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/attestation/Notary');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Notary')
            }
          },
          {
            path: 'signatures/profile',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/signatures/SignatureProfile');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignatureProfile')
            }
          },
          {
            path: 'signatures/list',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/signatures/SignatureList');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignatureList')
            }
          },
          {
            path: 'signatures/members',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/signatures/SignatureMember');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignatureMember')
            }
          },
          {
            path: 'signatures/members/add',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/signatures/SignatureMemberEdit');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignatureMemberEdit')
            }
          },
          {
            path: 'signatures/members/:id/edit',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/signatures/SignatureMemberEdit');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignatureMemberEdit')
            }
          },
          {
            path: 'signatures/seals',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/signatures/SignatureSeal');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignatureSeal')
            }
          },
          {
            path: 'signatures/seals/add',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/signatures/SignatureSealAdd');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignatureSealAdd')
            }
          },
          {
            path: 'signatures/:id',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/signatures/SignatureInfo');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignatureInfo')
            }
          },
          {
            path: 'signatures/:id/sign',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [requireAuth], module = require('../components/mobile/signatures/SignatureSign');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'SignatureSign')
            }
          },
          {
            path: 'news-list',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/news/NewsList');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'NewsList')
            }
          },
          {
            path: 'news/:id',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/news/News');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'News')
            }
          },
          {
            path: 'order-list',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/order/OrderList');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'OrderList')
            }
          },
          {
            path: 'order/:id',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/order/Order');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Order')
            }
          },
          {
            path: 'order/:id/paid',
            getComponent: (nextState, cb) => {
              require.ensure([], require => {
                const factory = [], module = require('../components/mobile/order/Order');
                let moduleF = factory.reduce((prev, fac) => fac(prev), module.default || module);
                cb(null, moduleF);
              }, 'Order')
            }
          },
        ]
      },
    ]
  }
];

export default MobileRoutes;