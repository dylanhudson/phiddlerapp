let {PythonShell} = require('python-shell')

let {ABCJS} = require('abcjs')

const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))
app.get('/',(req, res) => {res.sendFile(__dirname + '/index.html');})

app.get('/mymusic',(req, res) => {RunPython("generate.py", res);})

//RunPython("generate.py", res))
app.listen(port, () => console.log(`Example App listening on port ${port}!`))

function RunPython(script, res){
  PythonShell.run(script, null, function (err, result) {
    if (err) throw err;
    console.log('finished');
    var abc = prepareResponse(result);
    console.log(abc);
    res.send(ABCJS.renderAbc(abc));
  })

}

function prepareStringRes (notes) {
  var abc =  `X: 24\n
              T: Clouds Thicken\n
              C: Paul Rosen\n
              S: Copyright 2005, Paul Rosen\n
              M: 6/8\n
              L: 1/8\n
              Q: 3/8=116\n
              R: Creepy Jig\n
              K: Em\n
              ${notes}`
  return abc;
}

function prepareResponse (notes) {
  var abcjsForm = {
        'X': 24,
        'T': "Clouds Thicken",
        'C': "Paul Rosen",
        'S': "Copyright 2005, Paul Rosen",
        'M': "6/8",
        'L': "1/8",
        'Q': "3/8=116",
        'R': "Creepy Jig",
        'K': "Em",
  }
  abcjsForm['Notes'] = notes;
  return abcjsForm;
}
