import Board from '../../Board';
import HumanPlayer from '../../Player/HumanPlayer';
import Rules from '../../Rules'
import { Marker } from '../../Constants';

describe('Terminating States', () => {
  let board, rules;
  const { MARKER_X, MARKER_O, EMPTY_CELL } = Marker;

  beforeEach(() => {
    board = Board();
    rules = Rules(board);
  });

  it('detects a winner', () => {
    const board = [
      MARKER_X, MARKER_X, MARKER_X,
      EMPTY_CELL, EMPTY_CELL, EMPTY_CELL,
      EMPTY_CELL, EMPTY_CELL, EMPTY_CELL];
    expect(rules.isWinner(board, MARKER_X)).to.be.true;
  });

  it('detects no winner for an empty board', () => {
    const human = HumanPlayer,
    winnerFound = rules.isWinner(human, board.getGrid());
    expect(winnerFound).to.be.false;
  });

  it('detects a tie', () => {
    board.addMove(0, MARKER_O)
    board.addMove(1, MARKER_X)
    board.addMove(2, MARKER_O)
    board.addMove(3, MARKER_X)
    board.addMove(4, MARKER_O)
    board.addMove(5, MARKER_X)
    board.addMove(6, MARKER_X)
    board.addMove(7, MARKER_O)
    board.addMove(8, MARKER_X)

    expect(rules.isTie(MARKER_X)).to.be.true;
    expect(rules.isTie(MARKER_O)).to.be.true;
  });
});