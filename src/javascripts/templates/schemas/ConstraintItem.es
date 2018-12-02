import React from 'react';
import cx from 'classnames';
import SelectList from 'react-widgets/lib/SelectList';
import Constants from './Constants';

class ConstraintItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var submenu = this.getSubmenu(this.props.text, this.props.item.subvalue);

    return (
      <div className='constraint-item'>
        {this.props.text}
        {submenu}
      </div>
    );
  }

  getSubmenu = (text, subvalue)=>{
    if(text === 'required'){
      return '';
    }

    var allOptions = {
      format: Constants.constraints2options()/*,
      length: [
        {name: '长度为8', value: 8}
      ]*/
    }

    var data = allOptions[text];
    if(!subvalue){
      subvalue = {name: null, value: null}
    }

    return (
      <div className='submenu rw-widget'>
        <SelectList
          data={data}
          value={subvalue}
          textField='name'
          valueField='value'
          onChange={this.onSubmenuChange}
        />
      </div>
    );
  };

  onSubmenuChange = (subvalue) => {
    //var values = subvalue.map((o)=>{return o.value});
    this.props.item.callback.call(null, this.props.value, subvalue);
  };
};

export default ConstraintItem;
