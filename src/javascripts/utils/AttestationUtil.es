import Api from "./Api";

export default class AttestationUtil {
  static getDownloadUrl(attestation, sandbox) {
    let params = "?token=" + attestation.token;
    if (sandbox === "true") {
      params += "&sandbox=true";
    }

    return Api.getEndpoint(`/attestations/${attestation.id}/download${params}`);
  }

  static getSignDownloadUrl(signature) {
    let params = "?token=" + signature.token;

    return Api.getEndpoint(`/signatures/down/${signature.id}${params}`);
  }

  static viewSignature(signature) {
    let params = "?token=" + signature.token;

    return Api.getEndpoint(`/signatures/view/${signature.id}${params}`);
  }

  static viewBlockDoc(block) {
    let params = "?token=" + block.token;

    return Api.getEndpoint(`/chainDoc/${block.id}${params}`);
  }
}