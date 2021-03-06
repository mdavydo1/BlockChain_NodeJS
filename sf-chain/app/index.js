const express = require('express');
//Needed for post requests (adding new blocks to the chain) - allows for receiving this data in the JSON format (middleware)
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;  // Defaults to port 3001 and allows for other ports to be selected

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

//added after postman installation (in Chrome) and after installing body-parser - allows for receiving JSON within Post requests
app.use(bodyParser.json());
//********************************************

app.get('/blocks', (req, res) => {		//Get request - add endpoint that interacts with this application
	res.json(bc.chain);
});

//added after postman installation (in Chrome)
app.post('/mine', (req, res) => {
	const block = bc.addBlock(req.body.data);
	console.log(`New block added: ${block.toString()}`);

	p2pServer.syncChains(); //part of making sure all peers get the same fully updated chain

	res.redirect('/blocks');  //respond with an updated list of blocks - redirecting to blocks endpoint
});
//********************************************

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));        //make sure the application is running

p2pServer.listen();

