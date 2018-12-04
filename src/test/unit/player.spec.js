import ComputerPlayer from '../../Player/ComputerPlayer';
import GameConfigurator from '../../GameConfigurator';
import {mockReadline} from './ui/MockCommandLine';

let board, computer, gameLevel, human;

describe('Player - Human', () => {
  const configurator = GameConfigurator();
  configurator.setGameType("hc");
  configurator.setDifficultyLevel("h");

  beforeEach(() => {
    mockReadline("Dave", null);
    const players = configurator.createPlayersForGameType();
    board = configurator.getBoard();
    human = players[0];
    computer = players[1];
  });


  it.skip('can make a move for human', async () => {
    await human.move(2);
    expect(board.cellIsEmpty(2)).to.be.false;
  });

  it.skip('human can make a move after computer', async () => {
    const computer = ComputerPlayer(gameLevel, board);

    await human.move(2);
    await computer.move();
    await human.move(3);

    const humanMoves = board.getGrid().filter(cell => {
        return cell === human.marker });

    expect(humanMoves).to.have.length(2)
  });
});

describe('Player - Computer', () => {

  it.skip('can make a move for computer', async () => {
    await computer.move();
    const moves = board.getGrid().filter(cell => {
        return cell === computer.marker});

    expect(moves).to.have.length(1)
  });
});






