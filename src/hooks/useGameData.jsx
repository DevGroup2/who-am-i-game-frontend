import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IN_PROGRESS,
  LOADING,
  LOBBY,
  PLAY,
  STARTS,
  SUGGESTING_CHARACTERS,
  WAITING_FOR_PLAYERS,
} from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';
import { findGameById, startGame } from '../services/games-service';

export default function useGameData() {
  const { gameData, setGameData, resetData, playerId } =
    useContext(GameDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = setTimeout(async () => {
      const gameId = gameData.id || sessionStorage.getItem('gameId');
      const userId = playerId || sessionStorage.getItem('playerId');

      if (gameId && userId) {
        try {
          const { data } = await findGameById(userId, gameId);

          if (data.players.length) setGameData(data);
        } catch (error) {
          if (error.response.status === 404) {
            resetData();
            navigate('/');
          }
        }
      }
    }, 1000);

    return () => clearTimeout(checkStatus);
  });

  useEffect(() => {
    async function startingGame() {
      try {
        await startGame(playerId, gameData.id);
      } catch (error) {
        //to do: handle errors
      }
    }

    if (!gameData.id && !sessionStorage.gameId) {
      resetData();
      navigate('/');

      return;
    }

    if (gameData.status === WAITING_FOR_PLAYERS) {
      navigate(LOADING);

      return;
    }

    if (gameData.status === SUGGESTING_CHARACTERS) {
      navigate(LOBBY);

      return;
    }

    if (gameData.status === STARTS) {
      startingGame();

      return;
    }

    if (gameData.status === IN_PROGRESS) {
      navigate(PLAY);

      return;
    } else console.log('STATUS', gameData.status);
  }, [gameData, resetData, playerId, navigate]);

  return;
}
