import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (e) => {
    setToDo(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if(toDo === "") {
      return;
    }
    setToDos((currentArray) => [...currentArray, toDo ]); // 새로운 배열을 만들어서 기존 배열에 추가
    setToDo("");
  }
  console.log(toDos);

  return (
    <>
      <h1>My To Do List {(toDos.length)}</h1>
      <form onSubmit={onSubmit}>
        <input value={toDo} onChange={onChange} type="text" placeholder="Write your to do..." />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
      ))}
      </ul>
    </>
  );
}

export default App;
