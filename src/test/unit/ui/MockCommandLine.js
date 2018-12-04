import { Console } from '../../../UI/AppContext';

const mockReadline = (prompt, response) => {
  Console.rl = {
    question: (prompt, callback) => {
      callback(response)
    },
    close: () => {}
  }
};

export { mockReadline }