'use strict';

var mddf = require('mddf');
var MddfRender = require('mddf-viewer');
var mddfRender = new MddfRender(document.body);
window.openMddf = function openMddf(file){

  var df = window.df = mddf({
    blksize: 4096,
    dim: 3,
    size: file.size,
    read: function(buf, offset, length, position, onread){
      var blob = file.slice(position, position + length);
      var reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onerror = function(){
        onread(reader.error);
      };
      reader.onloadend = function(){
        var uint8Array = new Uint8Array(reader.result);
        for (var i = 0; i < uint8Array.length; i++) {
          var value = uint8Array[i];
          var index = i + offset;
          buf[index] = value;
        }
        onread(null, reader.result.byteLength);
      };
    },
    write: function(){

    }
  });
  mddfRender.buildScene(df);
};
