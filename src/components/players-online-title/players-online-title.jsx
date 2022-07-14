import { useState, useContext } from 'react';
import Spinner from '@atlaskit/spinner';
import { getAllPlayersCount } from '../../services/games-service';
import GameDataContext from '../../contexts/game-data-context';
import './players-online-title.scss';
import useInterval from '../../hooks/useInterval';

function PlayersOnlineTitle() {
  const { playerId } = useContext(GameDataContext);
  const [playerNum, setPlayerNum] = useState();

  // useInterval(async () => {
  //   setPlayerNum((await getAllPlayersCount(playerId)).data);
  // }, 1000);

  return (
    <span className="players-online">
      {playerNum ?? <Spinner appearance="invert" />}{' '}
      {playerNum > 1 ? 'Players' : 'Player'} Online
    </span>
  );
}

export default PlayersOnlineTitle;
