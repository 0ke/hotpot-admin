<template>
  <el-row>
    <el-col span="22" offset="1">
      <div>
        <div ref="editor1">
          <p>Hello World!</p>
          <p>Some initial <strong>bold</strong> text</p>
          <p><br></p>
        </div>
      </div>

      <div class="mt-2">
        <div ref="editor2">
          <h1>Quill Rich Text Editor</h1>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import Quill from 'quill'

  export default {
    created() {
      this.$root.contentTitle = 'WYSIWYG Editor'
      this.$root.contentBreadcrumbs = [
        {
          text: 'Index',
          path: '/'
        },
        {
          text: 'WYSIWYG Editor'
        }
      ]
    },
    mounted() {
      // 1. 初始化 editor1
      let quill1 = new Quill(this.$refs.editor1, {
        theme: 'snow'
      })

      // 1. 初始化 editor2
      let quill2 = new Quill(this.$refs.editor2, {
        modules: {
          'formula': true,
          'syntax': true,
          'toolbar': [
            ['bold', 'italic', 'underline', 'strike'],
            [{'color': []}, {'background': []}],
            [{'script': 'super'}, {'script': 'sub'}],
            [{'header': '1'}, {'header': '2'}, 'blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['direction', {'align': []}],
            ['link', 'image', 'video', 'formula'],
            ['clean']
          ],
        },
        theme: 'snow'
      })
    }
  }
</script>
<style>
  @import "../../../node_modules/quill/dist/quill.snow.css";
</style>
