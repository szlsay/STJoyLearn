<template>
	<uni-popup ref="popup" type="center" :animation="false" :is-mask-click="false">
		<view class="popup-box">
			<view class="title">新增日记</view>
			<uni-forms ref="form" :model="formData" validateTrigger="bind">
				<uni-forms-item name="title" label="标题">
					<uni-easyinput placeholder="标题" v-model="formData.title" trim="both"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="content" label="文章内容">
					<uni-easyinput placeholder="文章内容" v-model="formData.content" trim="right"></uni-easyinput>
				</uni-forms-item>
				<view class="uni-button-group">
					<button class="uni-button" style="width: 100px;" @click="close">关闭</button>
					<button type="primary" class="uni-button" style="width: 100px; margin-left: 15px;" @click="submit">提交</button>
				</view>
			</uni-forms>
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
			add() {
				this.formData = {
					"title": "",
					"content": ""
				}
				this.$refs.popup.open('center')
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
				uniCloud.importObject("ylnote").add(value).then((res) => {
					uni.showToast({
						title: '新增成功'
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
<style lang="scss">
	.popup-box {
		background-color: #fff;
		min-width: 500px;
		padding: 32px;
		border-radius: 8px;

		.title {
			text-align: center;
			margin-bottom: 20px;
		}
	}
</style>