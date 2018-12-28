<template>
    <div class="todo-item">
      <div class="todo-item-left">
                <input type="checkbox" v-model="completed" @change="doneEdit">
                <div v-if="!editing" v-on:dblclick="editTodo()" class="todo-item-label" v-bind:class="{completed : completed}">{{title}}</div>
                <div v-else><input  class="todo-item-edit" v-focus v-on:blur="doneEdit()"  v-on:keyup.enter="doneEdit()" v-on:keyup.esc="cancelEdit()" type="text" v-model="title"></div>
            </div>
            <div>
                <button v-on:click="pluralize">Plural</button>
                <span class="remove-item" v-on:click="removeTodo(index)">
                    &times;
                </span>

            </div>
            
    </div>
</template>

<script>
export default {
    name:'todo-item',
    props:{
        todo:{
            type:Object,
            required: true,
        },
        index:{
            type:Number,
            required:true, 
        },
        checkAll:{
            type:Boolean,
            required:true
        }
    },
    directives:{
        focus:{
            inserted:function(el){
                el.focus();
            }
        }
  },
    data(){
        return{
            'id':this.todo.id,
            'title':this.todo.title,
            'completed': this.todo.completed,
            'editing':this.todo.editing,
            'beforeEditCache':''
        }
    },
    created(){
        eventBus.$on('pluralize',this.handlePluraize);
    },
    beforeDestroy() {
        eventBus.$off('pluralize',this.handlePluraize);
    },
    watch:{
        checkAll(){
            // if(this.checkAll){
            //     this.completed=true;
            // }else{
            //     this.completed=this.todo.completed;
            // }
            this.completed = this.checkAll ? true : this.todo.completed;
        }
    },
    methods:{
        removeTodo:function(index){
            eventBus.$emit('removedTodo',index);
        },
        editTodo:function(){
          this.beforeEditCache = this.title;
          this.editing= true;
        },
        doneEdit(){
            if(this.title.trim().length == 0){
                this.title = this.beforeEditCache;
            }
            this.editing= false;
            eventBus.$emit('finishedEdit',{
                'index':this.index,
                'todo':{
                    'id':this.id,
                    'title':this.title,
                    'completed':this.completed,
                    'editing':this.editing
                }
            })

        },
        cancelEdit:function(){
            this.title= this.beforeEditCache;
            this.editing = false;
        },
        pluralize:function(){
            eventBus.$emit('pluralize');
        },
        handlePluraize:function(){
            this.title = this.title +'s';
            eventBus.$emit('finishedEdit',{
                'index':this.index,
                'todo':{
                    'id':this.id,
                    'title':this.title,
                    'completed':this.completed,
                    'editing':this.editing
                }
            })
        }
    }
}
</script>