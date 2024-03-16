<template>
	<el-dialog v-model="dialogVisible" fullscreen>
		<div class="dialog-box">
			<section class="header-box">
				<div class="header-left">
					<el-button type="danger"><i class="el-icon-delete-solid el-icon--left"></i>重置</el-button>
					<el-button type="primary">预览</el-button>
					<el-button>查看JSON </el-button>
					<el-button>导入JSON </el-button>
					<el-button>导出JSON </el-button>
					<input type="file" ref="file" id="file" accept=".json" style="display: none" />
				</div>
				<div class="header-right">
					<el-button type="primary">提交</el-button>
				</div>
			</section>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name: 'ModuleEdit',
		data() {
			return {
				dialogVisible: false
			}
		},
		methods: {
			add() {
				this.dialogVisible = true;
			},
		}
	}
</script>

<style lang="scss">
	.el-dialog__body {
		padding: 0 !important;
		background: #f7f8fa;
	}

	.el-dialog.is-fullscreen {
		background-color: #f7f8fa;
	}

	.el-dialog__header {
		background-color: #ffffff;
	}
</style>

<style lang="scss" scoped>
	.pointer-events {
		pointer-events: none;
	}

	.header-box {
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;

		border-bottom: 1px solid #ebedf0;
		box-sizing: border-box;
		padding: 0 15px 15px;
	}

	.content-box {

		display: flex;
		justify-content: space-between;
		background: #f7f8fa;
	}

	/* 中间-手机容器 */
	.middle-box {
		width: 55%;
		// height: 100%;
		overflow-y: scroll;
		display: flex;
		justify-content: center;
		background: #f7f8fa;

		&::-webkit-scrollbar {
			width: 1px;
		}


		/* 手机样式 */
		.phoneAll {
			width: 375px;
			min-height: 760px;
			box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
			margin-top: 40px;
			position: relative;

			/* 手机高度 */
			.phoneSize {
				position: absolute;
				left: -137px;
				top: 640px;
				font-size: 12px;
				color: #a2a2a2;
				border-bottom: 1px solid #dedede;
				width: 130px;
				height: 21px;
				line-height: 21px;
			}

			/* 状态栏 */
			.statusBar {
				width: 100%;
				display: block;
			}

			/* 主体内容 */
			.phone-container {
				min-height: 603px;
				box-sizing: border-box;
				cursor: pointer;
				width: 100%;
				position: relative;
				background-repeat: no-repeat;
				background-size: 100% 100%;

				.componentsClass {
					border: 1px solid #fff;

					&:hover {
						border: 1px dashed #155bd4;
					}
				}
			}
		}
	}

	/* 右侧-工具栏 */
	.right-box {
		width: 376px;
		overflow-y: scroll;
		overflow-x: hidden;
		position: relative;
		padding: 0 12px;
		background: #fff;

		&::-webkit-scrollbar {
			width: 1px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #155bd4;
		}
	}

	/* 右侧-设置tab */
	.tab-box {
		position: fixed;
		right: 390px;
		top: 140px;
		display: flex;
		flex-direction: column;

		span {
			background-color: #fff;
			box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
			border-radius: 2px;
			width: 94px;
			height: 32px;
			display: inline-block;
			text-align: center;
			line-height: 32px;
			margin-bottom: 12px;
			transition: all 0.8s;
			cursor: pointer;

			&.active {
				background-color: #155bd4;
				color: #fff;
			}

			i {
				font-size: 12px;
				margin-right: 5px;
			}
		}
	}

	/* 中间-删除组件 */
	.delete-box {
		position: absolute;
		min-width: 80px;
		text-align: center;
		line-height: 25px;
		background: #fff;
		height: 25px;
		font-size: 12px;
		left: 103%;
		top: 50%;
		transform: translateY(-50%);

		.icon-sanjiaoxingzuo {
			position: absolute;
			left: -11px;
			color: #fff;
			font-size: 12px;
			top: 50%;
			transform: translateY(-50%);
		}

		&:hover {
			i {
				display: block;
				position: absolute;
				left: 0;
				font-size: 16px;
				top: 0;
				text-align: center;
				line-height: 25px;
				width: 100%;
				color: #fff;
				height: 100%;
				z-index: 10;
				background: rgba(0, 0, 0, 0.5);
			}

			.icon-sanjiaoxingzuo {
				color: rgba(0, 0, 0, 0.5);
			}
		}

		i {
			display: none;
		}
	}

	/* 动画 */
	.decorateAnima-enter-active {
		transition: all 1.5s ease;
	}

	.decorateAnima-leave-active {
		transition: all 1.5s ease;
	}

	.decorateAnima-enter {
		transform: translate(8px, 8px);
		opacity: 0;
	}

	.decorateAnima-leave-to {
		transform: translate(8px, 8px);
		opacity: 0;
	}
</style>