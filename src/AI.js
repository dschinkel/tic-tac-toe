import { LevelOfDifficulty, Marker, PlayerType, TerminalStateScore } from './Constants';
import GameLevel from './GameLevel';

const { EMPTY_CELL } = Marker;


function findNextBestMove(player, moves) {
  let bestMoveIndex;

  if (player.type === PlayerType.COMPUTER) {
    let bestScore = -1000;
    bestMoveIndex = findMoveWithHighestScore(moves, bestScore);
  } else {
    if (player.type === PlayerType.HUMAN) {
      let bestScore = 1000;
      bestMoveIndex = findMoveWithLowestScore(moves, bestScore);
    }
  }

  return bestMoveIndex;
}

function _AI(levelOfDifficulty, players, rules){
  let gameLevel = GameLevel();

  async function miniMax(board, player) {
    if(!player.type || !player.marker || !board) return;
    let score = getTerminalScore(player, board);

    if(score){
      return score;
    }

    const moves = await getMovesForAllEmptyCells(board, player);
    const bestMoveIndex = findNextBestMove(player, moves);
    const nextMove = getNextMoveForDifficultyLevel(levelOfDifficulty, gameLevel, board, moves, bestMoveIndex);

    return nextMove
  }

  function newMove(emptyCellIndex) {
    return {
      emptyCellIndex
    };
  }

  function findMoveWithLowestScore(moves, bestScore, bestMoveIndex) {
    for (let [moveIndex, move] of moves.entries()) {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMoveIndex = moveIndex;
      }
    }
    return bestMoveIndex;
  }

  function findMoveWithHighestScore(moves, bestScore, bestMoveIndex) {
    for (let [moveIndex, move] of moves.entries()) {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMoveIndex = moveIndex;
      }
    }
    return bestMoveIndex;
  }

  function getTerminalScore(player, board){
    const isWinnner = rules.isWinner(board.getGrid(), player.marker),
      tie = !isWinnner && board.isFull();

    if(isWinnner && player.type == PlayerType.COMPUTER) {
      return {score: TerminalStateScore.WINCOMPUTER}
    }
    if(isWinnner && player.type == PlayerType.HUMAN) {
      return {score: TerminalStateScore.WINHUMAN}
    }
    if(tie){
      return { score: TerminalStateScore.TIE }
    }
  }

  async function getMovesForAllEmptyCells(board, player){
    const emptyCellIndexes = board.getEmptyCellIndexes(),
      moves = await createMoves(board, emptyCellIndexes, player);
    return moves;
  }

  function updateScore(score, move) {
    if (score) {
      move.score = score.score;
    }
  }

  function movePlayerToCell(emptyCellIndex, board, playerMarker) {
    const move = newMove(emptyCellIndex);
    board.addMove(move.emptyCellIndex, playerMarker);
    return move;
  }

  function makeEmptySpot(board, emptyCellIndex) {
    board.addMove(emptyCellIndex, EMPTY_CELL);
  }

  async function createMoves(board, emptyCellIndexes, player) {
    let moves = [];

    for (let emptyCellIndex of emptyCellIndexes) {
      const move = movePlayerToCell(emptyCellIndex, board, player.marker);

      if(player.type === PlayerType.COMPUTER) {
        let score = await miniMax(board, players[0]);
        updateScore(score, move);
      } else {
        let score = await miniMax(board, players[1]);
        updateScore(score, move);
      }

      makeEmptySpot(board, emptyCellIndex);
      moves.push(move);
    }

    return moves;
  };

  function getNextMoveForDifficultyLevel(levelOfDifficulty, gameLevel, board, moves, bestMoveIndex) {
    let bestNextMove;
    if (levelOfDifficulty === LevelOfDifficulty.EASY) {
      bestNextMove = gameLevel.getNextBestMoveForEasy(board);
    } else if (levelOfDifficulty === LevelOfDifficulty.MEDIUM) {
      bestNextMove = gameLevel.getBestMoveForMedium(board);
    } else {
      bestNextMove = moves[bestMoveIndex];
    }
    return bestNextMove;
  }

  return {
    minMax: miniMax,
    getTerminalScore,
  };
}

function AI(gameLevel, players, rules) {
  return _AI(gameLevel, players, rules);
}

export default AI;