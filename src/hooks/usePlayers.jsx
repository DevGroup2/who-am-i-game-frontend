import { useContext } from 'react';
import GameDataContext from '../contexts/game-data-context';

export default function usePlayers() {
  const { gameData, playerId } = useContext(GameDataContext);

  const players = gameData.players.map((player, index) => ({
    name: player.player.nickName || `Player ${index + 1}`,
    avatar: `avatar0${index + 1}`,
    ...player,
  }));

  const currentPlayer = players.find(
    (player) => player.player.name === playerId
  );
  const playersWithoutCurrent = players.filter(
    (player) => player.player.name !== playerId
  );

  return { currentPlayer, playersWithoutCurrent };
}
