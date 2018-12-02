import React, {Component} from "react";

export default class IdentityUtil{
  static toString(identities) {
    let result = "";
    if (identities) {
      if (identities.MO)
        result += identities.MO + " ";

      if (identities.ID)
        result += identities.ID + " ";

      if(identities.USCID) {
        result += identities.USCID + " ";
      }
    }

    return result;
  }

}