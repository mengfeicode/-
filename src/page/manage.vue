<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
			<el-col :span="4"  style="min-height: 100%;">
				<el-menu style="min-height: 100%;" theme="dark" router>
					<!-- 一级菜单 -->
					<template v-for="item in list">
						<el-submenu v-if="item.children && item.children.length" :index="item.name" :key="item.name">
							<template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>
							<!-- 二级菜单 -->
							<template v-for="itemChild in item.children">
								<el-submenu v-if="itemChild.children && itemChild.children.length" :index="itemChild.path" :key="itemChild.path">
										<template slot="title"><i :class="itemChild.icon"></i><span>{{itemChild.name}}</span></template>
										<!-- 三级菜单 -->
										<el-menu-item v-for="itemChild_Child in itemChild.children" :index="itemChild_Child .path" :key="itemChild_Child.path">
										<i :class="itemChild_Child.icon"></i><span slot="title">{{itemChild_Child.name}}</span></el-menu-item>
								</el-submenu>
								<el-menu-item v-else :index="itemChild.path" :key="itemChild.path"><i :class="itemChild.icon"></i><span slot="title">{{itemChild.name}}</span></el-menu-item>
							</template>
						</el-submenu>
						<el-menu-item v-else :index="item.path" :key="item.path"><i :class="item.icon"></i><span slot="title">{{item.name}}</span></el-menu-item>
					</template>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		// computed: {
		// 	defaultActive: function(){
		// 		return this.$route.path.replace('/', '');
		// 	}
		// },
		data(){
			return {list: [
				{
          path: "/manage",
          name: "首页",
          icon:'el-icon-menu'
        },
        {
          path: "",
          name: "环境指标",
          icon:'el-icon-document',
          children: [
            {
              path: "/airTemperature",
              name: "空气温度",
            },{
              path: "airHumidity",
              name: "空气湿度",
            },{
              path: "carbonDioxide",
              name: "二氧化碳浓度",
            },{
              path: "Illuminance",
              name: "光照度",
            },{
              path: "soilTemperature",
              name: "土壤温度",
            },{
              path: "soilMoisture",
              name: "土壤湿度",
            }
          ]
        },{
          path: "",
          name: "农产品种植管理",
          icon:'el-icon-date',
          children: [
						{
              path: "/addPlant",
              name: "添加农作物",
            },{
              path: "/growthManagement",
              name: "生长周期管理",
            },
            {
              path: "plantDetail",
              name: "查看种植详情",
            }
          ]
        },{
          path: "",
          name: "大棚内设备管理",
          icon:'el-icon-star-on',
          children: [
            {
              path: "/equipmentMaintenance",
              name: "设备维护",
            },{
              path: "threshold",
              name: "阈值设置",
            },{
              path: "equipWarning",
              name: "告警",
            }
          ]
        },{
          path: "",
          name: "虫情监测",
          icon:'el-icon-warning',
          children: [
            {
              path: "/plantSituation",
              name: "现场情况查看",
            },{
              path: "pestSituation",
              name: "虫情状态",
            }
          ]
        }
        
      ]
		}}
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	// .manage_page{
		
	// }
</style>
