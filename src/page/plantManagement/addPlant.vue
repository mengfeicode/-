<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 100px;">
					<el-col :span="12" :offset="5">
						<el-form :model="formData" ref="addPlant" label-width="150px" :rules="rules">
							<el-form-item label="农产品名称" prop='cropName'>
								<el-input v-model="formData.cropName"></el-input>
							</el-form-item>
							<el-form-item label="数量" prop='cropNum'>
								<el-input v-model="formData.cropNum"></el-input>
							</el-form-item>
							<el-form-item label="农产品类型" prop='cropType'>
								<el-select v-model="formData.cropType" placeholder="请选择">
									<el-option v-for="item in plantTypes" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="种植面积" prop='plantArea'>
								<el-input v-model="formData.plantArea"></el-input>
							</el-form-item>
							<el-form-item label="种植人" prop='operator'>
								<el-select v-model="formData.operator" placeholder="请选择">
									<el-option v-for="item in personOpera" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="期待收获时间" prop='harvestTime'>
								<el-date-picker v-model="formData.harvestTime" type="date" placeholder="选择日期" value-format="yyyyMMdd"></el-date-picker>
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
		import {addPlant} from '@/api/request.js'
    export default {
    	data(){
    		return {
					formData: {
						cropName:'',		//农产品名称
						cropNum:'',		//数量
						cropType:'',		//类型
						plantArea:'',		//种植面积
						operator:'',		//种植人
						harvestTime:''  //期待收获时间
					},
					plantTypes:[],
					personOpera:[],
					rules: {
						cropName: [
							{ required: true, message: '请输入农产品名称', trigger: 'blur' }
						],
						cropNum: [
							{ required: true, message: '请输入农产品数量', trigger: 'blur' }
						],
						cropType: [
							{ required: true, message: '请选择农产品类型', trigger: 'blur' }
						],
						plantArea: [
							{ required: true, message: '请输入种植面积', trigger: 'blur' }
						],
						operator: [
							{ required: true, message: '请选择种植负责人', trigger: 'blur' }
						],
						harvestTime: [
							{ required: true, message: '请选择种植时间', trigger: 'blur' }
						]
					}
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		
    	},
    	methods: {
				submitForm(formName) {
					this.$refs.addPlant.validate((valid) => {
          if (valid) {
            //发送请求
          } else {
            console.log('error submit!!');
            return false;
          }
        });
				}
			},
			created(){
				this.plantTypes = plantTypes();
				this.personOpera = person();
				let obj = {
					"cropName":"豌豆",
					"cropType":"豆类",
					"cropNum":1900,
					"plantArea":2544.6,
					"operator":"张三",
					"harvestTime":20210514
				};
				addPlant(obj).then(res => {
					console.log(res)
					this.$message(res.msg);
				})
			}
		}
</script>
