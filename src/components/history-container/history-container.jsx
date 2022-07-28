import HistoryItem from '../history-item/history-item';
import QuestionForm from '../question-form/question-form';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AnswerForm from '../answer-form/answer-form';
import MessageBlock from '../message-block/message-block';
import './history-container.scss';
import {
  getHistory,
  answerQuestion,
  askQuestion,
} from '../../services/games-service';
import {
  ANSWER,
  ANSWERING,
  ASKING,
  GUESSING,
  QUESTION,
  RESPONSE,
  WAITING,
  WAITING_FOR_ANSWERS,
  WAITING_FOR_QUESTION,
} from '../../constants/constants';
import { useContext } from 'react';
import GameDataContext from '../../contexts/game-data-context';

function HistoryContainer({ currentPlayer, players, playerTurn }) {
  const { gameData, playerId, fetchGame } = useContext(GameDataContext);
  const bottomElement = useRef(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const mode = currentPlayer.player.playerState;

  useEffect(() => {
    const listBottom = bottomElement.current;

    if (!listBottom) return;

    listBottom.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  }, [history]);

  useEffect(() => {
    if (mode === ASKING || mode === WAITING_FOR_ANSWERS) {
      console.log('MODE', mode);
      setAnswer('');
    }
  }, [mode]);

  const fetchHistory = useCallback(
    async function () {
      if (!gameData.id) {
        return;
      }
      const { data } = await getHistory(playerId, gameData.id);

      if (data.length) {
        const gameHistory = data.map((item) => {
          const allPlayers = item.map((player, index) => ({
            id: player.player,
            avatar:
              gameData.players.find(
                (user) => user.player.name === player.player
              )?.avatar || `avatar0${index + 1}`,
            action: player.action,
            value: player.value,
          }));
          const user = allPlayers.find((player) => player.action === QUESTION);
          const users = allPlayers.filter((player) => player.action === ANSWER);
          const avatar = user?.avatar;
          const answers = users.map((user) => {
            const avatar = user?.avatar;
            const status = user?.value;

            return { avatar, status };
          });

          return { avatar, answers, question: user.value };
        });

        setHistory(gameHistory);
      }
    },
    [playerId, gameData.id, gameData.players]
  );

  useEffect(() => {
    fetchHistory();
  }, [
    playerTurn?.player.name,
    fetchHistory,
    playerTurn?.question,
    currentPlayer.answer,
  ]);

  const lastHistoryItemAnswersLength = useMemo(
    () => history[history.length - 1]?.answers.length ?? 0,
    [history]
  );
  const answersLength = useMemo(
    () =>
      players.reduce((all, player) => {
        if (player.player.playerState === WAITING_FOR_QUESTION) {
          return all + 1;
        }

        return all;
      }, 0),
    [players]
  );

  useEffect(() => {
    if (lastHistoryItemAnswersLength !== answersLength) {
      fetchHistory();
    }
  }, [lastHistoryItemAnswersLength, answersLength, fetchHistory]);

  useEffect(() => {
    if (playerTurn?.player.playerState === WAITING_FOR_ANSWERS) {
      setAnswer('');
    }
  }, [playerTurn?.player.playerState]);

  const submitAsk = useCallback(
    async (question) => {
      setLoading(true);
      try {
        await askQuestion(playerId, gameData.id, question);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  const submitAnswer = useCallback(
    async (answer) => {
      setLoading(true);
      try {
        await answerQuestion(playerId, gameData.id, answer);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
      setAnswer(answer);
      setShowAnswer(true);
    },
    [fetchGame, gameData.id, playerId]
  );

  return (
    <div className="history">
      <div className="history_list">
        {history?.map(
          (item, index) =>
            item.question && (
              <HistoryItem
                key={index}
                avatar={item.avatar}
                question={item.question}
                answers={item.answers}
              />
            )
        )}
        <div className="list_scroll_bottom" ref={bottomElement}></div>
      </div>
      <div className="history_bottom">
        {mode === ASKING && (
          <QuestionForm disabled={loading} onSubmit={submitAsk} />
        )}
        {mode === ANSWERING && playerTurn?.question && (
          <AnswerForm
            mode={playerTurn.player.playerState === GUESSING ? GUESSING : mode}
            onSubmit={submitAnswer}
            disabled={loading}
          />
        )}
        {mode === WAITING_FOR_QUESTION && showAnswer && !loading && (
          <MessageBlock mode={WAITING} message={answer} />
        )}
      </div>
    </div>
  );
}

export default HistoryContainer;
