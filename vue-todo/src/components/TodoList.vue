<template>
    <div>
        <input type="text" class="todo-input" v-model="newTodo" v-on:keyup.enter="addTodo" placeholder="What needs to be done?"/>
        <div v-for="todo in todos" :key="todo.id" class="todo-item">
            {{todo.title}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'todo-list',
  data () {
    return {
      newTodo: '',
      todos:[
            {'id':1,'title':'Finish Vue Screencast','completed':false},
            {'id':2,'title':'Anhilation','completed':false}

      ]
    }
  },
  methods:{
      
      addTodo:function(){
        if(this.newTodo.trim().length == 0){
            return
        }
          this.todos.push({
              'id':this.idForTodo,'title':this.newTodo,'completed':false
          });
          this.newTodo='';
          this.idForTodo++;
      }
  }
}
</script>

<style lang="scss">
.todo-input{
    width: 100%;
    padding: 10px 18px;
    font-size:18px;
    margin-bottom: 16px;

    &:focus{
        outline: 0;
    }
}
.todo-item{
    text-align: left;
}
</style>

