<template>
  <div>
    <!--<keep-alive>-->
      <component :is="currentView"></component>
    <!--</keep-alive>-->
  </div>
</template>
<script>

  import AddressList from "@/components/Address"
  import Longguest from "@/components/Longguest"

  export default{
      data(){
          return {
            currentView:localStorage.getItem("addressBook"),
          }
      },
    components:{
      AddressList,
      Longguest
    },
    mounted(){
      let that=this;
      if (localStorage.getItem("isSgmOrPatac") == "PATAC") {
        that.currentView = localStorage.getItem("addressBook")
      } else {
        that.currentView = "AddressList"
      }
      that.$bus.$on('longguestAndAddress',function( arg1, arg2){
        localStorage.setItem("addressBook", arg2);
        that.currentView=arg2;
      });
    }

  }
</script>
<style scoped>
  div{
    background: white;
  }

</style>
