const db = uniCloud.database();
const dbJQL = uniCloud.databaseForJQL()
const dbCmd = db.command;

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
					if (field === "username") {} else {
						where[field] = new RegExp(value)
					}
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



export async function getPage({
	cn,
	param
}) {
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

	if (Object.keys(param.filter).includes("username")) {
		let {
			type,
			value
		} = param.filter["username"]
		if (value) {
			const {
				result
			} = await db.collection('uni-id-users').where({
				username: new RegExp(value)
			}).field("_id").get()
			if (result && result.data && result.data.length > 0) {
				const userIds = result.data.map(item => item._id)
				where["user_id"] = dbCmd.in(userIds)
			} else {
				where["user_id"] = ""
			}
		}
	}

	let orderBy = param.orderBy
	if (!(orderBy && orderBy.length)) {
		orderBy = ''
	}

	const listTemp = await db.collection(cn)
		.where(where)
		.field('create_time,update_time,title,content,user_id')
		.orderBy(orderBy)
		.skip(skip)
		.limit(pageSize)
		.getTemp()
	const userTemp = await db.collection('uni-id-users').field("_id, username").getTemp()
	const {
		result
	} = await db.collection(listTemp, userTemp).field(
		'create_time,update_time,title,content, arrayElemAt(user_id.username, 0) as username'
	).get({
		getCount: true
	})
	return {
		data: result.data,
		count: result.count,
		pageCurrent: pageCurrent,
		pageSize: pageSize
	}
}

export async function exportData({
	cn
}) {
	const listTemp = await db.collection(cn)
		.field('create_time,update_time,title,content,user_id')
		.getTemp()
	const userTemp = await db.collection('uni-id-users').field("_id, username").getTemp()
	return db.collection(listTemp, userTemp).field(
		'timestampToDate(create_time) as createTime,timestampToDate(update_time) as updateTime,title,content, arrayElemAt(user_id.username, 0) as username'
	).get()
}