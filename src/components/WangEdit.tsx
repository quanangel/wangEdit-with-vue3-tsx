import { defineComponent, ref, onMounted, onBeforeUnmount, watchEffect } from "vue"
import WangEditor from "wangeditor"

export default defineComponent({
  name: "WangEdit",
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  emits: ['change_content'],
  setup(props, ctx) {
    const content = ref(props.content)
    const editor = ref()
    let instance: any
    onMounted(() => {
      instance = new WangEditor(editor.value)

      // custom upload function
      // instance.config.customUploadImg = (resultFiles: Array<any>, insertImgFn: Function) => {
        // resultFiles is upload file list
        // insertImgFn is function of  insert editor
        // insertImgFn(imgUrl)
      // }

      // update [parent component content
      Object.assign(instance.config, {
        onblur(newHtml: any) {
          ctx.emit('change_content', newHtml)
        }
      })
      // create editor
      instance.create()
      // set editor content
      instance.txt.html(content.value)
    })

    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
      watchContent()
    })

    const watchContent = watchEffect(() => {
      if (instance) {
        instance.txt.html(props.content)
      }
    })

    return () => (
      <>
        <div ref={editor}></div>
      </>
    )
  }
})
