import { useContext } from 'react';
import {
  ASKING,
  GUESSING,
  QUESTION,
  WAITING_FOR_ANSWERS,
} from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';

export default function usePlayers() {
  const { gameData, playerId } = useContext(GameDataContext);

  return gameData.players.reduce(
    (obj, player) => {
      if (
        player.player.playerState === ASKING ||
        player.player.playerState === GUESSING ||
        player.player.playerState === WAITING_FOR_ANSWERS
      ) {
        player.question = gameData.currentTurn.find(
          (player) => player.action === QUESTION
        )?.value;
        obj.playerTurn = player;
      }

      if (player.player.name === playerId) {
        obj.currentPlayer = player;

        return obj;
      }

      obj.playersWithoutCurrent.push(player);

      return obj;
    },
    { playersWithoutCurrent: [] }
  );
}
