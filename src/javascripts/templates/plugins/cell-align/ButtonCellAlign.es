import CellAlign from './CellAlign' ;

export default class ButtonCellAlign extends React.Component {
  static propTypes = {
    commands: React.PropTypes.arrayOf(React.PropTypes.object),
    editor: React.PropTypes.object.isRequired,
    expanded: React.PropTypes.bool,
    label: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    toggleDropdown: React.PropTypes.func
  } ;

  static key = 'cellAlign' ;

  render() {
    let dropdown ;
    if (this.props.expanded) {
      dropdown = <CellAlign  circular={false} keys={{}} descendants=""
                             onDismiss={this.props.toggleDropdown} editor={this.props.editor}  />
    }

    return <div className="ae-container ae-has-dropdown cell-align">
      <button aria-expanded={this.props.expanded} aria-label='单元格对齐方式' className="ae-button"
              tabIndex={this.props.tabIndex} title='单元格对齐方式' onClick={this.props.toggleDropdown}>
        <span className="ae-icon-align-center"/>
      </button>
      {dropdown}
    </div>
  }
}

AlloyEditor.Buttons[ButtonCellAlign.key] = AlloyEditor.ButtonCellAlign = ButtonCellAlign ;

