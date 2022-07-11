import GameTitle from '../../components/game-title/game-title';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameDataContext from '../../contexts/game-data-context';
import { useContext, useEffect, useState } from 'react';
import {
  NUMBER_OF_PLAYERS,
  WAITING_FOR_PLAYERS,
  SUGGESTING_CHARACTERS,
  LOADING,
  LOBBY,
} from '../../constants/constants';
import './home.scss';
import PlayersOnlineTitle from '../../components/players-online-title/players-online-title';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';
import { createGame, leaveGame } from '../../services/games-service';
import { v4 as uuidv4 } from 'uuid';

function Homepage() {
  const { gameData, setGameData, resetGame, playerId, setPlayerId } =
    useContext(GameDataContext);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function leaveResetData() {
      const gameId = sessionStorage.getItem('gameId');
      const userId = playerId || sessionStorage.getItem('playerId');

      if (gameId && userId) {
        try {
          await leaveGame(userId, gameId);
          resetGame();
          const playerId = uuidv4();
          setPlayerId(playerId);
          sessionStorage.setItem('playerId', playerId);
        } catch (error) {
          //to do: handle errors
        }
      }
    }

    leaveResetData();
  });

  useEffect(() => {
    if (gameData.status === WAITING_FOR_PLAYERS) {
      navigate(LOADING);
    } else if (gameData.status === SUGGESTING_CHARACTERS) {
      navigate(LOBBY);
    }
  }, [gameData, navigate]);

  const onCreateGame = async () => {
    try {
      const { data } = await createGame(playerId, NUMBER_OF_PLAYERS);

      if (data) {
        setGameData(data);
        sessionStorage.setItem('gameId', data.id);
      }
    } catch (error) {
      //todo: handle errors
    }
  };

  return (
    <ScreenWrapper>
      <GameTitle />
      <PlayersOnlineTitle />
      {isLogin ? (
        <AfterLogin setIsLogin={setIsLogin} createGame={onCreateGame} />
      ) : (
        <BeforeLogin setIsLogin={setIsLogin} createGame={onCreateGame} />
      )}
    </ScreenWrapper>
  );
}

export default Homepage;
