const game_board = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const get_board = () => board;

  const place_mark = (index, player) => {
    if (board[index] !== "") {
      board[index] = player.get_mark();
    }
  };

  return { board, get_board, place_mark };
})();

const player_factory = (name, mark) => {
  const get_name = () => name;
  const get_mark = () => mark;
  const place_mark = (position) => {
    if (game_board.board[position] === "") {
      game_board.board[position] = mark;
    }
  };
  return { get_name, get_mark, place_mark };
};

const game_controller = (() => {
  const player_1 = player_factory("Ryan", "X");
  const player_2 = player_factory("Karol", "O");
  let active_player = player_1;

  function switch_player() {
    game_controller.active_player =
      game_controller.active_player === game_controller.player_1
        ? game_controller.player_2
        : game_controller.player_1;
  }

  return { player_1, player_2, active_player, switch_player };
})();

const screen_controller = (() => {
  const turn_message = document.querySelector(".turn-message");
  const board = document.querySelector(".board");
  const player = game_controller.active_player;
  turn_message.textContent = `${player.get_name()}'s turn`;
  board.addEventListener("click", handle_clicks);

  render_board();
  return { turn_message };
})();

function handle_clicks(e) {
  game_controller.active_player.place_mark(e.target.dataset.index);
  game_controller.switch_player();
  screen_controller.turn_message.textContent = `${game_controller.active_player.get_name()}'s turn`;
  render_board();
}

function render_board() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < game_board.board.length; i++) {
    cells[i].textContent = game_board.board[i];
  }
}
