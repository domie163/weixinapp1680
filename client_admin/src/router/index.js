import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue';
import login from '../views/login.vue';
import forgot from '../views/forgot.vue';
Vue.use(VueRouter)

const routes = [
	// 主页
	{
		path: '/',
		name: 'index',
		component: index,
		meta: {
			index: 0,
			title: '首页'
		}
	},

	// 登录
	{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			index: 0,
			title: '登录'
		}
	},


	// 忘记密码
	{
		path: '/forgot',
		name: "forgot",
		component: forgot,
		meta: {
			index: 0,
			title: '忘记密码'
		}
	},

	// 修改密码
	{
		path: '/user/password',
		name: "password",
		component: () => import("../views/user/password.vue"),
		meta: {
			index: 0,
			title: '修改密码'
		}
	},

	// 视频播放页
	{
		path: "/media/video",
		name: "video",
		component: () => import('../views/media/video.vue'),
		meta: {
			index: 0,
			title: "视频"
		}
	},

	// 音频播放页
	{
		path: "/media/audio",
		name: "audio",
		component: () => import('../views/media/audio.vue'),
		meta: {
			index: 0,
			title: "音频"
		}
	},



	// 友情链接路由
	// {
	// 	path: '/link/table',
	// 	name: 'link_table',
	// 	component: () => import('../views/link/table.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '链接列表'
	// 	}
	// },
	// {
	// 	path: '/link/view',
	// 	name: 'link_view',
	// 	component: () => import('../views/link/view.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '链接详情'
	// 	}
	// },

	// 轮播图路由
	{
		path: '/slides/table',
		name: 'slides_table',
		component: () => import('../views/slides/table.vue'),
		meta: {
			index: 0,
			title: '轮播图列表'
		}
	},
	{
		path: '/slides/view',
		name: 'slides_view',
		component: () => import('../views/slides/view.vue'),
		meta: {
			index: 0,
			title: '轮播图详情'
		}
	},
		// 文章路由
	{
		path: '/article/table',
		name: 'article_table',
		component: () => import('../views/article/table.vue'),
		meta: {
			index: 0,
			title: '文章列表'
		}
	},
	{
		path: '/article/view',
		name: 'article_view',
		component: () => import('../views/article/view.vue'),
		meta: {
			index: 0,
			title: '文章详情'
		}
	},

	// 文章分类路由
	{
		path: '/article_type/table',
		name: 'article_type_table',
		component: () => import('../views/article_type/table.vue'),
		meta: {
			index: 0,
			title: '文章分类列表'
		}
	},
	{
		path: '/article_type/view',
		name: 'article_type_view',
		component: () => import('../views/article_type/view.vue'),
		meta: {
			index: 0,
			title: '文章分类详情'
		}
	},
	
	// 广告路由
	// {
	// 	path: '/ad/table',
	// 	name: 'ad_table',
	// 	component: () => import('../views/ad/table.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '广告列表'
	// 	}
	// },
	// {
	// 	path: '/ad/view',
	// 	name: 'ad_view',
	// 	component: () => import('../views/ad/view.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '广告详情'
	// 	}
	// },



	// 公告路由
	{
		path: '/notice/table',
		name: 'notice_table',
		component: () => import('../views/notice/table.vue'),
		meta: {
			index: 0,
			title: '公告通知列表'
		}
	},
	{
		path: '/notice/view',
		name: 'notice_view',
		component: () => import('../views/notice/view.vue'),
		meta: {
			index: 0,
			title: '公告通知详情'
		}
	},


	// 评论路由
	{
		path: '/comment/table',
		name: 'comment_table',
		component: () => import('../views/comment/table.vue'),
		meta: {
			index: 0,
			title: '评论列表'
		}
	},
	{
		path: '/comment/view',
		name: 'comment_view',
		component: () => import('../views/comment/view.vue'),
		meta: {
			index: 0,
			title: '评论详情'
		}
	},

	// 注册用户路由
	{
		path: '/registered_users/table',
		name: 'registered_users_table',
		component: () => import('../views/registered_users/table.vue'),
		meta: {
			index: 0,
			title: '注册用户列表'
		}
	},
	{
		path: '/registered_users/view',
		name: 'registered_users_view',
		component: () => import('../views/registered_users/view.vue'),
		meta: {
			index: 0,
			title: '注册用户详情'
		}
	},
	// 实验室路由
	{
		path: '/laboratory/table',
		name: 'laboratory_table',
		component: () => import('../views/laboratory/table.vue'),
		meta: {
			index: 0,
			title: '实验室列表'
		}
	},
	{
		path: '/laboratory/view',
		name: 'laboratory_view',
		component: () => import('../views/laboratory/view.vue'),
		meta: {
			index: 0,
			title: '实验室详情'
		}
	},
	// 预约信息路由
	{
		path: '/appointment_information/table',
		name: 'appointment_information_table',
		component: () => import('../views/appointment_information/table.vue'),
		meta: {
			index: 0,
			title: '预约信息列表'
		}
	},
	{
		path: '/appointment_information/view',
		name: 'appointment_information_view',
		component: () => import('../views/appointment_information/view.vue'),
		meta: {
			index: 0,
			title: '预约信息详情'
		}
	},
	// 设备器材路由
	{
		path: '/equipment_and_equipment/table',
		name: 'equipment_and_equipment_table',
		component: () => import('../views/equipment_and_equipment/table.vue'),
		meta: {
			index: 0,
			title: '设备器材列表'
		}
	},
	{
		path: '/equipment_and_equipment/view',
		name: 'equipment_and_equipment_view',
		component: () => import('../views/equipment_and_equipment/view.vue'),
		meta: {
			index: 0,
			title: '设备器材详情'
		}
	},
	// 设备借用路由
	{
		path: '/equipment_borrowing/table',
		name: 'equipment_borrowing_table',
		component: () => import('../views/equipment_borrowing/table.vue'),
		meta: {
			index: 0,
			title: '设备借用列表'
		}
	},
	{
		path: '/equipment_borrowing/view',
		name: 'equipment_borrowing_view',
		component: () => import('../views/equipment_borrowing/view.vue'),
		meta: {
			index: 0,
			title: '设备借用详情'
		}
	},
	// 设备归还路由
	{
		path: '/equipment_return/table',
		name: 'equipment_return_table',
		component: () => import('../views/equipment_return/table.vue'),
		meta: {
			index: 0,
			title: '设备归还列表'
		}
	},
	{
		path: '/equipment_return/view',
		name: 'equipment_return_view',
		component: () => import('../views/equipment_return/view.vue'),
		meta: {
			index: 0,
			title: '设备归还详情'
		}
	},
	// 报修检修路由
	{
		path: '/repair_and_maintenance_report/table',
		name: 'repair_and_maintenance_report_table',
		component: () => import('../views/repair_and_maintenance_report/table.vue'),
		meta: {
			index: 0,
			title: '报修检修列表'
		}
	},
	{
		path: '/repair_and_maintenance_report/view',
		name: 'repair_and_maintenance_report_view',
		component: () => import('../views/repair_and_maintenance_report/view.vue'),
		meta: {
			index: 0,
			title: '报修检修详情'
		}
	},
	// 记录日志路由
	{
		path: '/record_log/table',
		name: 'record_log_table',
		component: () => import('../views/record_log/table.vue'),
		meta: {
			index: 0,
			title: '记录日志列表'
		}
	},
	{
		path: '/record_log/view',
		name: 'record_log_view',
		component: () => import('../views/record_log/view.vue'),
		meta: {
			index: 0,
			title: '记录日志详情'
		}
	},
	// 实验耗材路由
	{
		path: '/experimental_consumables/table',
		name: 'experimental_consumables_table',
		component: () => import('../views/experimental_consumables/table.vue'),
		meta: {
			index: 0,
			title: '实验耗材列表'
		}
	},
	{
		path: '/experimental_consumables/view',
		name: 'experimental_consumables_view',
		component: () => import('../views/experimental_consumables/view.vue'),
		meta: {
			index: 0,
			title: '实验耗材详情'
		}
	},
	// 购买订单路由
	{
		path: '/purchase_order/table',
		name: 'purchase_order_table',
		component: () => import('../views/purchase_order/table.vue'),
		meta: {
			index: 0,
			title: '购买订单列表'
		}
	},
	{
		path: '/purchase_order/view',
		name: 'purchase_order_view',
		component: () => import('../views/purchase_order/view.vue'),
		meta: {
			index: 0,
			title: '购买订单详情'
		}
	},

	// 用户路由
	{
		path: '/user/table',
		name: 'user_table',
		component: () => import('../views/user/table.vue'),
		meta: {
			index: 0,
			title: '用户列表'
		}
	},
	{
		path: '/user/view',
		name: 'user_view',
		component: () => import('../views/user/view.vue'),
		meta: {
			index: 0,
			title: '用户详情'
		}
	},
	{
		path: '/user/info',
		name: 'user_info',
		component: () => import('../views/user/info.vue'),
		meta: {
			index: 0,
			title: '个人信息'
		}
	},
	// 用户组路由
	{
		path: '/user_group/table',
		name: 'user_group_table',
		component: () => import('../views/user_group/table.vue'),
		meta: {
			index: 0,
			title: '用户组列表'
		}
	},
	{
		path: '/user_group/view',
		name: 'user_group_view',
		component: () => import('../views/user_group/view.vue'),
		meta: {
			index: 0,
			title: '用户组详情'
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	let token = to.query.token;
	if (token){
		$.db.set("token",token,120);
	}
	next();
})

router.afterEach((to, from, next) => {
	let title = "实验室教学日志系统小程序-admin";
	document.title = title;
})

export default router
