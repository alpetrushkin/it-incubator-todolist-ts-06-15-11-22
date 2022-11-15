import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
   callBack: (updateTitle: string) => void
   title: string
}

const EditableSpan = (props: EditableSpanType) => {
   let [updateTitle, setUpdateTitle] = useState(props.title)
   const [edit, setEdit] = useState(false)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setUpdateTitle(e.currentTarget.value)
   }

   const addTask = () => {
      props.callBack(updateTitle);
   }

   const onDoubleClickHandler = () => {
      setEdit(!edit)
      addTask()
   }

   return (
      edit ?
         <input onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus value={updateTitle}/>
         : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
   );
};

export default EditableSpan;