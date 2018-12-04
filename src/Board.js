import { Marker } from './Constants';

const { EMPTY_CELL } = Marker;

function _Board(grid) {

  if(!grid){
    grid = [
      EMPTY_CELL, EMPTY_CELL, EMPTY_CELL,
      EMPTY_CELL, EMPTY_CELL, EMPTY_CELL,
      EMPTY_CELL, EMPTY_CELL, EMPTY_CELL];
  }

  function cellIsEmpty(position){
    return grid[position] === EMPTY_CELL;
  }

  function getEmptyCells(){
    const emptyCells = grid.filter((cell) => {
      return cell === EMPTY_CELL
    });
    return emptyCells;
  }

  function getEmptyCellIndexes(){
    const indexes = [];

    for(let [i, cellValue] of grid.entries()) {
      if (cellValue === EMPTY_CELL){
        indexes.push(i);
      }
    }
    return indexes;
  }
  function getGrid() {
    return grid.slice();
  }

  function isFull(){
    const emptyCells = grid.filter(cell => { return cell === EMPTY_CELL});
    return emptyCells.length === 0;
  }
  //todo: add negative/edge case test to ensure it does not try to add a move for invalid positions
  function addMove(position, marker){
    grid.splice(position, 1, marker);
    return true
  }

  function clone() {
    return Board(getGrid());
  }

  return {
    addMove,
    getGrid,
    clone,
    isFull,
    getGrid,
    getEmptyCells,
    getEmptyCellIndexes,
    cellIsEmpty
  };
}

function Board(grid) {
  return _Board(grid);
}

export default Board;