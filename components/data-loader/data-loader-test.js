
import sampleData from '../../data/sampleData.json';
import fieldsArray from '../../data/field.json';
import operatorArray from '../../data/operator.json';
import '../data-loader/data-loader.js';

QUnit.module("Query Builder Module", {
    setup: function() {
        can.fixture.delay = 1000;
    },
    teardown: function() {
        can.fixture.delay = 1000;
    }
});


// Load Products data
QUnit.asyncTest("loadData", function() {

    var _Product = new Product();
    
    var _contentViewModel = new dataSortModel({
        productsPromise: [],
        isLoading: true,
        filterExpressions: [{
            field: fieldsArray.DefaultFilterField.Id,
            operator: operatorArray.DefaultOperator.Id
        }],
        sortExpression: {
            sortBy: fieldsArray.DefaultFilterField.Id,
            direction: "asc"
        },
        selectedFields: fieldsArray.SelectedFields,
    });

    _contentViewModel.loadData();

    assert.equal(_contentViewModel.productsPromise.length, 200, "Records Loaded Properly");
    Qunit.start();
    
});

// Sort Products data By Id in ascending Order
QUnit.asyncTest("sortData", function() {

    var _Product = new Product();
    
    var _contentViewModel = new dataSortModel({
        productsPromise: [],
        isLoading: true,
        filterExpressions: [{
            field: fieldsArray.DefaultFilterField.Id,
            operator: operatorArray.DefaultOperator.Id
        }],
        sortExpression: {
            sortBy: fieldsArray.DefaultFilterField.Id,
            direction: "asc"
        },
        selectedFields: fieldsArray.SelectedFields,
    });

    var _sortExpression = {
        sortBy: fieldsArray.DefaultFilterField.Id,
        direction: "asc"
    };

    var _productsData = _contentViewModel.loadData();
    // Sort Data By ID
    // So that Id 1 will be at first Index
    var _soretdProductList = _contentViewModel.sortData(_sortExpression, _productsData);
    assert.equal(_soretdProductList[0].Id, "1", "Records Sorted Properly in ascending order");

    // Sort Data By ID
    // So that Id 200 will be at first Index
    
    _sortExpression = {
        sortBy: fieldsArray.DefaultFilterField.Id,
        direction: "asc"
    };
    _soretdProductList = _contentViewModel.sortData(_sortExpression, _productsData);
    assert.equal(_soretdProductList[0].Id, "200", "Records Sorted Properly in descending order");
    Qunit.start();
});



// Filter Products 
QUnit.asyncTest("Filter Products", function() {

    var _Product = new Product();
    
    var _contentViewModel = new dataSortModel({
        productsPromise: [],
        isLoading: true,
        filterExpressions: [{
            field: fieldsArray.DefaultFilterField.Id,
            operator: operatorArray.DefaultOperator.Id
        }],
        sortExpression: {
            sortBy: fieldsArray.DefaultFilterField.Id,
            direction: "asc"
        },
        selectedFields: fieldsArray.SelectedFields,
    });

    var _sortExpression = {
        sortBy: fieldsArray.DefaultFilterField.Id,
        direction: "desc"
    };

    var _filterExpression = [{
        field: fieldsArray.DefaultFilterField.Id,
        operator: operatorArray.DefaultOperator.Id,
        value: ""
    }];
    
    Product.getList().then(function(_data) { 
        // In case of default filter expression
        var returnValue =_contentViewModel.expressionParser(_filterExpression, _sortExpression, _data);
        assert.equal(returnValue.length, 200, "200 Records filter");
        
        // In case of equals filter expression
        _filterExpression = [{
            field: "Id",
            operator: "equals",
            value: "5"
        }];
        returnValue =_contentViewModel.expressionParser(_filterExpression, _sortExpression, _data);
        assert.equal(returnValue.length, 1, "1 Records found with Id = 5");

        // In case of notequals filter expression
        // There are only one rows in sample data having Id = 5
        _filterExpression = [{
            field: "Id",
            operator: "notequals",
            value: "5"
        }];
        returnValue = _contentViewModel.expressionParser(_filterExpression, _sortExpression, _data);
        assert.equal(returnValue.length, 199, "199 Records found with Id != 5");
        assert.notEqual(returnValue[0].Id, "5", "Id Not equals to 5");

        // In case of contains filter expression
        // There are 20 rows in sample data having Id contains 5
        // e.g 5,15,25,35,45,55,65,75,85,95,.........195.
        _filterExpression = [{
            field: "Id",
            operator: "contains",
            value: "5"
        }];
        returnValue =_contentViewModel.expressionParser(_filterExpression, _sortExpression, _data);
        assert.equal(returnValue.length, 20, "20 Records found contains 5 in Id Field");

        
        // In case of startswith filter expression
        // There are 2 rows in sample data having Id startswith 5
        // e.g 5,55.
        _filterExpression = [{
            field: "Id",
            operator: "startswith",
            value: "5"
        }];
        returnValue =_contentViewModel.expressionParser(_filterExpression, _sortExpression, _data);
        assert.equal(returnValue.length, 2, "2 Records found contains 5 in Id Field");
        assert.notEqual(returnValue[0].Id.IndexOf("5"), -1, "Id Startswith 5");

        
        // In case of isempty filter expression
        // There are 20 rows in sample data having empty Id
        _filterExpression = [{
            field: "Id",
            operator: "isempty",
            value: ""
        }];
        returnValue =_contentViewModel.expressionParser(_filterExpression, _sortExpression, _data);
        assert.equal(returnValue.length, 0, "0 Records found with empty Id");

        
        // In case of isnotempty filter expression
        // There are 20 rows in sample data having empty Id
        _filterExpression = [{
            field: "Id",
            operator: "isnotempty",
            value: ""
        }];
        returnValue =_contentViewModel.expressionParser(_filterExpression, _sortExpression, _data);
        assert.equal(returnValue.length, 200, "200 Records found with non empty Id");
        assert.ok(returnValue[0].Id !== "", "Id is not empty");
        Qunit.start();
    });
    
});

