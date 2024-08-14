<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  props: ['element'],
  render(h) {
    return this.render(h, this.element)
  },
  methods: {
    render(h, element) {
      // let ele;
      // let form = {};
      // if (element.tag === 'single-container') {
      //   ele = (
      //       <div style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         min-height: ${element.minHeight};
      //         height: ${element.height};
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //         border-radius: ${element.radius}px;
      //         background: ${element.background};
      //         `}>
      //         <div
      //             class="drawing-board"
      //             style={`
      //               width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //               min-height: ${element.minHeight};
      //               height: ${element.height};
      //             `}
      //             >
      //           {element.children.map(item => {
      //             return (
      //                 <div className="clone-element">
      //                   {this.render(h, item)}
      //                 </div>
      //             )
      //           })}
      //         </div>
      //       </div>
      //   )
      // } else if (element.tag === 'multiple-container') {
      //   ele = (
      //       <div style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         min-height: ${element.minHeight};
      //         height: ${element.height};
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //         border-radius: ${element.radius}px;
      //         background: ${element.background};
      //         `}>
      //         <div
      //             class="drawing-board"
      //             style={`
      //             width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //             min-height: ${element.minHeight};
      //             height: ${element.height};
      //             display: flex;
      //             justify-content: ${element.align};
      //             flex-wrap: wrap;
      //             align-items: center;`}
      //             >
      //           {element.children.map(item => {
      //             return (
      //                 <div className="clone-element">
      //                   {this.render(h, item)}
      //                 </div>
      //             )
      //           })}
      //         </div>
      //       </div>
      //   )
      // } else if (element.tag === 'input') {
      //   ele = (
      //       <div style={`
      //         display: flex;justify-content: center;align-items: center;
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         height: ${element.height};
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `}>
      //         <label slot="label"
      //                style={`color: ${element.labelColor};width: ${element.labelWidth};font-size: ${element.labelSize}`}>{element.label}</label>
      //           <el-input type={element.type} placeholder={element.placeholder} clearable={element.clearable}
      //               readonly={element.readonly} disabled={element.disabled} maxlength={element.maxlength}
      //               minlength={element.minlength} show-word-limit={element.showWordLimit}
      //               prefix-icon={element.prefixIcon} suffix-icon={element.suffixIcon}
      //               size={element.size} rows={element.rows} v-model={element.value}
      //               style={`width:${element.inputWidth};`}
      //               />
      //       </div>
      //   )
      // } else if (element.tag === 'car-color') {
      //   ele = (
      //       <car-color style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         display: ${element.display};
      //       `} form={form} attr={element.attr}/>
      //   )
      // } else if (element.tag === 'next-button') {
      //   ele = (
      //       <div style={`
      //         display: flex;justify-content: center
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         height: ${element.height};
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `}>
      //         <div class="next-btn mt16" style={`
      //         background-color: ${element.background};
      //         color: ${element.color};
      //         `}>下一步
      //         </div>
      //       </div>
      //   )
      // } else if (element.tag === 'jump') {
      //   ele = (
      //       <jump style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `} form={form} attr={element.attr}/>
      //   )
      // } else if (element.tag === 'contact') {
      //   ele = (
      //       <contact form={form} attr={element.attr}/>
      //   )
      // } else if (element.tag === 'pay-button') {
      //   ele = (
      //       <div style="display: flex;justify-content: center">
      //         <div class="next-btn mt16">立即支付</div>
      //       </div>
      //   )
      // } else if (element.tag === 'user-info') {
      //   ele = (
      //       <user-info style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `} form={form}/>
      //   )
      // } else if (element.tag === 'order-info') {
      //   ele = (
      //       <order-info style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `} form={form}/>
      //   )
      // } else if (element.tag === 'title') {
      //   ele = (
      //       <Title title={element.label} subtitle={element.subtitle}/>
      //   )
      // } else if (element.tag === 'car-number') {
      //   ele = (
      //       <car-number style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `} disabled={element.disabled} form={form} attr={element.attr}/>
      //   )
      // } else if (element.tag === 'product-list') {
      //   ele = (
      //       <product-list style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `}
      //                     form={form} attr={element.attr} type={element.type}/>
      //   )
      // } else if (element.tag === 'product-list2') {
      //   ele = (
      //       <product-list2 form={form} attr={element.attr} type={element.type} style={{width: element.width}}/>
      //   )
      // } else if (element.tag === 'city') {
      //   ele = (
      //       <city style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `} form={form} attr={element.attr}/>
      //   )
      // } else if (element.tag === 'agree') {
      //   ele = (
      //       <agree style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `} form={form} attr={element.attr}/>
      //   )
      // } else if (element.tag === 'uploader') {
      //   ele = (
      //       <uploader defaultImg={element.defaultImg} tip={element.tip} style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //       `}/>
      //   )
      // } else if (element.tag === 'overlay') {
      //   ele = (
      //       <overlay/>
      //   )
      // } else if (element.tag === 'result') {
      //   ele = (
      //       <result mainTip={element.mainTip} tip={element.tip} otherTip={element.otherTip}
      //               defaultImg={element.defaultImg}/>
      //   )
      // } else if (element.tag === 'steps') {
      //   if (typeof element.steps === 'string') {
      //     element.steps = element.steps.split(',')
      //   }
      //   ele = (
      //       <steps style={`
      //       padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //       margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //     `} active={element.active} form={this.form} steps={element.steps}>
      //       </steps>
      //   )
      // } else if (element.tag === 'one-col') {
      //   ele = (
      //       <div style={`
      //         width: calc(${element.width} - ${element.paddingLeft} - ${element.paddingRight});
      //         min-height: ${element.height};
      //         padding: ${element.paddingTop} ${element.paddingRight} ${element.paddingBottom} ${element.paddingLeft};
      //         margin: ${element.marginTop} ${element.marginRight} ${element.marginBottom} ${element.marginLeft};
      //         background: ${element.background};
      //         border-radius: ${element.radius}px;
      //         `}>
      //         <draggable class="drawing-board"
      //                    list={element.children}
      //                    animation={340}
      //                    style={{width: '100%', height: '100%'}}
      //                    onAdd={() => this.addComponent(element)}
      //                    group="dynamic-form">
      //           {element.children.map(item => {
      //             return (
      //                 <div class="clone-element">
      //                   {this.render(h, item)}
      //                 </div>
      //             )
      //           })}
      //         </draggable>
      //       </div>
      //   )
      // }
      // return (
      //     <el-form>
      //       {ele}
      //     </el-form>
      // )
    },
  }
}
</script>
<style lang="scss">
</style>