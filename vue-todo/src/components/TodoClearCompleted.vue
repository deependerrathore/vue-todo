<template>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
</template>
<script>
export default {
    name:'todo-check-all',
    computed: {
        showClearCompletedButton:function(){
            return this.$store.getters.showClearCompletedButton;
        }
    },
    methods: {
        clearCompleted:function(){
            this.$store.state.todos = this.$store.state.todos.filter(todo=>!todo.completed);
        }
    },
}
</script>
