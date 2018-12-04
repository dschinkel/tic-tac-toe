import AI from './AI';
import Board from './Board';
import ComputerPlayer from './Player/ComputerPlayer';
import GameLevel from './GameLevel';
import GameValidator from './GameValidator';
import HumanPlayer from './Player/HumanPlayer';
import Rules from './Rules';
import UI from './UI/UI';
import ConsoleUI from './UI/ConsoleUI';
import { GameType, LevelOfDifficulty, Marker} from './Constants';

const { MARKER_X, MARKER_O } = Marker;

function _GameConfigurator() {
  let players = [], difficultyLevel = LevelOfDifficulty.HARD, gameType

  const gameLevel = GameLevel(),
    board = Board(),
    validator = GameValidator(board),
    rules = Rules(board),
    ai = AI(difficultyLevel, players, rules),
    display = ConsoleUI(rules, board.getGrid()),
    ui = UI(display);

  function getAI(){
    return ai;
  }

  function getBoard(){
    return board;
  }

  function getValidator(){
    return validator;
  }

  function getRules(){
    return rules;
  }

  function getDisplay(){
    return display;
  }

  function getUI(){
    return ui;
  }

  function setPlayers(players){
    players = players;
  }

  function setGameType(type) {
    if (type === "hc") {
      gameType = GameType.HC;
    }
    if (type === "hh") {
      gameType = GameType.HH;
    }
    if (type === "cc") {
      gameType = GameType.CC;
    }
  };

  function createPlayersforComputerVsComputer(computer) {
    computer.setId(0);
    computer.setMarker(MARKER_X)
    players.push(computer);

    const computer2 = ComputerPlayer(ai, board);
    computer2.setId(1);
    computer2.setName("Computer 2");
    computer2.setMarker(MARKER_O);
    players.push(computer2);

    return players;
  }

  async function createPlayersforHumanVsHuman(human) {
    let result = await display.getPlayerName("player 1");
    human.setId(0);
    human.setName(result.name);
    players.push(human);

    result = await display.getPlayerName("player 2");
    const human2 = HumanPlayer(board, ui);
    human2.setId(1);
    human2.setName(result.name);
    human.setMarker(MARKER_O);
    players.push(human2);

    return players;
  }

  async function createPlayersForHumanVsComputer(human, computer) {
    let customMarker, playerName, result;

    result = await display.getPlayerName("player 1");
    playerName = result.name || null;
    human.name = playerName;

    result = await display.getMarker();
    if(result.marker === "d"){
      players.push(human);
    } else {
      customMarker = result.marker || null;
      human.marker = customMarker;
      players.push(human);
    }

    players.push(computer);

    return players;
  }

  async function createPlayersForGameType() {
    const human = HumanPlayer(board, ui),
      computer = ComputerPlayer(ai, board);

    if (gameType === GameType.HC) {
      await createPlayersForHumanVsComputer(human, computer);
    };

    if (gameType === GameType.HH) {
      await createPlayersforHumanVsHuman(human);
    };

    if (gameType === GameType.CC) {
      await createPlayersforComputerVsComputer(computer);
    }
    return players;
  }

  function setDifficultyLevel(level){
    difficultyLevel = gameLevel.getDifficultyLevel(level);
  }

  function getLevelOfDifficulty(){
    return difficultyLevel;
  }

  function getGameType(){
    return gameType;
  }

  function getPlayers(){
    return players.slice();
  }

  function getPlayerById(playerId) {
    const player = players.filter(player => {
      return +player.id === +playerId;
    });
    return player[0];
  }

  return {
    getAI,
    getBoard,
    getValidator,
    getRules,
    getUI,
    getDisplay,
    getPlayerById,
    getPlayers,
    getGameType,
    setGameType,
    setPlayers,
    setDifficultyLevel,
    getLevelOfDifficulty,
    createPlayersForGameType
  };
}

function GameConfigurator() {
  return _GameConfigurator();
}

export default GameConfigurator;