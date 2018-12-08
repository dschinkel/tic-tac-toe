import GameConfigurator from './GameConfigurator';
import GameFlow from './GameFlow';
import { Console } from './UI/AppContext';


function _GameController() {
  const configurator = GameConfigurator(),
    board = configurator.getBoard(),
    flow = GameFlow(configurator),
    display = configurator.getDisplay();

  let currentPlayer, terminated = false;;

  function setWhoGoesFirst(player) {
    currentPlayer = player;
  }

  function terminateIfWinOrTie() {
    if (!terminated && display.showTerminalMessage(currentPlayer, board.getGrid())) {
      terminated = true;
      Console.rl.close();
    }
  }

  async function processNextMove(position) {
    if (currentPlayer) {
      await currentPlayer.move(position);

      terminateIfWinOrTie(currentPlayer);
      if(terminated) return;

      display.showBoard(board.getGrid());
      switchPlayer();
      await processNextMove()
    }
  }

  function switchPlayer() {
    let nextPlayerId = currentPlayer.id === 1 ? 0 : 1;
    const nextPlayer = configurator.getPlayerById(nextPlayerId);
    currentPlayer = nextPlayer;
  }

  async function startGame() {
    display.showWelcome();
    await flow.gameType();
    await flow.gameDifficulty();

    await flow.generatePlayers();
    const firstPlayer = await flow.whoGoesFirst(configurator.getPlayers());

    setWhoGoesFirst(firstPlayer);

    display.showBoard(board.getGrid());

    await processNextMove();
  }

  return {
    startGame
  };
}

function GameController(settings) {
  return _GameController(settings);
}

export default GameController;