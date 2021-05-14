<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 100px;">
					<el-col :span="12" :offset="5">
						<el-form :model="formData" ref="addPlant" label-width="150px">
							<el-form-item label="农产品名称">
								<el-input v-model="formData.name"></el-input>
							</el-form-item>
							<el-form-item label="数量">
								<el-input v-model="formData.number"></el-input>
							</el-form-item>
							<el-form-item label="类型">
								<el-select v-model="formData.plantType" placeholder="请选择">
									<el-option v-for="item in plantTypes" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="种植面积">
								<el-input v-model="formData.plantArea"></el-input>
							</el-form-item>
							<el-form-item label="种植人">
								<el-select v-model="formData.person" placeholder="请选择">
									<el-option v-for="item in personOpera" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="期待收获时间">
								<el-input v-model="formData.futureTime"></el-input>
							</el-form-item>
							<el-form-item class="button_submit">
								<el-button type="primary" @click="submitForm('formData')">立即添加</el-button>
							</el-form-item>
						</el-form>
					</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
		import {plantTypes ,person} from '../constant.js'
    export default {
    	data(){
    		return {
					formData: {
						name:'1',		//农产品名称
						number:'2',		//数量
						plantType:'',		//类型
						plantArea:'4',		//种植面积
						person:'',		//种植人
						futureTime:'6'  //期待收获时间
					},
					plantTypes:[],
					personOpera:[]
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		// this.initData();
    	},
    	methods: {
			},
			created(){
				this.plantTypes = plantTypes();
				this.personOpera = person();
			}
		}
</script>
