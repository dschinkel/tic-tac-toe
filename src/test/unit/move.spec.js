import GameConfigurator from '../../GameConfigurator';
import GamePlayer from '../../Player/GamePlayer';
import {Marker} from '../../Constants';

describe('Move', () => {

  let board, gamePlayer, ui;
  const configurator = GameConfigurator(),
    { MARKER_X } = Marker;

  beforeEach(() => {
    board = configurator.getBoard();
    ui = configurator.getUI();
    gamePlayer = new GamePlayer();
  });

  it('cannot move to a cell that is already filled', async () => {
    const position = 1;
    await gamePlayer.makeMove(position, MARKER_X, board);
    const moved = await gamePlayer.makeMove(position, MARKER_X, board);

    expect(moved).to.be.false;
  });

  it('cannot move with invalid selection', async () => {
    const invalidMoves = [null, undefined, "", "a"];
    let moved;
    for(let invalidMove of invalidMoves){
      moved = await gamePlayer.makeMove(invalidMove, MARKER_X, board);
      expect(moved).to.be.false;
    }
  });
});
