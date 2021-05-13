<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 100px;">
					<el-col :span="20" :offset="2">
						<el-form :model="formData" ref="addGrowth" label-width="110px">
							<el-row>
								<el-col :span='8'>
									<el-form-item label="农作物名称" prop="name">
										<el-input v-model="formData.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="种植状态" prop="name">
										<el-input v-model="formData.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="负责人" prop="name">
										<el-input v-model="formData.name"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span='8'>
									<el-form-item label="操作类型" prop="name">
										<el-input v-model="formData.name" maxLength="11"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="农作物分类序号" prop="name" label-width="150px">
										<el-input v-model="formData.name"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item class="button_submit">
								<el-button type="primary" @click="submitForm('formData')">查询</el-button>
							</el-form-item>
						</el-form>

						<el-table :data="tableData" style="width: 100%" min-height="200" highlight-current-row>
							<el-table-column type="index" width="55"></el-table-column>
    					<el-table-column prop="name" label="名称"></el-table-column>
    					<el-table-column prop="name" label="编号"></el-table-column>
							<el-table-column prop="province" label="种植日期"></el-table-column>
							<el-table-column prop="city" label="种植状态"></el-table-column>
							<el-table-column prop="address" label="负责人"></el-table-column>
							<el-table-column fixed="right" label="添加操作" width="100">
								<template slot-scope="scope">
									<el-button @click="centerDialogVisible = true" type="text" size="small">添加操作</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-dialog title="提示" :visible.sync="centerDialogVisible"  width="30%" center>
							<span>需要注意的是内容是默认不居中的</span>
							<span slot="footer" class="dialog-footer">
								<el-button @click="centerDialogVisible = false">取 消</el-button>
								<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
							</span>
						</el-dialog>
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
    			formData: {
						name:'test'
					},
					tableData:[{
						date:'1' ,
						name:'11',
						province: '22',
						city: '33',
						address:'44'
					},{
						date:'1' ,
						name:'11',
						province: '22',
						city: '33',
						address:'44'
					}],
					baseUrl,
					baseImgPath,
					centerDialogVisible: false
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
	// @import '../../../style/mixin';
	// .button_submit{
	// 	text-align: center;
	// }
	// .avatar-uploader .el-upload {
	//     border: 1px dashed #d9d9d9;
	//     border-radius: 6px;
	//     cursor: pointer;
	//     position: relative;
	//     overflow: hidden;
	// }
	// .avatar-uploader .el-upload:hover {
	//     border-color: #20a0ff;
	// }
	// .avatar-uploader-icon {
	//     font-size: 28px;
	//     color: #8c939d;
	//     width: 120px;
	//     height: 120px;
	//     line-height: 120px;
	//     text-align: center;
	// }
	// .avatar {
	//     width: 120px;
	//     height: 120px;
	//     display: block;
	// }
	// .el-table .info-row {
	//     background: #c9e5f5;
	// }

	// .el-table .positive-row {
	//     background: #e2f0e4;
	// }
</style>
