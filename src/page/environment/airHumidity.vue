<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row>
            <el-col>
                <mul-line-charts :myData='myData'></mul-line-charts>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import mulLineCharts from '@/components/mulLineCharts.vue'
    import {arrFormat} from '@/page/constant.js'
    export default {
        data(){
            return {
                
               myData:{
                    title:'一年内空气湿度折线图',
                    yName:'Air Humidity',        //y轴名字
                    data:[],
               },
               testdata:[]
            }

        },
        created(){
            this.testdata = [
        {
            "max": 2018,
            "min": 255,
            "avg": 1072,
            "date": 20200516
        },
        {
            "max": 2413,
            "min": 1093,
            "avg": 1633,
            "date": 20210516
        },
        {
            "max": 2413,
            "min": 1093,
            "avg": 1633,
            "date": 20210616
        }
    ]
        },
    	components: {
    		headTop,
            mulLineCharts
    	},
        methods: {
            
        },
        mounted(){
            this.myData.data = arrFormat(this.testdata)
            console.log(this.myData.data)
        }
    }
</script>

