import React from 'react';
import cx from 'classnames';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import InlineEdit from '../commons/InlineEdit';

import DropdownList from 'react-widgets/lib/DropdownList';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      type: props.type
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.active || nextProps.active || this.props.name != nextProps.name || this.props.focus != nextProps.focus;
  }

  render() {
    const classes = cx({
                    'node': true,
                    'is-active': this.props.active,
                    'hide-add-to': this.props.type == 'object' || 'array',
                    'repeat-node': this.props.isArrayItem,
                    'readonly': this.props.readonly });
    var nameSpan = this.props.isArrayItem ? this.props.name :
            <InlineEdit onXfieldFocus={this.props.onXfieldFocus}
                        onXfieldBlur={this.props.onXfieldBlur}
                        className='node-array'
                        text={this.props.name}
                        editable={this.props.editable}
                        paramName="name"
                        change={this.props.handleNameChanged} />;

    let className = `${this.props.focus} field`
    if(this.props.readonly || !this.props.editable){
      return (
        <div className={classes} onClick={this.onClick}>
          <a onClick={this.props.onAddToEditor} className="add-to">&nbsp;</a>
          <span className={className}>
            {this.props.name}
          </span>
          <span className="field-type">
            {this.props.type}
          </span>
        </div>
      );
    } else {
      return (
        <div className={classes} onClick={this.onClick}>

          <a onClick={this.props.onAddToEditor} className="add-to">&nbsp;</a>

          <span className={className}>
            { nameSpan }
            { this._showConstraints() }
          </span>
          <div className="field-type">
            <DropdownList
              textField='type'
              groupBy='group'
              onChange={this.onTypeChanged}
              value={this.props.type}
              defaultValue={this.props.type}
              data={this._typeOptions()} />
          </div>

          <div className='settings'>
            { this._showRemoveIcon() }
            { this._showAddIcon() }
            { this._showConstraintsList() }
          </div>
        </div>
      );
    }
  }

  _showConstraints = () => {
    let constraints = (this.props.constraints).map(item => {
       return <b key={item} className={item} title={item}></b>;
    });
    return <span className="constraints"> { constraints } </span>
  };

  _showRemoveIcon = () => {
    return (
      <span className="remove-node btn-dropdown">
        <i className="fa fa-minus" onClick={this.onRemove}></i>
      </span>
    );
  };

  _showAddIcon = () => {
    if(this.props.group !== 'Reference'){
      let type = this.props.type;
      if(type === 'object' || (type === 'array' && !this.props.hasChildren())){
        return (
         <span className="add-node btn-dropdown">
           <i className="fa fa-plus" onClick={this.onAddChild}></i>
         </span>
        );
      }
    }
  };

  _showConstraintsList = () => {
    if(this.props.group !== 'Reference'){
      return (
        <span className="field-constraints btn-dropdown" onClick={this.toggleConstraint}>
          <i className="fa fa-cog"></i>
        </span>
      );
    }
  };

  onClick = (e) => {
    this.props.onClickNode();
  };

  onAddChild = (e) => {
    this.props.onAddChild();
  };

  onRemove = (e) => {
    this.props.onRemoveNode();
  };

  toggleConstraint = (e) => {
    e.stopPropagation();
    var rect = e.target.getBoundingClientRect();
    var position = {x: rect.left, y: rect.bottom}
    this.props.toggleConstraint(position);
  };

  _typeOptions = () => {
    var refs = (this.props.refs||[]).map((name)=>{return {group: 'Reference', type: name}});
    return [
      {group: 'Primitive', type: 'string'},
      {group: 'Primitive', type: 'integer'},
      {group: 'Primitive', type: 'number'},
      {group: 'Primitive', type: 'boolean'},
      {group: 'Primitive', type: 'null'},
      {group: 'Complicated', type: 'object'},
      {group: 'Complicated', type: 'array'}
    ].concat(refs);
  };

  onTypeChanged = (newType) => {
    this.props.handleTypeChanged(newType);
  };
}

export default Node;
