import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/btn/btn';
import GameDataContext from '../../contexts/game-data-context';
import {
  NUMBER_OF_PLAYERS,
  LOADING,
  WAITING_FOR_PLAYERS,
} from '../../constants/constants';
import {
  createGame,
  enrollToGame,
  findAvailableGames,
  findGameById,
} from '../../services/games-service';
import { useState } from 'react';

export default function PlayQuickGameButton() {
  const { gameData, setGameData, resetData, playerId } =
    useContext(GameDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setPlayers = useCallback(
    (data) => {
      if (data.players.length) {
        let avatars = gameData.avatars || [];

        if (
          data.players.length === NUMBER_OF_PLAYERS &&
          !gameData.avatars?.length
        ) {
          avatars = data.players.map((player, index) => ({
            id: player.player.name,
            avatar: `avatar0${index + 1}`,
          }));
        }
        const players = data.players.map((player, index) => ({
          ...player,
          avatar:
            avatars.find((user) => user.id === player.player.name)?.avatar ||
            `avatar0${index + 1}`,
          nickname: player.player.nickname || `Player ${index + 1}`,
        }));

        const playersById = players.reduce((all, player) => {
          return {
            ...all,
            [player.player.name]: player,
          };
        }, {});
        console.log('AVATARS', avatars);
        setGameData((oldData) => ({
          ...data,
          players,
          avatars,
          playersById: { ...oldData.playersById, ...playersById },
        }));
        sessionStorage.setItem('gameId', data.id);
        navigate(LOADING);
      }
    },
    [setGameData, navigate, gameData.avatars]
  );

  const onCreateGame = useCallback(async () => {
    setLoading(true);
    const { data } = await findAvailableGames(playerId);
    const availableGames = data.filter(
      (game) => game.status === WAITING_FOR_PLAYERS
    );
    const game = availableGames[0];

    if (game) {
      try {
        await enrollToGame(playerId, game.id);
        const { data } = await findGameById(playerId, game.id);
        setPlayers(data);
      } catch (error) {
        //to do: handle errors
      }
    } else {
      try {
        const { data } = await createGame(playerId, NUMBER_OF_PLAYERS);
        setPlayers(data);
      } catch (error) {
        if (error.response.status === 403) {
          resetData();
        }
      }
    }
    setLoading(false);
  }, [playerId, resetData, setPlayers]);

  // const onCreateGame = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await createGame(playerId, NUMBER_OF_PLAYERS);

  //     if (data.players.length) {
  //       console.log('PLAYERS button', data.players);
  //       const players = data.players.map((player, index) => ({
  //         ...player,
  //         avatar: `avatar0${index + 1}`,
  //         nickname: player.player.nickname || `Player ${index + 1}`,
  //       }));

  //       const playersById = players.reduce((all, player) => {
  //         return {
  //           ...all,
  //           [player.player.name]: player,
  //         };
  //       }, {});

  //       setGameData((oldData) => ({
  //         ...data,
  //         players,
  //         playersById: { ...oldData.playersById, ...playersById },
  //       }));
  //       sessionStorage.setItem('gameId', data.id);
  //       navigate(LOADING);
  //     }
  //   } catch (error) {
  //     if (error.response.status === 403) {
  //       resetData();
  //     }
  //   }
  //   setLoading(false);
  // }, [setGameData, playerId, navigate, resetData]);

  return (
    <Btn
      disabled={loading}
      className={'btn-blue-outline'}
      onClick={onCreateGame}
    >
      PLAY QUICK GAME
    </Btn>
  );
}
