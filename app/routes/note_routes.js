
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  //GET
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          }
        });
        
      });

      //GETALL
      app.get('/notes', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        var all = db.collection('notes');
        
        all.find({}).toArray(function (err,result) {
                        if(err){
                            res.send(err);
                        }
                            else{
        
                                res.send(JSON.stringify(result));
                        }
                    })
        
      });

      //POST
    app.post('/notes', (req, res) => {
      const note = { text: req.body.note, title: req.body.value };
      db.collection('notes').insert(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
          console.log('Note Added')
        }
      });
    });

    //DELETE
    app.delete('/notes/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('notes').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('Note ' + id + ' deleted!');
        } 
      });
    });
  };