import './ButtonCellAlign' ;

function getSelectedCells(selection) {
  var ranges = selection.getRanges();
  var retval = [];
  var database = {};

  function moveOutOfCellGuard(node) {
    if (retval.length > 0)
      return;

    if (node.type == CKEDITOR.NODE_ELEMENT && cellNodeRegex.test(node.getName()) && !node.getCustomData('selected-cell')) {
      CKEDITOR.dom.element.setMarker(database, node, 'selected-cell', true);
      retval.push(node);
    }
  }

  for (var i = 0; i < ranges.length; i++) {
    var range = ranges[i];

    if (range.collapsed) {
      var startNode = range.getCommonAncestor();
      var nearestCell = startNode.getAscendant('td', true) || startNode.getAscendant('th', true);
      if (nearestCell)
        retval.push(nearestCell);
    } else {
      var walker = new CKEDITOR.dom.walker(range);
      var node;
      walker.guard = moveOutOfCellGuard;

      while (( node = walker.next() )) {
        if (node.type != CKEDITOR.NODE_ELEMENT || !node.is(CKEDITOR.dtd.table)) {
          var parent = node.getAscendant('td', true) || node.getAscendant('th', true);
          if (parent && !parent.getCustomData('selected-cell')) {
            CKEDITOR.dom.element.setMarker(database, parent, 'selected-cell', true);
            retval.push(parent);
          }
        }
      }
    }
  }

  CKEDITOR.dom.element.clearAllMarkers(database);

  return retval;
}

CKEDITOR.plugins.add('cell-align', {
  init: function (editor) {
    function addCmd(name, def) {
      let cmd = editor.getCommand(name);
      if (cmd)
        return;

      cmd = editor.addCommand(name, def);
      editor.addFeature(cmd);
    };

    function createDef(def) {
      return CKEDITOR.tools.extend(def || {}, {
        contextSensitive: 1,
        refresh: function (editor, path) {
          this.setState(path.contains({td: 1, th: 1}, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
        }
      });
    }

    addCmd('cell-align', createDef({
        requiredContent: 'td',
        exec: function (editor, event) {
          let cells = getSelectedCells(editor.getSelection());
          cells.forEach(cell => {
            cell.setStyles({"vertical-align": event.valign, "text-align": event.align});
          });
        }
      })
    )
    ;
  }
})
;


