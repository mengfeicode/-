<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 100px;">
					<el-col :span="12" :offset="5">
						<el-form :model="formData" ref="threshold" label-width="150px">
							<el-form-item label="设备名称">
								<el-input v-model="formData.name"></el-input>
							</el-form-item>
							<el-form-item label="设备编号">
								<el-input v-model="formData.no"></el-input>
							</el-form-item>
							<el-form-item label="数量">
								<el-input v-model="formData.number"></el-input>
							</el-form-item>
							<el-form-item label="阈值设置（最低）">
								<el-input v-model="formData.lowData"></el-input>
							</el-form-item>
							<el-form-item label="阈值设置（最高）">
								<el-input v-model="formData.highData"></el-input>
							</el-form-item>
							<el-form-item label="申请人">
								<el-select v-model="formData.person" placeholder="请选择">
									<el-option v-for="item in personOpera" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
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
		import {person} from '../constant.js'
    export default {
    	data(){
    		return {
					formData: {
						name:'1',		//农产品名称
						number:'2',		//数量
						lowData:'',		//最低值
						highData:'4',		//最高值
						person:'',		//负责人
						no:'',		//编号
					},
					personOpera:[]
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    	},
    	methods: {
			},
			created(){
				this.personOpera = person();
			}
		}
</script>
