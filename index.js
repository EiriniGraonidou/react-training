const express = require('express');
const app = express();
app.get('/', (req, resp) => {
    resp.send({hi: 'there'});
});

const PORT = process.env.PORT || 5050;
app.listen(PORT);