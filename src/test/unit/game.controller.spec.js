import HumanPlayer from '../../Player/HumanPlayer';
import GameConfigurator from '../../GameConfigurator';
import { mockReadline } from './ui/MockCommandLine';
import { GameType } from '../../Constants';
import { Prompt } from '../../Messages';

describe('Game Controller', () => {
  let board, display, human, ui;
  const configurator = GameConfigurator();

  beforeEach(() => {
    board = configurator.getBoard();;
    display = configurator.getDisplay();
    ui = configurator.getUI();;

    human = HumanPlayer(board);
  });

  it('prompts use to make a move', async () => {
    const position = 3;
    const prompt = `${human.name}\'s turn. ${ Prompt.MAKEAMOVE }`;
    mockReadline(prompt, position);

    const resolved = await ui.promptToMove(human);

    expect(resolved.promptText).to.equal(prompt);
  });

  it('receives position to move to', async () => {
    const position = 4;
    mockReadline(null, position);

    const resolved = await ui.promptToMove(human);

    expect(resolved.moveToPosition).to.equal(position);
  });

  it('prompts user for type of game', async () => {
    const prompt = Prompt.GAMETYPE;
    mockReadline(prompt, "cc");
    const resolved = await ui.getGameType();

    expect(resolved.promptText).to.equal(prompt);
  });

  it('registers game type for human vs computer', () => {
    configurator.setGameType("hc");
    expect(configurator.getGameType()).to.equal(GameType.HC);
  });

  it('registers game type for human vs human', () => {
    configurator.setGameType("hh");
    expect(configurator.getGameType()).to.equal(GameType.HH);
  });

  it('prompts human player name', async () => {
    const promptText = 'Please enter your name for player 1: ';
    mockReadline(promptText, "dave");
    const resolved = await display.getPlayerName("player 1");

    expect(resolved.promptText).to.equal(promptText);
  });

  it('sets up players for computer vs. computer', async () => {
    configurator.setGameType("cc");
    const players = await configurator.createPlayersForGameType()

    expect(players).to.have.length(2)
  });
});


