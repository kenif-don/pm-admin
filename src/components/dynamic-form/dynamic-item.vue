<script>
// import draggable from 'vuedraggable'

// export default {
//   components: {
//     draggable,
//   },
//   props: ['element'],
//   render(h) {
//     return this.render(h, this.element)
//   },
//   methods: {
//     render(h, element) {
//       if(!element || !element.tag)return;
//       let ele;
//       let that = this;
//       if (element.tag === 'single-container') {
//         ele = (
//             <div style={`
//               width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
//               min-height: ${element.minHeight};
//               height: ${element.height};
//               padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
//               margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
//               border-radius: ${element.radius}px;
//               background: ${element.background};
//               `}>
//               <draggable
//                   class="drawing-board"
//                   list={element.children}
//                   animation={1000}
//                   style={`
//                     width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
//                     min-height: ${element.minHeight};
//                     height: ${element.height};
//                   `}
//                   group="dynamic-form">
//                 {element.children.map(item => {
//                   return (
//                       <div className="clone-element">
//                         {this.render(h, item)}
//                       </div>
//                   )
//                 })}
//               </draggable>
//             </div>
//         )
//       } else if (element.tag === 'multiple-container') {
//         ele = (
//             <div style={`
//               width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
//               min-height: ${element.minHeight};
//               height: ${element.height};
//               padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
//               margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
//               border-radius: ${element.radius}px;
//               background: ${element.background};
//               `}>
//               <draggable
//                   class="drawing-board"
//                   list={element.children}
//                   animation={1000}
//                   style={`
//                   width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
//                   min-height: ${element.minHeight};
//                   height: ${element.height};
//                   display: flex;
//                   justify-content: ${element.align};
//                   flex-wrap: wrap;
//                   align-items: center;`}
//                   group="dynamic-form">
//                 {element.children.map(item => {
//                   return (that.render(h, item))
//                 })}
//               </draggable>
//             </div>
//         )
//       } else if (element.tag === 'el-row') {
//         ele = (
//             <el-row>
//               {Array.from({length: element.col}).map((i, index) => {
//                 return (<el-col span={parseInt(element.spans[index])}>
//                   <draggable
//                       class="drawing-board"
//                       list={element.children}
//                       animation={1000}
//                       style={`
//                         height: auto;
//                         background: #dedede;`}
//                       group="dynamic-form">
//                     {element.children && element.children.length > 0 ? this.render(h, element.children[index]) : ''}
//                   </draggable>
//                 </el-col>)
//               })}
//             </el-row>
//         )
//       } else if (element.tag === 'input') {
//         ele = (
//             <div style={`
//               display: flex;justify-content: center;align-items: center;
//               width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
//               height: ${element.height};
//               padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
//               margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
//             `}>
//               <label slot="label"
//                      style={`color: ${element.labelColor};width: ${element.labelWidth};font-size: ${element.labelSize}`}>{element.label}</label>
//               <el-input type={element.type} placeholder={element.placeholder} clearable={element.clearable}
//                         readonly={element.readonly} disabled={element.disabled} maxlength={element.maxlength}
//                         minlength={element.minlength} show-word-limit={element.showWordLimit}
//                         prefix-icon={element.prefixIcon} suffix-icon={element.suffixIcon}
//                         size={element.size} rows={element.rows} v-model={element.value}
//                         style={`width:${element.inputWidth};`}
//               />
//             </div>
//         )
//       } else if (element.tag === 'date') {
//         ele = (
//             <div style={`
//               display: flex;justify-content: center;align-items: center;
//               width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
//               height: ${element.height};
//               padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
//               margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
//             `}>
//               <label slot="label"
//                      style={`color: ${element.labelColor};width: ${element.labelWidth};font-size: ${element.labelSize}`}>{element.label}</label>
//             <el-date-picker
//                 v-model={element.value} type={element.type}
//                 clearable={element.clearable} readonly={element.readonly} disabled={element.disabled}
//                 placeholder={element.placeholder} style={`width:${element.inputWidth};`}>
//             </el-date-picker>
//             </div>
//         )
//       } else if (element.tag === 'upload') {
//         ele = (
//             <el-upload
//                 action="#"
//                 show-file-list={false}
//                 style={`
//                   width: ${element.width};
//                   height: ${element.height};
//                   padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
//                   margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
//                   border: 1px dashed #d9d9d9;
//                   border-radius: ${element.radius};
//                   display: flex;
//                   justify-content: center;
//                   align-items: center;
//                 `}
//                 >
//                 <i class="el-icon-plus avatar-uploader-icon"></i>
//             </el-upload>
//         )
//       }else if (element.tag === 'select') {
//         ele = (
//             <div style={`
//               display: flex;justify-content: center;align-items: center;
//               width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
//               height: ${element.height};
//               padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
//               margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
//             `}>
//               <label slot="label"
//                      style={`color: ${element.labelColor};width: ${element.labelWidth};font-size: ${element.labelSize}`}>{element.label}</label>
//                 <el-select v-model={element.value} placeholder={element.placeholder} filterable={element.filterable}
//                            clearable={element.clearable} readonly={element.readonly} disabled={element.disabled}
//                            size={element.size} style={`width:${element.inputWidth};`}>
//                   {element.options.map(item => {
//                     return (
//                         <el-option
//                             label={item.label}
//                             value={item.value}>
//                         </el-option>
//                     )
//                   })}
//               </el-select>
//             </div>
//         )
//       }else if(element.tag === 'label'){
//         ele = (
//             <div style={`
//               display: flex;justify-content: center;align-items: center;
//               width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
//               height: ${element.height};
//               padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
//               margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
//             `}>
//               <label slot="label"
//                      style={`color: ${element.labelColor};width: ${element.labelWidth};font-size: ${element.labelSize};`}>{element.label}</label>
//               <draggable
//                   className="drawing-board"
//                   list={element.children}
//                   animation={1000}
//                   style={`width:${element.inputWidth};height:${element.height}`}
//                   group="dynamic-form">
//                 {element.children.map(item => {
//                   return (that.render(h, item))
//                 })}
//               </draggable>
//             </div>
//         )
//       }
//       return (
//           <div class="clone-element" onClick={(e) => {
//             this.selectComponent(e, element);
//           }}>
//             {ele}
//             <div class="operate-btn-box">
//               <i class="build-ele-icon el-icon-delete" style="color:#ff6600" id={element.id}
//                  onClick={() => this.deleteElement(element)}/>
//             </div>
//           </div>
//       )
//     },
//     selectComponent(e, element) {
//       this.$emit("select", element)
//       //阻止冒泡
//       e.stopPropagation();
//     },
//     addComponent(element) {
//     },
//     deleteElement(element) {
//       this.$emit('del', element)
//     }
//   }
// }
</script>
<style lang="scss">
.clone-element {
  position: relative;
  cursor: pointer;

  .operate-btn-box {
    position: absolute;
    top: -12px;
    right: 0;
    z-index: 9999;
  }
}

.clone-element:hover {
  border: 1px dotted #409EFF;
}

.build-ele-icon {
  cursor: pointer;
}
</style>