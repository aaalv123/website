<template>
    <div class="newsvideo">
        <div class="newstitle">
            <h2>G-历届视频</h2>
            <div class="tab" id="gleagueVideotab">
                <span v-for="(item,index) in yearArr" :key="index" :class="{active:index == clickIndex}" @click="tabData(index)">{{item}}</span>
            </div>
        </div>
        <div class="gleagueVideolist" id="gleagueVideolist">
            <ul>
                <li v-for="(item,index) in showVideolist" :key="index" @click="playVideo(item.play_url)">
                    <div class="imgbox"> 
                        <img :src="item.har_pic">
                        <span class="time">{{toTime(item.duration)}}</span>
                        <div class="cover"></div>
                    </div>
                    <div class="vtit">
                        <h3>{{item.title}}</h3>
                    </div>
                </li>
            </ul>
        </div>
        <div class="videoplay" v-show="ishow">
            <video :src="videosrc" controls="controls" autoplay="autoplay"  ref="videoplay"></video>
            <span @click="closeVideo">关闭</span>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import api from '@/assets/js/api.js';
    export default {
        data(){
            return {
                yearArr:[],
                allVideolist:[],
                showVideolist:[],
                clickIndex : 0,
                ishow:false,
                videosrc:''
            }
        },
        props:{
            id:String
        },
        methods:{
            getVideoList(){
                axios.post(api.video).then((response)=>{
                    var data = response.data;
                    if(data.status == '200'){
                        data.data.list.forEach((ele) => {
                            this.yearArr.push(new Date(ele.ctime * 1000).getFullYear());
                            this.allVideolist.push(ele.videoList);
                            this.showVideolist = this.allVideolist[0];
                        });
                    }else{
                        console.log(data.status);
                    }
                }).catch((err)=>{
                    console.log(error);
                });
            },
            tabData(index){
                this.clickIndex = index;
                this.showVideolist = this.allVideolist[index];
            },
            playVideo(url){
                this.videosrc = url;
                this.ishow = true;
            },
            closeVideo(){
                this.$refs.videoplay.pause();
                this.videosrc = '';
                this.ishow = false;
            },
            toTime(time){
                var s = time%60;
                var m = Math.floor(time/60);
                var h = 0;
                if(m>=60){
                    h = Math.floor(m/60);
                    m = m%60;
                }
                s = s >= 10 ? s : '0' + s;
                m = m >= 10 ? m : '0' + m;
                if(h>0){
                    return h+":"+m+":"+s
                }else{
                    return m+":"+s
                }
            }
        },
        mounted(){
            this.getVideoList();
            console.log(this.id);
        }
    }
</script>

