import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Character = styled.li`
  color: ${(props) => props.theme.bgColor};
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    background-color: white;
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const CharacterName = styled.span`
  font-weight: bold;
`;

interface CoinInterface {
  id: string;
  name: string;
  imageUrl: string;
}

function Characters() {
  const [characters, sethome] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://disney_api.nomadcoders.workers.dev/characters'
      );
      const json = await response.json();
      sethome(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Disney characters</Title>
      </Header>
      {loading ? (
        <p>Loading...</p>
      ) : (
        characters.map((character) => (
          <Character key={character.id}>
            <Link
              to={{
                pathname: `/${character.id}`,
                state: { name: character.name },
              }}
            >
              <ImgContainer>
                <Img src={character.imageUrl} alt={character.name} />
              </ImgContainer>
              <CharacterName>{character.name}</CharacterName>
            </Link>
          </Character>
        ))
      )}
    </Container>
  );
}
export default Characters;
