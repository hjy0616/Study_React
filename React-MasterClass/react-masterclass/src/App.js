import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.backgroundColor};
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

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

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

function App() {
  return (
    <Container>
      <Box>
        <Emoji as="p">😄</Emoji>
      </Box>
    </Container>
  );
}

export default App;
