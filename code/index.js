class Game {
  constructor(playerNumbers = 2) {
    this.log = false;
    this.state = "risking"; // risking - free - strict
    this.playerNumbers = playerNumbers;
    this.plays = [];
    this.player1 = {
      id: 1,
      name: "Jogador 1",
      points: 0,
      bgColor: "#0e6aae",
    };
    this.player2 = {
      id: 2,
      name: "Jogador 2",
      points: 0,
      bgColor: "#a40b15",
    };
    this.player3 = {
      id: 3,
      name: "Jogador 3",
      points: 0,
      bgColor: "#04635f",
    };
    this.currentPlayer = 1;
    this.break = [];
    this.balls = [
      {
        name: "vermelha",
        points: 1,
        current: true,
        inTable: true,
      },
      {
        name: "amarela",
        points: 2,
        current: false,
        inTable: true,
      },
      {
        name: "verde",
        points: 3,
        current: false,
        inTable: true,
      },
      {
        name: "marrom",
        points: 4,
        current: false,
        inTable: true,
      },
      {
        name: "azul",
        points: 5,
        current: false,
        inTable: true,
      },
      {
        name: "rosa",
        points: 6,
        current: false,
        inTable: true,
      },
      {
        name: "preta",
        points: 7,
        current: false,
        inTable: true,
      },
    ];
  }

  getPlayerById(id) {
    if (id === this.player2.id) {
      return this.player2;
    }
    if (id === this.player3.id) {
      return this.player3;
    }
    return this.player1;
  }

  getCurrentPlayer() {
    return this.getPlayerById(this.currentPlayer);
  }

  getNextPlayer() {
    if (this.playerNumbers === 2) {
      return this.currentPlayer === this.player1.id
        ? this.player2
        : this.player1;
    }
    if (this.currentPlayer === this.player1.id) {
      return this.player2;
    }
    if (this.currentPlayer === this.player2.id) {
      return this.player3;
    }
    return this.player1;
  }

  getAllBalls() {
    return this.balls;
  }

  getBallByPoints(ballPoints) {
    return this.balls.find((ball) => ball.points === ballPoints);
  }

  getBallsInTable() {
    return this.balls.filter((ball) => ball.inTable);
  }

  getCurrentBallInTable() {
    return this.getBallsInTable().find((ball) => ball.current);
  }

  getLowerBallInTable() {
    return this.getBallsInTable()[0];
  }

  getLastBallOfBreak() {
    return this.break[this.break.length - 1];
  }

  getPenultimBallOfBreak() {
    return this.break[this.break.length - 2];
  }

  removeBallFromTable(ballPoints) {
    this.balls.find((ball) => ball.points === ballPoints).inTable = false;
  }

  setCurrentBall(ballPoints) {
    const ball = this.getBallByPoints(ballPoints);
    if (!ball) return;
    ball.current = true;
  }

  isBallEqual(ball1, ball2) {
    return ball1.points === ball2.points;
  }

  getBreakPoints() {
    return this.break.reduce((acc, ball) => acc + ball.points, 0);
  }

  getPossibleBalls() {
    if (this.state === "risking" || this.state === "free")
      return this.getBallsInTable();
    return [this.getCurrentBallInTable()];
  }

  getAvailableBallsPoints() {
    return this.getPossibleBalls().map((ball) => ball.points);
  }

  addBallToBreak(ballPoints) {
    const ball = this.getBallByPoints(ballPoints);
    this.plays.push({
      type: "add-ball",
      ball: { ...ball },
      player: { ...this.getCurrentPlayer() },
      state: this.state,
    });
    if (this.state === "risking") {
      if (ball.current) {
        ball.inTable = false;
        ball.current = false;
        this.state = "free";
        this.setCurrentBall(ball.points + 1);
      } else {
        this.state = "strict";
      }
    } else if (this.state === "free") {
      this.state = "risking";
    } else if (this.state === "strict") {
      ball.inTable = false;
      ball.current = false;
      this.state = "free";
      this.setCurrentBall(ball.points + 1);
    }
    this.break.push({ ...ball });
    this.updatePlayerPoints(ball.points);
  }

  updatePlayerPoints(points) {
    const player = this.getCurrentPlayer();
    player.points += points;
  }

  passTurn(playerId) {
    this.currentPlayer = playerId;
    this.break = [];
    this.getLowerBallInTable().current = true;
    this.state = "risking";
  }

  fall(playerId) {
    const player = this.getPlayerById(playerId);
    player.points += 7;
    this.plays.push({ type: "fall", player });
  }

  getPointsDiff() {
    return this.comparePlayersDiff(
      this.getCurrentPlayer().id,
      this.getNextPlayer().id
    );
  }

  comparePlayersDiff(playerId1, playerId2) {
    const player = this.getPlayerById(playerId1);
    const opponentPlayer = this.getPlayerById(playerId2);
    const diff = player.points - opponentPlayer.points;
    return {
      diff: Math.abs(diff),
      playerWinning: diff > 0 ? player : opponentPlayer,
    };
  }

  checkWin() {
    const currentPlayer = this.getCurrentPlayer();
    const lowerBallInTable = this.getLowerBallInTable();
    if (lowerBallInTable) {
      const { diff, playerWinning } = this.getPointsDiff();
      if (playerWinning.id !== currentPlayer.id) return false;
      if (
        (lowerBallInTable.points === 5 && diff > 46) ||
        (lowerBallInTable.points === 6 && diff > 27) ||
        (lowerBallInTable.points === 7 && diff > 8)
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  changePlayerName(playerId, name) {
    const player = this.getPlayerById(playerId);
    player.name = name;
  }

  reset() {
    this.plays = [];
    this.state = "risking";
    this.player1.points = 0;
    this.player2.points = 0;
    this.player3.points = 0;
    this.currentPlayer = 1;
    this.break = [];
    this.balls.forEach((ball) => {
      ball.inTable = true;
      ball.current = ball.points === 1;
    });
  }

  putBallInTable(ballPoints) {
    this.balls.find((ball) => ball.points === ballPoints).inTable = true;
  }

  undo() {
    const play = this.plays.pop();
    if (!play) return;
    const player = this.getPlayerById(play.player.id);
    if (play.type === "add-ball") {
      this.state = play.state;
      this.putBallInTable(play.ball.points);
      this.break.pop();
      player.points -= play.ball.points;
      if (play.ball.current) {
        this.balls.forEach((b) => {
          if (b.points === play.ball.points) {
            b.current = true;
          } else {
            b.current = false;
          }
        });
      }
    }
    if (play.type === "fall") {
      player.points -= 7;
    }
  }
}

module.exports = Game;
