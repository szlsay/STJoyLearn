<template>
	<uni-popup ref="popup" type="center" :animation="false" :is-mask-click="false">
		<view class="popup-box">
			<view class="box-left">
				<view class="editor-left">
					<st-phone>
						<view v-html='formData.content'></view>
					</st-phone>
				</view>
				<view class="editor-right">
					<st-editor @finish='onFinish'></st-editor>
				</view>
			</view>
			<view class="box-right">
				<view class="title">{{ formDataId ? "修改日记 " : "新增日记" }}</view>
				<uni-forms ref="form" :model="formData" validateTrigger="bind">
					<uni-forms-item name="title" label="标题">
						<uni-easyinput placeholder="标题" type="textarea" v-model="formData.title" trim="both"></uni-easyinput>
					</uni-forms-item>

					<view class="uni-button-group">
						<button class="uni-button" style="width: 100px;" @click="close">关闭</button>
						<button type="primary" class="uni-button" style="width: 100px; margin-left: 15px;"
							@click="submit">提交</button>
					</view>
				</uni-forms>
			</view>
		</view>
	</uni-popup>
</template>
<script>
	import {
		validator
	} from '@/js_sdk/validator/ly-note.js';

	function getValidator(fields) {
		let result = {}
		for (let key in validator) {
			if (fields.includes(key)) {
				result[key] = validator[key]
			}
		}
		return result
	}
	export default {
		data() {
			let formData = {
				"title": "",
				"content": ""
			}
			return {
				formDataId: null,
				formData,
				rules: {
					...getValidator(Object.keys(formData))
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			onFinish(editorHtml) {
				this.formData.content = editorHtml
			},
			add() {
				this.edit({
					_id: null
				})
			},
			edit(row) {
				this.formData = {
					"title": "",
					"content": ""
				}
				this.$refs.popup.open('center')
				if (row._id) {
					this.formDataId = row._id
					this.formData = {
						"title": row.title,
						"content": row.content
					}
				} else {
					this.formDataId = null
				}
			},
			close() {
				this.$refs.popup.close()
			},
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
					return this.submitForm(res)
				}).finally(() => {
					uni.hideLoading()
				})
			},
			submitForm(value) {
				let requestHandle
				if (this.formDataId) {
					requestHandle = uniCloud.importObject("ylnote").update(this.formDataId, value)
				} else {
					requestHandle = uniCloud.importObject("ylnote").add(value)
				}
				requestHandle.then((res) => {
					const title = this.formDataId ? "修改成功" : "新增成功"
					uni.showToast({
						title: title
					})
					this.$emit("finish")
					this.close()
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.popup-box {
		background-color: #fff;
		display: flex;
		// min-width: 500px;
		// padding: 32px;
		border-radius: 8px;

		.title {
			text-align: center;
			margin-bottom: 20px;
		}
	}

	.box-right {
		padding: 32px;
		min-width: 400px;
	}
	
	.box-left {
		display: flex;

		.editor-left {
			margin: 16px;
		}

		.editor-right {
			margin: 16px;
		}
	}
</style>