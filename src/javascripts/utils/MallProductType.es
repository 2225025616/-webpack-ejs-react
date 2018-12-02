export default class MallProductType {
  static evidence = 'URLATTESTATION';
  static eContract = 'ECONTRACT';

  static getName = (type) => {
    switch (type) {
      case MallProductType.evidence:
        return '网页取证';
      case MallProductType.eContract:
        return '电子签约';
      default:
        return '';
    }
  }
}
