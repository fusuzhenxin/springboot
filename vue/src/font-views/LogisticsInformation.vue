<template>
  <div class="body" style="margin-top: 3%">
  <div class="body" style="margin-top: 3%">
    <div style="margin-top: 3%">
      <nav-menu></nav-menu>
      <router-view/>
    </div>
    <el-container class="body" >
    <el-form style="margin-top: 30px" label-width="650px" :model="FontForm">
      <el-select style="padding-bottom: 15px;width: 250px;margin-left: 650px " v-model="selectedEntryNumber" filterable placeholder="请输入订单号">
        <el-option v-for="item in entryNumbers" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form>
    </el-container>
    <el-popover
        placement="right"
        width="1500"
        v-model="visible"
        trigger="click">
      <el-table :data="gridData">
        <el-table-column prop="entryNumber" width="150px" label="订单号"></el-table-column>
        <el-table-column prop="state" width="120px" label="货物入库是否完好"></el-table-column>
        <el-table-column prop="outState" width="120px" label="货物出库是否完好"></el-table-column>
        <el-table-column prop="totalWeight" label="入库总重量"></el-table-column>
        <el-table-column prop="outTotalWeight" width="80px" label="出库总重量"></el-table-column>
        <el-table-column prop="totalNumber" width="100px" label="入库货物总数"></el-table-column>
        <el-table-column prop="outTotalNumber" width="100px" label="出库货物总数"></el-table-column>
        <el-table-column prop="cargoType" label="种类"></el-table-column>
        <el-table-column prop="address" width="150px" label="入库地址"></el-table-column>
        <el-table-column prop="outAddress" width="150px" label="出库地址"></el-table-column>
        <el-table-column prop="currentState" width="100px" label="物流信息状态"></el-table-column>
        <el-table-column prop="entryTime" width="150px" label="入库时间"></el-table-column>
        <el-table-column prop="outTime" width="150px" label="出库时间"></el-table-column>
      </el-table>
      <el-button  type="warning" style="margin-left: auto" @click="visible=false">关闭 </el-button>
    </el-popover>

    <el-button slot="reference" type="warning" style="padding-left: 10px;margin-left: 650px" @click="inputVerdict">查询招聘状态 </el-button>
  </div>>
  </div>
</template>
<script>
import NavMenu from './common/NavMenu'
export default {
  name: "LogisticsInformation",
  components: {NavMenu},
  data(){
    return{
      visible:false,
      entryNumbers:[],
      selectedEntryNumber:'',
      gridData:[],
      direction: 'btt',
      drawer: false,
      FontForm:{
        entryNumber:'',
        currentState:'',
        state:'',
        totalWeight:'',
        cargoType:'',
        entryTime:'',
        totalNumber:'',
        address:'',
      }
    }
  },
  created() {
    this.getEntryNumber()
  },
  methods: {
    getEntryNumber(){
      this.request.get("/incoming/findAll").then(res =>{
        console.log(res.data)
        this.entryNumbers = res.data.map(item => ({ value: item.entryNumber, label: item.entryNumber}));
      })
    },
    handleSearch() {
      this.request.get("/combiningresult/getContent/"+this.selectedEntryNumber).then(res =>{
        if (res.code === '200') {
          this.gridData=res.data
          this.$message.success("操作成功")
        } else {
          this.$message.error("操作失败")
        }
      })
    },
  inputVerdict(){
      if (this.selectedEntryNumber){
        this.visible = !this.visible;
        this.handleSearch()
      }else{
        this.$message.error("请输入订单号")
      }
  }
  },

}

</script>

<style scoped>

</style>