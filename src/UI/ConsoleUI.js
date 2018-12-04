import colors from 'colors'
import GameValidator from '../GameValidator';
import { Console } from '../UI/AppContext';
import { Error, Prompt, Terminal } from '../Messages';
import { TerminalState } from '../Constants';

function ConsoleUI(rules){

  const validator = GameValidator();

  function promptTextForWhoGoesFirst(promptText, players) {
    promptText = `
      ${promptText} 
      type ${players[0].id} for ${players[0].name}, ${players[1].id} for ${players[1].name}: `;

    return promptText;
  }

  function showWelcome(){
    console.log(Prompt.WELCOME .blue .bold .bgBlack);
  }
  function showBoard(grid) {
    const boardAsString = getGridDisplay(grid)
    console.log(boardAsString);
    return boardAsString;
  }

  function showError(error){
    const errorMessage = `Error: ${error}`;
    console.log(errorMessage .red);
    return errorMessage;
  }

  function showWinner(player) {
    const message = `******* OMG ${player.name} Just Won !!!! ********`;
    console.log(message .rainbow .bold .bgBlack);
    return message;
  }

  function showTie(){
    const message = Terminal.TIE;
    console.log(message);
    return message;
  }

  function getGridDisplay(grid){
    return ' ' + grid[0] +' |' + ' ' + grid[1] +
      ' |' + ' ' + grid[2] + '\n===+===+===\n' + ' ' + grid[3] + ' |' + ' '+ grid[4] +
      ' |' + ' ' + grid[5] + '\n===+===+===\n' + ' '+ grid[6] + ' |' + ' ' + grid[7] +
      ' |' + ' '+ grid[8];
  }

  function showTerminalMessage(player, grid){
    const terminalStateFoundMessage = rules.terminalStateFound(player);
    if(terminalStateFoundMessage){
      showBoard(grid);
      if(terminalStateFoundMessage === TerminalState.WIN){
        return showWinner(player)
      }
      if(terminalStateFoundMessage === TerminalState.TIE){
        return showTie()
      }
    }

    return null;
  }

  async function promptForMarker(){
    return new Promise((resolve) => {
      const promptText = Prompt.BOARD_MARKER;
      Console.rl.question(promptText, marker => {
        resolve({ promptText, marker});
      });
    })
  }

  async function getMarker(){
    let result;
    result = await promptForMarker();

    if(!validator.isValidCustomPlayerMarker(result.marker)){
      showError(Error.INVALIDPLAYERMARKER);
      result = await getMarker();
    }
    return result;
  }

  async function getPlayerName(playerLabel){
    let result;
    result = await promptForPlayerName(playerLabel);

    if(!validator.isValidPlayerName(result.name)){
      showError(Error.INVALIDPLAYERNAME);
      result = getPlayerName(playerLabel);
    }
    return result;
  }

  async function promptForPlayerName(playerLabel){
    return new Promise((resolve) => {
      const promptText = `Please enter your name for ${playerLabel}: `;
      Console.rl.question(promptText, name => {
        resolve({ promptText, name});
      });
    })
  }

  async function getFirstPlayer(players){
    let result = await promptForFirstPlayer(players);

    if(!validator.isValidStartingPlayer(result.playerId)){
      showError(Error.INVALIDFIRSTPLAYER);
      result = await getFirstPlayer(players);
    }
    return result;
  }

  async function promptForFirstPlayer(players){
    return new Promise((resolve) => {
      let promptText = Prompt.WHOGOESFIRST
      promptText = promptTextForWhoGoesFirst(promptText, players);

      Console.rl.question(promptText, playerId => {
        resolve({ promptText, playerId });
      });
    });
  };

  const uiDisplay = {
    getMarker,
    promptForMarker,
    getPlayerName,
    getFirstPlayer,
    showWelcome,
    showTie,
    showWinner,
    showTerminalMessage,
    showBoard,
    showError
  };

  return uiDisplay;
}

export default ConsoleUI;