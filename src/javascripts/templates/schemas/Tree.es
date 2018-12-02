import React from 'react';
import cx from  'classnames';
import UITree from '../commons/react-ui-tree';
import Node from './Node';
import Dialog from '../commons/Dialog';
var jsf = require('json-schema-faker');

import SelectList from 'react-widgets/lib/SelectList';
import ConstraintItem from './ConstraintItem';

import 'react-widgets/dist/css/react-widgets.css';

class Tree extends React.Component {
  constructor() {
    super();

    this.state = {
      active: null,
      constraintPosition: null,
      showConstraints: false
    };
  }

  componentWillMount() {
    this.state.tree = this.props.tree;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({tree: nextProps.tree});
  }

  renderNode = (node) =>  {
    if(node.id === undefined){
      node.id = Math.round(Math.pow(10, 16) * Math.random());
    }
    var refs = this.props.refs.filter((ref) => {return ref !== this.state.tree.name;});

    return (
      <Node {...node} active={node === this.state.active}
            refs={refs}
            onXfieldFocus={this.onXfieldFocus.bind(this, node)}
            onXfieldBlur={this.onXfieldBlur.bind(this, node)}
            constraints={this.constraints2value(node.constraints)}
            handleNameChanged={this.handleNameChanged.bind(this, node)}
            handleTypeChanged={this.handleTypeChanged.bind(this, node)}
            toggleConstraint={this.toggleConstraint.bind(this, node)}
            onClickNode={this.onClickNode.bind(this, node)}
            onAddChild={this.onAddChild.bind(this, node)}
            hasChildren={this.hasChildren.bind(this, node)}
            onRemoveNode={this.onRemoveNode.bind(this, node)}
            editable={this.props.editable}
            onAddToEditor={this.onAddToEditor.bind(this,node)} />
    );
  };

  hasChildren = (node) => {
    return node.children && node.children.length > 0
  };

  toggleConstraint = (node, position) => {
    var show = this.state.showConstraints === node.id ? false : node.id;
    this.setState({
      active: node,
      constraintPosition: position,
      showConstraints: show
    });
  };

  onAddToEditor = (node)=> {
    let paths = this.getPaths(this.state.tree, node);
    var ref = this.getRef(paths);
    var options = {};
    if(ref.slice(-5) === '[...]')
      options['type'] = 'Array';
    else {
      options['sampleValue'] = jsf({type:node.type}) ;
    }
    options['ref'] = this.formatRef(ref);

    this.props.onAddToEditor( options ) ;
  };

  onClickNode = (node) => {
    var paths = [];
    this.findPathInTree(this.state.tree, node.id, paths);
    paths.push(this.state.tree.name);

    this.setState({
      active: node,
      showConstraints: false
    });
  };

  getFormatRef = (node) => {
    let paths = this.getPaths(this.state.tree, node);
    let ref = this.getRef(paths);
    return this.formatRef(ref);
  };

  formatRef = (ref) => {
    return ref.replace(/\[...\]/g, '')
  };

  getRef = (paths) => {
    return paths.reverse().join('.').replace(/\.\[/g, '[');
  };

  getPaths = (tree, node) => {
    let paths = [];
    this.findPathInTree(tree, node.id, paths);
    paths.push(tree.name);
    return paths;
  };

  onAddChild = (node) => {
    let addedNode;
    if(node.children == undefined) node.children = [];

    if(node.type === 'object'){
      addedNode = {name: this.sequenceName(node), type: 'string'};
    } else if(node.type === 'array' && node.children.length == 0){
      addedNode = {name: '[...]', type: 'string', isArrayItem: true}
    }
    node.children.push(addedNode);
    this.setState({active: addedNode});
    this.changeTrace(node, 'addNode', addedNode);
  };

  sequenceName = (parent) => {
    let clength = parent.children.length;
    let index = length + 1;
    let re = /^property(\d+)$/;
    for(var i=0; i< clength; i++){
      let cname = parent.children[i].name;
      let ok = re.exec(cname);
      if(!!ok){
         let cindex = ok[1];
         if(cindex >= index){
            index = parseInt(cindex) + 1;
         }
       }
    }
    return 'property' + index;
  };


  onRemoveNode = (node) => {
    var parent = this.findParent(this.state.tree, node);
    if(parent != undefined){
      var index = -1;
      for(var i = 0; i < parent.children.length; i++){
        if(parent.children[i].id === node.id){
          index = i;
          break;
        }
      }
      let nodeRef = this.getFormatRef(node);
      parent.children.splice(index, 1);
      this.setState({ active: parent });
      this.changeTrace(nodeRef, 'removeNode');
    } else if(node.name == this.state.tree.name){
      this.props.removeTree(node);
    }
  };

  onChecked = (attrs, newAttrs) => {
    var tree = JSON.parse(JSON.stringify(this.state.tree));
    var found = this.findNodeById(tree, attrs.id);
    found.required = newAttrs.required;
    this.setState({tree: tree});
  };

  handleNodeChanged = (node, newVal, changed, needDelChildren) => {
    if(changed){
      let otype = node.type;
      jQuery.extend(true, node, newVal);
      if(needDelChildren){ delete node.children };
      this.setState({ active: node });
      this.changeTrace(node, 'updateNode', { type: { from: otype, to: node.type } });
    }
  };

  nameFormat = (name) => {
    return name.replace(/[^A-Za-z0-9_]/g, '');
  };

  handleNameChanged = (node, newVal) => {
    if(!!newVal.name){ newVal.name = this.nameFormat(newVal.name) }
    let parentNode = this.findParent(this.state.tree, node);
    if(!this.checkDuplName(parentNode, node, newVal.name)){
      let changes = { name: { from: node.name, to: newVal.name } }
      jQuery.extend(true, node, newVal);
      this.setState({ active: node });
      this.changeTrace(node, 'updateNode', changes);
    } else {
      this.setState({ active: node });
      toastr.error("名称不能重复");
    }
  };

  handleTypeChanged = (node, newVal) => {
    let confirmFlag = false;
    if(newVal.type !== undefined){
      if(node.group === 'Complicated' && node.type !== newVal.type && node.children && node.children.length > 0){ confirmFlag = true; }
    }

    if(confirmFlag){
      Dialog.show('' , `此属性有子属性，更改后会不合法，并会删除其子节点。你确定要更改属性类型为 ${newVal.type} 吗？`).ok(() => {
        this.handleNodeChanged(node, newVal, true, true);
      }).cancel(() => {
        this.handleNodeChanged(node, newVal, false, false);
      });
    } else {
      this.handleNodeChanged(node, newVal, true, false);
    }
  };

  checkDuplName(parentNode, node, newName){
    if(parentNode === undefined){
      return this.props.rootCheckDupName(this.state.tree, newName)
    }
    for(let childrenNode of parentNode.children){
      if(childrenNode.id !== node.id && childrenNode.name === newName){ return true; }
    }
    return false
  }

  checkFormat(parent, node){
    switch(parent.type){
      case 'array':
        if(parent.children.length === 1){
          if(!node.isArrayItem){ return '不能将非 ArrayItem 节点移动到 Array 节点下'; }
        } else if(parent.children.length > 1){
          return '不能将移动超过一个节点移动到 Array节点 下';
        }
        break;
      case 'object':
        if(this.checkDuplName(parent, node, node.name)){ return '同一父节点下的子节点名称不能重复'; }
        if(node.isArrayItem){ return '不能将 ArrayItem 节点移动到 Object 节点下'; }
        break;
      default:
        return '不能将节点移动到非 Object 或 Array 节点下';
    }
  }


  findNodeById(node, id){
    if(node.id === id){
      return node;
    } else if(node.children && node.children.length > 0){
      for(let children of node.children){
        var found = this.findNodeById(children, id);
        if(found) return found;
      }
      return null;
    } else {
      return null;
    }
  }

  findPathInTree(node, id, paths) {
    if(node.id === id){
      return true;
    } else if(node.children && node.children.length > 0){
      for(let children of node.children){
        if(this.findPathInTree(children, id, paths)){
          paths.push(children.name);
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  findParent(tree, node){
    if(tree.children && tree.children.length > 0){
      for(let children of tree.children){
        if(children.id === node.id){
          return tree;
        }
        if(children.children){
          var tmp = this.findParent(children, node);
          if(tmp != undefined){
            return tmp;
          }
        }
      }
    }
  }

  render() {
    var constraints = this.getConstraintSelectList();
    return (
      <div className="event-source">
        <div className="event-header">
          <div className="toolbar"><i className="fa fa-cog"></i></div>
          <h4><small>陈述: </small>{this.state.tree.name}</h4>
        </div>
        <div className="tree">
          <UITree
            onXfieldFocus={this.props.onXfieldFocus}
            onXfieldBlur={this.props.onXfieldBlur}
            paddingLeft={10}
            tree={this.state.tree}
            getFormatRef={this.getFormatRef.bind(this)}
            changeTrace={this.changeTrace.bind(this)}
            onChange={this.onTreeChange.bind(this)}
            checkFormat={this.checkFormat.bind(this)}
            editable={this.props.editable}
            renderNode={this.renderNode.bind(this)}/>
        </div>
        { constraints }
      </div>
    );
  }

  getConstraintSelectList() {
    if(!this.state.showConstraints){
      $(window).off("click", this.hideConstraint);
      return "";
    }

    var pos = this.state.constraintPosition || {x: 0, y: 0};
    var constraintsStyle = {
      top: pos.y - 10,
      left: pos.x,
      width: 200,
      height: 'auto',
      position: 'absolute'
    };

    var data = this.constraints2data(this.state.active);
    var value = this.constraints2value(this.state.active.constraints);

    $(window).on("click", this.hideConstraint)

    return (
      <SelectList id='constraints'
        style={constraintsStyle}
        ref='selectList'
        valueField='value'
        textField='name'
        data={data}
        value={value}
        itemComponent={ConstraintItem}
        onChange={this.onConstraintsChanged.bind(this, this.state.active)}
        onClick={this.onConstraintsClicked.bind(this, this.state.active)}
        multiple />
    );
  }

  hideConstraint = () => {
    this.setState({showConstraints: false});
  };

  onConstraintsClicked = (node, e) => {
    e.stopPropagation();
  };

  onConstraintsChanged = (node, item, subvalue) => {
    if(node.constraints === undefined) node.constraints = {};
    let oconstraints = $.extend(true, {}, node.constraints);

    if(typeof item === 'object'){ // click on main list
      var required = item.map((e)=>{return e.name}).indexOf('required') != -1;
      var format = item.map((e)=>{return e.name}).indexOf('format') != -1;
      node.constraints['required'] = required;
      if(!format){
        delete node.constraints['format']
      }
      this.setState({tree: this.state.tree});
    } else { // click on submenu list
      node.constraints[item] = subvalue;
      this.setState({tree: this.state.tree});
    }
    this.changeTrace(node, 'updateNode', { constraints: { from: oconstraints, to: node.constraints } } );
  };

  constraints2data = (node) => {
    var callback = this.onConstraintsChanged.bind(this, node);
    return ['required', 'format'/*, 'length'*/].map((name) => {
      var subvalue = node.constraints ? node.constraints[name] : [];
      return {name, callback, value: name, subvalue: subvalue};
    });
  };

  constraints2value(constraints){
    if(constraints === undefined || constraints === {}){
      return [];
    } else {
      var arr = [];
      for(var key in constraints){
        switch(key){
          case 'required':
            if(constraints[key] && constraints[key]){ arr.push(key) }
            break;
          case 'format':
          case 'length':
            if(constraints[key] && constraints[key]){ arr.push(key) }
            break;
        }
      }
      return arr;
    }
  }

  onTreeChange(tree) {
    this.setState({ tree: tree });
    this.props.updateTree(tree);
  }

  changeTrace(...args) {
    let [node, action, changes] = args;
    let nodeRef = "";
    if(typeof node === 'string'){
      nodeRef = node;
    } else {
      nodeRef = this.getFormatRef(node);
    }

    this.props.saveSchemasDraft();

    if( this.props.onNodeChange ) {
      this.props.onNodeChange( { action:action, changes:changes, nodeRef:nodeRef } ) ;
    }
  }

  onXfieldFocus(node) {
    let path = this.getFormatRef(node);
    if(this.props.onXfieldFocus) this.props.onXfieldFocus(path)
  }

  onXfieldBlur(node) {
    let path = this.getFormatRef(node);
    if(this.props.onXfieldBlur) this.props.onXfieldBlur(path)
  }
}

export default Tree;
