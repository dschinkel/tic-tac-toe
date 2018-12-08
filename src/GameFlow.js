import { GameType } from './Constants';
import { Error } from './Messages';

function _GameFlow(configurator){
  const display = configurator.getDisplay(),
    ui = configurator.getUI(),
    validator = configurator.getValidator();

    async function gameType(){
      let result = await configurator.getUI().getGameType();
      if (result) {
        configurator.setGameType(result.gameType);
      }
      return result;
    };

    async function gameDifficulty(){
      const result = await getGameDifficulty();
        if (result) {
          configurator.setDifficultyLevel(result.level)
        }
    }

    async function generatePlayers(){
      const players = await configurator.createPlayersForGameType();
      configurator.setPlayers(players);
    }

    async function whoGoesFirst(players){
        const result = await display.getFirstPlayer(players, configurator.getGameType()),
          foundPlayers = configurator.getPlayerById(result.playerId);
        return foundPlayers;
    }

    async function getGameDifficulty() {
      let result;

      if (configurator.getGameType() === GameType.HC) {
        result = await ui.promptForGameDifficulty();

        if (!validator.isValidDifficultyLevel(result.level)) {
          display.showError(Error.INVALIDLEVEL);
          result = await getGameDifficulty()
        }
      }
      return result;
  }

  return {
    gameType,
    gameDifficulty,
    generatePlayers,
    whoGoesFirst
  };
}

function GameFlow(configurator) {
  return _GameFlow(configurator);
}

export default GameFlow;