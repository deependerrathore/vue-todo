import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost/todo-laravel/public/api';

export const store = new Vuex.Store({
    state:{
        filter:'all',
        todos:[]
    },
    getters:{
        remaining:function(state){
            return state.todos.filter(todo=> !todo.completed).length;
        },
        anyRemaining:function(state,getters){
            return getters.remaining != 0;
        },
        todosFiltered:function(state){
            if (state.filter == 'all') {
                return state.todos;
            }else if(state.filter =='active'){
                return state.todos.filter(todo=>!todo.completed);
            }else if(state.filter =='completed') {
                return state.todos.filter(todo=>todo.completed);
            }
            return state.todos;
        },
        showClearCompletedButton:function(state){
            return state.todos.filter(todo=>todo.completed).length > 0;
        }
    },
    mutations:{
        retreiveTodos(state,todos){
            state.todos = todos;
        },
        addTodo(state,todo){
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing:todo.editing
            })
        },
        clearCompleted(state){
            state.todos = state.todos.filter(todo=>!todo.completed);
        },
        updateFilter(state,filter){
            state.filter = filter;
        },
        checkAll(state,checked){
            state.todos.forEach(todo => {
                todo.completed=checked;
            }); 
        },
        deleteTodo(state,id){
            const index = state.todos.findIndex((item) => item.id == id)
            state.todos.splice(index,1);
        },
        updateTodo(state,todo){
            const index = state.todos.findIndex((item)=>item.id == todo.id);
            state.todos.splice(index,1,{
                'id':todo.id,
                'title':todo.title,
                'completed':todo.completed,
                'editing':todo.editing 
            })
        }
    },
    actions:{
        retreiveTodos(context){
            axios.get('/todos')
            .then(response => {
                context.commit('retreiveTodos',response.data)
            })
            .catch(error =>{
                console.log(error);
            })
        },
        addTodo(context,todo){
            axios.post('/todos',{
                title: todo.title,
                completed: false
            })
            .then(response => {
                context.commit('addTodo',response.data)
            })
            .catch(error =>{
                console.log(error);
            })
        },
        clearCompleted(context){
            setTimeout(() =>{
                context.commit('clearCompleted');
            },1000); 
        },
        updateFilter(context,filter){
            context.commit('updateFilter',filter);
        },
        checkAll(context,checked){
            context.commit('checkAll',checked);
        },
        deleteTodo(context,id){
            setTimeout(() => {
                context.commit('deleteTodo',id);
            },1000);
        },
        updateTodo(context,todo){
            axios.patch('/todos/' + todo.id,{
                title: todo.title,
                completed: todo.completed
            })
            .then(response => {
                context.commit('updateTodo',response.data);
            })
            .catch(error =>{
                console.log(error);
            })
        }
    }
})