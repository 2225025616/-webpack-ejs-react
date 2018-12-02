export default class IdUtil {
  static sameProduct(nextProps, props) {
    let nextProductId = IdUtil.productId(nextProps);
    let productId = IdUtil.productId(props);

    return nextProductId == productId;
  }

  static sameOrganization(nextProps, props) {
    let nextOrganizationId = IdUtil.organizationId(nextProps);
    let organizationId = IdUtil.organizationId(props);

    return nextOrganizationId == organizationId;
  }

  static templateId(props) {
    if (props && props.params) {
      return props.params.templateId;
    }
  }

  static operator(props, position) {
    if (props && props.location) {
      let pathname = location.pathname;
      let paths = pathname.split(/[\/\?]/);
      if (paths && paths[position]) {
        return paths[position];
      }
    }
  }

  static attestationId(props) {
    if (props && props.params) {
      return props.params.attestationId;
    }
  }

  static collectCode(props) {
    if (props && props.params) {
      return props.params.collectCode;
    }
  }

  static organizationId(props) {
    if (props && props.params) {
      return props.params.organizationId;
    }
  }

  static productId(props) {
    if (props && props.params) {
      return props.params.productId;
    }
  }

  static userId(props) {
    if (props && props.params) {
      return props.params.userId;
    }
  }

  static signatureId(props) {
    if (props && props.params) {
      return props.params.signatureId;
    }
  }
  
  static newsId(props) {
    if (props && props.params) {
      return props.params.newsId;
    }
  }

  static packageId(props) {
    if (props && props.params) {
      return props.params.packageId;
    }
  }
}
