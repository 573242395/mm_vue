import $ from './mm_sdk'
import Vue from 'vue'
import ba from 'vue-ba'
import echarts from 'echarts'

/* 加载组件 */
// import { uniBadge, uniListItem, uniList } from '@dcloudio/uni-ui'

let mm_vue = {
	/// 安装
	/// Vue: 框架
	/// options: 配置参数
	install(Vue, options) {
		// 请求服务器地址
		// var host = 'http://192.168.18.100/';
		var host = 'http://api.bitcentre.com.cn/';
		// var host = 'http://test.linglouyi.tk/';
		// var host = 'http://47.111.123.98/';

		// 判断配置是否存在
		if (options) {
			// 配置主机地址
			if (options.host) {
				host = options.host;
			}
		}

		// 百度统计
		// Vue.use(ba, {
		// 	siteId: "4050cfef8875639e9f260ead2340e963"
		// });

		/* === 注册全局函数 === */
		Vue.prototype.$toTime = function(timeStr, formatStr) {
			return timeStr.toTime().format(formatStr);
		};

		Vue.prototype.$host = function(pathAndQuery) {
			return host + pathAndQuery;
		};

		Vue.prototype.$url = function(url) {
			return window.location.protocol + '//' + window.location.host + url;
		};

		// 复制到粘贴板
		Vue.prototype.$copy = function(text) {
			uni.setClipboardData({
				data: text,
				success: function() {
					uni.showToast({
						title: '复制成功',
						duration: 1500
					});
				}
			});
		};

		// 警告
		Vue.prototype.$alert = function(text, icon) {
			uni.showToast({
				title: text,
				icon: icon,
				duration: 2000
			});
		};

		// 引入数据库处理类
		Vue.prototype.$db = $.db;

		// 引入echarts
		Vue.prototype.$echarts = echarts;

		// 引入mm_sdk的对象处理类
		Vue.prototype.$obj = $.obj;

		/// 引入get请求函数
		/// url: 请求地址
		/// fun: 回调函数
		Vue.prototype.$get = function(url, fun) {
			var token = $.db.get("token");
			$.http.get(url.replace('~/', host), fun, {
				"x-auth-token": token
			});
		};

		/// 引入post请求
		/// url: 请求地址
		/// param: 请求参数
		/// fun: 回调函数
		Vue.prototype.$post = function(url, param, fun) {
			var token = $.db.get("token");
			$.http.postForm(url.replace('~/', host), param, fun, {
				"x-auth-token": token
			});
		};

		/// 跳转到指定页面
		/// url: 跳转网址
		Vue.prototype.$nav = function(url){
			uni.navigateTo({
				url: url
			});
		}

		/// 引入上传请求
		/// url: 上传地址
		/// dict: 上传参数集合, 文件对象传入name 和 uri
		/// fun: 回调函数
		Vue.prototype.$upload = function(url, dict, fun, func) {
			var token = $.db.get("token");
			var dt = $.obj.copy(dict);
			if (dt.files && dt.files.length > 0) {
				var files = dt.files;
				delete dt.files;
				var uploadTask = uni.uploadFile({
					url: url.replace('~/', host),
					header: {
						"x-auth-token": token
					},
					files: files,
					filePath: "",
					name: "",
					formData: dt,
					success: function(ret, status) {
						if (fun) {
							fun(JSON.parse(ret.data));
						}
						// console.log(uploadFileRes.data);
					}
				});
				uploadTask.onProgressUpdate(function(res) {
					if (func) {
						func(res);
					}
				});
			} else if (dt.file) {
				var file = dt.file;
				delete dt.file;
				var uploadTask = uni.uploadFile({
					url: url.replace('~/', host),
					header: {
						"x-auth-token": token
					},
					name: file.name,
					filePath: file.uri,
					formData: dt,
					success: function(ret, status) {
						if (fun) {
							fun(JSON.parse(ret.data));
						}
						// console.log(uploadFileRes.data);
					}
				});
				uploadTask.onProgressUpdate(function(res) {
					if (func) {
						func(res);
					}
				});
			}
		};

		/// 引入浮点数
		/// num: 被转换的数值
		/// 返回: 浮点数数值
		Vue.prototype.$float = function(num) {
			return num.toFloor(8).toStr(8);
		};

		/// 引入双精度
		/// num: 被转换的数值
		/// 返回: 浮点数数值
		Vue.prototype.$double = function(num) {
			return num.toFloor(2).toStr(2);
		};

		/// 科学计数转浮点数
		/// num: 被转换的数值
		/// 返回: 数值
		Vue.prototype.$num = function(num) {
			return new Number(num);
		};

		/// 引入截取字符串函数
		/// str: 被截取的字符串
		/// start: 起始字符串
		/// end: 结束字符串
		Vue.prototype.$substr = function(str, start, end) {
			return str.substring(start, end);
		};

		/// 转字符串并截取长度
		/// value: 被转换的数值
		/// num: 保留长度
		/// 返回: 截取后字符串
		Vue.prototype.$toStr = function(value, num) {
			return value.toStr(num);
		};

		// 引入cookie函数
		Vue.prototype.$cookie = $.db.get;

		/* === 注册过滤器, 备注：过滤器在uni-app中无法使用 === */
		/// 转双精度小数字符串
		/// value: 被转换的数值
		/// 返回: 返回双精度数字符串
		Vue.filter('double', function(value) {
			return parseFloat(value).toFloor(2).toStr(2);
		});

		/// 转浮点数字符串
		/// value: 被转换的数值
		/// 返回: 返回浮点数字符串
		Vue.filter('float', function(value) {
			return parseFloat(value).toFloor(8).toStr(8);
		});
	}
};

// 注册全局组件基类
Vue.mixin(Vue.extend({
	/* === 添加调用缓存的全局方法 === */
	methods: {
		// 读取语言库
		// index: 匹配索引
		// 返回: 匹配词句
		$lang: function(index) {
			return this.$store.state.lang.dict[index];
		},
		// 数字货币转法币
		// coin: 货币数值
		// 返回: 法币数值
		$money: function(coin) {
			return parseFloat(coin * this.$store.state.web.rate).toFloor(2)
		},
		// 法币转数字货币
		// coin: 法币数值
		// 返回: 货币数值
		$coin: function(money) {
			return parseFloat(money / this.$store.state.web.rate).toFloor(8)
		},
		/// 获取用户信息
		/// fun: 回调函数
		$get_user: function(fun) {
			var _this = this;
			var p = _this.$route.path;
			var isLoad = this.$store.state.user.isLoad;
			if (!isLoad) {
				this.$get('~/user/', function(json, status) {
					if (json) {
						if (json.code) {
							_this.$db.set("token", "");
						}
						if (json.data) {
							_this.$store.dispatch('set_user', json.data);
							if (p.indexOf('/sign') == 0 || p.indexOf('/forgot') == 0) {
								uni.navigateTo({
									url: '/pages/home/index'
								});
								return;
							}
						}
					}
					if (fun) {
						fun();
					}
				});
			} else if (fun) {
				fun();
			}
		},
		$user_info: function(fun) {
			var _this = this;
			this.$get('~/user/', function(json, status) {
				if (json) {
					if (json.data) {
						_this.$store.dispatch('set_user', json.data);
						if (fun) {
							fun();
						}
					}
				}
			});
		},
		$get_dbd(fun) {
			if (!this.$store.state.dbd.title) {
				var _this = this;
				_this.$get("~/dbd/", function(json, status) {
					if (json) {
						if (json.data) {
							_this.$store.dispatch('get_dbd', json.data);
							_this.$get('~/paper/title?title=DBD描述', function(json, status) {
								if (json) {
									var lt = json.data;
									if (lt && lt.length > 0) {
										_this.$store.dispatch('get_dbd', lt[0]);
									}
								}
								if (fun) {
									fun();
								}
							});
						}
					}
				});
			} else if (fun) {
				fun();
			}
		},
		$get_agent(fun) {
			if (this.$store.state.user.level < 1) {
				var _this = this;
				_this.$get("~/user/proxy", function(json, status) {
					if (json) {
						if (json.data) {
							_this.$store.dispatch('set_user', json.data);
						}
					}
					if (fun) {
						fun();
					}
				});
			} else if (fun) {
				fun();
			}
		}
	}
}));

Vue.use(mm_vue);
export default mm_vue;
