<template>
	<view class="st-editor">
		<view class="editor-left">
			<st-phone>
				<view></view>
			</st-phone>
		</view>
		<view class="editor-right">
			{{editorCtx}} {{formats}}
			<view class="st-edit-tool" @tap="format">
				<uni-row>
					<!-- <view>文字色:主要色、次要色、描述色、禁用与占位色。</view> -->
					<view v-for="(item, index) in listFormat" :key="index" :style="item.style" :class="item.iconClass"
						:data-name="item.name" :data-value="item.value">
						<view :class="{'select': formats[item.name] === item.value}">

						</view>
					</view>
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
					
					<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
					<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
					<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
					<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>

					<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi"
						data-name="align" data-value="left"></view>
					<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
						data-name="align" data-value="center"></view>
					<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
						data-name="align" data-value="right"></view>
					<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
						data-name="align" data-value="justify"></view>
						
					<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height"
						data-name="lineHeight" data-value="2"></view>
					<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing"
						data-name="letterSpacing" data-value="2em"></view>
					<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju"
						data-name="marginTop" data-value="20px"></view>
					<view :class="formats.marginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
						data-name="marginBottom" data-value="20px"></view>

					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>

					<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize"
						data-name="fontSize" data-value="24px"></view>
					<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color"
						data-name="color" data-value="#0000ff"></view>
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
				],
				textColors: [
					"#171a1d",
					"#747678",
					"#a2a3a4",
					"#c7c8c9",
				]
			}
		},
		onShow: function() {
			console.log('000 Show')
		},
		methods: {
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