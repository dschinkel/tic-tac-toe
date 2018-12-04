const GameType = Object.freeze({
  HC: "human vs computer",
  HH: "human vs human",
  CC: "computer vs computer"
});

const LevelOfDifficulty = Object.freeze({
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard"
});

const Marker = Object.freeze({
  MARKER_X: 'X',
  MARKER_O: 'O',
  EMPTY_CELL: ' '
});

const PlayerType = Object.freeze({
  COMPUTER: "Computer",
  HUMAN: "Human"
});

const TerminalState = Object.freeze({
  WIN: "win",
  TIE: "tie"
});

const TerminalStateScore = Object.freeze({
  WINCOMPUTER: 10,
  WINHUMAN: -10,
  TIE: 0
});

export {
  GameType,
  PlayerType,
  Marker,
  LevelOfDifficulty,
  TerminalState,
  TerminalStateScore
}