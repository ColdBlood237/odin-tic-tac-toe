const game_board = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const get_board = () => board;

  const place_mark = (index, player) => {
    if (board[index] !== "") {
      board[index] = player.get_mark();
    }
  };

  const check_if_full = () => {
    let is_full = true;
    board.forEach((cell) => {
      if (cell === "") {
        is_full = false;
      }
    });
    return is_full;
  };

  return { board, get_board, place_mark, check_if_full };
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

  function print_turn_message() {
    const player = game_controller.active_player;
    turn_message.textContent = `${player.get_name()}'s turn`;
  }

  function print_outcome() {
    const player = game_controller.active_player;
    board.removeEventListener("click", handle_clicks);
    if (check_winner()) {
      turn_message.textContent = `${player.get_name()} won 🎉`;
    } else {
      turn_message.textContent = `Tie 😬`;
    }
  }

  board.addEventListener("click", handle_clicks);

  render_board();
  print_turn_message();
  return { print_turn_message, print_outcome };
})();

function handle_clicks(e) {
  game_controller.active_player.place_mark(e.target.dataset.index);
  if (check_winner()) {
    screen_controller.print_outcome();
  } else {
    game_controller.switch_player();
    screen_controller.print_turn_message();
  }
  if (game_board.check_if_full() && !check_winner()) {
    screen_controller.print_outcome();
  }
  render_board();
}

function check_winner() {
  const board = game_board.board;
  let win = false;
  let winner_mark = "";
  for (let i = 0; i < 3; i++) {
    // check columns
    if (
      board[i] === board[i + 3] &&
      board[i] === board[i + 6] &&
      board[i] !== ""
    ) {
      win = true;
    }
  }
  for (let i = 0; i < 7; i += 3) {
    // check rows
    if (
      board[i] === board[i + 1] &&
      board[i] === board[i + 2] &&
      board[i] !== ""
    ) {
      win = true;
    }
  }
  if (board[0] === board[4] && board[0] === board[8] && board[0] !== "") {
    // check lef diagonal
    win = true;
  }
  if (board[2] === board[4] && board[2] === board[6] && board[2] !== "") {
    // check right diagonal
    win = true;
  }

  return win;
}

function render_board() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < game_board.board.length; i++) {
    cells[i].textContent = game_board.board[i];
  }
}
