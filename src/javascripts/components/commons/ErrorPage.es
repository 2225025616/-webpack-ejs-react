import React from "react";
import T from "i18n-react";

export default () =>
  <div className="error-page">
    <div className="header">
      <h1>{T.translate("common.no-page")}</h1>
      <p>404 Error - Not Found </p>
    </div>

    <div className="content">

    </div>

    <div className="footer">
      <p>© 2018 BaoQuan.com 浙ICP备15025396号-1</p>
    </div>
  </div>

;
