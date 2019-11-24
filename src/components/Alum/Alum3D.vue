<template>
  <div class="bg" :style="bg_style">
    <div class="hide_box" ref="hide_box">
      <audio ref='audio' :src="mp3Url" controls autoplay="autoplay" hidden="hidden">
      </audio>
      <img v-if="isPlaying" v-on:click="onPushMusic" src="../../assets/yinle.png" class="musicImage"/>
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
import {MessageBox} from 'mint-ui'

export default {
  name: 'Alum3D',
  data () {
    return {
      // 是否展开
      // 相册ID
      key: '',
      isOpen: false,
      isPlaying: true,
      hideBoxHeight: 0,
      // 定时器
      timer: '',
      open_maxbox1: {},
      open_maxbox2: {},
      open_maxbox3: {},
      open_maxbox4: {},
      open_maxbox5: {},
      open_maxbox6: {},
      bg_style: {},
      // 背景图片
      bg_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574099727458&di=c1b0b56d6ab6cab1937d7560d907db5f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01127a58c8f054a801219c77f086fb.png%402o.png',
      // 所有背景图
      urls: [],
      mp3Url: ''
    }
  },
  created () {
    if (this.$route.query.key) {
      this.key = this.$route.query.key
      console.log('获取到key:' + this.key)
      this.getOrderDetail()
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
    },
    // 请求订单详情
    getOrderDetail () {
      let that = this
      this.$requestUtils.post(this, '/alum_order_detail', {key: this.key})
        .then(res => {
          if (res) {
            if (res.data !== null || res.data !== undefined) {
              // 审核通过
              if (res.data.pay_status !== undefined) {
                if (res.data.pay_status === 0) {
                  that.getAlumDetail()
                  // 未审核
                } else if (res.data.pay_status === 1) {
                  // 审核中
                  MessageBox('提示', '酷炫3D相册打赏后才能看哦！')
                } else {
                  MessageBox('提示', '打赏审核中，审核通过才能看哦！如太久没审核过，请加微信IT9923')
                }
              }
            }
          }
        })
    },
    // 请求相册详情
    getAlumDetail () {
      let that = this
      this.$requestUtils.post(this, '/alum_detail', {key: this.key})
        .then(res => {
          if (res) {
            if (res.data !== null || res.data !== undefined) {
              that.bg_url = res.data.bg_url
              that.mp3Url = res.data.music_url
              that.urls = res.data.image_urls.split(',')
              that.setBgStyle()
            }
          }
        })
    },
    // 设置背景
    setBgStyle () {
      this.bg_style = {
        background: 'url(' + this.bg_url + ')',
        zoom: '1',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        WebkitBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundPosition: 'center 0'
      }
    }
  },
  mounted: function () {
    const mearHeight = this.$refs.hide_box.offsetHeight
    this.hideBoxHeight = mearHeight / document.documentElement.clientWidth * 100
    console.log(this.hideBoxHeight)
    this.open_maxbox1 = {
      WebkitTransform: 'translateZ(' + this.hideBoxHeight + 'vw)'
    }
    this.open_maxbox2 = {
      WebkitTransform: 'rotateY(180deg) translateZ(' + this.hideBoxHeight + 'vw)'
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

    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574099727458&di=c1b0b56d6ab6cab1937d7560d907db5f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01127a58c8f054a801219c77f086fb.png%402o.png");
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 750px;
    z-index: -10;
    zoom: 1;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
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
    -webkit-transform: rotateY(180deg) translateZ(75px);
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
    -webkit-transform: rotateY(180deg) translateZ(100px);
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
