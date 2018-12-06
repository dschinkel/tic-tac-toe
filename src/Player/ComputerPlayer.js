import GamePlayer from './GamePlayer';
import { Marker, PlayerType} from '../Constants';
const { MARKER_O } = Marker;

function _ComputerPlayer(ai, board){
  const player = GamePlayer();

  player.id = 1;
  player.name = "Computer 1",
  player.type = PlayerType.COMPUTER;
  player.move = computerMove;
  player.marker = MARKER_O;

  async function computerMove() {
    const minMaxBoard = board.clone(),
      nextMove = await ai.miniMax(minMaxBoard, player)

    if (nextMove) {
      const moved = player.makeMove(nextMove.emptyCellIndex, player.marker, board);
      return moved;
    }
  }

  return player;
}

function ComputerPlayer(ai, board){
  return _ComputerPlayer(ai, board);
}

export default ComputerPlayer;
