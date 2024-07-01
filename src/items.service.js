const fs = require('fs');
const path = require('path');
const itemsFilename = process.env.ITEMS_FILENAME || 'items.json';

let items = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'data', itemsFilename)).toString(),
);

/* create a new item
 * @param {Object} data
 * @return {Object} new_item
 */
async function createItem(itemData = {}) {
	const newItem = { ...itemData, id: items.length + 1, lastUpdate: new Date() };
	items = [...items, newItem];
	return newItem;
}

/* get all items
 * @param nothing
 * @return {Object} all items
 */
async function getAllItems() {
	return items;
}

/* get a item by id
 * @param number id
 * @return {Object} item
 */
async function findItem(id) {
	return items.find((i) => +i.id === +id);
}

/* update a item
 * @param {Object} data
 * @return {Object} updatedItem
 */
async function updateItem(item, itemData) {
	const updatedItem = { ...item, ...itemData, lastUpdate: new Date() };
	items = [...items.filter((i) => i.id !== item.id), updatedItem];
	return updatedItem;
}

/* delete a item
 * @param {Object} item
 * @return nothing
 */
async function deleteItem(item) {
	items = items.filter((i) => i.id !== item.id);
}

module.exports = { createItem, getAllItems, findItem, updateItem, deleteItem };
