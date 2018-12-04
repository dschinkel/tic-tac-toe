import GameValidator from '../GameValidator';
import ConsoleUI from '../UI/ConsoleUI';

function _GamePlayer(){
  const player = {
    id: null,
    name: null,
    marker: null,
    type: null,
    move: null,
    setId,
    setName,
    setMarker,
    makeMove
  };

  function setId(id){
    player.id = id;
  }

  function setName(name){
    player.name = name;
  }

  function setMarker(marker){
    player.marker = marker;
  }

  function makeMove(position, marker, board) {
    let moved = false;
    const validator = GameValidator(board),
      move = validator.isValidMove(position);

    if(!move.isValid){
      const display = ConsoleUI();
      display.showError(move.error);
    }

    if(move.isValid){
      moved = board.addMove(position, marker);
    }
    return moved;
  }

  return player;
}

function GamePlayer(board){
  return _GamePlayer(board);
}

export default GamePlayer;

