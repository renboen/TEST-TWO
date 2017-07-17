<template>
  <div id="">
    <!--<keep-alive include="WaitCheck,HasChecked">-->
      <component :is="currentView"></component>
    <!--</keep-alive>-->
  </div>
</template>
<script>
//  import $ from "jquery";
  import WaitCheck from "@/components/WaitCheck"
  import HasChecked from "@/components/HasChecked"
  export default{
    data(){
      return {
        currentView: "HasChecked",
      }
    },
    components: {
      WaitCheck,
      HasChecked
    },
    watch: {
      currentView: "currentChange"
    },
    methods: {
      currentChange(){
        // alert(this.currentView)
      }
    },
    mounted: function () {
//        alert(localStorage.getItem("hased"))
      var that = this;
      $("#check").css({
        height: $(window).height() - 90
      })
      that.$bus.$emit('checkHasMounted', true)


//      if (localStorage.getItem("isSgmOrPatac") == "PATAC") {
//        that.currentView = localStorage.getItem("hased")
//      } else {
//        that.currentView = "HasChecked"
//      }

//        that.currentView= "HasChecked"
//
      that.$bus.$on('hubchange', function (data1, data2) {
//        localStorage.setItem("hased", data2)
        that.currentView = data2;
      })
    }
  }

</script>
<style scoped>
  #check {
    background: white;
    overflow: scroll;
  }
</style>
