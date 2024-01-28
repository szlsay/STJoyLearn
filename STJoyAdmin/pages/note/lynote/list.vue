<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<button class="uni-button" type="default" size="mini" @click="onAdd">新增</button>
				<button class="uni-button" type="warn" size="mini" :disabled="!selectedIndexs.length"
					@click="onDeleteBatch">批量删除</button>
				<button class="uni-button" type="default" size="mini" @click="onReset">重置</button>
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
					<uni-th :align="th.align" :filter-type="th.filterType" @filter-change="onFilterChange($event, th.event)"
						sortable @sort-change="onSortChange($event, th.event)" v-for="(th, index) in table"
						:key="index">{{th.title}}</uni-th>
					<uni-th align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item,index) in result.data" :key="index">
					<uni-td align="center" v-for="(td, index) in table" :key="index">
						<view v-if="td.type ==='date'">
							<uni-dateformat :threshold="[0, 0]" :date="item[td.prop]"></uni-dateformat>
						</view>
						<view v-if="td.type ==='string'">
							{{item[td.prop]}}
						</view>
						<view v-if="td.type ==='array'">
							{{item[td.prop].join(',')}}
						</view>
					</uni-td>
					<uni-td align="center">
						<view class="uni-group">
							<button @click="onEdit(item)" class="uni-button" size="mini" type="primary">修改</button>
							<button @click="onDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box">
				<uni-pagination show-icon :page-size="param.pageSize" v-model="param.pageCurrent" :total="result.count"
					@change="onLoad" />
			</view>
		</view>
	</view>
	<Modal ref="modal" @finish="onLoad"></Modal>
</template>

<script>
	import {
		getPage,
		exportData
	} from '@/js_sdk/tool/index.js'
	import Modal from './Modal.vue'
	const cn = "ly-note"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				table: [{
						align: 'center',
						filterType: 'search',
						title: '标题',
						event: 'title',
						prop: 'title',
						type: 'string'
					},
					{
						align: 'center',
						filterType: 'search',
						title: '文章内容',
						event: 'content',
						prop: 'content',
						type: 'string'
					},
					{
						align: 'center',
						filterType: 'search',
						title: '用户名称',
						event: 'username',
						prop: 'username',
						type: 'string'
					},
					{
						align: 'center',
						filterType: 'timestamp',
						title: '创建时间',
						event: 'create_time',
						prop: 'create_time',
						type: 'date'
					},
					{
						align: 'center',
						filterType: 'timestamp',
						title: '更新时间',
						event: 'update_time',
						prop: 'update_time',
						type: 'date'
					}
				],
				loading: false,
				result: {
					data: [],
					count: 0,
				},
				selectedIndexs: [],
				param: {
					pageSize: 20,
					pageCurrent: 1,
					filter: {},
					orderby: 'create_time desc',
				},
				exportExcel: {
					"filename": "日记列表.xls",
					"type": "xls",
					"fields": {
						"创建时间": "createTime",
						"更新时间": "updateTime",
						"用户标识": "username",
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
			onReset() {
				this.param = {
					pageSize: 20,
					pageCurrent: 1,
					filter: {},
					orderby: 'create_time desc',
				}
				this.onLoad()
			},
			onAdd() {
				this.$refs.modal.add()
			},
			onEdit(row) {
				this.$refs.modal.edit(row)
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
				uniCloud.importObject(cn).remove(id).then((res) => {
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
				const dataList = this.result.data
				const ids = this.selectedIndexs.map(i => dataList[i]._id)
				const that = this
				uniCloud.importObject(cn).removeBatch(ids).then((res) => {
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
					cn,
					param
				}).then(res => {
					const {
						data,
						count,
						pageCurrent,
						pageSize
					} = res
					this.result.data = data
					this.result.count = count
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
				exportData({
					cn
				}).then(res => {
					const {
						result
					} = res
					this.exportExcelData = result.data
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