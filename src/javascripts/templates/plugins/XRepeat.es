var REPEATING_SECTION = "xrepeat";

function isStartRepeat(element) {
  if (element instanceof CKEDITOR.dom.comment) {
    return element.getOuterHtml().indexOf(`${REPEATING_SECTION}.begin`) >= 0 ;
  } else {
    return false;
  }
}

function isEndRepeat(element) {
  if (element instanceof CKEDITOR.dom.comment) {
    return element.getOuterHtml().indexOf(`${REPEATING_SECTION}.end`) >= 0 ;
  } else {
    return false;
  }
}

class XRepeatAnchor {
  constructor(editor, commentBegin, commentEnd, ref) {
    this.editor = editor;
    this.commentBegin = commentBegin;
    this.commentEnd = commentEnd;
    this.ref = ref;
  }

  remove() {
    this.commentBegin.remove();
    this.commentEnd.remove();

    this.anchor.remove();
    let repeats = this.editor.allRepeats;
    for (let i = 0; i < repeats.length; i++) {
      if (repeats[i] == this) {
        delete repeats[i];
        break;
      }
    }
  }

  update() {
    let pxUnit = CKEDITOR.tools.cssLength;
    let doc = this.editor.document;
    let anchor = this.anchor;

    let startNode = this.commentBegin;
    for (; startNode != null && startNode instanceof CKEDITOR.dom.comment; startNode = startNode.getNext()) ;

    let endNode = this.commentEnd;
    for (; endNode != null && endNode instanceof CKEDITOR.dom.comment; endNode = endNode.getPrevious()) ;

    let startPoint = startNode.getDocumentPosition(doc);
    let endPoint = endNode.getDocumentPosition(doc);

    let x = startPoint.x - 20;
    let y = startPoint.y - 1;

    anchor.css('left', pxUnit(x)).css('top', pxUnit(y)).css('height',
      pxUnit(endPoint.y - startPoint.y + endNode.getSize('height') + 3));

  }

  add() {
    var doc = this.editor.document;
    var anchor = $("<div class='repeat-node-sign'><i class='remove fa fa-times-circle' title='删除重复节'></i></div>")
    anchor.attr("title", `重复${this.ref}`).appendTo($(document.body));
    anchor.find('.remove').on('click', ()=> {
      this.remove();
    });

    this.anchor = anchor;
    this.update();

    this.editor.allRepeats.push(this);
  }
}

var addCommand = {
  _getTr: function (node) {
    var n = node;
    for (; n != null;) {
      if (n.getName() == "tr")
        return n;

      n = n.getParent();
    }
  },
  _getTd: function (node) {
    var n = node;
    for (; n != null;) {
      if (n.getName() == "td" || n.getName() == "th") {
        return n;
      }

      n = n.getParent();
    }
  },
  _isTableRow: function (paragraphs) {
    var tdCount = 0;
    paragraphs.map((r) => {
      var n = this._getTd(r);
      tdCount++;
    });

    return tdCount >= 2;
  },

  exec: function (editor, data) {
    var selection = editor.getSelection(),
      range = selection && selection.getRanges()[0],
      document = editor.document;

    if (!range)
      return;

    var bookmarks = selection.createBookmarks();
    var iterator = range.createIterator(), block;

    var paragraphs = [];
    while (( block = iterator.getNextParagraph() ))
      paragraphs.push(block);

    var startNode;
    var endNode;

    if (this._isTableRow(paragraphs)) {
      startNode = this._getTr(paragraphs[0]);
      endNode = this._getTr(paragraphs[paragraphs.length - 1]);
    } else {
      startNode = paragraphs[0];
      endNode = paragraphs[paragraphs.length - 1];
    }

    var commentBegin = new CKEDITOR.dom.comment(`${REPEATING_SECTION}.begin ref="${data.ref}" `);
    var commentEnd = new CKEDITOR.dom.comment(REPEATING_SECTION + ".end");

    commentBegin.insertBefore(startNode);
    commentEnd.insertAfter(endNode);

    new XRepeatAnchor(editor, commentBegin, commentEnd, data.ref).add();

    editor.focus();
  }
}

CKEDITOR.plugins.add('xrepeat', {
    buildXAnchor:function(editor,list) {
      if( list == null ) {
        return ;
      }

      for( let i = 0 ; i < list.count() ; i ++ ) {
        let element = list.getItem(i) ;
        if( $.isFunction( element.getChildren ) ) {
          this.buildXAnchor(editor,element.getChildren()) ;
        }

        if (isStartRepeat(element)) {
          for (let j = i + 1; j < list.count(); j++) {
            let endElement = list.getItem(j);
            if (isEndRepeat(endElement)) {
              new XRepeatAnchor(editor, element, endElement).add();
            }
          }
        }
      }
    } ,
    init: function (editor) {
      editor.allRepeats = [];

      editor.on('instanceReady', () => {
        let nodeList = editor.document.getById(editor.name).getChildren();
        this.buildXAnchor(editor,nodeList) ;
      });

      editor.on('change', function () {
        this.allRepeats.forEach((x) => {
          x.update();
        });
      });

      editor.addCommand('add-xrepeat', addCommand);
    }
  }
);


