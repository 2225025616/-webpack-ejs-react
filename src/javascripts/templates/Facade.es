import './3rd/editor';
import './plugins/XField';
import './plugins/XRepeat';
import './plugins/arbitrary-dragresize';
import './plugins/ae-font';
import './plugins/auto-save/plugin';
import './plugins/TableResize';
import './plugins/cell-align/plugin';

import {render} from "react-dom";

import Schemas from "./Schemas";
import Actions from "./Actions";
import {Provider} from "react-redux";

import {previewTemplate,updateTemplate,getTemplate} from '../actions/templateAction';

export default class Facade {
  constructor(store) {
    this.store = store;
    this.dispatch = store.dispatch;
    this.id = this.getTemplateId();
  }

  handleRedux = () => {
    let state = this.store.getState();
    if( state.template.info.id && state.template.info != this.template ) {
      this.template = state.template.info ;
      this.editable = true ;
      this.configEditor();
    }

    if(state.template.preview != this.preview) {
      this.preview = state.template.preview;
      if(this.preview){
        $("#preview .modal-body").html(this.preview);
        $("#preview").modal('show');
      }
    }
  };

  initialize() {
    this.store.subscribe(this.handleRedux);

    let templateId = this.getTemplateId();
    if (templateId && templateId != this.templateId) {
      this.templateId = this.getTemplateId();
      this.dispatch(getTemplate(templateId));
    }

  }

  getTemplateId() {
    let splits = window.location.pathname.split(/[\/\?]/);
    if (splits[2]) {
      return splits[2];
    }
  }

  previewTemplate = () => {
    let showType = this.template.showType;
    let cover = showType == 1 ?this.template.cover : this.cover._editor.getData();
    let content = this.content._editor.getData();
    let samples = JSON.stringify(this.schemasEditor.getSamples());
    let jsonSchemas = this.schemasEditor.getSchemas();
    let coverStyle = showType == 1 ? "hidden-cover" : this.template.coverStyle ? this.template.coverStyle:"default";
    let contentStyle = this.template.contentStyle?this.template.contentStyle:"default";
    this.dispatch(previewTemplate({content, cover, samples, coverStyle, contentStyle,jsonSchemas}));
  };

  updateTemplate = () => {
    let showType = this.template.showType;
    let cover = showType == 1 ?this.template.cover : this.cover._editor.getData();
    let content = this.content._editor.getData();
    let jsonSchemas = JSON.stringify(this.schemasEditor.getSchemas());
    let coverStyle = showType == 1 ? "hidden-cover" : this.template.coverStyle ? this.template.coverStyle:"default";
    let contentStyle = this.template.contentStyle;
    this.dispatch(updateTemplate(this.id, {content, cover, jsonSchemas, coverStyle, contentStyle}));
  };

  handleXfieldFocus = nodeRef => {
    this.content._editor.xfieldFocus({path: nodeRef});
    this.cover._editor.xfieldFocus({path: nodeRef});
  };

  handleXfieldBlur = nodeRef => {
    this.content._editor.xfieldBlur({path: nodeRef});
    this.cover._editor.xfieldBlur({path: nodeRef});
  };

  handleAddToEditor = event => {
    var c = this.currentEditor;
    if (c) {
      if (event.type == "Array") {
        c.execCommand('add-xrepeat', event);
      } else {
        c.execCommand('xfield', event);
      }
    }
  };

  showSourceDialog = () => {
    var c = this.currentEditor;
    if (c) {
      c.execCommand("sourcedialog");
    }
  };

  handleNodeChange = (event) => {
    if (event.action == "updateNode") {
      let newPath = '';
      let nodes = event.nodeRef.split('.');
      let oldPath = '';
      if (event.changes.name) {
        nodes[nodes.length - 1] = event.changes.name.from;
        oldPath = nodes.join(".");
        newPath = event.nodeRef;
      } else if (event.changes.paths) {
        oldPath = event.changes.paths.from;
        newPath = event.changes.paths.to;
      }

      if (oldPath !== '' || newPath !== '') {
        this.content._editor.xfieldUpdateRef({path: oldPath, to: newPath});
        this.cover._editor.xfieldUpdateRef({path: oldPath, to: newPath});
      }
    } else if (event.action == "removeNode") {
      let path = event.nodeRef;

      this.content._editor.xfieldRemoveRef({path: path});
      this.cover._editor.xfieldRemoveRef({path: path});
    } else if (event.action == "addNode") {
      let path = event.nodeRef + "." + event.changes.name;

      this.content._editor.xfieldAddRef({path: path});
      this.cover._editor.xfieldAddRef({path: path});
    }
  };

  configEditor = () => {
    var Selections = [{
      name: 'link',
      buttons: ['linkEdit'],
      test: AlloyEditor.SelectionTest.link
    }, {
      name: 'text',
      buttons: ['Font', 'FontSize', 'styles', 'bold', 'italic', 'underline', 'link', 'ul', 'ol'],
      test: AlloyEditor.SelectionTest.text
    }, {
      name: 'table',
      buttons: ['tableHeading', 'tableRow', 'tableColumn', 'tableCell', 'cellAlign', 'tableRemove'],
      getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
      setPosition: AlloyEditor.SelectionSetPosition.table,
      test: AlloyEditor.SelectionTest.table
    }];

    let defaultConfig = {
      toolbars: {
        add: {
          buttons: ['image', 'text', 'table'],
          tabIndex: 1
        },
        styles: {
          selections: Selections,
          tabIndex: 1
        }
      },
      extraPlugins: 'ae_uicore,ae_selectionregion,arbitrary-dragresize,ae_addimages,ae_placeholder,tableresize,ae_tabletools,ae_autolink,xfield,xrepeat,sourcedialog,ae_richcombobridge,ae-font,auto-save,cell-align'
    };

    var that = this;
    CKEDITOR.on('instanceReady', (event) => {
      event.editor.on('focus', function () {
        that.currentEditor = this;
      });

      event.editor.on("xfield-focus", (event) => {
        if (this.schemasEditor) {
          this.schemasEditor.updateFocusState(event.data.ref);
        }
      });
    });

    this.fresh2Editor();
    this.renderAll();

    this.content = AlloyEditor.editable('contentEditor', defaultConfig);
    this.cover = AlloyEditor.editable('coverEditor', defaultConfig);
  };

  fresh2Editor() {
    let showType = this.template.showType;
    if (showType == 1) {//不显示封面
      $('#coverEditor').hide();
      $('#contentEditor').html(this.template.content);
      $('#contentEditor').addClass(this.template.contentStyle);
    } else if (showType == 2 || !this.template.content) {//不显示内容
      $('#contentEditor').hide();
      $('#coverEditor').html(this.template.cover);
      $('#coverEditor').addClass(this.template.coverStyle);
    } else {
      $('#contentEditor').html(this.template.content);
      $('#contentEditor').addClass(this.template.contentStyle);
      $('#coverEditor').html(this.template.cover);
      $('#coverEditor').addClass(this.template.coverStyle);
    }
  }

  renderAll() {
    this.schemasEditor = render(<Schemas facade={this} onXfieldBlur={this.handleXfieldBlur}
                                         onXfieldFocus={this.handleXfieldFocus}
                                         onAddToEditor={this.handleAddToEditor}
                                         onNodeChange={this.handleNodeChange}
                                         schemaKey="1111"
                                         data={this.template.jsonSchemas}
                                         editable={this.editable}/>, document.getElementById("schemas"));


    this.actions = render(<Provider store={this.store}><Actions facade={this}/></Provider>, document.getElementById("buttons"));
  }
}
