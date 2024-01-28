<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<button class="uni-button" type="default" size="mini" @click="onAdd">新增</button>
				<button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length"
					@click="onDeleteBatch">批量删除</button>
				<download-excel ref="downloadExcel" class="hide-on-phone" :fields="exportExcel.fields" :data="exportExcelData"
					:type="exportExcel.type" :name="exportExcel.filename">
					<button class="uni-button" type="primary" size="mini" @click="onExport">导出 Excel</button>
				</download-excel>
			</view>
		</view>
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" emptyText="没有更多数据" border stripe type="selection"
				@selection-change="onSelectionChange">
				<uni-tr>
					<uni-th :align="item.align" :filter-type="item.filterType"
						@filter-change="onFilterChange($event, item.event)" sortable @sort-change="onSortChange($event, item.event)"
						v-for="(item, index) in table" :key="index">{{item.title}}</uni-th>
					<!-- 					<uni-th align="center" filter-type="timestamp" @filter-change="onFilterChange($event, 'create_time')" sortable
						@sort-change="onSortChange($event, 'create_time')">create_time</uni-th>
					<uni-th align="center" filter-type="timestamp" @filter-change="onFilterChange($event, 'update_time')" sortable
						@sort-change="onSortChange($event, 'update_time')">update_time</uni-th>
					<uni-th align="center" filter-type="search" @filter-change="onFilterChange($event, 'user_id')" sortable
						@sort-change="onSortChange($event, 'user_id')">user_id</uni-th>
					<uni-th align="center" filter-type="search" @filter-change="onFilterChange($event, 'title')" sortable
						@sort-change="onSortChange($event, 'title')">标题</uni-th>
					<uni-th align="center" filter-type="search" @filter-change="onFilterChange($event, 'content')" sortable
						@sort-change="onSortChange($event, 'content')">文章内容</uni-th> -->
					<uni-th align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item,index) in data" :key="index">
					<!-- 					<uni-td align="center">
						<uni-dateformat :threshold="[0, 0]" :date="item.create_time"></uni-dateformat>
					</uni-td>
					<uni-td align="center">
						<uni-dateformat :threshold="[0, 0]" :date="item.update_time"></uni-dateformat>
					</uni-td>
					<uni-td align="center">{{item.user_id}}</uni-td> -->
					<uni-td align="center">{{item.title}}</uni-td>
					<!-- <uni-td align="center">{{item.content}}</uni-td> -->
					<uni-td align="center">
						<view class="uni-group">
							<button @click="onEdit(item)" class="uni-button" size="mini" type="primary">修改</button>
							<button @click="onDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box">
				<uni-pagination show-icon :page-size="param.pageSize" v-model="param.pageCurrent" :total="count"
					@change="onLoad" />
			</view>
		</view>
	</view>
	<NotePopup ref="notePopup" @finish="onLoad"></NotePopup>
</template>

<script>
	import {
		getPage
	} from '@/js_sdk/tool/index.js'
	import NotePopup from './NotePopup.vue'
	export default {
		components: {
			NotePopup
		},
		data() {
			return {
				table: [{
					align: 'center',
					filterType: 'search',
					title: '标题',
					event: 'title'
				}],
				loading: false,
				data: [],
				count: 0,
				where: '',
				selectedIndexs: [],
				param: {
					pageSize: 3,
					pageCurrent: 1,
					filter: {},
					orderby: 'create_time desc',
				},
				exportExcel: {
					"filename": "日记列表.xls",
					"type": "xls",
					"fields": {
						"创建时间": "create_time",
						"更新时间": "update_time",
						"用户标识": "user_id",
						"标题": "title",
						"文章内容": "content"
					}
				},
				exportExcelData: []
			}
		},
		onReady() {
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
				const dataList = this.data
				const ids = this.selectedIndexs.map(i => dataList[i]._id)
				const that = this
				uniCloud.importObject("ylnote").removeBatch(ids).then((res) => {
					that.$refs.table.clearSelection()
					that.onLoad()
				})
			},
			onLoad() {
				this.selectedIndexs.length = 0
				this.$refs.table.clearSelection()
				this.loading = true
				const param = {
					pageCurrent: this.param.pageCurrent,
					pageSize: this.param.pageSize,
					filter: this.param.filter,
					orderBy: this.param.orderby
				}
				getPage({
					cn: 'ly-note',
					param
				}).then(res => {
					const {
						data,
						count,
						pageCurrent,
						pageSize
					} = res
					this.data = data
					this.count = count
					this.param.pageCurrent = pageCurrent
					this.param.pageSize = pageSize
				}).finally(() => {
					this.loading = false
				})
			},
			onFilterChange(e, name) {
				this.param.filter[name] = {
					type: e.filterType,
					value: e.filter
				}
				this.param.pageCurrent = 1
				this.onLoad()
			},
			onExport() {
				uniCloud.importObject("ylnote").export().then(res => {
					const {
						data
					} = res
					this.exportExcelData = data
					const that = this
					this.$nextTick(() => {
						that.$refs.downloadExcel.generate()
					})
				})
			},
			onSortChange(e, name) {
				if (e.order) {
					const orderByMapping = {
						"ascending": "asc",
						"descending": "desc"
					}
					this.param.orderby = name + ' ' + orderByMapping[e.order]
				} else {
					this.param.orderby = ''
				}
				this.onLoad()
			}
		}
	}
</script>

<style>
</style>