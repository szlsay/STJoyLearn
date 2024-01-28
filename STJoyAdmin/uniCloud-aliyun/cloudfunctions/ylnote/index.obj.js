const db = uniCloud.database();
const dbJQL = uniCloud.databaseForJQL()
const dbCmd = db.command;
const dbCollectionName = 'ly-note';
const uniID = require('uni-id-common')
module.exports = {
	_before: async function() { // 通用预处理器
		this.token = this.getUniIdToken()
		if (this.token) {
			const clientInfo = this.getClientInfo()
			this.uniID = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
				clientInfo
			})
			this.userInfo = await this.uniID.checkToken(this.token);
		} else {
			throw new Error('token凭证不存在，请重新登录')
		}
	},
	async add(value) {
		if (this.userInfo.errCode) {
			return this.userInfo
		}
		value.user_id = this.userInfo.uid
		value.create_time = Date.now()
		value.update_time = Date.now()
		const result = await db.collection(dbCollectionName).add(value)
		return result
	},
	async get(_id) {
		if (this.userInfo.errCode) {
			return this.userInfo
		}
		const result = await db.collection(dbCollectionName).where({
			_id,
			user_id: this.userInfo.uid
		}).get()
		if (result && result.data && result.data.length === 1) {
			const {
				title,
				content
			} = result.data[0]
			return {
				title,
				content
			}
		} else {
			return {}
		}
	},
	export () {
		if (this.userInfo.errCode) {
			return this.userInfo
		}
		return db.collection(dbCollectionName).get()
	},
	async update(_id, value) {
		if (this.userInfo.errCode) {
			return this.userInfo
		}
		value.update_time = Date.now()
		const result = await db.collection(dbCollectionName).doc(_id).update(value)
		return result
	},
	async remove(_id) {
		if (this.userInfo.errCode) {
			return this.userInfo
		}
		const result = await db.collection(dbCollectionName).doc(_id).remove()
		return result
	},
	async removeBatch(ids) {
		if (this.userInfo.errCode) {
			return this.userInfo
		}
		const result = await db.collection(dbCollectionName).where({
			_id: dbCmd.in(ids)
		}).remove()
		return result
	}
}