var parser = require('../../src/parser/journal-parser');
var journal = require('../../src/journal');
var sampleGenerator = require('../../generator/generator.util');

var Vue = require('vue');
require('./components/accounts.js');
require('./components/account-filter.js');
require('./components/total-monthly-chart.js');
require('./components/monthly-chart.js');
require('./components/weekly-chart.js');
require('./components/transaction-table.js');

var app = new Vue({
  el: '#app',
  data: {
    filter:  {
      account: 'Expenses',
      month: new Date().getMonth() + 1,
      payee: ''
    },
    journal: journal
  },
  beforeMount: function(){
      var self = this;
      var text = sampleGenerator.generateYearJournal();
      this.createJournal(text);
  },
  methods: {

    handleFiles : function(e) {
      var files = e.currentTarget.files;
      var reader = new FileReader();
      var self = this;

      reader.onload = function(e) {
          var text = reader.result
          self.createJournal(text);
      }
      reader.onerror = function(err) {
          console.log(err, err.loaded, err.loaded === 0);
          button.removeAttribute("disabled");
      }
      reader.readAsText(files[0]);
    },

    createJournal: function(text){
      journal.reset();

      parser.reset(text)
      var chunk;
      try{
        while((chunk = parser.next()) != null){
          journal.add(chunk);
        }
      }catch(e){
        console.log(e);
        console.log('Failing on line ' + JSON.stringify(e.chunk));
      }
    },
  },
})
