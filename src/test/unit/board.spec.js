import Board from '../../Board';
import { Marker } from '../../Constants';

describe('Board', () => {

    it('detects a full board', () => {
      const { MARKER_O } = Marker,
        board = Board();

      board.addMove(0, MARKER_O)
      board.addMove(1, MARKER_O)
      board.addMove(2, MARKER_O)
      board.addMove(3, MARKER_O)
      board.addMove(4, MARKER_O)
      board.addMove(5, MARKER_O)
      board.addMove(6, MARKER_O)
      board.addMove(7, MARKER_O)
      board.addMove(8, MARKER_O)
      expect(board.isFull()).to.be.true;
    })
})
