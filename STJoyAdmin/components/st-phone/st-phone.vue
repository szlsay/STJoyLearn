<template>
	<view class="st-phone">
		<view class="phone-bar"></view>
		<view class="phone-content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "st-phone",
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss" scoped>
	.st-phone {
		position: relative;
		background-color: #fff;
		border-radius: 50px;
		width: 414px;
		height: 896px;
		border: 20px solid #1D1D1D;

		.phone-bar {
			background-color: #1D1D1D;
			width: 224px;
			height: 32px;
			border-bottom-left-radius: 32px;
			border-bottom-right-radius: 32px;
			margin: 0 auto;
		}
		.phone-content{
			overflow-y: auto;
			max-height: 864px;
		}
	}
</style>