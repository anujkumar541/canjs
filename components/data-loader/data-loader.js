  
import {  DefineList, DefineMap, stacheConverters, Component, QueryLogic, connect, stacheBindings, viewAutorender, stache } from "can";
import layout from './data-loader.stache';
import sampleData from '../../data/sampleData.json';


var Product = DefineMap.extend("Product", {
    Id: "number",
    Description: "string",
    MAC: "string",
    Platform: "string",
    User: "string",
    AssignedSignId: "string",
    AssignedSignPath: "string",
    Temperature: "string",
    MBMVersion: "string",
    FirmwareVersion: "string"
});

var contentViewModel = DefineMap.extend({
    productsPromise: [],
    isLoading : { type: "boolean", default: false },
    loadData : function() {
        var _self = this;
        _self.isLoading = true;
        Product.getList().then(function(_data) {
             _self.productsPromise = _self.expressionParser(_self.filterExpressions, _self.sortExpression, _data);
             _self.isLoading = false;
        });
    },
    filterExpressions: {
        Type: DefineList,
        default() {
            return []
        }
    },
    sortExpression: { type: "any" },
        
    selectedFields:{
        Type: DefineList,
        default() {
            return []
        }
    },
    expressionParser: function(expressions, sortExpression, productList) {
        var _self = this;
        var returnValue = [] , matchedData = [], totalProductList = productList;
       
        // iterate iwth all filter expression
        expressions.forEach(element => {
            if(element.value || element.operator === 'isempty' || element.operator === 'isnotempty') {
                switch (element.operator) {
                    case 'equals':
                        matchedData = productList.filter((product) => product[element.field].toString() === element.value );  
                        break;
                    case 'notequals':
                        matchedData = productList.filter((product) => product[element.field].toString() !== element.value); 
                        break; 
                    case 'contains':
                        var regex = new RegExp(`${element.value}`, 'gi');
                        matchedData = productList.filter((product) => product[element.field].toString().match(regex));
                        break;
                    case 'startswith':
                        var regex = new RegExp(`^${element.value}`, 'i');
                        matchedData = productList.filter((product) => product[element.field].toString().match(regex));
                        break;
                    case 'isempty':
                        matchedData = productList.filter((product) => (!product[element.field]) );  
                        break;
                    case 'isnotempty':
                        matchedData = productList.filter((product) => (product[element.field]) );  
                        break;
                    default:
                        break;
                } 
                 // merge the macthed list
                returnValue = matchedData.concat(returnValue);

            } else {
                returnValue = totalProductList.concat(returnValue);
            }
        }); 
        // get the distinct set of record
        returnValue = new Set(returnValue);
        returnValue = _self.sortData(sortExpression, returnValue);
        return returnValue;
    },
    sortData: function(sortExpression, productlistForSort) {
 
        var productList = DefineList.extend({
            Type: [Product],
            default() {
                return []
            }
        })
        productList = new productList(productlistForSort);
        var returnValue = [];
        if (sortExpression.sortBy === 'Id' || sortExpression.sortBy === 'Temperature') {
            returnValue = productList.sort(function(a, b) {
                if (sortExpression.direction === 'asc')
                    return a[sortExpression.sortBy]-b[sortExpression.sortBy]
                else 
                    return b[sortExpression.sortBy]-a[sortExpression.sortBy]
            });
        } else {
            returnValue = productList.sort(function(a, b){
                if (sortExpression.direction === 'asc') {
                    if (a[sortExpression.sortBy] < b[sortExpression.sortBy]) 
                        return -1 
                    if (a[sortExpression.sortBy] > b[sortExpression.sortBy]) 
                        return 1
                    return 0 //default return value (no sorting)
                } else {
                    if (a[sortExpression.sortBy] > b[sortExpression.sortBy]) 
                        return -1 
                    if (a[sortExpression.sortBy] < b[sortExpression.sortBy]) 
                        return 1
                    return 0 //default return value (no sorting)
                }
            })
        }
        return returnValue;
    }
});

can.fixture({
    "/products": function() {
        return  sampleData;   
    }
});

can.fixture.delay = 1000;

Product.List = DefineList.extend("ProductList", {
    "*": Product
});

connect.baseMap({
    url: "/products",
    Map: Product,
    List: Product.List,
    name: "products"            
});


Component.extend({
      tag: "data-loader",
      view: layout,
      ViewModel: contentViewModel
});