<template>
    <div><label for="all"><input v-bind:checked="!anyRemaining" type="checkbox" @change="allChecked"/>Check All</label></div>
</template>
<script>
export default {
    name:'todo-check-all',
    computed: {
        anyRemaining(){
            return this.$store.getters.anyRemaining;
        }
    },
    methods: {
        allChecked:function(){
            this.$store.commit('checkAll',event.target.checked);        
        }
    },
}
</script>
