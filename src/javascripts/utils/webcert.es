export default function jvsCert () {
  // 源自 https://webcert.cnmstl.net/cert/grade/small_h_img.js?sn=fc75337090e345169710a009a9751bb9

  let jvsCert = document.getElementById("jvs-cert"),
    jvsCertOuter = document.createElement("div"),
    jvsCertImg1 = document.createElement("img"),
    jvsCertImg2 = document.createElement("img");
  jvsCert.style.display = "block";
  jvsCert.style.maxWidth = "92px";
  jvsCertOuter.id = "jvs-certOuter";
  jvsCertOuter.className = "jvs-certOuter";
  jvsCertOuter.style.width = "100%";
  jvsCertOuter.style.height = "100%";
  jvsCertOuter.style.position = "relative";
  jvsCertImg1.src = "https://webcert.cnmstl.net/cert/grade/first_small_h_img.png?sn=fc75337090e345169710a009a9751bb9";
  jvsCertImg1.id = "cert-img1";
  jvsCertImg1.className = "act";
  jvsCertImg1.style.position = "absolute";
  jvsCertImg1.style.left = "0";
  jvsCertImg1.style.top = "0";
  jvsCertImg1.style.display = "block";
  jvsCertImg1.style.width = "100%";
  jvsCertImg1.style.height = "auto";
  jvsCertImg1.style.opacity = "1";
  jvsCertImg1.style.border = "none";
  jvsCertImg1.style.filter = "Alpha(opacity=100)";
  jvsCertImg2.src = "https://webcert.cnmstl.net/cert/grade/second_small_h_img.png?sn=fc75337090e345169710a009a9751bb9";
  jvsCertImg2.id = "cert-img2";
  jvsCertImg2.className = "act";
  jvsCertImg2.style.position = "absolute";
  jvsCertImg2.style.left = "0";
  jvsCertImg2.style.top = "0";
  jvsCertImg2.style.display = "block";
  jvsCertImg2.style.width = "100%";
  jvsCertImg2.style.height = "auto";
  jvsCertImg2.style.opacity = "0";
  jvsCertImg2.style.border = "none";
  jvsCertImg2.style.filter = "Alpha(opacity=0)";
  jvsCert.appendChild(jvsCertOuter);
  jvsCertOuter.appendChild(jvsCertImg1);
  jvsCertOuter.appendChild(jvsCertImg2);
  let jvsTimer = null, jvsTimer1 = null, jvsTimer2 = null;

  function jvsClear (time) {
    clearInterval(time);
    if (time) time = null;
  }

  function jvsHasClass (elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
  }

  function jvsAddClass (elements, cName) {
    if (!jvsHasClass(elements, cName)) {
      elements.className += " " + cName;
    }
  }

  function jvsRemoveClass (elements, cName) {
    if (jvsHasClass(elements, cName)) {
      elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
    }
  }

  function jvsFadeIn (elem) {
    jvsSetOpacity(elem, 0);
    for (let i = 0; i <= 20; i++) {
      (function () {
        jvsTimer1 = null;
        clearTimeout(jvsTimer1);
        let level = i * 5;
        jvsTimer1 = setTimeout(function () {
          jvsSetOpacity(elem, level)
        }, i * 25);
      })(i);
    }

  }

  function jvsFadeOut (elem) {
    for (let i = 0; i <= 20; i++) {
      (function () {
        jvsTimer2 = null;
        clearTimeout(jvsTimer2);
        let level = 100 - i * 5;
        jvsTimer2 = setTimeout(function () {
          jvsSetOpacity(elem, level)
        }, i * 25);
      })(i);
    }

  }

  function jvsSetOpacity (elem, level) {
    if (elem.filters) {
      elem.style.filter = "alpha(opacity=" + level + ")";
    } else {
      elem.style.opacity = level / 100;
    }
  }

  function jvsShow () {
    let certImg = document.getElementById("cert-img1"), certMsg = document.getElementById("cert-img2"),
      hasAct = jvsHasClass(certImg, "act");
    if (hasAct) {
      jvsFadeOut(certImg);
      jvsFadeIn(certMsg);
      jvsRemoveClass(certImg, "act");
      jvsAddClass(certMsg, "act");
    } else {
      jvsAddClass(certImg, "act");
      jvsRemoveClass(certMsg, "act");
      jvsFadeOut(certMsg);
      jvsFadeIn(certImg);
    }
  }

  this.runTimer = function runTimer () {
    jvsTimer = window.setInterval(function () {
      jvsShow()
    }, 3000);
  };

  this.timerClear = function () {
    jvsClear(jvsTimer);
  }
}