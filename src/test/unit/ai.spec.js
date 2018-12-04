import AI from '../../AI';
import ComputerPlayer from '../../Player/ComputerPlayer';
import { GameType, Marker, TerminalStateScore } from '../../Constants';
import GameConfigurator from '../../GameConfigurator';
const { MARKER_X, MARKER_O } = Marker;

describe('AI', () => {

  describe('Next Best Move', () => {
    let ai, board, configurator, computer, rules;

    beforeEach(async () => {
      configurator = GameConfigurator();
      configurator.setGameType(GameType.HC);

      ai = configurator.getAI();
      board = configurator.getBoard();
      rules = configurator.getRules();

      computer = ComputerPlayer();
    });

    it('finds available empty board cell indexes', () => {
      board.addMove(0, MARKER_O)
      board.addMove(1, MARKER_X)
      const emptyCellIndexes = board.getEmptyCellIndexes();
      expect(emptyCellIndexes).to.have.length(7);
    })

    it('returns terminal score for a tie', () => {
      board.addMove(0, MARKER_O)
      board.addMove(1, MARKER_X)
      board.addMove(2, MARKER_O)
      board.addMove(3, MARKER_X)
      board.addMove(4, MARKER_O)
      board.addMove(5, MARKER_X)
      board.addMove(6, MARKER_X)
      board.addMove(7, MARKER_O)
      board.addMove(8, MARKER_X)

      const result = ai.getTerminalScore(computer.marker, board);

      expect(result.score).to.equal(TerminalStateScore.TIE)
    });

    it('returns terminal score for a computer win', () => {
      board.addMove(0, MARKER_O)
      board.addMove(1, MARKER_O)
      board.addMove(2, MARKER_O)
      const result = ai.getTerminalScore(computer, board);

      expect(result.score).to.equal(TerminalStateScore.WINCOMPUTER);
    });
  });
});
