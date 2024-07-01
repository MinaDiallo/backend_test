const fs = require('fs');
const path = require('path');
const itemsFilename = process.env.ITEMS_FILENAME || 'items.json';

let initial_items = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'data', itemsFilename)).toString(),
);
// get a item Model
const Item = require('./models/itemModel');

// get items to database
const getItemsData = async () => {
	const items = await Item.find({});
	return items;
};

/* create a new item
 * @param {Object} data
 * @return {Object} new_item
 */
async function createItem(itemData) {
	const newItem = {
		...itemData,
		lastUpdate: new Date(),
	};
	await Item.create(newItem);
	return newItem;
}

/* get all items
 * @param nothing
 * @return {Object} all items
 */
async function getAllItems(filtre) {
	const items = await getItemsData();
	if (filtre && filtre === 'active') {
		return items.filter((i) => i.isActive);
	}
	if (filtre && filtre === 'inactive') {
		return items.filter((i) => !i.isActive);
	}
	return items;
}

/* get a item by id
 * @param number id
 * @return {Object} item
 */
async function findItem(id) {
	const item = Item.findById(id);
	return item;
}

/* update a item
 * @param {Object} data
 * @return {Object} updatedItem
 */
async function updateItem(item, itemData) {
	await Item.findByIdAndUpdate(item.id, itemData);
	const updatedItem = Item.findById(item.id);
	return updatedItem;
}

/* delete a item
 * @param {Object} item
 * @return nothing
 */
async function deleteItem(item) {
	await Item.findByIdAndDelete(item.id);
}

module.exports = {
	createItem,
	getAllItems,
	findItem,
	updateItem,
	deleteItem,
	initial_items,
};
