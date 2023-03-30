const game = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const render = function () {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < game.board.length; i++) {
      cells[i].textContent = game.board[i];
    }
  };

  return { board, render };
})();

const game_flow = {};

const player_factory = () => {};

const player_1 = player_factory;
const player_2 = player_factory;

game.render();
