<template>
  <div class="body" style="margin-top: 3%">
    <div class="body" style="margin-top: 3%">
      <div style="margin-top: 3%">
        <nav-menu></nav-menu>
        <router-view/>
      </div>
    </div>

 <div style="margin-left: 400px;margin-top: 20px"><h1>出库资料登入</h1></div>
    <el-container class="body" >
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="FontForm" ref="FontForm" :rules="rules">
        <p style="padding-bottom: 10px">选择订单号
          <el-button style="size: landscape" @click="getContent" >选择订单号点击自动填充</el-button>
        </p>
        <el-select style="padding-bottom: 15px;width: 250px " v-model="selectedEntryNumber" filterable placeholder="请选择">
          <el-option v-for="item in entryNumbers" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-form-item label="货物种类" prop="cargoType">
          <el-input v-model="FontForm.cargoType"></el-input>
        </el-form-item>
        <el-form-item label="出库货物总数(单位：件数)" prop="totalNumber">
          <el-input v-model="FontForm.totalNumber"></el-input>
        </el-form-item>
        <el-form-item label="总重量(单位：KG)" prop="totalWeight">
          <el-input v-model="FontForm.totalWeight"></el-input>
        </el-form-item>
        <el-form-item label="出库地址" prop="address">
          <el-input v-model="FontForm.address"></el-input>
        </el-form-item>
        <el-form-item label="货物状态(是否有破损)" prop="state">
          <el-input type="textarea" v-model="FontForm.state"></el-input>
        </el-form-item>
      </el-form>
    </el-container>
    <el-button type="primary" style="margin-left: 100px" size="200" @click="save">提交出库</el-button>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
export default {
  name: 'FontOutbound',
  components: {NavMenu},
  data() {
    //验证状态
    let validateState = (rule, value, callback) => {
      if (!value) {
        console.log('State 验证失败：值不能为空');
        return callback(new Error('货物状态不能为空'));
      }else {
        callback();// 一定要每种情况都执行回调
      }
    }
    let validateTotalWeight = (rule, value, callback) => {
      if (!value) {
        console.log('totalWeight 验证失败：值不能为空');
         callback(new Error('货物总重量不能为空'));
      }else
      if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value)) {
        callback(new Error('请输入数字值'))
      }else {
        callback();// 一定要每种情况都执行回调
      }
    }
    let validateTotalNumber = (rule, value, callback) => {
      if (!value) {
        console.log('TotalNumber 验证失败：值不能为空');
        callback(new Error('货物总数量不能为空'));
      }else
      if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value)) {
        console.log('totalWeight 验证失败：值必须是数字');
        callback(new Error('请输入数字值'))
      }else {
        callback();// 一定要每种情况都执行回调
      }
    }
    let validateCargoType = (rule, value, callback) => {
      if (!value || !value.trim()) {
        console.log('CargoType 验证失败：值不能为空');
        return callback(new Error('货物种类不能为空'));
      }else {
        callback();// 一定要每种情况都执行回调
      }
    }
    let validateAddress = (rule, value, callback) => {
      if (!value || !value.trim()) {
        console.log('Address 验证失败：值不能为空');
        return callback(new Error('出库地址不能为空'));
      }else {
        callback();// 一定要每种情况都执行回调
      }
    }
    return {
      entryNumbers: [],
      labelPosition:'top',
      selectedEntryNumber:'',
      FontForm:{
        entryNumber:'',
        state:'',
        totalWeight:'',
        cargoType:'',
        entryTime:'',
        totalNumber:'',
        address:'',
      },
      rules: {
        state: [{ validator: validateState, trigger: 'blur' }],
        totalWeight: [{ validator: validateTotalWeight, trigger: 'blur' }],
        totalNumber: [{ validator: validateTotalNumber, trigger: 'blur' }],
        cargoType: [{ validator: validateCargoType, trigger: 'blur' }],
        address: [{ validator: validateAddress, trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getEntryNumber()
  },
  methods: {
    //自动填充
    getContent(){
      if(this.selectedEntryNumber){
        this.request.get("/outbound/get/"+this.selectedEntryNumber).then(res =>{
          if (res.code === '200') {
            this.$message.success("操作成功")
            const arr=res.data
            this.FontForm=arr[0]
            console.log(arr[0])
          } else {
            this.$message.error("操作失败")
          }
        })
      }else {
        this.$message.error("请填写订单号")
      }

    },
    getEntryNumber(){
      this.request.get("/incoming/findAll").then(res =>{
        console.log(res.data)
        this.entryNumbers = res.data.map(item => ({ value: item.entryNumber, label: item.entryNumber}));
      })
    },
    save() {
      //表单校验
      this.$refs['FontForm'].validate((valid)=> {
        if (valid) {
          //将选择的订单号转移到entryNumbers数组中
          this.FontForm.entryNumber = this.selectedEntryNumber
          this.request.post("/outbound/out", this.FontForm).then(res => {
            if (res.code === '200') {
              this.$message.success("保存成功")
              this.$refs.FontForm.resetFields()
            } else {
              this.$message.error("保存失败")
            }
          })
        }
      }
      )
    },
  }
}

</script>

<style scoped>
.body {
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 15px;
}

.body {
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 15px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

</style>
