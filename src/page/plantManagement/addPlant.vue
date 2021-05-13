<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 100px;">
					<el-col :span="18" :offset="3">
						<el-form :model="formData" :rules="rules" ref="addPlant" label-width="150px">
							<el-row>
								<el-col :span='8'>
									<el-form-item label="农作物名称" prop="name" label-width="110px">
										<el-input v-model="formData.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="种植状态" prop="address" label-width="150px">
										<el-input v-model="formData.status"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="负责人" prop="promotion_info" label-width="110px">
										<el-input v-model="formData.person"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span='8'>
									<el-form-item label="农作物分类序号" prop="name" label-width="150px">
										<el-input v-model="formData.no"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="种植时间" prop="name" label-width="110px">
										<el-input v-model="formData.time"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="期待收获时间" prop="name" label-width="110px">
										<el-input v-model="formData.futuretime"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item class="button_submit">
								<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
							</el-form-item>
						</el-form>
					</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {cityGuess, addPlant, searchplace, foodCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
			    baseUrl,
			    baseImgPath,
					formData: {
						name:'1',
						status:'2',
						person:'3',
						no:'4',
						time:'5',
						futuretime:'6'
					}
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		// this.initData();
    	},
    	methods: {
			}
		}
</script>

<style lang="less">
	@import '../../style/mixin';
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
