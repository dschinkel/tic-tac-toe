
import { TerminalState } from './Constants';

function _Rules(board){

  function terminalStateFound(player){
    const winner = isWinner(board.getGrid(), player.marker);
    if(winner){
      return TerminalState.WIN;
    }

    if(isTie(player)){
      return TerminalState.TIE;
    }
  }

  function isTie(marker){
    const tie = !isWinner(board, marker) && board.isFull();
    return tie;
  }

  function isWinner(board, marker) {
    return (board[0] === marker && board[1] === marker && board[2] === marker) ||
      (board[3] === marker && board[4] === marker && board[5] === marker) ||
      (board[6] === marker && board[7] === marker && board[8] === marker) ||
      (board[0] === marker && board[3] === marker && board[6] === marker) ||
      (board[1] === marker && board[4] === marker && board[7] === marker) ||
      (board[2] === marker && board[5] === marker && board[8] === marker) ||
      (board[0] === marker && board[4] === marker && board[8] === marker) ||
      (board[2] === marker && board[4] === marker && board[6] === marker);
  }

  return {
    isTie,
    isWinner,
    terminalStateFound
  };
}

function Rules(board) {
  return _Rules(board);
}

export default Rules