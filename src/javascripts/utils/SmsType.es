export default class SmsType {
  static Pay_URLATTESTATION = 'URLATTESTATION_PAY';
  static Pay_ECONTRACT = 'ECONTRACT_PAY';
  static Pay_NOTARY = 'NOTARY_PAY';
  static Register = 'REGISTER';
  static Pwd = 'FORGOT_PASSWORD';
  static EContract = 'ECONTRACT_SIGN';
  static Authentic = 'AUTHENTIC';
  static Login= 'LOGIN';
  static BIND_PHONE= 'BIND_PHONE';

  static getTypes = () => {
    let names = ['Pay_URLATTESTATION', 'Pay_ECONTRACT', 'Pay_NOTARY', 'Register', 'pwd', 'EContract', 'Authentic', 'LOGIN', 'BIND_PHONE'];
    return names.map(name => ({name, value: SmsType[name]}));
  }
}
