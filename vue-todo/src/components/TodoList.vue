<template>
    <div>
        <input type="text" class="todo-input" v-model="newTodo" v-on:keyup.enter="addTodo" placeholder="What needs to be done?"/>
        <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item v-for="(todo,index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining" v-on:removedTodo="removeTodo" v-on:finishedEdit="finishedEdit">
            
        </todo-item>
        </transition-group>
        <div class="extra-container">
            <div><label for="all"><input v-bind:checked="!anyRemaining" type="checkbox" @change="checkAllTodos"/>Check All</label></div>
            <div>{{ remaining }} Items left</div>
        </div>
        <div class="extra-container">
            <div>
                <button :class="{active:filter =='all'}" @click="filter='all'">All</button>
                <button :class="{active:filter =='active'}" @click="filter='active'">Active</button>
                <button :class="{active:filter =='completed'}" @click="filter='completed'">Completed</button>
            </div>
            <div>
                <transition name="fade">
                        <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
                </transition>
            </div>

           
        </div>
        
    </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  name: 'todo-list',
  components:{
      TodoItem
  },
  data () {
    return {
      newTodo: '',
      idForTodo:3,
      beforeEditCache:'',
      filter:'all',
      todos:[
            {'id':1,'title':'Finish Vue Screencast','completed':false,'editing':false},
            {'id':2,'title':'Anhilation','completed':false,'editing':false}

      ]
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
      
        checkAllTodos:function(){
            this.todos.forEach(todo => {
                todo.completed=event.target.checked;
            });
        },
        clearCompleted:function(){
            this.todos = this.todos.filter(todo=>!todo.completed);
        },
        finishedEdit:function(data){
            this.todos.splice(data.index,1,data.todo)
        }
  },
  computed: {
        remaining:function(){
            return this.todos.filter(todo=> !todo.completed).length;
        },
        anyRemaining:function(){
            return this.remaining != 0;
        },
        todosFiltered:function(){
            if (this.filter == 'all') {
                return this.todos;
            }else if(this.filter =='active'){
                return this.todos.filter(todo=>!todo.completed);
            }else if(this.filter =='completed') {
                return this.todos.filter(todo=>todo.completed);
            }
            return this.todos;
        },
        showClearCompletedButton:function(){
            return this.todos.filter(todo=>todo.completed).length > 0;
        }
  }
}
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css");
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
    animation-duration:.3s;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

