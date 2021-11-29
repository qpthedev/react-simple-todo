import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, category: "TO_DO", id: Date.now() },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  // console.log(toDos);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Entry is required.",
          })}
          placeholder="Add a task"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
