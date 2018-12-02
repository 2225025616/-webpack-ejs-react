import UITree from 'react-ui-tree';
import toastr from 'toastr';
import Tree from 'react-ui-tree/dist/tree.js';

export default class SchemaTree extends UITree {
  init = (props) => {
    var tree = new Tree(props.tree);
    tree.renderNode = props.renderNode;
    tree.updateNodesPosition();

    return {
      changed: false,
      tree: tree,
      nodeRef: null,
      dragging: {
        id: null,
        x: null,
        y: null,
        w: null,
        h: null
      }
    };
  };

  drag = (e) => {
    if(!this.props.editable){ return }
    var tree = this.state.tree;
    var dragging = this.dragging;
    var paddingLeft = this.props.paddingLeft;
    var newIndex = null;
    var index = tree.getIndex(dragging.id);
    var nodeType = index.node.type;
    var collapsed = index.collapsed;
    var changed = this.state.changed;

    if (this._start) {
      let nodeRef = this.props.getFormatRef(index.node);
      this.props.onXfieldFocus(nodeRef)
      this.setState({
        otree: jQuery.extend(true, {}, this.state.tree),
        dragging: this.dragging,
        nodeRef: nodeRef
      });
      this._start = false;
    }

    var _startX = this._startX;
    var _startY = this._startY;
    var _offsetX = this._offsetX;
    var _offsetY = this._offsetY;
    // var _how = ''

    var pos = {
      x: _startX + e.clientX - _offsetX,
      y: _startY + e.clientY - _offsetY
    };
    dragging.x = pos.x;
    dragging.y = pos.y;

    var diffX = dragging.x - paddingLeft / 2 - (index.left - 2) * paddingLeft;
    var diffY = dragging.y - dragging.h / 2 - (index.top - 2) * dragging.h;

    if (diffX < 0) {
      // left
      if (index.parent && !index.next) {
        newIndex = tree.move(index.id, index.parent, 'after');
      }
    } else if (diffX > paddingLeft) {
      // right
      var prevIndex = tree.getIndex(index.prev);
      if (index.prev && !prevIndex.collapsed) {
        newIndex = tree.move(index.id, index.prev, 'append');
      }
    }

    if (newIndex) {
      index = newIndex;

      newIndex.collapsed = collapsed;
      dragging.id = newIndex.id;
      changed = true;
    }

    if (diffY < 0) {
      // up
      var above = tree.getNodeByTop(index.top - 1);
      newIndex = tree.move(index.id, above.id, 'before');
    } else if (diffY > dragging.h) {
      // down
      if (index.next) {
        var below = tree.getIndex(index.next);
        if(below.children && below.children.length && !below.collapsed) {
          newIndex = tree.move(index.id, index.next, 'prepend');
        } else {
          newIndex = tree.move(index.id, index.next, 'after');
        }
      } else {
        var below = tree.getNodeByTop(index.top + index.height);
        if (below && below.parent !== index.id) {
          if (below.children && below.children.length) {
            newIndex = tree.move(index.id, below.id, 'prepend');
          } else {
            newIndex = tree.move(index.id, below.id, 'after');
          }
        }
      }
    }

    if (newIndex) {
      newIndex.collapsed = collapsed;
      dragging.id = newIndex.id;
      changed = true;
    }

    this.setState({
      changed: changed,
      tree: tree,
      dragging: dragging,
    });
  };

  dragEnd = () => {
    if(!this.props.editable){ return }
    let dragging = this.dragging;
    let index = null;
    let node = null;
    let msg = null;
    let nodeRef = this.state.nodeRef

    if(this.state.changed){
      index = this.state.tree.getIndex(dragging.id);
      let parentNode = null;
      node = index.node;
      parentNode = this.state.tree.getIndex(index.parent).node;
      msg = this.props.checkFormat(parentNode, node);

      if(msg === undefined){
        let newPath = this.props.getFormatRef(node);
        this.props.changeTrace(this.state.nodeRef, 'updateNode', { paths: { from: this.state.nodeRef, to: newPath } });
        nodeRef = newPath
        this.setState({
          dragging: {
            id: null,
            x: null,
            y: null,
            w: null,
            h: null,
          },
          nodeRef: null,
          changed: false
        });
        this._changed = true;
      } else {
        if(msg !== null){
          toastr.error(msg);
        }
        if(this.state.otree){
          this.setState({
            tree: this.state.otree,
            otree: null,
            nodeRef: null,
            changed: null,
            dragging:{
              id: null,
              x: null,
              y: null,
              w: null,
              h: null
          }})
        };
        this._changed = false;
        this.change(this.state.tree);
      }
    } else {
      this.setState({
        dragging: {
          id: null,
          x: null,
          y: null,
          w: null,
          h: null,
        },
        nodeRef: null,
        changed: false
      });
    }

    window.removeEventListener('mousemove', this.drag);
    window.removeEventListener('mouseup', this.dragEnd);
    if(nodeRef !== undefined && nodeRef !== null)
      this.props.onXfieldBlur(nodeRef);
  };

  change = (tree) => {
    if (this.props.onChange) this.props.onChange(tree.obj);
  };
}
