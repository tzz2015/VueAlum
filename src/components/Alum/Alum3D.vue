<template>
  <div class="bg">
    <div class="hide_box" ref="hide_box" >
      <video ref='audio'  :src="mp3Url" controls autoplay="autoplay" hidden="hidden">
      </video>
      <img v-if="isPlaying"  v-on:click="onPushMusic" src="../../assets/yinle.png" class="musicImage"/>
      <img v-else v-on:click="onPushMusic" id="btn" src="../../assets/yinle-stop.png" class="musicImage"/>
    </div>
    <div class="box">
      <ul class="minbox">
        <!--<li :style="{'background': 'url('+urls[0]+') no-repeat 0 0','background-size': hideBoxHeight/2+'vw '+hideBoxHeight/2+'vw','-webkit-transform':hideBoxHeight/3+'vw'}"></li>-->
        <li><img :src="urls[0]" class="image"/></li>
        <li><img :src="urls[1]" class="image"/></li>
        <li><img :src="urls[2]" class="image"/></li>
        <li></li>
        <li><img :src="urls[3]" class="image"/></li>
        <li><img :src="urls[4]" class="image"/></li>
      </ul>
      <ol class="maxbox" v-on:click="clickMaxBox">
        <li :style="isOpen?open_maxbox1:''"><img :src="urls[5]" class="image"/></li>
        <li :style="isOpen?open_maxbox2:''"><img :src="urls[6]" class="image"/></li>
        <li :style="isOpen?open_maxbox3:''"><img :src="urls[7]" class="image"/></li>
        <li :style="isOpen?open_maxbox4:''"><img :src="urls[8]" class="image"/></li>
        <li :style="isOpen?open_maxbox5:''"><img :src="urls[9]" class="image"/></li>
        <li :style="isOpen?open_maxbox6:''"><img :src="urls[10]" class="image"/></li>
      </ol>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Alum3D',
  data () {
    return {
      // 是否展开
      isOpen: false,
      isPlaying: false,
      hideBoxHeight: 0,
      // 定时器
      timer: '',
      open_maxbox1: {},
      open_maxbox2: {},
      open_maxbox3: {},
      open_maxbox4: {},
      open_maxbox5: {},
      open_maxbox6: {},
      // 所有背景图
      urls: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574177061750&di=4397f2537bf18eb04786fa7cf16b3b15&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201303%2F01%2F20130301124012_ewHVx.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729466&di=76f164c616c9685bda8ef4b1e8b7f804&imgtype=0&src=http%3A%2F%2Fpic40.nipic.com%2F20140405%2F8098773_014859127144_2.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729620&di=71d8d3640c72fa4083a3caf5f48dfe31&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F316df86677393bdc1108b03cbfe94ea0a5f470171e929-5h7zfq_fw658',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729620&di=1c8b1c631307711c564a862d8916fa3a&imgtype=0&src=http%3A%2F%2Fpic58.nipic.com%2Ffile%2F20150115%2F10570451_143130475000_2.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729617&di=0125f339db125299ed1a2452f25c7671&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20191017%2F8fd83a2e2b694ba2bcbeabdcf21f0510.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729617&di=dfffdb23c4f388f51deef46ea5343d26&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20130102%2FImg362210862.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574177061750&di=4397f2537bf18eb04786fa7cf16b3b15&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201303%2F01%2F20130301124012_ewHVx.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729466&di=76f164c616c9685bda8ef4b1e8b7f804&imgtype=0&src=http%3A%2F%2Fpic40.nipic.com%2F20140405%2F8098773_014859127144_2.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729620&di=71d8d3640c72fa4083a3caf5f48dfe31&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F316df86677393bdc1108b03cbfe94ea0a5f470171e929-5h7zfq_fw658',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729620&di=1c8b1c631307711c564a862d8916fa3a&imgtype=0&src=http%3A%2F%2Fpic58.nipic.com%2Ffile%2F20150115%2F10570451_143130475000_2.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729617&di=0125f339db125299ed1a2452f25c7671&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20191017%2F8fd83a2e2b694ba2bcbeabdcf21f0510.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574178729617&di=dfffdb23c4f388f51deef46ea5343d26&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20130102%2FImg362210862.jpg'
      ],
      mp3Url: 'http://m10.music.126.net/20191120001206/3b477e0a797c2451cf598158fc08603c/yyaac/545a/545b/5409/c0a6cf9cf3c1bf32bcf3cc9b13552543.m4a'
    }
  },
  methods: {
    // 点击外面的盒子
    clickMaxBox: function () {
      this.isOpen = !this.isOpen
    },
    // 打开相册
    autoOpen: function () {
      if (!this.isOpen) {
        this.isOpen = true
      }
    },
    // 播放和暂停歌曲
    onPushMusic: function () {
      if (!this.$refs.audio.paused) {
        this.$refs.audio.pause()
        this.isPlaying = false
      } else {
        this.$refs.audio.play()
        this.isPlaying = true
      }
    },
    // 开始播放
    initPlay: function () {
      this.$refs.audio.src = this.mp3Url
      this.$refs.audio.load()
    }
  },
  mounted: function () {
    const mearHeight = this.$refs.hide_box.offsetHeight
    this.hideBoxHeight = mearHeight / document.body.clientWidth * 100
    console.log(this.hideBoxHeight)
    this.open_maxbox1 = {
      WebkitTransform: 'translateZ(' + this.hideBoxHeight + 'vw)'
    }
    this.open_maxbox2 = {
      WebkitTransform: 'rotateX(180deg) translateZ(' + this.hideBoxHeight + 'vw)'
    }
    this.open_maxbox3 = {
      WebkitTransform: 'rotateX(-90deg) translateZ(' + this.hideBoxHeight + 'vw)'
    }
    this.open_maxbox4 = {
      WebkitTransform: 'rotateX(90deg) translateZ(' + this.hideBoxHeight + 'vw)'
    }
    this.open_maxbox5 = {
      WebkitTransform: 'rotateY(-90deg) translateZ(' + this.hideBoxHeight + 'vw)'
    }
    this.open_maxbox6 = {
      WebkitTransform: 'rotateY(90deg) translateZ(' + this.hideBoxHeight + 'vw)'
    }
    const that = this
    this.timer = setTimeout(function () {
      that.autoOpen()
    }, 5000)
    this.initPlay()
  },
  beforeDestroy: function () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>

  .bg {
    width: 750px;
    height: 1334px;
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574099727458&di=c1b0b56d6ab6cab1937d7560d907db5f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01127a58c8f054a801219c77f086fb.png%402o.png") no-repeat center;
    background-size: 100% 100%;
  }

  .hide_box {
    position: absolute;
    width: 300px;
    height: 300px;
  }

  .musicImage {
    position: absolute;
    left: 40px;
    top: 40px;
    width: 60px;
    height: 60px;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .box {
    width: 200px;
    height: 200px;
    top: 467px;
    left: 275px;
    position: relative;
    -webkit-transform-style: preserve-3d;
    -webkit-transform: rotateX(13deg);
    -webkit-animation: move 5s linear infinite;
  }

  .minbox {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 50px;
    top: 50px;
    -webkit-transform-style: preserve-3d;
  }

  .minbox li {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
  }

  /**前*/
  .minbox li:nth-child(1) {
    background-size: 150px 150px;
    -webkit-transform: translateZ(75px);
  }

  /**后*/
  .minbox li:nth-child(2) {
    background-size: 150px 150px;
    -webkit-transform: rotateX(180deg) translateZ(75px);
  }

  /**下*/
  .minbox li:nth-child(3) {
    background-size: 150px 150px;
    -webkit-transform: rotateX(-90deg) translateZ(75px);
  }

  /**上*/
  .minbox li:nth-child(4) {
    background-size: 150px 150px;
    -webkit-transform: rotateX(90deg) translateZ(75px);
  }

  /**左*/
  .minbox li:nth-child(5) {
    background-size: 150px 150px;
    -webkit-transform: rotateY(-90deg) translateZ(75px);
  }

  /**右*/
  .minbox li:nth-child(6) {
    background-size: 150px 150px;
    -webkit-transform: rotateY(90deg) translateZ(75px);
  }

  .maxbox {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transform-style: preserve-3d;
  }

  .maxbox li {
    width: 200px;
    height: 200px;
    background: #fff;
    border: 1px solid #ccc;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transition: all 1s ease;
  }

  .maxbox li:nth-child(1) {
    background: transparent no-repeat 0 0;
    background-size: 200px 200px;
    -webkit-transform: translateZ(100px);
  }

  .maxbox li:nth-child(2) {
    background: transparent no-repeat 0 0;
    background-size: 200px 200px;
    -webkit-transform: rotateX(180deg) translateZ(100px);
  }

  .maxbox li:nth-child(3) {
    background: transparent no-repeat 0 0;
    background-size: 200px 200px;
    -webkit-transform: rotateX(-90deg) translateZ(100px);
  }

  .maxbox li:nth-child(4) {
    background: transparent no-repeat 0 0;
    background-size: 200px 200px;
    -webkit-transform: rotateX(90deg) translateZ(100px);
  }

  .maxbox li:nth-child(5) {
    background: transparent no-repeat 0 0;
    background-size: 200px 200px;
    -webkit-transform: rotateY(-90deg) translateZ(100px);
  }

  .maxbox li:nth-child(6) {
    background: transparent no-repeat 0 0;
    background-size: 200px 200px;
    -webkit-transform: rotateY(90deg) translateZ(100px);
  }

  @keyframes move {
    0% {
      -webkit-transform: rotateX(13deg) rotateY(0deg);
    }
    100% {
      -webkit-transform: rotateX(13deg) rotateY(360deg);
    }
  }

</style>
