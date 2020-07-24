<template>
  <div>
    children:{{name}}

<children placeholder='帆帆帆帆' type='password'  pick-data='333333s' v-model="name" @focus="fffff" @blur='ggggg'></children>

  </div>
</template>
<script>
export default {
  name: 'System',
  data () {
    return {
      name: '111',
      arr: [2, 0, 5, 5, 5]
    }
  },
  watch: {
    name () {
      console.log('updata', name)
      this.$delete(this.arr, 0)
    }
  },
  mounted () {
    console.log('mounted...')
  },
  methods: {
    fffff () {
      console.log('onfocus....')
    },
    ggggg () {
      console.log('onblur....')
    }
  },
  components: {
    children: {
      props: ['value'],
      inheritAttrs: false,
      template: `<div><label for="">{{$attrs}}</label>
      <input  v-bind="$attrsAll"  v-on='$listenersAll' @input="$emit('input',$event.target.value)" ></div>`,
      computed: {
        $attrsAll () {
          return {
            ...this.$attrs,
            value: this.value
          }
        },
        $listenersAll () {
          return {
            ...this.$listeners,
            input: (event) => this.$emit('input', event.target.value)
          }
        }
      },
      data () {
        return {
          msg: '11'
        }
      },
      created () {
        console.log(this.$listeners)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
