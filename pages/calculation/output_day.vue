<template>
	<!-- 每日产出页面 -->
	<div class="page_calculation" id="calculation_output_day">
		<!-- 页主体 -->
		<mm_bodyer>
			<!-- 外套 -->
			<mm_warp>
				<!-- 栅格 -->
				<mm_grid col="1" class="space-x">
					<!-- 格子 -->
					<mm_col>
						<mm_block>
							<!-- <mm_head>
								<mm_main>
									<mm_title><text>总产出：{{ user. }}</text><text class="unit">btc</text></mm_title>
								</mm_main>
							</mm_head> -->
							<mm_head class="font_small">
								<mm_title><text>总产出：{{ counts }}</text><text class="unit">btc</text></mm_title>
							</mm_head>
							<mm_body class="lr">
								<mm_list col="1" class="mini" v-if="list.length > 0">
									<mm_item v-for="(o,k) in list" :key="k">
										<mm_main>
											<mm_title>{{ o.time }}</mm_title>
											<mm_desc class="font_success">
												<text>+{{o.amount}}</text><text class="unit">btc</text>
											</mm_desc>
										</mm_main>
									</mm_item>
								</mm_list>
								<mm_div class="center" v-if="list.length == 0"><text class="font_warning">还有没有任何收益</text></mm_div>
							</mm_body>
						</mm_block>
					</mm_col>
				</mm_grid>
			</mm_warp>
		</mm_bodyer>
	</div><!-- /view -->
</template>

<script>
	import mixin from '@/mixins/page'

	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				oauth: true,
				url_get_list: "~/user/flow",
				query: {
					index: "0",
					size: 1000,
					type: 1
				}
			}
		},
		methods: {
			get_list_after(json, status) {
				if (json.data) {
					var ct = json.data.content;
					if (ct) {
						this.list.clear();
						var _this = this;
						ct.forEach(function(item) {
							if (item.cause.indexOf('挖矿收益') != -1) {
								_this.list.push(item);
							}
						})
					}
				}
			}
		},
		computed: {
			counts() {
				var count = 0;
				var lt = this.list;
				for (var i = 0; i < lt.length; i++) {
					count += Number(lt[i].amount)
				}
				return this.$float(count);
			}
		}
	}
</script>

<style>
	.font_success {
		font-weight: 600;
	}
</style>
