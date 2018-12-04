import { Console } from '../UI/AppContext';
import GameValidator from '../GameValidator';
import { PlayerType } from '../Constants';
import { Error, Prompt } from '../Messages';

function UI(display){
  const validator = GameValidator();

  async function promptToMove(player){
    if (player.type === PlayerType.COMPUTER) {
      return new Promise((resolve) => { resolve() });
    }

    const promptText = `${player.name}\'s turn. ${ Prompt.MAKEAMOVE }`

    return new Promise((resolve) => {
      Console.rl.question(promptText, moveToPosition => {
        resolve({ promptText: promptText, moveToPosition: moveToPosition });
      });
    });
  };

  async function promptForHumanMove(player){
    const result = await promptToMove(player),
      position = getPosition(result);
    return position;
  }

  async function promptForGameType(){
    return new Promise((resolve) => {
      const promptText = Prompt.GAMETYPE;

      Console.rl.question(promptText, gameType => {
        resolve({ promptText, gameType});
      });
    })
  }

  async function getGameType(){
    let result = await promptForGameType();

    if(!validator.isValidGameType(result.gameType)){
      display.showError(Error.INVALIDGMETYPE);
      result = await getGameType()
    }
    return result;
  }

  async function promptForGameDifficulty(){
    return new Promise((resolve) => {
      const promptText = Prompt.LEVELOFDIFFICULTY;
      Console.rl.question(promptText, level => {
        resolve({ promptText, level});
      });
    })
  }

  function getPosition(result) {
    return result ? result.moveToPosition : null;
  }

  const ui = {
    promptToMove,
    promptForHumanMove,
    getGameType,
    promptForGameDifficulty
  };

  return ui;
}


export default UI;
