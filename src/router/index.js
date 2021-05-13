import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addPlant = () => import('@/page/plantManagement/addPlant');
const growthManagement = () => import('@/page/plantManagement/growthManagement');
const plantDetail = () => import('@/page/plantManagement/plantDetail');
const airTemperature = () => import('@/page/environment/airTemperature');
const airHumidity = () => import('@/page/environment/airHumidity');
const carbonDioxide = () => import('@/page/environment/carbonDioxide');
const Illuminance = () => import('@/page/environment/Illuminance');
const soilTemperature = () => import('@/page/environment/soilTemperature');
const soilMoisture = () => import('@/page/environment/soilMoisture');
const equipmentMaintenance = () => import('@/page/equipmentManagement/equipmentMaintenance');
const threshold = () => import('@/page/equipmentManagement/threshold');
const equipWarning = () => import('@/page/equipmentManagement/equipWarning');
const plantSituation = () => import('@/page/pestMonitoring/plantSituation');
const pestSituation = () => import('@/page/pestMonitoring/pestSituation');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addPlant',
			component: addPlant,
			meta: ['农产品种植管理', '添加农作物'],
		},{
			path: '/plantDetail',
			component: plantDetail,
			meta: ['农产品种植管理', '查看种植详情'],
		},{
			path: '/growthManagement',
			component: growthManagement,
			meta: ['农产品种植管理', '生长周期管理'],
		},
		{
			path: '/airTemperature',
			component: airTemperature,
			meta: ['环境指标', '空气温度'],
		},{
			path: '/airHumidity',
			component: airHumidity,
			meta: ['环境指标', '空气湿度'],
		},{
			path: '/carbonDioxide',
			component: carbonDioxide,
			meta: ['环境指标', '二氧化碳浓度'],
		},{
			path: '/Illuminance',
			component: Illuminance,
			meta: ['环境指标', '光照度'],
		},{
			path: '/soilTemperature',
			component: soilTemperature,
			meta: ['环境指标', '土壤温度'],
		},{
			path: '/soilMoisture',
			component: soilMoisture,
			meta: ['环境指标', '土壤湿度'],
		},{
			path: '/equipmentMaintenance',
			component: equipmentMaintenance,
			meta: ['大棚内设备管理', '设备维护'],
		},{
			path: '/threshold',
			component: threshold,
			meta: ['大棚内设备管理', '阈值设置'],
		},{
			path: '/equipWarning',
			component: equipWarning,
			meta: ['大棚内设备管理', '告警'],
		},{
			path: '/plantSituation',
			component: plantSituation,
			meta: ['虫情监测', '现场情况查看'],
		},{
			path: '/pestSituation',
			component: pestSituation,
			meta: ['虫情监测', '虫情状态'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
