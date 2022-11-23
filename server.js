let express = require('express');

let app = express();

app.use(express.static(__dirname + '/dist'));
app.length('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 8080);