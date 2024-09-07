import { useState, useEffect } from 'react';
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setCoins(json);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h1>The Coins! {coins.length}</h1>
      {loading ? <strong>Loading...</strong>: null}
      <hr />
      <ul>

      {coins.map((coin, index) => (
        <li key={index}>
          <strong>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}</strong>
        </li>
      ))}
      </ul>
    </>
  );
}

export default App;
