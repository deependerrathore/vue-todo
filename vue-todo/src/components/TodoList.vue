<template>
    <div>
        <input type="text" class="todo-input" v-model="newTodo" v-on:keyup.enter="addTodo" placeholder="What needs to be done?"/>
        <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item v-for="(todo) in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
            
        </todo-item>
        </transition-group>
        <div class="extra-container">
            <todo-check-all></todo-check-all>
            <todo-items-remaining></todo-items-remaining>
        </div>
        <div class="extra-container">
            <todo-filtered></todo-filtered>
            <div>
                <transition name="fade">
                        <todo-clear-completed></todo-clear-completed>
                </transition>
            </div>

           
        </div>
        
    </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: 'todo-list',
  components:{
      TodoItem,
      TodoItemsRemaining,
      TodoCheckAll,
      TodoFiltered,
      TodoClearCompleted
  },
  data () {
    return {
      newTodo: '',
      idForTodo:3,
      beforeEditCache:'',
    }
  },
  methods:{
      
      addTodo:function(){
        if(this.newTodo.trim().length == 0){
            return
        }
        this.$store.dispatch('addTodo',{
              'id':this.idForTodo,'title':this.newTodo
          })
        //   this.$store.state.todos.push({
        //       'id':this.idForTodo,'title':this.newTodo,'completed':false,'editing':false
        //   });
          this.newTodo='';
          this.idForTodo++;
      },
    //   removeTodo:function(id){
    //       const index = this.$store.state.todos.findIndex((item) => item.id == id)
    //       this.$store.state.todos.splice(index,1);
    //   },
      
        // checkAllTodos:function(){
        //     this.$store.state.todos.forEach(todo => {
        //         todo.completed=event.target.checked;
        //     });
        // },
        // clearCompleted:function(){
        //     this.$store.state.todos = this.$store.state.todos.filter(todo=>!todo.completed);
        // },
        // finishedEdit:function(data){
        //     const index = this.$store.state.todos.findIndex((item)=>item.id == data.id);
        //     this.$store.state.todos.splice(index,1,data)
        // }
  },
  created(){
    this.$store.dispatch('retreiveTodos');
  },
  beforeDestroy() {
      //eventBus.$off('removedTodo');
      //eventBus.$off('finishedEdit');
    //   eventBus.$off('checkAllChanged');
    //   eventBus.$off('filterChanged');
      //eventBus.$off('clearCompletedTodos');
  },
  computed: {
        anyRemaining:function(){
            return this.$store.getters.anyRemaining;
        },
        todosFiltered:function(){
            return this.$store.getters.todosFiltered;
        },
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

