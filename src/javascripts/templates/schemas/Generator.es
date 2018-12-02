// Modules
var Type = require('type-of-is');

// Constants
var DRAFT = "http://json-schema.org/draft-04/schema#";
var Constants = require('./Constants');
var _sample = false;
//{name: 'street', type: 'array', constraints: {required: false}, maxLength: 3, children: [{ name: 'stree_name', type: 'string' }]}
//{type: 'array', items: {type: 'string'}}
function processArray (array, output, nested) {
  if (nested && output) {
    output = {
      items: output
    };
  } else {
    output = output || {};
    output.type = array.type;
    output.items = output.items || {};
  }

  if(array.children && array.children.length > 0){
    var child = array.children[0];
    var type = child.type;

    var processOutput;

    switch (type) {
      case "object":
        processOutput = processObject(child, output.items);
        break;

      case "array":
        processOutput = processArray(child, output.items, true);
        break;

      default:
        processOutput = { type: type };
    }

    output.items = processOutput;
  }

  return nested ? output.items : output;
}

var fakers = {
  name: 'name.findName' ,
  company_name: 'company.companyName' ,
  attestation_no: 'custom.attestation_no' ,
  phone: 'custom.mobile_phone' ,
  id_card: 'custom.id_card'
} ;

function getFaker(name) {
  let result = '' ;

  $.each(fakers, (k,v) => {
    if( name.indexOf(k) >= 0 ) {
      result = v ;
      return ;
    }
  }) ;

  if( result == '' && name.endsWith( '_at')) {
    result = 'date.past' ;
  }

  return result ;
}


function processObject (object, output, nested) {
  if (nested && output) {
    output = {
      properties: output
    };
  } else {
    output = output || {};
    output.type = Type.string(object).toLowerCase();
    output.properties = output.properties || {};
    output.required = output.required || [];
  }

  if(object.children){
    for(var i=0; i < object.children.length; i++){
      var child = object.children[i];
      var type = child.type;

      if (type === 'undefined') {
        type = 'null';
      }

      if(_sample){
        output.required.push(child.name);
      }
      else{
        if(child.constraints && child.constraints.required){
          output.required.push(child.name);
        }
      }

      if(child.group === 'Reference'){
        output.properties[child.name] = { '$ref': object.name + '/' + type + '.json' };
      } else {
        switch (type) {
          case "object":
            output.properties[child.name] = processObject(child);
            break;

          case "array":
            output.properties[child.name] = processArray(child);
            break;

          default:
            output.properties[child.name] = Object.assign({ type: type , faker:getFaker(child.name) }, processConstraints(child.constraints));
        }
      }
    }
  }

  return nested ? output.properties : output;
}

function processConstraints(constraints){
  if(constraints === undefined) return {};
  if(!constraints.format){ return {} };

  var pattern = Constants.constraints2patterns(constraints.format.value);
  if(pattern){
    return {pattern: pattern};
  } else {
    return {};
  }
}

export function schema(name, object, sample = false) {
  _sample = sample;
  var processOutput;
  var output = {
    $schema: DRAFT
  };

  // Determine name exists
  if (typeof name !== 'string') {
    object = name;
    name = undefined;
  } else {
    output.name = name;
    output.id = "http://baoquan.com/schemas/factoid/" + name + ".json";
  }

  // Set initial object type
  output.type = object.type;

  // Process object
  switch (output.type) {
    case "object":
      processOutput = processObject(object);
      output.type = processOutput.type;
      output.properties = processOutput.properties;
      output.required = processOutput.required;
      break;

    case "array":
      processOutput = processArray(object);
      output.type = processOutput.type;
      output.items = processOutput.items;
      break;
  }

  // Output
  return output;
}
