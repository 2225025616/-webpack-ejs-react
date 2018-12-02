import React from 'react';
import Tree from './schemas/Tree';
import Dialog from './commons/Dialog';
import LZString from 'lz-string';
import { schema } from './schemas/Generator';
import jsf from './schemas/Faker';

class Schemas extends React.Component {
  constructor(props) {
    super(props);

    let datas = this._getTreesFromData(props.data);
    let trees = this._getDefaultTrees().concat(datas ? datas : []);

    this.state = {
      trees: trees,
      active: null
    };
  }


  render() {
    var refs = this.state.trees.map(tree => {
      return tree.name;
    });

    var editors = this.state.trees.map((tree, index) => {
      return <Tree key={index} tree={tree} refs={refs}
                   onXfieldFocus={this.props.onXfieldFocus}
                   onXfieldBlur={this.props.onXfieldBlur}
                   onAddToEditor={this.props.onAddToEditor}
                   onNodeChange={this.props.onNodeChange}
                   editable={this.props.editable}
                   rootCheckDupName={this.checkDuplName.bind(this)}
                   saveSchemasDraft={this.saveSchemasDraft.bind(this)}
                   removeTree={this.removeTree}
                   updateTree={this.updateTree.bind(this)}/>;
    });

    let buttons = "";
    if (this.props.editable) {
      buttons = (
        <div className="sidebar-footer">
          <a href="#" className="new-event" onClick={this.createTree}>+</a>
        </div>
      )
    }

    return (
      <div>
        <div className="scroll-container">
          {editors}
        </div>
        {buttons}
      </div>
    );
  }

  createTree = () => {
    var newTree = {
      name: this.sequenceName(),
      type: 'object',
      id: Math.round(Math.pow(10, 16) * Math.random()),
      children: [{name: 'property', type: 'string'}]
    }

    this.state.trees.push(newTree);
    this.setState({active: newTree});
    this.changeTrace(newTree, 'createTree');
  };

  sequenceName = () => {
    let names = this.getSchemas().map(function (tree) {
      return tree.schema_as_tree.name
    })
    let index = name.length + 1;
    let re = /^Factoid(\d+)$/;
    for (var i = 0; i < names.length; i++) {
      let ok = re.exec(names[i]);
      if (!!ok) {
        let cindex = ok[1];
        if (cindex >= index) {
          index = parseInt(cindex) + 1;
        }
      }
    }
    return 'Factoid' + index;
  };

  checkDuplName(tree, newName) {
    let trees = this.state.trees;
    for (let ntree of trees) {
      if (ntree.name === newName && ntree.id !== tree.id) {
        return true;
      }
    }
    return false;
  }

  removeTree = (tree) => {
    Dialog.show('', `确定要删除 ${tree.name} 这个树形结构?`).ok(() => {
      var trees = this.state.trees.filter((t) => {
        return t.id != tree.id
      });
      this.setState({trees: trees});
      this.changeTrace(tree, 'removeTree');
    })
  };

  getSchemas = () => {
    return this.state.trees.reduce((memo, tree) => {
      if (tree.name != 'common')
        memo.push({
          schema: schema(tree.name, tree, false),
          schema_as_tree: tree
        });
      return memo;
    }, []);
  };

  getSamples = () => {
    return this.state.trees.reduce((memo, tree) => {
      memo.push({type: tree.name, data: jsf(schema(tree.name, tree, true))});
      return memo;
    }, []);
  };

  _getTreesFromData(data) {
    if (data && data.length > 0) {
      return data.map(function (schema) {
        return schema.schema_as_tree;
      });
    } else {
      return false;
    }
  }

  _getDefaultTrees() {
    return [{
      name: 'common',
      type: 'object',
      readonly: true,
      children: [
        {name: 'attestation_no', type: 'string', readonly: true},
        {name: 'attestation_at', type: 'string', readonly: true},
        {name: 'product_name', type: 'string', readonly: true},
        {name: 'organization_name', type: 'string', readonly: true}
      ]
    }];
  }

  changeTrace = (...args) => {
    let [tree, action] = args;
    this.saveSchemasDraft();
  };

  updateTree = (tree) => {
    let trees = this.state.trees.reduce((memo, item) => {
      if (tree.id !== item.id) {
        memo.push(item);
      } else {
        memo.push(tree);
      }
      return memo;
    }, []);
    this.setState({trees: trees});
  };

  saveSchemasDraft = () => {
    let compressedJSON = LZString.compressToUTF16(JSON.stringify({
      data: JSON.stringify(this.getSchemas()),
      saveTime: $.now
    }));
    localStorage.setItem(this.props.schemaKey, compressedJSON);
  };

  updateFocusState = (path, cTrees, trees, root = true) => {
    if (!cTrees) {
      return this.updateFocusState(path, this.state.trees, this.state.trees, root);
    }

    let items = path.split('.');
    for (let tree of trees) {
      if (tree.name == items[0]) {
        tree['focus'] = "xfield-focus"
      } else {
        tree['focus'] = ""
      }

      if (tree.children) {
        this.updateFocusState(items.slice(1).join('.'), cTrees, tree.children, false);
      }
    }
    ;

    if (root) {
      this.setState({trees: cTrees})
    }
  };
}

export default Schemas;
