import Base  from './Base' ;
import List from 'react-list-select' ;

export default class DateTime extends Base{
    static items = [
    "yyyy年m月d日" ,
    "yyyy年mm月dd日" ,
    "yyyy-m-d" ,
    "yyyy-mm-dd",
    "yyyy-mm-dd hh:MM:ss" ,
    "hh:MM:ss"
  ] ;

  constructor(props) {
    super(props) ;

    this.changeState( {  formatString: DateTime.items[this.form.state.dateSelectedIndex] } ) ;
  }

  handleFormatterChange = (event) => {
    this.changeState( { dateSelectedIndex: event , formatString: DateTime.items[event] } ) ;
  };

  render() {
    return (
      <div>
        类型：
        <List items={DateTime.items} selected={[this.form.state.dateSelectedIndex]} mutiple={false} onChange={this.handleFormatterChange}/>
      </div>
    )
  }
}
