import GameValidator from '../../GameValidator';
import UI from '../../UI/UI';

describe('UI', () => {
  const validator = GameValidator(),
    invalidEntries = ["", " ", null, undefined, 2342];

  it('validates game type', async () => {
    for(let entry of invalidEntries ){
      expect(validator.isValidGameType(entry)).to.be.false;
    }
  });

  it('validates game difficulty level', () => {
    for(let entry of invalidEntries ){
      expect(validator.isValidDifficultyLevel(entry)).to.be.false;
    }
  });

  it('validates player name', () => {
    const invalidEntries = ["", " ", null, undefined];
    for(let entry of invalidEntries ){
      expect(validator.isValidPlayerName(entry)).to.be.false;
    }
  });

  it('prohibits invalid players', () => {
    const invalidEntries = ["", " ", null, undefined];
    for(let entry of invalidEntries ){
      expect(validator.isValidStartingPlayer(entry)).to.be.false;
    }
  });

  it('validates custom player marker', () => {
    const invalidEntries = ["", " ", null, undefined, "%%"];
    for(let entry of invalidEntries ){
      expect(validator.isValidCustomPlayerMarker(entry)).to.be.false;
    }
  });
});
