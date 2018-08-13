import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('menuboard-manager functional smoke test', {
  beforeEach() {
    F.open('../development.html');
  }
});

QUnit.test('menuboard-manager main page shows up', function() {
  F('title').text('menuboard-manager', 'Title is set');
});
