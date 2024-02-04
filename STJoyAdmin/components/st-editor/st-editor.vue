<template>
	<view class="st-editor">
		<view class="editor-left">
			<st-phone>
				<view></view>
			</st-phone>
		</view>
		<view class="editor-right">
			<view class="st-edit-tool" @tap="format">
				<uni-row>
					<view v-for="(item, index) in listFormat" :key="index" :style="item.style" :class="item.iconClass"
						:data-name="item.name" :data-value="item.value">
						<view :class="{'select': onSelect(item)}">
						</view>
					</view>
					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>
					<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
						<view class="iconfont icon-shanchu" @tap="clear"></view>
				</uni-row>
			</view>
			<view class="editor-wrapper">
				<editor id="editor" class="ql-container" placeholder="开始输入..." show-img-size show-img-toolbar show-img-resize
					@statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
				</editor>
			</view>
		</view>
	</view>
	<!-- 	<view class="container">
		<view class="page-body">
			<view class='wrapper'>
								<view class='toolbar' @tap="format" style="height: 80px;overflow-y: auto;">
								
					<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao"
						data-name="script" data-value="super"></view>

					<view class="iconfont icon-shanchu" @tap="clear"></view>
				</view>

				<view class="editor-wrapper">
					<editor id="editor" class="ql-container" placeholder="开始输入..." show-img-size show-img-toolbar show-img-resize
						@statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
					</editor>
				</view>
				<view>
					<button @tap="getCon">打印文本内容</button>
				</view>
			</view>
		</view>
	</view> -->
</template>

<script>
	export default {
		data() {
			return {
				readOnly: false,
				formats: {
					"color": "#007fff"
				},
				listFormat: [{
						name: 'color',
						value: '#171a1d',
						iconClass: 'iconfont icon-text_color',
						style: {
							color: '#171a1d'
						}
					},
					{
						name: 'color',
						value: '#747678',
						iconClass: 'iconfont icon-text_color',
						style: {
							color: '#747678'
						}
					},
					{
						name: 'color',
						value: '#007fff',
						iconClass: 'iconfont icon-text_color',
						style: {
							color: '#007fff',
						}
					}, {
						name: 'color',
						value: '#00b042',
						iconClass: 'iconfont icon-text_color',
						style: {
							color: '#00b042',
						}
					}, {
						name: 'color',
						value: '#ff5219',
						iconClass: 'iconfont icon-text_color',
						style: {
							color: '#ff5219',
						}
					},
					{
						name: 'backgroundColor',
						value: '#171a1d',
						iconClass: 'iconfont icon-fontbgcolor',
						style: {
							color: '#171a1d'
						}
					},
					{
						name: 'backgroundColor',
						value: '#747678',
						iconClass: 'iconfont icon-fontbgcolor',
						style: {
							color: '#747678'
						}
					},
					{
						name: 'backgroundColor',
						value: '#007fff',
						iconClass: 'iconfont icon-fontbgcolor',
						style: {
							color: '#007fff',
						}
					}, {
						name: 'backgroundColor',
						value: '#00b042',
						iconClass: 'iconfont icon-fontbgcolor',
						style: {
							color: '#00b042',
						}
					}, {
						name: 'backgroundColor',
						value: '#ff5219',
						iconClass: 'iconfont icon-fontbgcolor',
						style: {
							color: '#ff5219',
						}
					},
					{
						name: 'bold',
						value: 'bold',
						iconClass: 'iconfont icon-zitijiacu'
					},
					{
						name: 'italic',
						value: 'italic',
						iconClass: 'iconfont icon-zitixieti'
					},
					{
						name: 'underline',
						value: 'underline',
						iconClass: 'iconfont icon-zitixiahuaxian'
					},
					{
						name: 'strike',
						value: 'strike',
						iconClass: 'iconfont icon-zitishanchuxian'
					},
					{
						name: 'align',
						value: 'left',
						iconClass: 'iconfont icon-zuoduiqi'
					},
					{
						name: 'align',
						value: 'center',
						iconClass: 'iconfont icon-juzhongduiqi'
					},
					{
						name: 'align',
						value: 'right',
						iconClass: 'iconfont icon-youduiqi'
					},
					{
						name: 'align',
						value: 'justify',
						iconClass: 'iconfont icon-zuoyouduiqi'
					},
					{
						name: 'lineHeight',
						value: '2',
						iconClass: 'iconfont icon-line-height'
					},
					{
						name: 'letterSpacing',
						value: '2em',
						iconClass: 'iconfont icon-Character-Spacing'
					},
					{
						name: 'marginTop',
						value: '20px',
						iconClass: 'iconfont icon-722bianjiqi_duanqianju'
					},
					{
						name: 'marginBottom',
						value: '20px',
						iconClass: 'iconfont icon-723bianjiqi_duanhouju'
					},
					{
						name: 'fontSize',
						value: '14px',
						iconClass: 'iconfont icon-fontsize',
						style: {
							fontSize: '14px',
						}
					},
					{
						name: 'fontSize',
						value: '16px',
						iconClass: 'iconfont icon-fontsize',
						style: {
							fontSize: '16px',
						}
					},
					{
						name: 'fontSize',
						value: '18px',
						iconClass: 'iconfont icon-fontsize',
						style: {
							fontSize: '18px',
						}
					},
					{
						name: 'fontSize',
						value: '20px',
						iconClass: 'iconfont icon-fontsize',
						style: {
							fontSize: '20px',
						}
					},
					{
						name: 'header',
						value: '1',
						iconClass: 'iconfont icon-format-header-1'
					},
					{
						name: 'header',
						value: '2',
						iconClass: 'iconfont icon-format-header-2'
					},
					{
						name: 'header',
						value: '3',
						iconClass: 'iconfont icon-format-header-3'
					},
					{
						name: 'header',
						value: '4',
						iconClass: 'iconfont icon-format-header-4'
					},
					{
						name: 'list',
						value: 'ordered',
						iconClass: 'iconfont icon-youxupailie'
					},
					{
						name: 'list',
						value: 'bullet',
						iconClass: 'iconfont icon-wuxupailie'
					},
					{
						name: 'indent',
						value: '-1',
						iconClass: 'iconfont icon-outdent'
					},
					{
						name: 'indent',
						value: '+1',
						iconClass: 'iconfont icon-indent'
					},
				],
			}
		},
		methods: {
			onSelect(item) {
				const value = this.formats[item.name]
				console.log(value, typeof value, item.value)
				if (typeof value === 'boolean') {
					return value
				} else if (typeof value === 'string') {
					return value === item.value
				} else if (typeof value === 'number') {
					return value.toString() === item.value
				} else {
					return false
				}
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			getCon() {
				this.editorCtx.getContents({
					success: (res) => {
						console.log('文本详情：', res)
					},
					fail: (err) => {
						// console.log(err)
					}
				})
			},
			onEditorReady() {
				console.log('onEditorReady0');
				uni.createSelectorQuery().select('#editor').context((res) => {
					console.log('onEditorReady1', res);
					this.editorCtx = res.context
					for (let key in this.formats) {
						this.editorCtx.format(key, this.formats[key])
					}
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				uni.showModal({
					title: '清空编辑器',
					content: '确定清空编辑器全部内容？',
					success: res => {
						if (res.confirm) {
							this.editorCtx.clear({
								success: function(res) {
									console.log("clear success")
								}
							})
						}
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./editor-icon.css";

	.st-editor {
		background-color: red;
		display: flex;

		.editor-left {
			margin: 16px;
		}

		.editor-right {
			margin: 16px;
			width: 414px;
			background-color: #fff;

			.st-edit-tool {
				.iconfont {
					position: relative;
				}

				.select {
					position: absolute;
					top: 8px;
					right: 8px;
					background-color: red;
					width: 8px;
					height: 8px;
					border-radius: 4px;
				}
			}
		}
	}

	.page-body {
		height: calc(100vh - var(--window-top) - var(--status-bar-height));
	}

	.wrapper {
		height: 100%;
	}

	.editor-wrapper {
		height: calc(100vh - var(--window-top) - var(--status-bar-height) - 80px - 46px);
		background: #fff;
	}

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}

	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		/* margin-top: 20px; */
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>