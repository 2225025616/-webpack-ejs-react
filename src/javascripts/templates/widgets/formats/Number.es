import List from 'react-list-select' ;
import Base from './Base' ;
import Formatter from '../../../lib/formatter' ;

export default class Number extends Base {
  constructor(props) {
    super(props);

    this.props = props ;

    this.formatters = this.buildFormatters(props);
    this.changeState( {formatString: this.formatters[this.form.state.numberSelectedIndex] } ) ;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.showCurrency != this.props.showCurrency) {
      this.formatters = this.buildFormatters(nextProps);
      this.changeState( {formatString: this.formatters[this.form.state.numberSelectedIndex] } ) ;
    }
  }

  buildFormatters(props) {
    let f = this.fixFraction(this.form.state.fraction) ;
    let currency = this.form.state.currency;
    if (!props.showCurrency)
      currency = "";

    let thousand = "" ;
    if(this.form.state.thousandSymbol) {
      thousand = "#,##" ;
    }

    let prefix = currency + thousand ;

    return [
      prefix + "0" + f ,
      prefix + "0" + f + ";[红色]-" + prefix + "0" + f ,
      prefix + "0" + f + ";[红色]" + prefix + "0" + f  ,
      prefix + "0" + f + ";(" + prefix + "0" + f + ")" ,
      prefix + "0" + f + ";[红色](" + prefix + "0" + f + ")",
    ];
  }

  handleFractionChange = (event) => {
    this.form.state.fraction = event.target.value;
    this.rebuildStates();
  };

  handleThousandChange = (event) => {
    this.form.state.thousandSymbol = event.target.checked;
    this.rebuildStates();
  };

  handleFormatterChange = (event) => {
    this.form.state.numberSelectedIndex = event;
  };

  handleCurrencyChange = (event) => {
    this.form.state.currency = event.target.value;
    this.rebuildStates();
  };

  rebuildStates() {
    this.formatters = this.buildFormatters(this.props);
    let formatString = this.formatters[this.form.state.numberSelectedIndex];
    this.changeState({formatString:formatString}) ;
  }

  render() {
    var currency;
    if (this.props.showCurrency) {
      currency = <div class='row'>
        <div className='col-md-8 no_padding_left'>
          货币符号 <select value={this.form.state.currency} onChange={this.handleCurrencyChange}>
          <option value="">无</option>
          <option value="$">$</option>
          <option value="￥">￥</option>
        </select>
        </div>
      </div>
      ;
    }

    var items = this.formatters.map((x) => {
      var fmt = Formatter.get(x) ;
      return <div dangerouslySetInnerHTML={{__html: fmt.format(-1234.10)}}/> ;
    }) ;

    return (
      <div>
        <div className='row'>
          <div className='col-md-8'>
            小数位数 <input type="number" min="0" max="10" value={this.form.state.fraction}
                        onChange={this.handleFractionChange}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
          <input type='checkbox' checked={this.form.state.thousandSymbol} onChange={this.handleThousandChange}/>使用千分位分隔符(,)
          </div>
        </div>
        {currency}
        <div className='row'>
          <div className='col-md-8'>
            负数:<br/>
            <List items={items} selected={[this.form.state.numberSelectedIndex]} mutiple={false}
                  onChange={this.handleFormatterChange}/>
          </div>
        </div>
      </div>
    );
  }
}
