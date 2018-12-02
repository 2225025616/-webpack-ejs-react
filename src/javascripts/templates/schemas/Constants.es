var Constants = {
  constraints: {
    cni: { name: '身份证', pattern: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/ },
    passport: { name: '护照', pattern: /^(P\d{7}|G\d{8}|S\d{7,8}|D\d+|1[4,5]\d{7})$/ },
    orgcode: { name: '组织代码', pattern: '^([0-9a-z]){8}-[0-9|x]$' },
    timestamp: { name: '时间戳', pattern: '/^(?<year>-?(?:[1-9][0-9]*)?[0-9]{4})-(?<month>1[0-2]|0[1-9])-(?<day>3[01]|0[1-9]|[12][0-9])T(?<hour>2[0-3]|[01][0-9]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9])(?<ms>\.[0-9]+)?(?<timezone>Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$/' },
    phone: { name: '电话号码', pattern: '/\d{2}[\s\d-]{5,}/' },
    mobile: { name: '手机', pattern: '/^\d{11}?$/' },
    email: { name: 'Email', pattern: '/\S+@\S+\.\S+/' },
    propertycode: { name: '房产证号', pattern: '/\S+/' }
  },

  constraints2options: function () {
    return Object.keys(Constants.constraints).map(function(key) { return {name: Constants.constraints[key].name, value: key } });
  },

  constraints2patterns: function(name) {
    var constraint = Constants.constraints[name];
    if(constraint){ return constraint.pattern };
  }
};

export default Constants;
