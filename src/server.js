const http = require('http');

const port = process.env.PORT || 3000;
const app = require('./app');
const server = http.createServer(app);
const mongoose = require('mongoose');
const uri = process.env.DB_HOST;
// get a item Model
const Item = require('./models/itemModel');
// get a initial data
const initial_items = require('./items.service').initial_items;

mongoose
	.connect(uri)
	.then(() => {
		console.log('conneted to database');
		server.on('error', handleError);
		try {
			// remove collection when app is start, dev environnement
			mongoose.connection.db.dropCollection('items', function (err, result) {});
			// insert into db a initial data
			initial_items.forEach(async (i) => {
				const item = await Item.create(i);
			});
		} catch (error) {
			console.log(error);
		}
		server.listen(port);

		console.log('Server listening on port', port);
	})
	.catch((err) => {
		console.log('err:', err);
	});

function handleError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	switch (error.code) {
		case 'EACCES':
			console.error(`Port ${port} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`Port ${port} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

module.exports = server; // for testing
