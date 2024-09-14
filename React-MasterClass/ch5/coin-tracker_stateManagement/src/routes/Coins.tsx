import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { ThemeAtoms } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  border: 1px solid white;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  imageUrl: string;
}
export default function Coins() {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     // 함수를 만들때 이렇게도 사용이 가능하다고함 바로 실행이된댜
  //     const res = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await res.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  const setTheme = useSetRecoilState(ThemeAtoms);
  const toggleTheme = () => setTheme((prev) => !prev);

  const { data: coins, isLoading } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: queryCoins,
  });

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleTheme}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://raw.githubusercontent.com/jsupa/crypto-icons/main/icons/${coin.symbol.toLowerCase()}.png`}
                  alt={`${coin.name}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
