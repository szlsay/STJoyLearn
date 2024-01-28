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

const db = uniCloud.database();
const dbJQL = uniCloud.databaseForJQL()
const dbCmd = db.command;

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

	let orderBy = param.orderBy
	if (!(orderBy && orderBy.length)) {
		orderBy = ''
	}
	
	const {
		result
	} = await db.collection(cn)
		.where(where)
		.orderBy(orderBy)
		.skip(skip)
		.limit(pageSize)
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