const env = require('./env');

function isAbsolute(path) {
  return path.startsWith("/");
}

function getAttributes(options) {
  var attributes = " ";

  if (options) {
    Object.keys(options).forEach(function (attr) {
      attributes += attr + "= '" + options[attr] + "'  "
    });
  }

  return attributes;
}

function getHashSrc(src) {
  var base = src.substring(src.lastIndexOf('/') + 1);
  var path = src.substring(0, src.lastIndexOf('/'));

  if (src.startsWith("/js")) {
    var gulpMap = require("./dist/javascript-manifest.json");
    if (gulpMap[base]) {
      return path + "/" + gulpMap[base];
    } else {
      return;
    }
  }

  if (src.startsWith("/bundle")) {
    var webpackMap = require("./dist/webpack-manifest.json");
    var ext = base.substring(base.indexOf(".") + 1);
    var prefix = base.substring(0, base.indexOf("."));
    if (webpackMap[prefix]) {
      return webpackMap[prefix][ext];
    } else {
      return;
    }
  }

  if (src.startsWith("/images")) {
    var imageMap = require("./dist/image-manifest.json");
    var url = imageMap[src.substring(1)];
    if (url)
      return "/" + url;
    else
      return url;
  }

  return src;
}

module.exports = {
  html_tag: function () {
    return '';
  },

  image_tag: function (src, options) {
    var source;
    if (isAbsolute(src)) {
      source = "/images" + src;
    } else {
      source = "/images/" + src;
    }

    if (process.env.NODE_ENV === "production") {
      source = getHashSrc(source);
    }

    if (source) {
      return "<img src='" + source + "' " + getAttributes(options) + " >";
    } else {
      return "";
    }
  },

  stylesheet_link_tag: function (src, options) {
    if (process.env.NODE_ENV === "production") {
      src = getHashSrc(src);
    }

    if (src)
      return "<link rel='stylesheet' href='" + src + "' " + getAttributes(options) + "/>"
  },

  javascript_tag: function (src, options) {
    if (process.env.NODE_ENV === "production") {
      src = getHashSrc(src);
    }

    if (src)
      return "<script src='" + src + "'></script>";
  },

  backend_javascript_tag: function (src, options) {
    if (src) {
      if (!src.startsWith('/')) {
        src = '/' + src;
      }

      return "<script src='" + env.wsRoot + src + "'></script>";
    }
  },

  javascript_initial_state: function () {
    return JSON.stringify({})
  },
};
