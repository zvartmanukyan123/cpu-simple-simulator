const express = require("express");
const app = express();
const port = 3000;
const parser = require('./parser').parser;
const flowManager = require('./flowManager').flowManager;

const instructions = `
mov reg5, 10
cmp 10, 10
jle Test
add reg5, 10
Test: 
print reg5
`;




app.get("/", (req, res) => {
    console.log("Here");
    res.send('Hi');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    flowManager(...parser(instructions));
})
