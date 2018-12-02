import List from 'react-list-select' ;
import Base from './Base' ;

export default class Custom extends Base {
  static formatters = [
    "g",
    "0.00",
    "0.00;[红色]0.00",
    "#,##0.00",
    "#,##0.00;[红色]#,##0.00",
    "#,##0.00w",
    "￥#,##0.00",
    "￥#,##0.00;[红色]￥#,##0.00",
    "￥###0.00",
    "￥###0.00;[红色]￥###0.00",
    "yyyy-m-d",
    "yyyy年m月d日",
    "yyyy-mm-dd",
    "yyyy年mm月dd日",
    "yyyy年mm月dd日 hh时MM分ss秒",
    "yyyy-mm-dd hh:MM:ss",
    "yyyy年mm月dd日 hh时MM分ss秒",
    "yyyy-m-d h:M:s",
    "0.00%",
    "0.0%"
  ];

  constructor(props) {
    super(props);
  }

  handleInputChange = (event) => {
    this.changeState( { formatString: event.target.value } ) ;
  };

  handleSelectChange = (event) => {
    this.changeState( { selectedIndex:event , formatString: Custom.formatters[event] } ) ;
  };

  render() {
    return (
      <div>
        <input type="text" value={this.form.state.formatString} onChange={this.handleInputChange}/>
        <List className="ul-custom-height" items={Custom.formatters} selected={[this.form.state.selectedIndex]} mutiple={false} onChange={this.handleSelectChange}/>
      </div>
    )
  }
}

