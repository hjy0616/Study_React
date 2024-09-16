# Todo List.feat NomardCorder

## 1. 이거는 React-hook-form의 사용방법을 알려줌

```js
import { useForm } from "react-hook-form";

const ToDoList = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return <form onSubmit={handleSubmit(onSubmit)}>
};
```

## 2. 정규표현식

^ 문장의 시작

- 하나 또는 하나이상

```
/^[A-Za-z0-9._%+-]+@naver.com$/
/^[A-Za-z0-9._%+-]+@naver.com/g
```

https://www.regexpal.com

## 3. React Hook Form (TypeScript)

- React Hook Form은 TypeScript로 빌드되었으며, FormData 유형을 정의하여 form 값을 지원할 수 있습니다.

```js
type FormData = {
firstName: string;
lastName: string;
};

const { register, setValue, handleSubmit, formState: { errors } } = useForm< FormData >();
```

https://react-hook-form.com/get-started#TypeScript

- defaultValues: Record< string, any > = {}
- input에 대한 defaultValues는 사용자가 component와 상호 작용하기 전에 component가 처음 렌더링될 때 초기 값으로 사용됩니다.
- 모든 input에 대한 defaultValues를 빈 문자열이나 null과 같은 정의되지 않은 값으로 설정하는 것이 좋습니다.
  https://react-hook-form.com/api/useform#props

## 배열의 "교체" 방법

- step 1. 배열의 index를 찾는다.
- step 2. 배열의 앞부분은 교체할 이전의 모든 요소를 담은 배열이다.
- step 3. 새로운 배열을 만든다.

- ...는 모든 원소를 쓰는 것과 같은 의미다.

```js
const food = ["pizza", "mango", "kimchi", "kimbab"];
const front = ["pizza"];
const back = ["kimchi", "kimbab"];
const newFood = [...front, "감", ...back];
```

-

## Selector

- recoil의 기능중 하나.
- 간단하게 설명을 하면, atom은 배열이라고 생각하면되고, selector는 atom의 output을 변형 시키는 것이라고 보면됨.

```js
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => { // 이쪽이 리턴하는 곳
    const toDos = get(toDoState);
    return toDos.filter((toDo) => toDo.category === "TO_DO");
  },
});
```

- 배열안의 값을 꺼내기 위해서는 배열을 열어야한다.

```js
const [toDo, doing, done] = useRecoilValue(toDoSelector); // 보면 toDoSelector가 2중 배열 즉 [[1], [2], [3]] 이런식으로 되어있어서 배열을 통해서 한번 열어준것.
```

## ENUM

- 개발자가 문자열의 실수를 줄이기 위해서 사용되었고 혼돈을 없애기 위해서 사용됨
- 장점이 많음
- 문자열로 되어있지만 숫자로 알아보고 해결해줌.
  !단 문자열로 만들어서도 가능함.

```js
export enum Categories {
  "TO_DO" = "TO_DO", // 이것처럼
  "DOING",
  "DONE",
}
```
