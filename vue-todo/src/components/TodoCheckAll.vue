<template>
    <div><label for="all"><input v-bind:checked="!anyRemaining" type="checkbox" @change="allChecked"/>Check All</label></div>
</template>
<script>
export default {
    name:'todo-check-all',
    props:{
        anyRemaining:{
            type:Boolean,
            required: true,
        }
    },
    methods: {
        allChecked:function(){
            eventBus.$emit('checkAllChanged',this.anyRemaining)
        }
    },
}
</script>
