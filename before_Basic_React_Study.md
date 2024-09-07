# React 사용하기전

- 사용하기 전에는 버튼이 필요하면 각각의버튼을 계속 만드는게 있었는데 이제는 그러지 않아도 된다.

### React js element가 만들기 어려운 이유

- element 생성
  - ReactDOM으로 렌더링할 부분을 렌더링 해줌.
  - html에 root id를 생성해서 React Element를 생성한 span을 root안에 넣으라는 의미
  - createElement를 생성한 span에 property를 넣을 수 있음
    - property는 id, class, style 등등임

```js
const root = document.getElementById("root");
const span = React.createElement(
  "span",
  { id: "sexy-span", class: "hello", style: { color: "red" } },
  "hello i'm span tag hahaha"
);
const btn = React.createElement("button", null, "click Me");
ReactDOM.render(btn, root);
```

- 두가지를 생성하는 방법은 하단의 코드와 같다.
  - div태그를 감싸아서 사용하는 방법으로 두가지 다 사용할 수 있는 것이다.
  - 원래는 function을 만들고 여러가지 추가하면서 작업을 해야하지만 btn은 저런식으로 함수를 넣어서 한줄만에 끝낸 것이다.

```js
const root = document.getElementById("root");
const span = React.createElement("span", null, "hello i'm span Tag hahahaha");
const btn = React.createElement(
  "button",
  {
    onClick: () => console.log("i'm Clicked!"),
  },
  "click Me"
);
const container = React.createElement("div", null, [span, btn]);
ReactDOM.render(container, root);
```

- jsx 방식은 약간다르다.
  - html에서 jsx로 동작하기 위해서는 babel이라는게 필요하다.

```js
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
const newH3 = (
  <h3 id="title" onMouseEnter={() => console.log("Enter!!")}>
    hello i'm h3 Tag hahahaha
  </h3>
);
const oldH3 = React.createElement(
  "h3",
  {
    onMouseEnter: () => console.log("Enter!!"),
  },
  "hello i'm h3 Tag hahahaha"
);
</script>
```

- React에서 component를 렌더링할때는 하단과 같이 **대문자** 시작으로 사용해야하며,
- <>를 추가해서 사용해야한다.
  - 하단처럼 보기 쉽게 코드를 분리해서 관리할 수 있다.

```js
const NewBtn = () => (
  <button onClick={() => console.log("i'm Clicked")}>click Me</button>
);

const newContainer = () => (
  <div>
    <NewH3 />
    <NewBtn />
  </div>
);
ReactDOM.render(<newContainer />, root);
```

## React useState

- react는 우리가 업데이트 되어야하는 부분만 변경된다.
  - 어려운 부분으로 사용하는 방법을 알려주는 react state
  - 리렌더링이 안되어서 render를 사용한다.
  - ReactDOM.render(<NewContainer />, root); 이 코드를 사용해서 리렌더링 해서 데이터를 가져옴 참 불편한 것 같음

```js
const root = document.getElementById("root");
let counter = 0;

const countUp = () => {
  counter = counter + 1;
  render();
};
const render = () => {
  ReactDOM.render(<NewContainer />, root);
};
const NewContainer = () => (
  <div>
    <h3>TotalClick : {counter}</h3>
    <button onClick={countUp}>click me</button>
  </div>
);
render();
```

- 그나마 쉬운 방법이 하단 코드
- 위 코드의 짧은 방법으로 리렌더링 필요없이 데이터를 수정해서 가져오는걸 useState가 할 수 있다.
  - useState는 [초기값, function]으로 되어있어서 배열형태의 값을 빼서 저장하고 수정하는 방법을 알아야함

```js
const root = document.getElementById("root");
function App() {
  const [counter, modifier] = React.useState(0); // 배열형태로 저장
  return (
    <div>
      <h3>TotalClick : {counter}</h3>
      <button>click me</button>
    </div>
  );
}
ReactDOM.render(<App />, root);
```

- 우리가 직접 리렌더링 시켜줄 필요없이 useState를 사용해서 리렌더링을 쉽게 발생시켜줌
  - 기존에는 **ReactDOM.render(<App />, root);**를 사용해서 리렌더링을 진행을 했었지만,
  - 그럴 필요없이 modifier를 사용하면 리렌더링이 자동으로 이뤄짐
  - 함수의 데이터를 변경하는 것으로 훨씬 안정성에 좋다고함

```js
const root = document.getElementById("root");
function App() {
  const [counter, setCounter] = React.useState(0);
  const onClick = () => {
    // setCounter(counter + 1);
    setCounter((current) => current + 1); // 이렇게 사용하는게 안정성이 좋아서 좋다고함
  };
  return (
    <div>
      <h3>TotalClick : {counter}</h3>
      <button onClick={onClick}>click me</button>
    </div>
  );
}
ReactDOM.render(<App />, root);
```

- 여태꺼 반복함

## useEffect
- **useState**가 변경될때마다 계속 렌더링 되는데
- 이걸 사용하면 렌더링을 조절할 수 있다.
- useEffect은 쉽게 말해 우리 코드가 딱 한번만 실행될 수 있도록 보호해주는 것.

[] 이부분 알아보자.
- 하단의 코드대로 작성을 하게된다면 검색은 하고싶지않을때도 검색기능까지 리렌더링이 되는걸 알 수 있다.
```js
const [value, setValue] = useState(0);
  const [keyword, setKeyword] = useState('');
  const onChange = (e) => {
    setKeyword(e.target.value)
  };
  const onClick = () => setValue((prev) => prev + 1);
  console.log('I run all the time');
  useEffect(() => {
    console.log('I run only once');
  }, []);
  return (
    <div>
      <input value={keyword} type="text" placeholder="Search here..." onChange={onChange} />
      <h1 className={styles.title}>{value}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
```

- 하단의 코드처럼 사용하면 해당 코드가 변화할때만 변화를 줌

```js
  useEffect(() => {
    console.log('Search for', keyword);
  }, [keyword]);
```
- 한마디로 클라이언트에서 변화된 것들을 useEffect로 관리하는거라고 보면될듯함
