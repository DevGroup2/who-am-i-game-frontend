import { useContext, useEffect, useRef } from 'react';
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
import { startGame } from '../services/games-service';

export default function useGameData() {
  const { gameData, resetData, playerId, fetchGame } =
    useContext(GameDataContext);
  const navigate = useNavigate();
  const promiseRef = useRef();

  useEffect(() => {
    if (promiseRef.current && promiseRef.current.state === 'pending') {
      return;
    }
    const checkStatus = setTimeout(async () => {
      promiseRef.current = fetchGame();
    }, 1000);

    return () => clearTimeout(checkStatus);
  });

  // useEffect(() => {
  //   const checkStatus = setTimeout(async () => {
  //     const gameId = gameData.id || sessionStorage.getItem('gameId');
  //     const userId = playerId || sessionStorage.getItem('playerId');

  //     if (gameId && userId) {
  //       try {
  //         const { data } = await findGameById(userId, gameId);

  //         if (data.players.length) {
  //           const players = data.players.map((player, index) => ({
  //             ...player,
  //             avatar: `avatar0${index + 1}`,
  //             nickname: player.player.nickName || `Player ${index + 1}`,
  //           }));

  //           const playersById = players.reduce((all, player) => {
  //             return {
  //               ...all,
  //               [player.player.name]: player,
  //             };
  //           }, {});

  //           setGameData((oldData) => ({
  //             ...data,
  //             players,
  //             playersById: { ...oldData.playersById, ...playersById },
  //           }));
  //         }
  //       } catch (error) {
  //         if (error.response.status === 404) {
  //           resetData();
  //           navigate('/');
  //         }
  //       }
  //     }
  //   }, 1000);

  //   return () => clearTimeout(checkStatus);
  // });

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
    }
  }, [gameData, resetData, playerId, navigate]);

  return;
}
