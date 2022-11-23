let express = require('express');

let app = express();

app.use(express.static('./dist/helpdeskfrontend'));
app.length('/*', (req, res) => {
    res.sendFile('index.html' , {root: 'dist/helpdeskfrontend/'});
});

app.listen(process.env.PORT || 8080);