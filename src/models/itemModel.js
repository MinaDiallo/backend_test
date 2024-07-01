const mongoose = require('mongoose');

const itemShema = mongoose.Schema(
	{
		isActive: {
			type: Boolean,
		},
	},
	{ timestamp: true },
);

const Item = mongoose.model('Item', itemShema);

module.exports = Item;
