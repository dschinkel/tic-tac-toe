import { Error } from './Messages';

function GameValidator(board){

  function isValidGameType(gameType){
    const isValid = ["hc", "hh", "cc"].includes(gameType);
    return isValid;
  }

  function isValidDifficultyLevel(level){
    const isValid = ["e", "m", "h"].includes(level);
    return isValid;
  }

  function isValidPlayerName(name){
    const isValid = !["", " ", null, undefined].includes(name);
    return isValid;
  }

  function isValidStartingPlayer(playerid){
    const isValid = ["0","1"].includes(playerid);
    return isValid;
  }

  function isValidCustomPlayerMarker(marker){
    const isValid = !["", " ", null, undefined]
      .includes(marker) && marker.length === 1;
    return isValid;
  }

  function isValidMove(position) {
    if(position === null || position === "") {
      return { isValid: false, error: Error.INVALIDNUMBER }
    }

    if(!isValidPosition(position)){
      return { isValid: false, error: Error.INVALIDNUMBER }
    }

    if(!board.cellIsEmpty(position)){
      return { isValid: false, error: Error.CELLNOTEMPTY }
    }

    return { isValid: true, error: null }
  }

  function isValidPosition(position) {
    if (!isNaN(+position)
      && (+position >= 0)
      && (+position <= 8)) {
      return true;
    }

    return false;
  }

   const gameValidator = {
    Error,
    isValidMove,
    isValidGameType,
    isValidDifficultyLevel,
    isValidPlayerName,
    isValidStartingPlayer,
    isValidCustomPlayerMarker
  };

  return gameValidator;
}

export default GameValidator;