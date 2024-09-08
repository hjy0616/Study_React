# nomardCoder study reactMasterClass

## styledCoponents를 사용함

## styled-components

- 이 강의에서는 styled-components를 사용하여 스타일을 작성하는 방법을 배웠다.

### 1. 사용법

```js
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// const Box = styled.div`
//   background-color: ${(props) => props.bgColor};
//   width: 100px;
//   height: 100px;
// `;
// const Circle = styled(Box)`
//   // 모든 Box의 속성을 가져와서 추가하는 개념
//   border-radius: 50px;
// `;

// const Input = styled.input.attrs({ required: true, minLength: 10 })` 속성을 추가하는 방법
//   background-color: tomato;
// `;

const rotateAnimation = keyframes` // 애니메이션 정의
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
    transform: rotate(360deg);
  }
  100% {
    border-radius: 0px;
  }
`;
const Emoji = styled.span`
  // 이런식으로 해두면 as로 태그를 바꾸든 뭘하든 적용됨
  font-size: 36px;
`;

const Box = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
  animation: ${rotateAnimation} 3s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Emoji} {
    // 해당 태그 안에있는 태그는 수정이 이렇게 가능하다.
    font-size: 36px;
    &:hover {
      // hover를 이렇게 줄 수 있음
      font-size: 98px;
    }
  }
`;
----------------------------- render ---------------------------------
<Container>
  <Box>
    <Emoji as="p">😄</Emoji> // 이렇게 해두면 태그를 바꿀 수 있음 지금은 바뀐태그로 진행해도 문제없이 css가 적용됨
  </Box>
</Container>
```

- 위 주석을 잘보면 이해가 빠를것이다.
- Component로 명칭을 줘서 가능함

#### themes

- 다크모드나 웹페이지의 theme를 만들 수 있는것
- 사용하기 위해서 index.js에 import 해줘야함

```js
import { ThemeProvider } from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

=========App.js=========
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;

```

- themes를 설정하려면 각각의 dark/light모드의 property를 똑같이 맞춰야 한다고 한다.
