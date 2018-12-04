import GameConfigurator from '../../../GameConfigurator';
import ComputerPlayer from '../../../Player/ComputerPlayer';
import GameLevel from '../../../GameLevel';
import ConsoleUI from '../../../UI/ConsoleUI';
import { Terminal } from '../../../Messages';

describe('UI Display', () => {
  let ai, board, display, gameLevel;
  const configurator = GameConfigurator();

  beforeEach(() => {
    ai = configurator.getAI();
    board = configurator.getBoard();
    display = ConsoleUI(null)
    gameLevel = GameLevel();
  });

  it('displays an empty board by default', () => {
    const emptyBoard =
      "   |   |  \n" +
      "===+===+===\n" +
      "   |   |  \n" +
      "===+===+===\n" +
      "   |   |  ";

    const defaultBoard = display.showBoard(board.getGrid());

    expect(defaultBoard).to.equal(emptyBoard);
  });

  it('displays winner', () => {
    const computer = ComputerPlayer(ai, board),

      message = display.showWinner(computer);

    expect(message).to.equal(`******* OMG ${computer.name} Just Won !!!! ********`)
  });

  it('displays tie', () => {
    const message = display.showTie();
    expect(message).to.equal(Terminal.TIE)
  });

  it('formats error messages', () => {
    const error = "you suck at tic-tac-toe",
      displayMessage = display.showError(error);
    expect(displayMessage).to.equal(`Error: ${error}`)
  });
});
