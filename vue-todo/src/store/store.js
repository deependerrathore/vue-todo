import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        filter:'all',
        todos:[
            {'id':1,'title':'Finish Vue Screencast','completed':false,'editing':false},
            {'id':2,'title':'Anhilation','completed':false,'editing':false}

        ]
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
        addTodo(state,todo){
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing:todo.editing
            })
        }
    }
})