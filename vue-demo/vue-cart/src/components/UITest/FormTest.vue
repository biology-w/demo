<template>
    <div>
        <h3>{{title}}</h3>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
            <el-form-item label="name" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="pwd">
                <el-input v-model="ruleForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">登陆</el-button>
            </el-form-item>
        </el-form>

        <!-- custom input-->
        <k-input v-model="kInputValue"></k-input>
        {{this.kInputValue}}

        <!--&lt;!&ndash; custom -form-item&ndash;&gt;-->
        <!--<k-form-item label="名字" prop="name">-->
            <!--<k-input v-model="ruleForm.name"></k-input>-->
        <!--</k-form-item>-->
        <!--<k-form-item label="密码" prop="pwd">-->
            <!--<k-input v-model="ruleForm.pwd" type="password"></k-input>-->
        <!--</k-form-item>-->
        <!--{{ruleForm}}-->

        <!-- custom -form -->
        <k-form :model="kRuleForm" :rules="kRules" ref="kRefForm">
            <k-form-item label="k-名字" prop="name">
                <k-input v-model="kRuleForm.name"></k-input>
            </k-form-item>
            <k-form-item label="k-密码" prop="pwd">
                <k-input v-model="kRuleForm.pwd" type="password"></k-input>
            </k-form-item>
            <k-form-item>
                <el-button type="primary" @click="kSubmitForm()">k-登陆</el-button>
            </k-form-item>
        </k-form>
        {{kRuleForm}}
        <!--slot-->
        <KSlot>
            <h3>default</h3>
            <template slot="one">
                <h2>one</h2>
            </template>
            <template slot="two">
                two
            </template>
        </KSlot>
    </div>
</template>
<script>
  import KInput from './KInput.vue';
  import KSlot from './KSlot.vue';
  import KFormItem from './KFormItem.vue';
  import KForm from './KForm.vue';

  export default {
    props: {
      title: {
        type: String, required: true, default: 'Form-test-title'
      }
    },
    data() {
      return {
        ruleForm: {
          name: '',
          pwd: '',
        },
        rules: {
          name: [
            {required: true, message: '请填写', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请填写密码', trigger: 'blur'}
          ]
        },
        kInputValue: '',

        kRuleForm: {
          name: '',
          pwd: ''
        },
        kRules: {
          name: [
            {required: true, message: '请填写', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请填写密码', trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      KInput,
      KSlot,
      KFormItem,
      KForm
    },
    methods: {
      submitForm() {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit');
            return false
          }
        })
      },

      kSubmitForm() {
        this.$refs['kRefForm'].validate(valid => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit');
            return false
          }
        })
      }
    }
  }
</script>
