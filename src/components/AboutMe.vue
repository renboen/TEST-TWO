<template>
  <div>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>
<script>

  import AddressList from "@/components/Address"
  import Longguest from "@/components/Longguest"
  import HasChecked from "@/components/HasChecked"


  export default{
      data(){
          return {
            currentView:""
          }
      },
    components:{
      AddressList,
      Longguest,
      HasChecked

    },
    mounted(){
      let that=this;
      that.$bus.$on('aboutTabListChecked', function(arg){
        that.currentView=arg;
      }); //Hub触发事件




      that.$bus.$emit('aboutHasMounted', true); //Hub触发事件




//      if (localStorage.getItem("isSgmOrPatac") == "PATAC") {
//        that.currentView = localStorage.getItem("addressBook")
//      } else {
//        that.currentView = "AddressList"
//      }
      that.$bus.$on('longguestAndAddress',function( arg1, arg2){
//        localStorage.setItem("addressBook", arg2);
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
