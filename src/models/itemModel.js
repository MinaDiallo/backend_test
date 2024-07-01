const mongoose = require('mongoose');

const itemShema = mongoose.Schema(
	{
		id: {
			type: Number,
		},
		isActive: {
			type: String,
		},
	},
	{ timestamp: true },
);

const Item = mongoose.model('Item', itemShema);

module.exports = Item;
