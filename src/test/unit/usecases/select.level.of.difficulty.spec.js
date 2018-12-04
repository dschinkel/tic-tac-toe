import UI from '../../../UI/UI';
import ConsoleUI from '../../../UI/ConsoleUI';
import { mockReadline } from '../ui/MockCommandLine';
import GameConfigurator from '../../../GameConfigurator';
import GameController from '../../../GameController';
import { LevelOfDifficulty } from '../../../Constants';
import { Prompt } from '../../../Messages';

describe('Use Case: Select Level of Difficulty', () => {
  let configurator, controller;

  beforeEach(() => {
    configurator = GameConfigurator();
    controller = GameController({});
  });

  describe('Easy', () => {
    it('prompts with a message to choose level of difficulty', async () => {
      const display = ConsoleUI(),
        ui = UI(display),
        prompt = Prompt.LEVELOFDIFFICULTY;
      mockReadline(prompt, null);

      const resolved = await ui.promptForGameDifficulty();
      expect(resolved.promptText).to.equal(prompt);
    });

    it('sets game to easy', async () => {
      await configurator.setDifficultyLevel("e");
      expect(configurator.getLevelOfDifficulty()).to.equal(LevelOfDifficulty.EASY)
    });

    it('sets level of difficulty to easy', async () => {
      configurator.setDifficultyLevel("e");
      expect(configurator.getLevelOfDifficulty()).to.equal(LevelOfDifficulty.EASY);
    });

    describe('Medium', () => {
      it('sets game to medium', async () => {
        await configurator.setDifficultyLevel("m");
        expect(configurator.getLevelOfDifficulty()).to.equal(LevelOfDifficulty.MEDIUM)
      });

    });

    describe('Hard', () => {

      it('sets game to hard', async () => {
        await configurator.setDifficultyLevel("h");
        expect(configurator.getLevelOfDifficulty()).to.equal(LevelOfDifficulty.HARD)
      });
    });
  })

});
