<template>
    <div class="newsarticle">
        <div class="newstitle">
            <h2>G-赛事新闻</h2>
            <a href="/list/list.html" class="more">查看更多&gt;</a>
        </div>
        <ul id="zxlist">
            <li v-for="(item,index) in list" :key="index">
                <a :href="'/newsDetails/newsDetails.html?objId=' + item.objId" target="_blank">·{{item.title}}</a><span>{{serDate(item.ctime)}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import axios from 'axios';
    import api from '@/assets/js/api.js';
    export default {
        data(){
            return {
                list:[]
            }
        },
        props:[
            'id'
        ],
        methods:{
            getArticleList(){
                axios.post(api.article).then((response)=>{
                    var data = response.data;
                    if(data.status == '200'){
                        this.list = data.data.list.slice(0,10);
                    }else{
                        console.log(data.status);
                    }
                }).catch((err)=>{
                    console.log(error);
                });
            },
            serDate(time){
                var date = new Date(time*1000);
                var M = date.getMonth() + 1;
                var D = date.getDate();
                M = M < 10 ? '0' + M : M;
                D = D < 10 ? '0' + D : D;
                return M + '/' + D;
            }
        },
        mounted(){
            this.getArticleList();
            console.log(this.id);
        }
    }
</script>

