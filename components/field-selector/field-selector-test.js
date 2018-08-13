import QUnit from 'steal-qunit';
import fieldsArray from '../../data/field.json';
import './field-selector.js';

QUnit.module("Field Selector", {
    setup: function() {

    },
    teardown: function() {

    }
});


// Is Selected Function return List Of FieldIds which used to bind the checkbox list
QUnit.asyncTest("Is Selected return Ids", function() {

    var fieldSelectorVM = new fieldSelectorViewModel({
        availableFields: fieldsArray.Fields,
        selectedFields: fieldsArray.SelectedFields
    });

    var _selectedFieldsIds = fieldSelectorVM.IsSelected();

    assert.equal(_selectedFieldsIds.length, 4, "4 FieldIds in arrays");
    assert.equal(!_selectedFieldsIds.some(isNaN), true, "Array contains only fieldIds(numeric)");
    Qunit.start();
});

// When user click on selected field, checkbox become uncheck and Field removed from array
QUnit.asyncTest("refreshSelectedFieldArray- UnCheck Field", function() {

    var fieldSelectorVM = new fieldSelectorViewModel({
        availableFields: fieldsArray.Fields,
        selectedFields: fieldsArray.SelectedFields
    });

    var _toggledField = { "Id": "MAC", "Name": "MAC" };
    var _refreshedSelectedFields = fieldSelectorVM.refreshSelectedFieldArray(_toggledField);

    assert.equal(_refreshedSelectedFields.length, 3, "Selected Field is Uncheked and _selectedFields Array refreshed");
    Qunit.start();

});

// When user click on un-selected field, checkbox become checked and Field pushed to array
QUnit.asyncTest("refreshSelectedFieldArray- Select Field", function() {

    var fieldSelectorVM = new fieldSelectorViewModel({
        availableFields: fieldsArray.Fields,
        selectedFields: fieldsArray.SelectedFields
    });

    var _toggledField = { "Id": "FirmwareVersion", "Name": "Firmware Version" };
    var _refreshedSelectedFields = fieldSelectorVM.refreshSelectedFieldArray(_toggledField);

    assert.equal(_refreshedSelectedFields.length, 5, "New Field is Checked and _selectedFields Array refreshed");
    assert.deepEqual(_refreshedSelectedFields[4], { "Id": "FirmwareVersion", "Name": "Firmware Version" }, "Newly selected field is pushed into Array");
    Qunit.start();
});