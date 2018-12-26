<template>
    <div>
        <input type="text" class="todo-input" v-model="newTodo" v-on:keyup.enter="addTodo" placeholder="What needs to be done?"/>
        <div v-for="(todo,index) in todos" :key="todo.id" class="todo-item">
            <div class="todo-item-left">
                <input type="checkbox" v-model="todo.completed">
                <div v-if="!todo.editing" v-on:dblclick="editTodo(todo)" class="todo-item-label" v-bind:class="{completed : todo.completed}">{{todo.title}}</div>
                <div v-else><input  class="todo-item-edit" v-focus v-on:blur="doneEdit(todo)"  v-on:keyup.enter="doneEdit(todo)" v-on:keyup.esc="cancelEdit(todo)" type="text" v-model="todo.title"></div>
            </div>
            <div class="remove-item" v-on:click="removeTodo(index)">
                &times;
            </div>
        </div>
        <div class="extra-container">
            <div><label for="all"><input v-bind:checked="!anyRemaining" type="checkbox" @change="checkAllTodos"/>Check All</label></div>
            <div>{{ remaining }} Items left</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'todo-list',
  data () {
    return {
      newTodo: '',
      idForTodo:3,
      beforeEditCache:'',
      todos:[
            {'id':1,'title':'Finish Vue Screencast','completed':false,'editing':false},
            {'id':2,'title':'Anhilation','completed':false,'editing':false}

      ]
    }
  },
  directives:{
        focus:{
            inserted:function(el){
                el.focus();
            }
        }
  },
  methods:{
      
      addTodo:function(){
        if(this.newTodo.trim().length == 0){
            return
        }
          this.todos.push({
              'id':this.idForTodo,'title':this.newTodo,'completed':false,'editing':false
          });
          this.newTodo='';
          this.idForTodo++;
      },
      removeTodo:function(index){
          this.todos.splice(index,1);
      },
      editTodo:function(todo){
          this.beforeEditCache = todo.title;
          todo.editing= true;
     },
     doneEdit(todo){
        if(todo.title.trim().length == 0){
            todo.title = this.beforeEditCache;
        }
        todo.editing= false;

    },
    cancelEdit:function(todo){
        todo.title= this.beforeEditCache;
        todo.editing = false;
    },
    checkAllTodos:function(){
        this.todos.forEach(todo => {
            todo.completed=event.target.checked;
        });
    }
  },
  computed: {
        remaining:function(){
            return this.todos.filter(todo=> !todo.completed).length;
        },
        anyRemaining:function(){
            return this.remaining != 0;
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
.todo-item-left{
    display: flex;
    align-items: center;
}
.todo-item-label{
    border:1px solid white;
    margin-left:12px;
}
.todo-item-edit{
    font-size:22px;
    color:#2c3e50;
    margin-left:12px;
    width:100%;
    border: 1px solid #ccc;
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
    &:focus{
        outline: none;
    }
}
.completed{
    text-decoration: line-through;
    color: grey;
}
.extra-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
}
button{
    font-size: 14px;
    background-color: white;
    appearance: none;
    &:hover{
        background: lightgreen;
    }
    &:focus{
        outline: none;
    }
}
.active{
    background:lightgreen;
}
</style>

