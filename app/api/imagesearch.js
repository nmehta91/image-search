'use strict'

var Search = require('bing.search');
var url = require('url') ;
var bing_search = new Search('Dzrwghq4lRWZN+MBkrWcBZ77LDc0ht29j7aTdEZOWZ4');
var util = require('util');

module.exports = function(app, searchStr) {
    app.get('/api/imagesearch/:query', function(req, res){
       var offset = url.parse(req.url,true).query.offset;
       var search_query = req.params.query;
       
       save(search_query, searchStr);
    //   var d = {
    //      "query": queryObject,
    //      "search query": search_query
    //   };
       
      if(offset == undefined){
          offset = 20;
      }
      
       bing_search.images(search_query, {top: offset}, function(err, results){
          if(err) throw err;
           res.send(JSON.stringify(results, null, 10));
       });
    //   res.send(JSON.stringify(d));
    });
    
    app.get('/api/imagesearch/', function(req, res){
        searchStr.find({},null, {
            "limit": 10,
            "sort": {
                "when": -1
            }
        }, function(err, history){
            if(err) throw err;
            console.log(history);
            res.send(history.map(function(entry){
                return {
                    term: entry.term,
                    when: entry.when
                }
            }))
        })
    });
    
    function save(query, searchStr){
        var entry = new searchStr({
            term: query,
            when: new Date().toISOString()
        });
        entry.save(function(err, entry){
           if(err) throw err;
           console.log('Entered ', entry);
        });
    }
};