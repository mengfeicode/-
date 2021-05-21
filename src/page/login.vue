<template>
  	<div class="login_page fillcontain">
	     <div class="left">
			 <div class="logo">
				<img src="../assets/img/logo1.png" alt="">
			</div>
			<div class="sologan">
				<h1>节能减排，绿色未来</h1>
				<p>欢迎进入蔬菜大棚管理系统</p>
			</div>
			<div class="footer">
				<p>帮助中心 ｜ 2021©green.com</p>
			</div>
		 </div>
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<!-- <div class="manage_tip">          
		  			<p>蔬菜大棚后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p> -->

				<div  class="right-login" v-show="isShow1">
					<el-form :model="loginForm" :rules="rules" ref="loginForm">
						<table>
							<caption class="caption-log">欢迎登录</caption>
							<tr>
								<td>还没有账号？<input class="regi"  type="button" value="注册" @click="changshow()"></td>
							</tr>
							<tr>
								<td><label for="">用户名</label><input type="text" v-model="loginForm.username" placeholder="  请填写用户名" id="login_username"></td>
							</tr>
							<tr>
								<td><label for="">密&nbsp;&nbsp;&nbsp;&nbsp;码</label><input type="password" v-model="loginForm.password" placeholder="  请填写登陆密码"></td>
							</tr>
							<tr>
								<td >
									<label for="">验证码</label><input type="text" placeholder="  请输入验证码" class="input-mini">
									<el-button id="yz"  type="button"   @click="YZcode()"  class="get">获取验证码</el-button>
								</td>
							</tr>
							<tr>
								<td>
									<!-- <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button> -->
									<el-button type="primary" @click="submitForm('loginForm')" class="resgit" id="log">
										登录
									</el-button>
								</td>
							</tr>

							<tr>
								<td>
									<input type="checkbox" name="" id="" checked class="check">阅读并接受《用户协议》、《用户隐私协议》
								</td>
							</tr>
						</table>
					</el-form>
					
				</div>
				<div class="right-register" v-show="isShow2">
					<form action="register_check.php">
						<table>
							<caption class="caption-reg">欢迎注册</caption>
							<tr class="">
								<td class="DLright">已经有账号？<input class="logdeng"  type="button" value="登录" @click="changshow()"></td>
							</tr>
							<tr>
								<td><label for="">用&nbsp;户&nbsp;名&nbsp;</label><input type="text" placeholder="  请设置用户名" name="username"></td>
							</tr>
							<tr>
								<td><label for="">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label><input type="password" placeholder="  请设置登陆密码" name="password"></td>
							</tr>
							<tr>
								<td><label for="">确认密码</label><input type="password" placeholder="  请重复输入密码" name=""></td>
							</tr>
							<tr>
								<td>
									<button type="submit" class="resgit" name="submit" id="btn-submit">
										注册
									</button>
								</td>
							</tr>

							<tr>
								<td>
									<input type="checkbox" name="" id="" checked class="check">阅读并接受《用户协议》、《用户隐私协议》
								</td>
							</tr>



						</table>
					</form>
				</div>
	  		</section>
	  	</transition>  
  	</div>
</template>



<script>
	import {login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
	import Vue from 'vue'
	
	
	export default {
		
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
				isShow1:true,
				isShow2:false,
			}
		},
		mounted(){
			this.showLogin = true;
			if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
		},
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {
			...mapActions(['getAdminData']),
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
						if (res.status == 1) {
							this.$message({
		                        type: 'success',
		                        message: '登录成功'
		                    });
							this.$router.push('manage')
						}else{
							this.$message({
		                        type: 'error',
		                        message: res.message
		                    });
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
			//发送验证码方法
			YZcode:function(){
				console.log("ceshiwanchen")
				alert("验证码为1213");
			},
			changshow:function(){
                this.isShow1 = !this.isShow1;
				this.isShow2 = !this.isShow2;
			}
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
	}
	
</script>

<style lang="less" scoped>
	@import '../style/mixin';


	.login_page{
		background-image: url(../assets/img/bg1.jpg);
		background-size:100% 100%; 
		background-attachment: fixed;
		// background-color: #324057;
	}
	//原来的样式
	// .manage_tip{
	// 	position: absolute;
	// 	width: 100%;
	// 	top: -100px;
	// 	left: 0;
	// 	p{
	// 		font-size: 34px;
	// 		color: #fff;
	// 	}
	// }
	//以下是left,logo,sologan,footer的样式
	.left{
		float: left;
	}
	.logo{
		width: 382px;
		height: 100px;
		position: absolute;
		top: 22%;
		left: 9%;
	}
	.logo img{
		width: 100%;
	}
	.sologan{
		position: absolute;
		top: 38%;
		left: 10%;
	}
	.sologan h1{
		font-size: 50px;
		color: #fff;
		line-height: 10px;

	}
	.sologan p{
		color: #fff;
		font-size: 30px;
		margin-top: 10%;
	}
	.footer{
		color: #fff;
		position: absolute;
		bottom: 2%;
		left: 5%;
	}
	//以下是右边的样式
	.regi{
		background: transparent;
		border:0;
		width:50px;
		height:120%;
		color: #0066FF;
		cursor: pointer;
	}
	.logdeng{
		background: transparent;
		border:0;
		width:50px;
		height:120%;
		color: #0066FF;
		cursor: pointer;
	}
	.DLright{
		text-align: right;
	}
	.right-login{
		float: right;
		position: absolute;
		right: 6%;
		top: 15%;
		height: 452px;
		width: 380px;
		background-color: rgba(255, 255, 255,0.8);
		border-radius: 25px;
		padding: 50px;
    }
	.right-register{
    float: right;
    position: absolute;
    right: 6%;
    top: 15%;
    height: 452px;
    width: 380px;
    background-color: rgba(255, 255, 255,0.8);
    border-radius: 25px;
    padding: 50px;
}

	//中间登录框的样式----    废弃掉
	// .form_contianer{
	// 	.wh(320px, 210px);
	// 	// .ctp(320px, 210px);
	// 	padding: 25px;
	// 	border-radius: 5px;
	// 	text-align: center;
	// 	background-color: #fff;
	// 	.submit_btn{
	// 		width: 100%;
	// 		font-size: 16px;
	// 	}
	// }

	//这是温馨提示的标签样式
	.tip{
		font-size: 12px;
		color: red;
	}
	//这是欢迎登录的样式
	.caption-log{
		font-size: 40px;
		text-align: left;
		font-weight: 700;
	}
	//这是欢迎注册的样式
	.caption-reg{
		font-size: 40px;
		text-align: right;
		font-weight: 700;
	}
	//输入框表单样式
	table,tr,td{
		width: 100%;
	}
	tr{
		height: 70px;
	}
	//这是用户名，密码的样式
	label{
		color: #333;
		text-align: right;
		margin-right: 20px;
		width: 25%;
	}
	//用户名，密码输入框的样式
	input{
		color: #ccc;
		height: 40px;
		border: 1px solid #ccc;
		width: 75%;
		border-radius: 5px;
	}
	//验证码
	label{
		color: #333;
		text-align: right;
		margin-right: 20px;
		width: 20%;
	}
    //验证码输入框样式
	.input-mini{
		color: #ccc;
		height: 40px;
		border: 1px solid #ccc;
		width: 45%;
		border-radius: 5px;
		box-sizing: border-box;
		vertical-align: top;
		margin-right: 5%;

	}
   //获取验证码按钮样式
	.get{
		width: 30%;
		border-radius: 5px;
		background-color: #fff;
		border: 1px solid #ccc;
		color: #333;
		text-align: center;
		height: 40px;
	}
	//登录按钮样式
	.resgit{
		width: 100%;
		height: 40px;
		border: none;
		border-radius: 20px;
		background-color: royalblue;
		color: #fff;
		font-size: 14px;
		font-weight: bold;
		margin: 20px 0 20px 0;
	}
	//接受条款样式
	.check{
		line-height: 14px;
		width: 14px;
		height: 14px;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 2s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
