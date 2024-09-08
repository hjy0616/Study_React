import styled from "styled-components";

const Text = styled.span`
  color: ${(props: any) => props.theme.textColor};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => props.theme.backgroundColor};
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <Text>Hello</Text>
    </Container>
  );
}

export default App;
