<template>
	<!-- 弹出式提示 -->
	<div class="mm_toast">
		<slot></slot>
	</div><!--/view-->
</template>

<script>
	export default {
		props: {
			// 显示方式
			display: {
				type: String,
				default: "1"
			},
			// 显示隐藏
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {

		},
		created() {

		}
	}
</script>

<style>

</style>
