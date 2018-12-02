import Base from './Base' ;

export default class Percentage extends Base {
  constructor(props) {
    super(props) ;

    this.changeState( { formatString : "0" + this.fixFraction(this.form.state.fraction) + "%" } );
  }

  handleFractionChange = (event) => {
    let formatString = "0" + this.fixFraction(event.target.value) + "%";
    this.changeState({fraction:event.target.value , formatString:formatString }) ;
  };

  render() {
    return (
      <div>
        小数位数&nbsp;&nbsp;<input type="number" min="0" max="12" value={this.form.state.fraction} onChange={this.handleFractionChange}/>
      </div>
    );

  }
}