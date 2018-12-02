export default class StorageUtil {

  static cleanProductId() {
    localStorage.removeItem("selectedProductId");
  }

  static productId(value) {
    if(value) {
      localStorage.setItem("selectedProductId", value);
    } else {
      value = localStorage.getItem("selectedProductId");
    }

    return value;
  }

  static organizationName(value) {
    if(value) {
      localStorage.setItem("selectedOrganizationName", value);
    } else {
      value = localStorage.getItem("selectedOrganizationName");
    }
    return value;
  }
  
  static cleanOrganizationName() {
    localStorage.removeItem("selectedOrganizationName");
  }

  static productName(value){
    if(value) {
      localStorage.setItem("selectedProductName", value);
    } else {
      value = localStorage.getItem("selectedProductName");
    }
    return value;
  }

  static cleanProductName() {
    localStorage.removeItem("selectedProductName");
  }


  static selectedAttestations(value) {
    if(value) {
      localStorage.setItem("selectedAttestations", JSON.stringify(value));
    } else {
      value = JSON.parse(localStorage.getItem("selectedAttestations"));
    }

    return value;
  }

  static collectCode(value) {
    if(value) {
      localStorage.setItem("selectedCollectCode", value);
    } else {
      value = localStorage.getItem("selectedCollectCode");
    }

    return value;
  }

  static cleanCollectCode() {
    localStorage.removeItem("selectedCollectCode");
  }

  static signatureId(value) {
    if(value) {
      localStorage.setItem("selectedSignatureId", value);
    } else {
      value = localStorage.getItem("selectedSignatureId");
    }

    return value;
  }

  static cleanSignatureId() {
    localStorage.removeItem("selectedSignatureId");
  }

  static showOrganization(value) {
    if(value) {
      localStorage.setItem("selectedShowOrganization", value);
    } else {
      value = localStorage.getItem("selectedShowOrganization");
    }
    return value;
  }

  static cleanShowOrganization() {
    localStorage.removeItem("selectedShowOrganization");
  }

  static showRsaCount(value) {
    if(value) {
      localStorage.setItem("selectedShowRsaCount", value);
    } else {
      value = localStorage.getItem("selectedShowRsaCount");
    }
    return value;
  }

  static cleanShowRsaCount() {
    localStorage.removeItem("selectedShowRsaCount");
  }
}