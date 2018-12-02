import React from "react";
import FileUtil from "../../utils/FileUtil";

export default ({fileName}) => {
  return <div className="file-type-icon">
    <div className="text">{FileUtil.extension(fileName)}</div>
  </div>
}
