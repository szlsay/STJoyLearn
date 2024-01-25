const db = uniCloud.database();
const dbCmd = db.command;
const dbCollectionName = 'ly-note';
module.exports = {
	_before: function() { // 通用预处理器

	},
	async add(value) {
		const result = await db.collection(dbCollectionName).add(value)
		console.log("000", result)
		return result
	}
}