export default {
	props: {
		func: {
			type: Object,
			default: function(fun, param1, param2) {
				return null;
			}
		},
		label: {
			type: String,
			default: ""
		},
		url: {
			type: String,
			default: "/"
		},
		display: {
			type: String,
			default: "1"
		},
		loading: {
			type: Boolean,
			default: false
		},
		index: {
			type: Number,
			default: false
		},
		col: {
			type: Number,
			default: 4
		},
		obj: {
			type: Object,
			default: function() {
				return {}
			}
		},
		list: {
			type: Array,
			default: function() {
				return []
			}
		},
		vm: {
			type: Object,
			default: function() {
				return {
					id: 'id', // 当前ID
					fid: 'fid', // 上级ID
					img: 'img', // 图片
					icon: 'icon', // 图标
					title: 'title', // 标题
					desc: 'desc', // 描述
					content: 'content', // 内容
					time: 'time', // 时间
					url: 'url', // 链接
					mode: 'mode', // 方式
					source: 'source', // 来源
					source_url: 'source_url', // 来源地址
					name: 'name', // 名称
					value: 'value', // 值
					tip: 'tip', // 提示
					hot: 'hot', // 热度
					price_old: 'price_old', // 原价
					price: 'price', // 价格
					total: 'total', // 总价
					zan: 'zan' // 点赞数
				}
			}
		}
	},
	computed: {
		item() {
			if (this.list.length > 0) {
				return this.list[this.index]
			} else {
				return {};
			}
		}
	}
};
