import QUnit from 'steal-qunit';
import fieldsArray from '../../data/field.json';
import operatorArray from '../../data/operator.json';
import './query-builder.js';

QUnit.module("Query Builder Module", {
    setup: function() {

    },
    teardown: function() {

    }
});


// Add new Filter Expressions in the ViewModel
QUnit.asyncTest("addFilterExpression", function() {

    var _filterModel = new filterModel({
        field: fieldsArray.DefaultFilterField.Id,
        operator: operatorArray.DefaultOperator.Id
    });


    var _dataSortModel = new dataSortModel({
        sortBy: fieldsArray.DefaultFilterField.Id,
        direction: "asc"
    });

    var _queryBuilderViewModel = new queryBuilderViewModel({
        availableFields: fieldsArray.Fields,
        availableOperator: operatorArray.Operators,
        filterExpressions: _filterModel,
        sortExpression: _dataSortModel
    });

    _queryBuilderViewModel.addFilterExpression();

    assert.equal(_queryBuilderViewModel.length, 2, "2 Filter Expression added in the View Model");

});

// Remove selected FilterExpression from View Mdoel
QUnit.asyncTest("removeFilterExpression", function() {

    var _filterModel = new filterModel({
        field: fieldsArray.DefaultFilterField.Id,
        operator: operatorArray.DefaultOperator.Id
    });


    var _dataSortModel = new dataSortModel({
        sortBy: fieldsArray.DefaultFilterField.Id,
        direction: "asc"
    });

    var _queryBuilderViewModel = new queryBuilderViewModel({
        availableFields: fieldsArray.Fields,
        availableOperator: operatorArray.Operators,
        filterExpressions: _filterModel,
        sortExpression: _dataSortModel
    });

    _queryBuilderViewModel.addFilterExpression();
    _queryBuilderViewModel.removeFilterExpression(1);

    assert.equal(_queryBuilderViewModel.length, 1, "2 Filter Expression removed from the View Model");
    Qunit.start();
});

// Show remove anchor link when there are more than one filter expression in VM
QUnit.asyncTest("showRemoveLink", function() {

    var _filterModel = new filterModel({
        field: fieldsArray.DefaultFilterField.Id,
        operator: operatorArray.DefaultOperator.Id
    });


    var _dataSortModel = new dataSortModel({
        sortBy: fieldsArray.DefaultFilterField.Id,
        direction: "asc"
    });

    var _queryBuilderViewModel = new queryBuilderViewModel({
        availableFields: fieldsArray.Fields,
        availableOperator: operatorArray.Operators,
        filterExpressions: _filterModel,
        sortExpression: _dataSortModel
    });

    _queryBuilderViewModel.addFilterExpression();
    var IsLinkedVisible = _queryBuilderViewModel.showRemoveLink();

    assert.equal(IsLinkedVisible, true, "Remove link is visible");

    _queryBuilderViewModel.addFilterExpression();
    _queryBuilderViewModel.removeFilterExpression(1);
    IsLinkedVisible = _queryBuilderViewModel.showRemoveLink();

    assert.equal(IsLinkedVisible, false, "Remove link is invisible");
    Qunit.start();
});