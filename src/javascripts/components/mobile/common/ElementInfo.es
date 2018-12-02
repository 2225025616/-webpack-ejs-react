export default class ElementInfo {
  origin = {x: 0, y: 0};
  dx = 0;
  dy = 0;
  originalSize = {width: 0, height: 0};

  constructor(ele, windowSize, maxScale) {
    this.ele = ele;
    this.windowSize = windowSize;
    this._maxScale = maxScale;
    this.getOriginalSize();
  }

  getOriginalSize() {
    if (this.ele.tagName === 'IMG') {
      this.originalSize.width = this.ele.width;
      this.originalSize.height = this.ele.height;
    } else {
      this.originalSize.width = this.ele.scrollWidth;
      this.originalSize.height = this.ele.scrollHeight;
    }
  }

  get imgRatio() {
    let size = this.naturalSize;
    return size.width / size.height;
  }

  get naturalSize() {
    const size = {width: 0, height: 0};
    if (this.ele.tagName === 'IMG') {
      if (typeof this.ele.naturalWidth === "undefined") {
        let i = new Image();
        i.src = this.ele.src;
        size.width = i.width;
        size.height = i.height;
      }
      else {
        size.width = this.ele.naturalWidth;
        size.height = this.ele.naturalHeight;
      }
    } else {
      size.width = this.ele.scrollWidth;
      size.height = this.ele.scrollHeight;
    }
    return size;
  }

  get maxScale() {
    return this._maxScale || this.naturalSize.width / this.originalSize.width * window.devicePixelRatio;
  }

  set scale(val) {
    if (val !== 1) {
      if (val !== this.scale) {
        if (this.ele.tagName === 'IMG') {
          this.ele.style.maxWidth = this.ele.naturalWidth * window.devicePixelRatio + 'px';
          this.ele.style.maxHeight = this.ele.naturalHeight * window.devicePixelRatio + 'px';

          this.ele.width = this.originalSize.width * val;
        } else {
          this.ele.style.maxWidth = this.naturalSize.width * this.maxScale + 'px';
          this.ele.style.maxHeight = this.naturalSize.height * this.maxScale + 'px';

          this.ele.style.width = this.originalSize.width * val + 'px';
          this.ele.style.height = this.originalSize.height * val + 'px';
        }

        const rotateSize = this.rotateSize;
        if (rotateSize.width > this.windowSize.width) {
          if (this.ele.offsetLeft > 0)
            this.ele.style.left = (rotateSize.width - this.windowSize.width) / 2 + 'px';
          if (this.ele.offsetLeft < -rotateSize.width + this.windowSize.width)
            this.ele.style.left = (-rotateSize.width + this.windowSize.width) / 2 + 'px';
        } else {
          this.ele.style.left = '0';
        }

        if (rotateSize.height > this.windowSize.height) {
          if (this.ele.offsetTop > 0)
            this.ele.style.top = (rotateSize.height - this.windowSize.height) / 2 + 'px';
          if (this.ele.offsetTop < -rotateSize.height + this.windowSize.height)
            this.ele.style.top = (-rotateSize.height + this.windowSize.height) / 2 + 'px';
        } else {
          this.ele.style.top = '0';
        }
      }
    } else {
      this.ele.style.maxWidth = '';
      this.ele.style.maxHeight = '';
      this.ele.style.left = '';
      this.ele.style.top = '';
      this.ele.removeAttribute('width');
    }
  };

  get scale() {
    return this.ele.tagName === 'IMG' ? this.ele.width / this.originalSize.width : this.ele.scrollWidth / this.originalSize.width;
  }

  set rotate(val) {
    this.ele.removeAttribute('style');
    this.ele.removeAttribute('width');
    this.ele.style.transform = `rotate(${val}deg)`;
    this.origin.x = 0;
    this.origin.y = 0;
  }

  get rotate() {
    const transform = this.ele.style.transform;
    const reg = /rotate\((\d+)deg\)/;
    const rotate = transform.match(reg);

    return rotate ? parseInt(rotate[1]) : 0;
  }

  get rotateSize() {
    if (this.rotate / 90 % 2 === 1) {
      return this.ele.tagName === 'IMG' ? {
        width: this.ele.height,
        height: this.ele.width
      } : {
        width: this.ele.scrollHeight / window.devicePixelRatio,
        height: this.ele.scrollWidth / window.devicePixelRatio,
      }
    } else {
      return this.ele.tagName === 'IMG' ? {
        width: this.ele.width,
        height: this.ele.height
      } : {
        width: this.ele.scrollWidth / window.devicePixelRatio,
        height: this.ele.scrollHeight / window.devicePixelRatio
      }
    }
  }

  set move(val) {
    const rotateSize = this.rotateSize;
    if (rotateSize.width <= this.windowSize.width && rotateSize.height <= this.windowSize.height) return;
    if (rotateSize.width > this.windowSize.width) {
      if (val.left > (rotateSize.width - this.windowSize.width) / 2)
        val.left = (rotateSize.width - this.windowSize.width) / 2;
      if (val.left < (-rotateSize.width + this.windowSize.width) / 2)
        val.left = (-rotateSize.width + this.windowSize.width) / 2;
      this.ele.style.left = val.left + 'px';
    }
    if (rotateSize.height > this.windowSize.height) {
      if (val.top > (rotateSize.height - this.windowSize.height) / 2 + 10 * window.devicePixelRatio)
        val.top = (rotateSize.height - this.windowSize.height) / 2 + 10 * window.devicePixelRatio;
      if (val.top < -(rotateSize.height - this.windowSize.height) / 2 - 10 * window.devicePixelRatio)
        val.top = -(rotateSize.height - this.windowSize.height) / 2 - 10 * window.devicePixelRatio;
      this.ele.style.top = val.top + 'px';
    }
  }

  get move() {
    return {
      left: parseInt(this.ele.style.left) || 0,
      top: parseInt(this.ele.style.top) || 0
    }
  }
}