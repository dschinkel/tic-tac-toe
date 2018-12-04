import GamePlayer from './GamePlayer';
import { Marker, PlayerType } from '../Constants';
const { MARKER_X } = Marker;

function _HumanPlayer(board, ui){
  const player = GamePlayer();
    player.id = 0;
    player.type = PlayerType.HUMAN;
    player.move = humanMove;
    player.marker = MARKER_X;

  async function humanMove(position){
    if(!position){
      position = await ui.promptForHumanMove(player);
    }

    const moved = await player.makeMove(position, player.marker, board);

    if(!moved){
      return humanMove()
    }
    return moved;
  }

  return player;
}

function HumanPlayer(name, marker, board){
  return _HumanPlayer(name, marker, board);
}

export default HumanPlayer;
