import {  DefineList, DefineMap, stacheConverters, Component } from "can";
import layout from './query-builder.stache';
import fieldsArray from '../../data/field.json';
import operatorArray from '../../data/operator.json';

const filterModel = DefineMap.extend({
    field: {
        type: "string",
        default: fieldsArray.DefaultFilterField.Id
    },
    operator: {
        type: "string",
        default: operatorArray.DefaultOperator.Id
    },
    value: "string"
  })

const dataSortModel = DefineMap.extend({
    sortBy: {
        type: "string",
        default: fieldsArray.DefaultFilterField.Id
    },
    direction: {
        type: "string",
        default: "asc"
    }
   
  })

var queryBuilderViewModel = DefineMap.extend({
    availableFields: {
        Type: DefineList,
        default() {
            return  fieldsArray.Fields;
        }
    },
    availableOperator: {
        Type: DefineList,
        default() {
            return  operatorArray.Operators;
        },
    },
    filterExpressions: {
        Type: DefineList,
        default() {
            return [new filterModel()]
        }
    },
    sortExpression: {
        Type: dataSortModel,
        default() {
            return new dataSortModel()
        }
    },
    addFilterExpression: function() {
        var _self= this;
        _self.filterExpressions.push(new filterModel());

    },
    removeFilterExpression: function(_index) {
        var _self= this;
        _self.filterExpressions= _self.filterExpressions.filter(function(item, index, list) {
            return index != _index;
        }); 
    },

    showRemoveLink: function() {
        var _self = this;
        if(_self.filterExpressions.length > 1 ) 
            return true;
        else 
            return false;
    }
});

Component.extend({
      tag: "query-builder",
      view: layout,
      ViewModel: queryBuilderViewModel
});