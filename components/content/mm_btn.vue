<template>
	<!-- 按钮 -->
	<button :class="'mm_btn' + te" v-if="!url" @click="click_down()">
		<slot></slot>
	</button>
	<button :class="'mm_btn' + te" @click="openBrowser()" v-else-if="url.indexOf('//') !== -1">
		<slot></slot>
	</button>
	<a :class="'mm_btn' + te" :url="url" hover-class="a-hover" v-else>
		<slot></slot>
	</a>
</template>

<script>
	export default {
		props: {
			url: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: ""
			},
			func: {
				type: Function,
				default: function(){}
			}
		},
		data() {
			return {
				te: ""
			}
		},
		methods: {
			openBrowser() {
				if (window) {
					window.open(this.url);
				}
			},
			click_down(){
				if(this.func)
				{
					this.func();
				}
			}
		},
		created() {
			var t = this.type;
			if (t) {
				if (t.indexOf("_") == -1) {
					this.te = "_" + t;
				}
			}
		}
	}
</script>

<style>
</style>
