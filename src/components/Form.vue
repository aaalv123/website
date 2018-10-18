<template>
    <div class="formlist container" id="formlist">
        <div class="inputlist">
            <h3>基本信息</h3>
            <div class="inputbox">
                <div class="inputarea require">
                    <span>真实姓名</span>
                    <input type="text" v-model="username" name="username" data-vv-as="用户名" placeholder="请输入" autocomplete="off" v-validate="'required'">
                </div>
                <div class="inputerr">{{ errors.first('username') }}</div>
            </div>
            <div class="inputbox">
                <div class="inputarea require">
                    <span>性别</span>
                    <select autocomplete="off" v-model="sex">
                        <option value="0">保密</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                    </select>
                </div>
                <div class="inputerr"></div>
            </div>
            <div class="inputbox">
                <div class="inputarea require">
                    <span>年龄</span>
                    <input type="text" name="age" placeholder="请输入" autocomplete="off" v-model="age" v-validate="'required|between:18,50'">
                </div>
                <div class="inputerr">{{ errors.first('age') }}</div>
            </div>
            <div class="inputbox">
                <div class="inputarea require little1">
                    <span>所在地区</span>
                    <select autocomplete="off" v-model="provalue" v-validate="'required'" name="provalue" data-vv-validate-on="change">
                        <option value="">请选择</option>
                        <option v-for="(item,index) in province" :key="index" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="innerwz">省</div>
                <div class="inputarea little2">
                    <select autocomplete="off" v-model="cityvalue" v-validate="'required'" name="cityvalue" data-vv-validate-on="change">
                        <option value="">请选择</option>
                        <option v-for="(item,index) in city" :key="index" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="inputerr">{{ errors.first('provalue') }}</div>
                <div class="inputerr">{{ errors.first('cityvalue') }}</div>
            </div>
            <div class="inputbox">
                <div class="inputarea require">
                    <span>手机号码</span>
                    <input type="text" name="phone" placeholder="请输入" autocomplete="off" v-model="phone" v-validate="{required:true,regex:/^0?1[3|4|5|6|7|8][0-9]\d{8}$/}">
                </div>
                <div class="inputerr">{{ errors.first('phone') }}</div>
            </div>
            <div class="inputbox">
                <div class="inputarea require">
                    <span>常用QQ</span>
                    <input type="text" placeholder="请输入" autocomplete="off" v-model="QQ" name="QQ" v-validate="{required:true,regex:/^[1-9][0-9]{4,19}$/}">
                </div>
                <div class="inputerr">{{ errors.first('QQ') }}</div>
            </div>
            <div class="inputbox">
                <div class="inputarea require">
                    <span>身份证号码</span>
                    <input type="text" placeholder="请输入" autocomplete="off" v-model="idCard" name="idCard" v-validate="{required:true,regex:/^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((((19|20)((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229)))|20000229)\d{3}(\d|X|x))|(((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}))$/}">
                </div>
                <div class="inputerr">{{ errors.first('idCard') }}</div>
            </div>
            <h3>才艺特长<span>限30字</span></h3>
            <div class="textareabox">
                <textarea class="textareainput" id="acqierement" name="acqierement" placeholder="请输入" v-model="acqierement" v-validate="'max:30'"></textarea>
                <div class="inputerr">{{ errors.first('acqierement') }}</div>
            </div>
            <h3>个人简介<span>限100字</span></h3>
            <div class="textareabox">
                <textarea class="textareainput" id="summary" name="summary" v-model="summary" v-validate="'max:100'" placeholder="请输入"></textarea>
                <div class="inputerr">{{ errors.first('summary') }}</div>
            </div>
            <h3>上传视频</h3>
            <div class="uploadVideo" id="uploadVideo">
                <div class="uploadbutton">请选择上传视频<input type="file"  @change="getFile($event)"></div>
                <div id="uploaderpick" class="uploaderpick"></div>
                <div class="uploadProcess" id="uploadProcess">
                    <div class="upname">
                        <span class="name"><!-- >视频名.MP4<!--></span>
                        <span class="operateCannel">取消上传</span>
                        <span class="operateReupload">重新上传</span>
                    </div>
                    <div class="process">
                        <span class="percent"></span>
                    </div>
                    <div class="upsize">
                        <span class="size"><!-- >视频大小：17MB<!--></span>
                        <span class="speed">上传进度：<em>0</em>%</span>
                    </div>
                </div>
                <div class="uploadStatus" id="uploadStatus"></div>
                <div class="wz">
                    <p>只能上传mp4格式视频，最大不得超过2G</p>
                    <p>建议上传5分钟以内的视频，可以选取最精彩的部分或者是集锦。</p>
                </div>
            </div>
        </div>
        <div class="photolist" id="photolist">
            <h3>身份证照片</h3>
            <div class="photobox">
                <img id="idcard_positive" src="//static.nextjoy.com/g-league/zm/images/sfz1.jpg">
                <div class="upimgbutton idcardpic require">身份证人像面</div>
                <div id="uppositiveerr" class="photoerr"></div>
            </div>
            <div class="photobox">
                <img id="idcard_back" src="//static.nextjoy.com/g-league/zm/images/sfz2.jpg">
                <div class="upimgbutton idcardpic require">身份证国徽面</div>
                <div id="upbackerr" class="photoerr"></div>
            </div>
            <h3>个人照片</h3>
            <div class="photobox">
                <img id="art_photo1" src="//static.nextjoy.com/g-league/zm/images/sfz4.jpg">
                <div class="upimgbutton personPic require">上传个人照片1</div>
                <div id="art_photo1err" class="photoerr"></div>
            </div>
            <div class="photobox">
                <img id="art_photo2" src="//static.nextjoy.com/g-league/zm/images/sfz4.jpg">
                <div class="upimgbutton personPic require">上传个人照片2</div>
                <div id="art_photo2err" class="photoerr"></div>
            </div>
            <div class="photobox">
                <img id="art_photo3" src="//static.nextjoy.com/g-league/zm/images/sfz4.jpg">
                <div class="upimgbutton personPic require">上传个人照片3</div>
                <div id="art_photo3err" class="photoerr"></div>
            </div>
            <div class="photobox">
                <img id="art_photo4" src="//static.nextjoy.com/g-league/zm/images/sfz4.jpg">
                <div class="upimgbutton personPic require">上传个人照片4</div>
                <div id="art_photo4err" class="photoerr"></div>
            </div>
            <div class="photobox">
                <img id="art_photo5" src="//static.nextjoy.com/g-league/zm/images/sfz4.jpg">
                <div class="upimgbutton personPic require">上传个人照片5</div>
                <div id="art_photo5err" class="photoerr"></div>
            </div>
            <ul class="wzbox">
                <li><span>* 1、</span>报名照片必须为本人真实照片。</li>
                <li><span>* 2、</span>照片必须清晰像素高，可以简单处理，但不可过度美化以至于太过夸张。以不同风格的正面照为主不要发任何猫猫脸、大头照，以免耽误报名。</li>
            </ul>
        </div>
        <div class="formsubmit">
            <div class="tix">带*号的为必填项</div>
            <button id="formsubmit" @click="submitFormData()">提交</button>
        </div>
    </div>
</template>
<script>
import prv_city from '@/assets/js/pro_city.js';
// import Uploader from 'simple-uploader.js';
import * as qiniu from 'qiniu-js';
import axios from 'axios';
export default {
    data(){
        return{
            username:'',
            sex:0,
            age:'',
            province:prv_city.province,
            provalue:'',
            cityvalue:'',
            phone:'',
            QQ:'',
            idCard:'',
            acqierement:'',
            summary:'',
            uploadToken:'',
            keycode: 'pc' + Date.now() + '.mp4'
        }
    },
    computed:{
        city(){
            this.cityvalue = '';
            let index = this.province.findIndex((item) => {
                return this.provalue == item;
            });
            if(index < 0){
                return []
            }else{
                return prv_city.city[index];
            }
        }
    },
    methods:{
        submitFormData(){
            this.$validator.validate().then(msg=>{
                console.log(msg);
                if(msg){
                    console.log({
                        username:this.username,
                        sex:this.sex,
                        provalue:this.provalue,
                        cityvalue:this.cityvalue,
                        phone:this.phone,
                        QQ:this.QQ,
                        idCard:this.idCard,
                        acqierement:this.acqierement,
                        summary:this.summary
                    });
                }else{
                    console.log('表单填写有误！')
                }
            });
        },
        getToken(){
            axios.get('http://api.gamefy.nextjoy.com/upload/upload_token',{
                params:{
                    path:'gamevideo',
                    key: this.keycode
                }
            }).then((res) => {
                this.uploadToken = res.data.data;
            });
        },
        upload(file){
            var uploaderOption = {
                domain : 'http://gv.vod.nextjoy.com/'
            }
            var observable = qiniu.upload(file,  'gamevideo/' + this.keycode, this.uploadToken);
            var observer = {
                next(res){
                    console.log(res);
                },
                error(err){
                    console.log(err);
                }, 
                complete(res){
                    console.log(res);
                }
            }
            var subscription = observable.subscribe(observer) // 上传开始
            // subscription.unsubscribe() // 上传取消


            // var uploader = new Uploader({
            //     target: 'http://upload-z1.qiniup.com',
            //     query:{
            //         token:token,
            //         key:'gamevideo/1234.mp4'
            //     },
            //     method:'multipart'
            // });
            // uploader.assignBrowse(this.$refs.uploadbutton);
            // // 文件添加 单个文件
            // uploader.on('fileAdded', function (file, event) {
            //     console.log(file, event);
            //     uploader.files = [file]
            //     uploader.upload();
            // });
            // // 正在上传
            // uploader.on('fileProgress', function (rootFile, file, chunk) {
            //     console.log(rootFile, file, chunk)
            // });
            // // 单个文件上传成功
            // uploader.on('fileSuccess', function (rootFile, file, message) {
            //     console.log(rootFile, file, message)
            // });
            // // 根下的单个文件（文件夹）上传完成
            // uploader.on('fileComplete', function (rootFile) {
            //     console.log(rootFile)
            // });
            // // 某个文件上传失败了
            // uploader.on('fileError', function (rootFile, file, message) {
            //     console.log(rootFile, file, message)
            // });
        },
        getFile(e){
            console.log(this);
            // this.upload(e.target.files[0]);
        }
    },
    mounted(){
        this.getToken();
    }
}
</script>
