import FormatConfiguration from '../widgets/FormatConfiguration' ;
import Dialog from '../commons/Dialog' ;
import Formatter from '../../lib/formatter' ;

CKEDITOR.dtd.$editable['xfield'] = 1;
let currentSelected = null;

const HIGHLIGHT = 'x-field-highlight';
const FAIL = 'x-field-fail';
const SELECTED = 'x-field-selected' ;

function buildXFieldHtml(element) {
  let ref = element.getAttribute('ref');
  let formatString = element.getAttribute('formatString');

  element.setAttribute('title', `${ref} ${formatString}`);
  element.setHtml(ref.replace(/.*\./, ''));
}

function xfieldListener(editor, elements) {
  elements.on("mouseenter", (event) => {
    editor.undoManager.lock()
    $(event.target).addClass(HIGHLIGHT);
    editor.undoManager.unlock()
  });
  elements.on("mouseout", (event) => {
    editor.undoManager.lock()
    $(event.target).removeClass(HIGHLIGHT);
    editor.undoManager.unlock()
  })
  elements.on("click", (event) => {
    editor.undoManager.lock()
    editor.getSelection().selectElement(new CKEDITOR.dom.element(event.target));
    editor.undoManager.unlock()
  })
}

CKEDITOR.editor.prototype.getXfiled = function(path, callback) {
  let editor = this;
  let nodeList = editor.document.getById(editor.name).getElementsByTag('xfield');
  let regexp = new RegExp('^' + path + "(?:\\.[^.]+)*$");
  for (let i = 0; i < nodeList.count(); i++) {
    let element = nodeList.getItem(i);
    let ref = element.getAttribute('ref');
    if (regexp.test(ref)) {
      callback(element, ref);
    }
  }
} ;

CKEDITOR.editor.prototype.xfieldUpdateRef = function(data){
  let regexp = new RegExp( '^' + data.path,'g') ;
  this.getXfiled(data.path, function(element, ref){
    let newRef = ref.replace(regexp ,data.to);
    element.setAttribute('ref', newRef) ;
    buildXFieldHtml(element);
  });

  this.getXfiled(data.to + '$' , function(element,ref) {
    element.removeClass(FAIL) ;
  } );
};

CKEDITOR.editor.prototype.xfieldRemoveRef = function(data) {
  this.getXfiled(data.path ,function(element,ref) {
    element.addClass( FAIL) ;
  }) ;
};

CKEDITOR.editor.prototype.xfieldAddRef = function(data) {
  this.getXfiled(data.path,function(element,ref) {
    element.removeClass( FAIL ) ;
  }) ;
};

CKEDITOR.editor.prototype.xfieldFocus = function(data){
  this.getXfiled(data, function(element, ref){
    element.addClass(SELECTED);
  });
};

CKEDITOR.editor.prototype.xfieldBlur = function(data){
  this.getXfiled(data, function(element, ref){
    element.removeClass(SELECTED);
  });
};

CKEDITOR.plugins.add('xfield', {
    onLoad: function () {
      CKEDITOR.addCss('xfield {  cursor: pointer; padding: 3px 7px; background-color: #f3fbf2; border-radius: 2px; border: 1px solid #DDECDB; border-left: 2px solid #9AD492;}');
      CKEDITOR.addCss(`.${SELECTED} { border: 2px solid #24E609 !important;}`);
      CKEDITOR.addCss(`.${HIGHLIGHT}{ border: 2px solid #46b8da; }`);
      CKEDITOR.addCss(`.${FAIL} {border:2px solid red }` );
    },

    init: function (editor) {
      editor.getSnapshot = () => {
        var data = editor.fire( 'getSnapshot' );

        if ( typeof data != 'string' ) {
          var element = editor.element;
          if ( element && editor.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE )
            data = element.is( 'textarea' ) ? element.getValue() : element.getHtml();
        }

        return data.replace( HIGHLIGHT, "").replace(SELECTED, "");
      }

      editor.on('doubleclick', (event) => {
        let element = event.data.element;
        if (element.getName() == "xfield") {
          let formatString = element.getAttribute("formatString");
          let sampleValue = element.getAttribute("sampleValue");
          if (!sampleValue || sampleValue == "undefined" || sampleValue == "null") {
            sampleValue = "1234.567812340";
          }

          var f = <FormatConfiguration onChange={(event)=>{formatString=event}} formatString={formatString}
                                       sampleValue={sampleValue}/>;
          Dialog.show("格式设置", f ).ok( () => {
            element.setAttribute('formatString' , formatString );
            buildXFieldHtml(element) ;
          }) ;
        }
      });

      editor.on('selectionChange', (event) => {
        let selectElement = editor.getSelection().getSelectedElement()
        event.editor.undoManager.lock()
        if(selectElement && selectElement.getName() == "xfield"){
          event.editor.fire('xfield-focus', {ref: selectElement.getAttribute("ref")})
          if(currentSelected){
            currentSelected.removeClass(HIGHLIGHT).removeClass(SELECTED);
          }
          currentSelected = selectElement;
          currentSelected.addClass(HIGHLIGHT).addClass(SELECTED);
        }else{
          event.editor.fire('xfield-focus', {ref: ''})
          if(currentSelected){
            currentSelected.removeClass(HIGHLIGHT).removeClass(SELECTED);
            currentSelected = null;
          }
        }
        event.editor.undoManager.unlock()
      });

      $('body').bind("click", (event) => {
        if (currentSelected && event.target.nodeName != "XFIELD") {
          editor.undoManager.lock();
          currentSelected.removeClass(HIGHLIGHT).removeClass(SELECTED);
          currentSelected = null;
          editor.fire('xfield-focus', {ref: ''});
          editor.undoManager.unlock()
        }
      })

      CKEDITOR.on('instanceReady', (event) => {
        xfieldListener(event.editor, $("xfield"));
        let undoCmd = editor.getCommand( 'undo');
        if (undoCmd){
          undoCmd.on('afterUndo', () => {
            event.editor.undoManager.lock(event);
            xfieldListener(event.editor, $("xfield"));
            event.editor.undoManager.unlock(event)
          });
        }
      });

      editor.addCommand('xfield', {
        exec: function (editor, data) {
          var el = editor.document.createElement('xfield');
          xfieldListener(editor, $(el.$))
          el.setAttributes({
            class: 'field',
            ref: data.ref,
            sampleValue: data.sampleValue,
            formatString: 'g',
            contentEditable: false
          });

          buildXFieldHtml(el);

          editor.insertElement(el);
          editor.insertText(" ");

          // editor.getSelection().removeAllRanges();
        }
      });
    }
  }
);


export default xfieldListener;
