const db = uniCloud.database();
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
	}
}