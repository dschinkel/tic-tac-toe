import ConsoleUI from '../../../UI/ConsoleUI';
import { mockReadline } from '../ui/MockCommandLine';
import { Prompt } from '../../../Messages';

describe('Use Case: Select Player Marker', () => {
  let display;

  beforeEach(() => {
    display = ConsoleUI();
  });

  it('prompts with a message to specify a custom marker for a marker', async () => {
    const prompt = Prompt.BOARD_MARKER;
    mockReadline(prompt, null);

    const resolved = await display.promptForMarker();
    expect(resolved.promptText).to.equal(Prompt.BOARD_MARKER);
  });

  it('registers marker for human', async () => {
    let customMarker = '%';
    mockReadline(null, customMarker);

    const resolved = await display.getMarker();

    expect(resolved.marker).to.equal(customMarker);
  });
});
