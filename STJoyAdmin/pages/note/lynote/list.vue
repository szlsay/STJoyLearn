<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
				<button class="uni-button" type="default" size="mini" @click="search">搜索</button>
				<button class="uni-button" type="default" size="mini" @click="onAdd">新增</button>
				<button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length"
					@click="onDeleteBatch">批量删除</button>
				<download-excel class="hide-on-phone" :fields="exportExcel.fields" :data="exportExcelData"
					:type="exportExcel.type" :name="exportExcel.filename">
					<button class="uni-button" type="primary" size="mini">导出 Excel</button>
				</download-excel>
			</view>
		</view>
		{{where}}
		<view class="uni-container">
		<!-- 	<unicloud-db ref="udb" :collection="collectionList" field="create_time,update_time,user_id,title,content"
				:where="where" page-data="replace" :orderby="orderby" :getcount="true" :page-size="options.pageSize"
				:page-current="options.pageCurrent" v-slot:default="{data,pagination,loading,error,options}" :options="options"
				loadtime="manual" @load="onqueryload"> -->
				<uni-table ref="table" :loading="loading" emptyText="没有更多数据" border stripe type="selection" @selection-change="onSelectionChange">
					<uni-tr>
						<uni-th align="center" filter-type="timestamp" @filter-change="filterChange($event, 'create_time')" sortable
							@sort-change="sortChange($event, 'create_time')">create_time</uni-th>
						<uni-th align="center" filter-type="timestamp" @filter-change="filterChange($event, 'update_time')" sortable
							@sort-change="sortChange($event, 'update_time')">update_time</uni-th>
						<uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'user_id')" sortable @sort-change="sortChange($event, 'user_id')">user_id</uni-th>
						<uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'title')" sortable
							@sort-change="sortChange($event, 'title')">标题</uni-th>
						<uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'content')" sortable
							@sort-change="sortChange($event, 'content')">文章内容</uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">
							<uni-dateformat :threshold="[0, 0]" :date="item.create_time"></uni-dateformat>
						</uni-td>
						<uni-td align="center">
							<uni-dateformat :threshold="[0, 0]" :date="item.update_time"></uni-dateformat>
						</uni-td>
						<uni-td align="center">{{item.user_id}}</uni-td>
						<uni-td align="center">{{item.title}}</uni-td>
						<uni-td align="center">{{item.content}}</uni-td>
						<uni-td align="center">
							<view class="uni-group">
								<button @click="onEdit(item)" class="uni-button" size="mini" type="primary">修改</button>
								<button @click="onDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box">
					<uni-pagination show-icon :page-size="options.pageSize" v-model="options.pageCurrent" :total="count"
						@change="onPageChanged" />
				</view>
			<!-- </unicloud-db> -->
		</view>
	</view>
	<NotePopup ref="notePopup" @finish="onLoad"></NotePopup>
</template>

<script>
	import {
		enumConverter,
		filterToWhere
	} from '@/js_sdk/validator/ly-note.js';
	import NotePopup from './NotePopup.vue'
	const db = uniCloud.database()
	const dbOrderBy = ''
	const dbSearchFields = []
	const pageSize = 20
	const pageCurrent = 1



	export default {
		components: {
			NotePopup
		},
		data() {
			return {
				loading: false,
				data: [],
				count: 0,
				collectionList: "ly-note",
				query: '',
				where: '',
				orderby: dbOrderBy,
				orderByFieldName: "",
				selectedIndexs: [],
				options: {
					pageSize,
					pageCurrent,
					filterData: {},
					...enumConverter
				},
				imageStyles: {
					width: 64,
					height: 64
				},
				exportExcel: {
					"filename": "ly-note.xls",
					"type": "xls",
					"fields": {
						"create_time": "create_time",
						"update_time": "update_time",
						"user_id": "user_id",
						"标题": "title",
						"文章内容": "content"
					}
				},
				exportExcelData: []
			}
		},
		onLoad() {
			this._filter = {}
		},
		onReady() {
			// this.$refs.udb.onLoad()
			this.onLoad()
		},
		methods: {
			onAdd() {
				this.$refs.notePopup.add()
			},
			onEdit(row) {
				this.$refs.notePopup.edit(row)
			},
			onDelete(id) {
				const that = this
				uni.showModal({
					title: "提示",
					content: '确定要删除该数据吗？',
					success: function(res) {
						if (res.confirm) {
							that.handlerDelete(id)
						}
					}
				});
			},
			handlerDelete(id) {
				const that = this
				uniCloud.importObject("ylnote").remove(id).then((res) => {
					that.$refs.table.clearSelection()
					that.onLoad()
				})
			},
			onSelectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			onDeleteBatch() {
				const that = this
				uni.showModal({
					title: "提示",
					content: '确定要删除该数据吗？',
					success: function(res) {
						if (res.confirm) {
							that.handlerDeleteBatch()
						}
					}
				});
			},
			handlerDeleteBatch() {
				const dataList = this.$refs.udb.dataList
				const ids = this.selectedIndexs.map(i => dataList[i]._id)
				const that = this
				uniCloud.importObject("ylnote").removeBatch(ids).then((res) => {
					that.$refs.table.clearSelection()
					that.onLoad()
				})
			},
			onLoad() {
				this.loading = true
				const param = {
					pageCurrent: this.options.pageCurrent,
					pageSize: this.options.pageSize,
					filter: this._filter,
					orderBy: this.orderby
				}
				console.log(0, param)
				uniCloud.importObject("ylnote").getPage(param).then(res => {
					console.log(1, res)
					const {data, count, pageCurrent, pageSize} = res
					this.data = data
					this.count = count
					this.options.pageCurrent = pageCurrent
					this.options.pageSize = pageSize
				}).finally(() => {
					this.loading = false
				})
			},
			onqueryload(data) {
				this.exportExcelData = data
			},
			getWhere() {
				const query = this.query.trim()
				if (!query) {
					return ''
				}
				const queryRe = new RegExp(query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},
			search() {
				const newWhere = this.getWhere()
				this.where = newWhere
				this.onLoad()
			},
			onPageChanged(e) {
				this.selectedIndexs.length = 0
				this.$refs.table.clearSelection()
				this.onLoad()
				// this.$refs.udb.onLoad({
				// 	current: e.current
				// })
			},
			sortChange(e, name) {
				const orderByMapping = {
					"ascending": "asc",
					"descending": "desc"
				}
				this.orderByFieldName = name;
				if (e.order) {
					this.orderby = name + ' ' + orderByMapping[e.order]
				} else {
					this.orderby = ''
				}
				this.$refs.table.clearSelection()
				this.onLoad()
			},
			filterChange(e, name) {
				this._filter[name] = {
					type: e.filterType,
					value: e.filter
				}
				this.onLoad()
			}
		}
	}
</script>

<style>
</style>