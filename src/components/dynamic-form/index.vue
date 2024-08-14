<template xmlns="">
  <div class="dynamic-form-container">
    <left-comp width="200px" :height="height" @add="add"/>
    <div
        class="main-container"
        :style="{'height': height ? 'calc('+height+'40px)': 'calc(100vh - 40px)'}"
    >
      <div class="operate-box">
        <el-button type="danger" size="mini" @click="delCur">删除选中组件</el-button>
        <el-button type="primary" size="mini" @click="previewShow = true">预览</el-button>
        <el-button type="primary" size="mini" @click="save">保存代码</el-button>
      </div>
      <draggable
          group="dynamic-form"
          class="drawing-board"
          :animation="340"
          :list="comps"
      >
        <dynamic-item
            v-for="item in comps"
            :key="item.id"
            :element="item"
            @select="select"
            @del="del"/>
      </draggable>
    </div>
    <right-comp width="400px" :height="height" :element="curEl"/>
    <el-dialog width="85%" title="预览" :visible.sync="previewShow">
      <preview-item
          v-for="item in comps"
          :key="item.id"
          :element="item"/>
    </el-dialog>
  </div>
</template>

<script>
import leftComp from "./left-comp.vue";
import dynamicItem from "./dynamic-item.vue";
import previewItem from "./preview-item.vue";
import rightComp from "./right-comp.vue";
import draggable from "vuedraggable";

export default {
  components: {draggable, leftComp, dynamicItem, previewItem, rightComp},
  props: ['height', 'rules'],
  data() {
    return {
      comps: [],
      curEl: null,
      previewShow: false,
      codeViewShow: false
    }
  },
  created() {
    let rules = this.rules ? typeof this.rules === 'string' ? JSON.parse(this.rules) : this.rules : [];
    rules = typeof rules === 'string' ? JSON.parse(rules) : rules;
    this.comps = rules
  },
  methods: {
    save() {
      this.$emit('save', this.comps, this.codeGen(this.comps))
    },
    //代码生成
    codeGen(comps) {
      let code = "";
      for (let comp of comps) {
        code += this.codeOne(comp)
      }
      return code
    },
    codeOne(element) {
      if (!element || !element.tag) return
      if (element.tag === 'el-row') {
        let code = `<el-row>`;
        for (let index = 0; index < element.col; index++) {
          code += `<el-col span=${parseInt(element.spans[index])}>`
          code += element.children && element.children.length > 0 ? this.codeOne(element.children[index]) : ''
          code += `</el-col>`
        }
        code += `</el-row>`
        return code
      } else if (element.tag === 'input') {
        return `
          <div style="
              display: flex;justify-content: center;align-items: center;
              width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
              height: ${element.height};
              padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
              margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
            ">
              <label slot="label"
                     style="color: ${element.labelColor};width: ${element.labelWidth};font-size: ${element.labelSize}">${element.label}</label>
                <el-input type="${element.type}" placeholder="${element.placeholder}" :clearable="${element.clearable}"
                    :readonly="${element.readonly}" :disabled="${element.disabled}" :maxlength="${element.maxlength}"
                    :show-word-limit="${element.showWordLimit}":size="${element.size}" rows="${element.rows}"
                    :prefix-icon="${element.prefixIcon}" :suffix-icon="${element.suffixIcon}"
                    v-model="${element.attr}" style="width:${element.inputWidth};"
                    />
            </div>
        `
      } else if (element.tag === 'upload') {
        return `
          <el-upload
                action="#"
                :show-file-list="false"
                style="
                  width: ${element.width};
                  height: ${element.height};
                  padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
                  margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
                  border: 1px dashed #d9d9d9;
                  border-radius: ${element.radius};
                  display: flex;
                  justify-content: center;
                  align-items: center;
                ">
                <el-img v-if="${element.value}" style="width: 100%;height: 100%;" :src="${element.value}"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        `
      } else if (element.tag === 'date') {
        return `
         <div style="
        display: flex;justify-content: center;align-items: center;
        width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
        height: ${element.height};
        padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
        margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
        ">
          <label slot="label"
                 style="color: ${element.labelColor};width: ${element.labelWidth};font-size: ${element.labelSize}">${element.label}</label>
          <el-date-picker
                v-model="${element.attr}" type="${element.type}"
                :clearable="${element.clearable}" :readonly="${element.readonly}" :disabled="${element.disabled}"
                placeholder="${element.placeholder}" style="width:${element.inputWidth};">
            </el-date-picker>
            </div>
          `
      }else if(element.tag === 'select'){
        return `
        <div style={\`
              display: flex;justify-content: center;align-items: center;
              width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
              height: ${element.height};
              padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
              margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
            \`}>
              <label slot="label"
                     style={\`color: ${element.labelColor};width: ${element.labelWidth};font-size: ${element.labelSize}\`}>{element.label}</label>
                <el-select v-model="${element.attr}"placeholder="${element.placeholder}" :filterable="${element.filterable}"
                           :clearable="${element.clearable}" :readonly="${element.readonly}" :disabled="${element.disabled}"
                           size={element.size} style={\`width:${element.inputWidth};\`}>
                  {element.options.map(item => {
                    return (
                        <el-option
                            label={item.label}
                            value={item.value}>
                        </el-option>
                    )
                  })}
              </el-select>
            </div>
        `
      }
  },
  //选择组件
  select(el) {
    this.curEl = el;
  }
  ,
  //添加组件
  add(obj) {
    this.comps.push(obj)
  }
  ,
  delCur() {
    if (!this.curEl) return;
    this.del(this.curEl)
    this.curEl = null
  }
  ,
  //删除组件
  del(element) {
    for (let i in this.comps) {
      if (this.comps[i].id === element.id) {
        this.comps.splice(i, 1);
        return
      }
      if (this.comps[i].children && this.comps[i].children.length) {
        this.delChild(element, this.comps[i].children)
      }
    }
  }
  ,
  delChild(element, elements) {
    for (let index in elements) {
      if (elements[index].id === element.id) {
        elements.splice(index, 1);
        return
      }
      if (elements[index].children && elements[index].children.length) {
        this.delChild(element, elements[index].children)
      }
    }
  }
  ,
}
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.dynamic-form-container {
  display: flex;
}

.main-container {
  width: calc(100% - 600px);
  overflow-y: auto;

  .operate-box {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
  }

  .drawing-board {
    width: calc(100% - 24px);
    min-height: calc(100% - 65px);
    padding: 12px;
  }
}
</style>