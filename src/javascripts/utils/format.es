export default class format {

  static fmoney(money) {
    let n = 2;
    money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = money.split(".")[0].split("").reverse(),
      r = money.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }

  static fcount(count) {
    count = parseFloat((count + "").replace(/[^\d\.-]/g, "")) + "";
    let l = count.split(".")[0].split("").reverse();
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }
    return t.split("").reverse().join("");
  }

  static fBytes(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024;
    let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    let num = bytes / Math.pow(k, i);
    return num.toPrecision(3) + ' ' + sizes[i];
  }
  
  static fBytesUnit(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024;
    let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    let num = bytes / Math.pow(k, i);
    return {num:num.toPrecision(3),unit:sizes[i]};
  }

  static fSizeMb(bytes) {
    if (bytes === 0) return 0;
    var k = 1024*1024;
    let num = bytes /k;
    return parseFloat(num.toFixed(3));
  };

  static fSizeGb(bytes) {
    if (bytes === 0) return '0';
    var k = 1024*1024*1024;
    let num = bytes /k;
    return parseFloat(num.toFixed(3));
  };
}
