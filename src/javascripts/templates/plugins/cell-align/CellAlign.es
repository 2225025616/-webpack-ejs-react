import reactMixin from 'react-mixin' ;

export default class CellAlign extends React.Component {
  static aligns = [['left', 'top'], ['center', 'top'], ['right', 'top'],
    ['left', 'middle'], ['center', 'middle'], ['right', 'middle'],
    ['left', 'bottom'], ['center', 'bottom'], ['right', 'bottom']];

  handleClick = (align) => {
    let c = this.props.editor.get('nativeEditor') ;

    c.execCommand( 'cellalign' , {align:align[0],valign:align[1]});

    this.props.onDismiss() ;
  } ;
  render() {
    let that = this;
    let aligns = CellAlign.aligns;
    let rows = [];

    let cell = (index) => {
      let retval = [];

      for (let j = 0; j < 3; j++) {
        var align = aligns[index * 3 + j];
        var classString = '/images/editor/' + align[0] + '-' + align[1] + '.png';

        retval.push(<button key={index*3+j} className='col-md-4'
                            onClick={that.handleClick.bind(that,align)}>
                      <img src={classString} alt=""/>
                    </button>);
      }

      return retval;
    }

    for (let i = 0; i < 3; i++) {
      rows.push(<div key={i} className="row">{cell(i)}</div>);
    }

    return <div className="container ae-dropdown ae-arrow-box ae-arrow-box-top-left" style={{width:"200px"}} >
      { rows }
    </div>;
  }
}

reactMixin( CellAlign ,AlloyEditor.WidgetFocusManager )
