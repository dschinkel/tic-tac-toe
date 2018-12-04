
const Terminal = Object.freeze({
  TIE: "Tied! Try again."
});

const Prompt = Object.freeze({
  WELCOME: "\n\nWelcome to Tic-Tac-Toe!!!!\n",
  BOARD_MARKER: "The game defaults to using X for human player and O for computer." +
  "\n\u001b[1;36mto use a custom marker for a board marker type one, or (d) to use default: ",
  WHOGOESFIRST: `\nWho would you like to go first?`,
  MAKEAMOVE: "Enter [0-8]: ",
  GAMETYPE: "\nSelect Game Type: (hc) Human vs. Computer or (hh) Human vs. Human (cc) Computer vs Computer: ",
  LEVELOFDIFFICULTY: "Please select game difficulty: (e) easy, (m) medium, or (h) hard: "
});

const Error = Object.freeze({
  INVALIDNUMBER: "You have specified an invalid number.  Please type a number between 0-8",
  CELLNOTEMPTY: "Sorry, that cell is taken, please choose an open cell on the board",
  INVALIDGMETYPE: "You entered and invalid game type, try again.",
  INVALIDLEVEL: "You entered and invalid game level, try again.",
  INVALIDPLAYERNAME: "Please type at least one character for your name.",
  INVALIDFIRSTPLAYER: "Please select 0 or 1: ",
  INVALIDPLAYERMARKER: "Please enter one marker marker: "
})

export { Error, Prompt, Terminal };