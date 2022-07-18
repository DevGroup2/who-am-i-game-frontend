import GameTitle from '../../components/game-title/game-title';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameDataContext from '../../contexts/game-data-context';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  LOADING,
  NUMBER_OF_PLAYERS,
  WAITING_FOR_PLAYERS,
} from '../../constants/constants';
import './home.scss';
import PlayersOnlineTitle from '../../components/players-online-title/players-online-title';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';
import {
  findAvailableGames,
  createGame,
  leaveGame,
  enrollToGame,
} from '../../services/games-service';

function Homepage() {
  const { setGameData, resetData, playerId } = useContext(GameDataContext);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function leaveResetData() {
      const gameId = sessionStorage.getItem('gameId');
      const userId = playerId || sessionStorage.getItem('playerId');

      if (gameId && userId) {
        try {
          await leaveGame(userId, gameId);
          resetData();
        } catch (error) {
          //to do: handle errors
        }
      }
    }

    leaveResetData();
  }, []);

  const onCreateGame = useCallback(async () => {
    const { data } = await findAvailableGames(playerId);
    const availableGames = data.filter(
      (game) => game.status === WAITING_FOR_PLAYERS
    );
    const game = availableGames[0];

    if (game) {
      try {
        await enrollToGame(playerId, game.id);
        setGameData(game);
        sessionStorage.setItem('gameId', game.id);
        navigate(LOADING);
      } catch (error) {
        //to do: handle errors
      }
    } else {
      try {
        const { data } = await createGame(playerId, NUMBER_OF_PLAYERS);

        if (data) {
          setGameData(data);
          sessionStorage.setItem('gameId', data.id);
          navigate(LOADING);
        }
      } catch (error) {
        //todo: handle errors
      }
    }
  }, [setGameData, playerId, navigate]);

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
