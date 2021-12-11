import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function TodoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const hadleValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(hadleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="wirte a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
