<template>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
</template>
<script>
export default {
    name:'todo-check-all',
    props:{
        showClearCompletedButton:{
            type:Boolean,
            required: true,
        }
    },
    methods: {
        clearCompleted:function(){
            eventBus.$emit('clearCompletedTodos')
        }
    },
}
</script>
