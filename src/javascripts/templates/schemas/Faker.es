var StringUtil = require('../../lib/StringUtil');
var jsf = require('json-schema-faker');
var Formatter = require('../../lib/formatter');

jsf.extend('faker', (faker) => {
  faker.locale = 'zh_CN';

  faker.custom = {};
  faker.custom.attestation_no = function () {
    let TEMPLATE = 'xxxxxxxxxxxxxxx';
    let replacePlaceholder = (placeholder) => {
      let random = Math.random() * 16 | 0;
      return random.toString(16);
    };

    return TEMPLATE.replace(/x/g, replacePlaceholder).toUpperCase();
  };

  faker.custom.mobile_phone = function () {
    let TEMPLATE = 'xyyyyyyy';
    let prefixes = ["135", "136", "137", "138", "139", "185", "186", "187"];
    let replacePlaceholder = (placeholder) => {
      if (placeholder == 'x') {
        return prefixes[(Math.random() * prefixes.length | 0)];
      } else {
        return Math.random() * 9 | 0;
      }
    }

    return TEMPLATE.replace(/[xy]/g, replacePlaceholder);
  };

  faker.custom.phone = function () {
    let TEMPLATE = '0xxx-xxxxxxxx';
    let replacePlaceholder = (placeholder) => {
      return Math.random() * 9 | 0;
    }

    return TEMPLATE.replace(/x/g, replacePlaceholder);
  }

  faker.custom.id_card = function () {
    const lpad = StringUtil.lpad || StringUtil.default.lpad;
    const formatGet = Formatter.get || Formatter.default.get;
    var prov = lpad((Math.random() * 40 + 10) | 0, 2);
    var city = lpad(Math.random() * 20 | 0, 2);
    var area = lpad(Math.random() * 20 | 0, 2);
    var m = formatGet('yyyymmdd').format(faker.date.past(50));

    var n = lpad(Math.random() * 100 | 0, 3);

    return prov + city + area + m + n + 'X';
  }

  return faker;
})

export default jsf;
