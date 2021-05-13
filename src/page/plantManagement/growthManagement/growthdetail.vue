<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 100px;">
					<!-- 种植详情，就是展示整个大棚的一个种植情况。总共多少土地，用了多少，
					还有多少没用。种了多少农产品，有多少品种。反正就是整个大棚的一个种植信息。以图表的方式展示 -->
					<el-col :span="20" :offset="2">
            <el-collapse>
              <el-collapse-item title="添加新生长周期" name="1">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                  <el-row>
                    <el-col :span='8'>
                      <el-form-item label="农作物名称" prop="name" label-width="110px">
                        <el-input v-model="formData.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                      <el-form-item label="种植状态" prop="address" label-width="150px">
                        <el-input v-model="formData.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                      <el-form-item label="操作类型" prop="promotion_info" label-width="110px">
                        <el-input v-model="formData.promotion_info"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span='8'>
                      <el-form-item label="负责人" prop="phone" label-width="110px">
                        <el-input v-model.number="formData.phone" maxLength="11"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                      <el-form-item label="操作日期" prop="description" label-width="150px">
                        <el-input v-model="formData.description"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item class="button_submit">
                    <el-button type="primary" @click="submitForm('formData')">立即添加</el-button>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
            </el-collapse>
            111
						
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
    			city: {},
    			formData: {
					name: '', //店铺名称
					address: '', //地址
					latitude: '',
					longitude: '',
					description: '', //介绍
					phone: '',
					promotion_info: '',
					float_delivery_fee: 5, //运费
					float_minimum_order_amount: 20, //起价
					is_premium: true,
					delivery_mode: true,
					new: true,
					bao: true,
					zhun: true,
					piao: true,
					startTime: '',
       	 			endTime: '',
       	 			image_path: '',
       	 			business_license_image: '',
       	 			catering_service_license_image: '',

		        },
		        rules: {
					name: [
						{ required: true, message: '请输入店铺名称', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请输入详细地址', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入联系电话' },
						{ type: 'number', message: '电话号码必须是数字' }
					],
				},
			    baseUrl,
			    baseImgPath,
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {
			}
		}
</script>

<style lang="less">
	@import '../../../style/mixin';
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
