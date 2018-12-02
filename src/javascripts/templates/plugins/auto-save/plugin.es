/**
 * @license Copyright (c) CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

import LZString from 'lz-string';

;(function () {
  if (!supportsLocalStorage()) {
    CKEDITOR.plugins.add("auto-save", {}); //register a dummy plugin to pass CKEditor plugin initialization process
    return;
  }

  CKEDITOR.plugins.add("auto-save", {
    version: 0.12,
    init: function (editor) {
      editor.on('instanceReady', function () {
        loadPlugin(editor);
      }, editor, null, 100);
    }
  });

  function autoSaveKey(editorInstance) {
    return 'auto-save-' + window.location.pathname + "_" + editorInstance.id;
  }

  function loadPlugin(editorInstance) {
    let saveKey = autoSaveKey(editorInstance);

    if (localStorage.getItem(saveKey)) {
      var jsonSavedContent = loadData(saveKey);
      editorInstance.loadSnapshot(jsonSavedContent.data);
    }

    editorInstance.on('change', startTimer);
  }

  function cancelStorage(editorInstance) {
    let saveKey = this.autoSaveKey(editorInstance);
    removeStorage(autoSaveKey);
  };

  var timeOutId = 0,
    savingActive = false;

  var startTimer = function (event) {
    if (timeOutId) {
      // clearTimeout(timeOutId);
    } else {
      timeOutId = setTimeout(onTimer, 10 * 1000, event);
    }
  };

  var onTimer = function (event) {
    if (savingActive) {
      startTimer(event);
    } else if (event.editor.checkDirty() || event.editor.plugins.bbcode) {
      savingActive = true;
      var editor = event.editor,
        saveKey = autoSaveKey(editor);

      saveData(autoSaveKey, editor);

      timeOutId = 0;
      savingActive = false;
    }
  };

  // localStorage detection
  function supportsLocalStorage() {
    if (typeof (Storage) === 'undefined') {
      return false;
    }

    try {
      localStorage.getItem("___test_key");
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadData(autoSaveKey) {
    var compressedJSON = LZString.decompressFromUTF16(localStorage.getItem(autoSaveKey));
    return JSON.parse(compressedJSON);
  }

  function saveData(autoSaveKey, editorInstance) {
    var compressedJSON = LZString.compressToUTF16(JSON.stringify({
      data: editorInstance.getSnapshot(),
      saveTime: $.now
    }));
    localStorage.setItem(autoSaveKey, compressedJSON);
  }

  function removeStorage(autoSaveKey) {
    localStorage.removeItem(autoSaveKey);
  }
})();
