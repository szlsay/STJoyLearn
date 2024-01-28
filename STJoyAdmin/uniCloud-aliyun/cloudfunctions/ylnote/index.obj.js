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
	},
	async getPage(param) {
		let pageCurrent = param.pageCurrent
		if (!(pageCurrent && pageCurrent > 0)) {
			pageCurrent = 1
		}
		let pageSize = param.pageSize
		if (!(pageSize && pageSize > 0)) {
			pageSize = 20
		}
		const skip = (pageCurrent - 1) * pageSize

		let where = filterToWhere(param.filter, dbCmd)
		if (!(where && Object.keys(where).length)) {
			where = {}
		}

		let orderBy = param.orderBy
		if (!(orderBy && orderBy.length)) {
			orderBy = ''
		}
		const result = await dbJQL.collection(dbCollectionName)
			.where(where)
			.skip(skip)
			.limit(pageSize)
			.orderBy(orderBy)
			.get({
				getCount: true
			})
		return {
			data: result.data,
			count: result.count,
			pageCurrent: pageCurrent,
			pageSize: pageSize
		}
	}
}

function filterToWhere(filter, command) {
	let where = {}
	for (let field in filter) {
		let {
			type,
			value
		} = filter[field]
		switch (type) {
			case "search":
				if (typeof value === 'string' && value.length) {
					where[field] = new RegExp(value)
				}
				break;
			case "select":
				if (value.length) {
					let selectValue = []
					for (let s of value) {
						selectValue.push(command.eq(s))
					}
					where[field] = command.or(selectValue)
				}
				break;
			case "range":
				if (value.length) {
					let gt = value[0]
					let lt = value[1]
					where[field] = command.and([command.gte(gt), command.lte(lt)])
				}
				break;
			case "date":
				if (value.length) {
					let [s, e] = value
					let startDate = new Date(s)
					let endDate = new Date(e)
					where[field] = command.and([command.gte(startDate), command.lte(endDate)])
				}
				break;
			case "timestamp":
				if (value.length) {
					let [startDate, endDate] = value
					where[field] = command.and([command.gte(startDate), command.lte(endDate)])
				}
				break;
		}
	}
	return where
}