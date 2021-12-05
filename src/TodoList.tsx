import React, { useState } from "react";

function TodoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setToDo(value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="wirte a to do" />
        <button>add</button>
      </form>
    </div>
  );
}

export default TodoList;
