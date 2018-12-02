require("ckeditor" ) ;
require("alloy-editor");
require("./alloy-editor-ocean.css");

CKEDITOR.basePath = '/assets/editor/';
window.ALLOYEDITOR_BASEPATH = '/assets/editor/';

CKEDITOR.disableAutoInline = true ;

require( "./pastefromword") ;
require( "./sourcedialog") ;

