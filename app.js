const game = (() => {
  const board = ["", "X", "O", "X", "O", "", "", "", ""];
  return { board };
})();

const game_flow = {};

const player_factory = () => {};

const player_1 = player_factory;
const player_2 = player_factory;

function render_board(board_array) {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < game.board.length; i++) {
    cells[i].textContent = game.board[i];
  }
}

render_board();
