// index.js
import { Component } from "can";
import view from "./app.stache";
import  "./components/field-selector/field-selector";
import  "./components/query-builder/query-builder";
import  "./components/data-loader/data-loader";


var baseTemplate = Component.extend({
  tag: "my-app",
  view,
  ViewModel: {
    message: {
      default: "Test11"
    }
  }
});
