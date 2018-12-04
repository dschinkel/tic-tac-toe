import { LevelOfDifficulty, Marker } from './Constants';

const { EMPTY_CELL } = Marker;

function _GameLevel(){
  return {
   getBestMoveForMedium(board) {
     let emptyCellIndexes = [];
     const randomEmptyCell = board.getEmptyCellIndexes()[Math.floor(Math.random() * emptyCellIndexes.length)],
       nextBestMove = {emptySpaceIndex: randomEmptyCell};
     return nextBestMove;
   },
   getNextBestMoveForEasy(board) {
     const firstEmptyCellIndex = board.getEmptyCells().findIndex((cell => cell === EMPTY_CELL)),
       nextBestMove = {emptySpaceIndex: firstEmptyCellIndex};
     return nextBestMove;
   },
   getDifficultyLevel(level) {
      if (level === "e") {
        return LevelOfDifficulty.EASY;
      }
      if (level === "m") {
        return LevelOfDifficulty.MEDIUM;
      }
      if (level === "h") {
        return LevelOfDifficulty.HARD;
      }
    }

 }
}

function GameLevel() {
  return _GameLevel();
}

export default GameLevel