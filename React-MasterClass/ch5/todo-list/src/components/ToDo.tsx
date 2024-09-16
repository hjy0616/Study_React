import { IToDo } from "../atoms";
import { useSetRecoilState } from "recoil";
import { toDoState, Categories } from "../atoms";

const useSetToDos = () => {
  const setToDos = useSetRecoilState(toDoState);
  return { setToDos };
};

const ToDo = ({ text, category, id }: IToDo) => {
  const { setToDos } = useSetToDos();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <>
      <li>{text}</li>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          TODO
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </>
  );
};

export default ToDo;
