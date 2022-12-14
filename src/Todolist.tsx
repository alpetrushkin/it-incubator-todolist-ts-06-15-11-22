import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import Input from "./components/Input";
import EditableSpan from "./components/EditableSpan";

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   id: string
   title: string
   tasks: Array<TaskType>
   removeTask: (taskId: string, todolistId: string) => void
   changeFilter: (value: FilterValuesType, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
   removeTodolist: (id: string) => void
   filter: FilterValuesType
   updateTask: (todolistId: string, taskID: string, updateTitle: string) => void
   updateTodolist: (todolistId: string, updateTitle: string) => void
}

export function Todolist(props: PropsType) {

   const removeTodolist = () => props.removeTodolist(props.id)

   const onAllClickHandler = () => props.changeFilter("all", props.id);
   const onActiveClickHandler = () => props.changeFilter("active", props.id);
   const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

   const addTaskHandler = (newTitle: string) => {
      props.addTask(newTitle, props.id)
   }

   const updateTodoListHandler = (updateTitle: string) => {
     props.updateTodolist(props.id, updateTitle)
   }

   const updateTaskHandler = (tID: string, updateTitle: string) => {
      props.updateTask(props.id, tID, updateTitle)
   }

   return <div>
      <h3>
         <EditableSpan callBack={updateTodoListHandler} title={props.title}/>
         <button onClick={removeTodolist}>x</button>
      </h3>
      <Input callback={addTaskHandler}/>

      <ul>
         {
            props.tasks.map(t => {
               const onClickHandler = () => props.removeTask(t.id, props.id)
               const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  let newIsDoneValue = e.currentTarget.checked;
                  props.changeTaskStatus(t.id, newIsDoneValue, props.id);
               }

               // const updateTaskHandler = (updateTitle: string) => {
               //   props.updateTask(props.id, t.id, updateTitle)
               // }

               return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                  <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>

                  <EditableSpan callBack={(updateTitle) => updateTaskHandler(t.id, updateTitle)} title={t.title}/>

                  <button onClick={onClickHandler}>x</button>
               </li>
            })
         }
      </ul>
      <div>
         <button className={props.filter === 'all' ? "active-filter" : ""}
                 onClick={onAllClickHandler}>All
         </button>
         <button className={props.filter === 'active' ? "active-filter" : ""}
                 onClick={onActiveClickHandler}>Active
         </button>
         <button className={props.filter === 'completed' ? "active-filter" : ""}
                 onClick={onCompletedClickHandler}>Completed
         </button>
      </div>
   </div>
}


