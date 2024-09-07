// import Button from './Button';
import styles from './App.module.css';
import { useState, useEffect } from 'react';

function App() {
  const [value, setValue] = useState(0);
  const [keyword, setKeyword] = useState('');
  const onChange = (e) => {
    setKeyword(e.target.value)
  };
  const onClick = () => setValue((prev) => prev + 1);
  
  useEffect(() => {
    console.log('I run only once');
  }, []);

  useEffect(() => {
    console.log(`I run when keyword & counter changes`);
  }, [value, keyword]);

  return (
    <div>
      <input value={keyword} type="text" placeholder="Search here..." onChange={onChange} />
      <h1 className={styles.title}>{value}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
