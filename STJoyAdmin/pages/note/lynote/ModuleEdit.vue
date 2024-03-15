<template>
	<el-dialog v-model="dialogVisible" fullscreen>
		123
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