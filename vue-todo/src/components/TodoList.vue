<template>
    <div>
        <input type="text" class="todo-input" v-model="newTodo" v-on:keyup.enter="addTodo" placeholder="What needs to be done?"/>
        <div v-for="(todo,index) in todos" :key="todo.id" class="todo-item">
            <div>
                {{todo.title}}
            </div>
            <div class="remove-item" v-on:click="removeTodo(index)">
                &times;
            </div>
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
      },
      removeTodo:function(index){
          this.todos.splice(index,1);
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
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.remove-item{
    cursor: pointer;
    margin-left: 14px;
    &:hover{
        color: black;
    }
}
</style>

