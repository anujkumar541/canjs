  
  import {  DefineList, DefineMap, stacheConverters, Component, stache, stacheBindings,viewAutorender } from "can";
  import layout from './field-selector.stache';
  import fieldsArray from '../../data/field.json';

  var fieldSelectorViewModel = DefineMap.extend({
        availableFields: {
            Type: DefineList,
            default() {
                return  fieldsArray.Fields;
            }
        },
        selectedFields: {
            Type: DefineList,
            default() {
                return fieldsArray.SelectedFields;
            }
        },
        IsSelected: function () {
            var _self = this;
            return _self.selectedFields.map( a=> a.Id);
        },
        refreshSelectedFieldArray: function(objField) {
            var _self = this;
            var result = _self.selectedFields.filter((obj) => {
                return obj.Id.toString() == objField.Id.toString()
            });
            if (result &&  result.length > 0) {
                _self.selectedFields = _self.selectedFields.filter((obj) => {
                    return obj.Id.toString() != objField.Id.toString()
                })
            } else {
                _self.selectedFields.push(objField);
            }
        }
    });

Component.extend({
      tag: "field-selector",
      view: layout,
      ViewModel: fieldSelectorViewModel
});