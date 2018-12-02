import React from "react";
import Custom from "./formats/Custom" ;
import DateTime from "./formats/DateTime" ;
import Number  from "./formats/Number" ;
import Percentage from "./formats/Percentage" ;
import Base from "./formats/Base" ;
import Formatter from "../../lib/formatter" ;
import List from "react-list-select" ;

class Sample extends Base{
  render() {
    let fmt = Formatter.get(this.props.formatString);
    return <div dangerouslySetInnerHTML={ {__html: "示例：  " + fmt.format(this.props.sampleValue)}}/>;
  }
}

class General extends Base {
  constructor(props) {
    super(props);

    this.changeState( { formatString: 'g' } );
  }

  render() {
    return <div>常规不包括任何特定的数字格式</div>;
  }
}

export default class FormatConfiguration extends React.Component {

  static propTypes = {
    formatString: React.PropTypes.string ,
    sampleValue:React.PropTypes.string ,
    onChange:React.PropTypes.func
  } ;

  constructor(props) {
    super();

    this.state = {
      currentType: 0,
      formatString: props.formatString ,
      sampleValue:props.sampleValue ,
      numberSelectedIndex:0 ,
      dateSelectedIndex:3 ,
      fraction: 2 ,
      thousandSymbol:true ,
      currency: '￥'
    };
  }


  changeState(newState) {
    this.setState(newState) ;

    if( this.props.onChange ) {
      this.props.onChange( newState.formatString ) ;
    }
  }

  static types = [
    {value: 0, label: "常规"},
    {value: 1, label: "数值"},
    {value: 2, label: "货币"},
    {value: 3, label: "时间"},
    {value: 4, label: "百分比"},
    {value: 5, label: "自定义"}
  ];

  handleTypeChange = (event) => {
    this.setState({currentType: event});
  };

  createFormatter() {
    var n = <Number showCurrency={false} config={this}/> ;

    switch (this.state.currentType) {
      case 0:
        return <General form={this} /> ;
      case 1:
        return <Number showCurrency={false} form={this}/>  ;
      case 2:
        return <Number showCurrency={true} form={this} />;
      case 3:
        return <DateTime form={this}/>;
      case 4:
        return <Percentage form={this}/>;
      case 5:
        return <Custom form={this} />;
    }
  }

  render() {
    var formatter = this.createFormatter();

    var div =
      /*<div className="container">*/
      <div>
        <div className="row">
          <div className="col-md-4">
            <List selected={[this.state.currentType]}
                  items={FormatConfiguration.types.map((x)=>{return x.label})} onChange={this.handleTypeChange}/>
          </div>
          <div className="col-md-7">
            <Sample ref="sample" r={Math.random()} formatString={this.state.formatString} sampleValue={this.props.sampleValue} ></Sample>
            {formatter}
          </div>
        </div>
      </div>;

    return div;

  }
}

