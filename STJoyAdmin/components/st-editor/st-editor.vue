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
					{{formats}}
					<view v-for="(item, index) in listFormat" :key="index" :style="item.style" :class="item.iconClass"
						:data-name="item.name" :data-value="item.value">
						<view :class="{'select': onSelect(item)}">
						</view>
					</view>
					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
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
					

					<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''"
						class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#00ff00"></view>
						
						
						<view style="color: red;"
							class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#ff0000"></view>
						
					<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
					<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
						data-name="list" data-value="ordered"></view>
					<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
						data-name="list" data-value="bullet"></view>

					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>

					<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
					<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
					<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
						data-name="header" :data-value="1"></view>
					<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao"
						data-name="script" data-value="sub"></view>
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
					"color": "#c7c8c9"
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
						value: '#a2a3a4',
						iconClass: 'iconfont icon-text_color',
						style: {
							color: '#a2a3a4',
						}
					},
					{
						name: 'color',
						value: '#c7c8c9',
						iconClass: 'iconfont icon-text_color',
						style: {
							color: '#c7c8c9',
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
						value: '#ff9200',
						iconClass: 'iconfont icon-text_color',
						style: {
							color: '#ff9200',
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
				],
				textColors: [
					"#171a1d",
					"#747678",
					"#a2a3a4",
					"#c7c8c9",
				]
			}
		},
		methods: {
			onSelect(item) {
				const value = this.formats[item.name]
				if (typeof value === 'boolean') {
					return value
				} else if (typeof value === 'string') {
					return value === item.value
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