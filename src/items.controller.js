const service = require('./items.service');

/* call service for get a item by id
 * @param  req, res
 * @return {object} a item or message error
 */
async function findItem(req, res, next, id) {
	const item = service.findItem(id);
	if (!item) {
		return res.status(404).json({
			message: 'invalid item',
			errors: { id: 'is unknown' },
		});
	}
	req.item = item;
	next();
}

/* call service for create a new items
 * @param req, res
 * @return {object} new item
 */
async function createItem(req, res, next) {
	const newItem = await service.createItem(req.body);
	return res.json({ item: newItem });
}

/* call service for get all items
 * @param req, res
 * @return {Object} all items
 */
async function getAllItems(req, res, next) {
	// add await for wait a Promise
	// add a query filter
	const items = await service.getAllItems(req.query.filter_by);
	return res.json({ items });
}

/* call service for get a item
 * @param req, res
 * @return {Object} a item
 */
async function getOneItem(req, res, next) {
	return await res.json({ item: await req.item });
}

/* call service for updated a item
 * @param {Object} req
 * @return updated item
 */
async function updateItem(req, res, next) {
	return res.json({
		item: await service.updateItem(await req.item, req.body || {}),
	});
}

/* call service for deleted a item
 * @param {Object} req
 * @return deleted item
 */
async function deleteItem(req, res, next) {
	service.deleteItem(await req.item);
	return res.json({ item: await req.item });
}

module.exports = {
	findItem,
	createItem,
	getAllItems,
	getOneItem,
	updateItem,
	deleteItem,
};
