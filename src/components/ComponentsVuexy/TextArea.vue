<template>
  <textarea
  :disabled="disabled"
  :type="type"
  maxlength="255"
  :cols="cols"
  :rows="rows"
  v-on:keyup="error.length=0"
  autocomplete="off"
  class="form-control nygsoft-input"
  v-bind="$attrs"
  v-bind:class="[error.length==0 ? ' nygsoft-input ' : ' nygsoft-input-error ']"
  :value="modelValue"
  :placeholder="placeholder"
  @input="$emit('update:modelValue', $event.target.value)"
  ref="textarea">
  </textarea>
    <template v-if="error">
        <Error class="d-block mt-1"  v-for="(item,index) in error" :key="index">{{item}}</Error>
    </template>
</template>

<script>
  import { defineComponent } from 'vue'
import Error from "@/Components/Error.vue";
  export default defineComponent({
    props:{
        modelValue:{

        },
        cols:{
            type:Number,
            default:30
        },
        rows:{
            type:Number,
            default:10
        },
        error:{
            type:Array,
            default:[]
        },
        type:{
            type:String,
            default:"text"
        },
        placeholder:{
            type:String,
            default:""
        },
        disabled:{
            type:Boolean,
            default:false
        },
    },

    emits: ['update:modelValue'],
    components:{
        Error
    },
    created(){

    },
    methods: {
      focus() {
        this.$refs.textarea.focus()
      }
    }
  })
</script>
<style>

.nygsoft-input{
    border: 1px solid rgb(51, 49, 135) !important;
    border-radius: 18px;
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25) !important;
}
.nygsoft-input-error{
    border: 1px solid rgb(202, 36, 36) !important;
}
.nygsoft-input-error:focus{
    box-shadow: 0 0 0 0.25rem rgba(202, 36, 36, 0.25) !important;
}


</style>
