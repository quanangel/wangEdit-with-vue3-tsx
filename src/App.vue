<template>
  <div>
    <h1>Editor</h1>
    <WangEdit :content="content" @change_content="_get_content" />
    <br/>

    <h1>Content</h1>
    <div v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import WangEdit from "./components/WangEdit";

@Options({
  components: {
    WangEdit,
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    _get_content(value: string) {
      this.content = value;
    },
  },
})
export default class App extends Vue {}
</script>

<style lang="less">
</style>
