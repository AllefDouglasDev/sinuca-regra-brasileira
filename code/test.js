const test = require("node:test");
const assert = require("node:assert");
const Game = require("./index");

const game = new Game();

test("Inicio de jogada deve ser possível jogar com qualquer bola, mas arriscando", (t) => {
  assert.deepEqual(game.getAvailableBallsPoints(), [1, 2, 3, 4, 5, 6, 7]);
});

test("Após jogar arriscando, só é possível jogar na bola da vez", (t) => {
  game.addBallToBreak(7);

  assert.deepEqual(game.getAvailableBallsPoints(), [1]);
});

test("Após jogar na bola da vez, pode jogar em qualquer bola livre de falta", (t) => {
  game.addBallToBreak(1);
  assert.deepEqual(game.getAvailableBallsPoints(), [2, 3, 4, 5, 6, 7]);
});

test("Após jogar uma bola livre, pode jogar arriscando novamente", (t) => {
  game.addBallToBreak(6);
  assert.deepEqual(game.getAvailableBallsPoints(), [2, 3, 4, 5, 6, 7]);
});

test("Deve ser possivel desfazer um lance de adicionar uma bola", (t) => {
  assert.deepEqual(game.getAvailableBallsPoints(), [2, 3, 4, 5, 6, 7]);
  game.addBallToBreak(7);
  assert.deepEqual(game.getAvailableBallsPoints(), [2]);

  game.undo();
  assert.deepEqual(game.getAvailableBallsPoints(), [2, 3, 4, 5, 6, 7]);

  game.addBallToBreak(7);
  assert.deepEqual(game.getAvailableBallsPoints(), [2]);
  game.addBallToBreak(2);
  assert.deepEqual(game.getAvailableBallsPoints(), [3, 4, 5, 6, 7]);

  game.undo();
  assert.deepEqual(game.getAvailableBallsPoints(), [2]);

  // assert.equal(game.player2.points, 0);
  // game.fall(game.player2.id);
  // assert.equal(game.player2.points, 7);
  // game.undo();
  // assert.equal(game.player2.points, 0);
});

test("Simulação do jogo", (t) => {
  const g = new Game();

  assert.deepEqual(g.getAvailableBallsPoints(), [1, 2, 3, 4, 5, 6, 7]);

  // Arriscando
  g.addBallToBreak(7);
  // Só pode ter a bola 1
  assert.deepEqual(g.getAvailableBallsPoints(), [1]);

  // Bola da vez
  g.addBallToBreak(1);
  // Bola da vez nao pode estar na mesa
  // Pode jogar em qualquer bola livre de falta
  assert.deepEqual(g.getAvailableBallsPoints(), [2, 3, 4, 5, 6, 7]);

  // Jogando livre de falta
  g.addBallToBreak(7);
  // Pode jogar em qualquer bola arriscando
  assert.deepEqual(g.getAvailableBallsPoints(), [2, 3, 4, 5, 6, 7]);

  // Arriscando
  g.addBallToBreak(7);
  // Só pode ter a bola 2
  assert.deepEqual(g.getAvailableBallsPoints(), [2]);

  // Bola da vez
  g.addBallToBreak(2);
  // Bola da vez nao pode estar na mesa
  // Pode jogar em qualquer bola livre de falta
  assert.deepEqual(g.getAvailableBallsPoints(), [3, 4, 5, 6, 7]);

  // Jogando livre de falta
  // Mas jogou na "bola da vez"
  g.addBallToBreak(3);
  // Por ter jogado na bola da vez
  // Logo após uma bola da vez já ter sido jogada, ela não sai da mesa
  assert.deepEqual(g.getAvailableBallsPoints(), [3, 4, 5, 6, 7]);

  // Bola da vez
  g.addBallToBreak(3);
  // Bola da vez nao pode estar na mesa
  // Pode jogar em qualquer bola livre de falta
  assert.deepEqual(g.getAvailableBallsPoints(), [4, 5, 6, 7]);

  // Jogando livre de falta
  g.addBallToBreak(7);
  // Pode jogar em qualquer bola arriscando
  assert.deepEqual(g.getAvailableBallsPoints(), [4, 5, 6, 7]);

  // Arriscando
  g.addBallToBreak(7);
  // Só pode ter a bola 2
  assert.deepEqual(g.getAvailableBallsPoints(), [4]);

  // Pontos do jogador
  assert.equal(g.player1.points, 44);

  // Passando a vez
  g.passTurn();

  // É possível jogar em qualquer bola na mesa
  assert.deepEqual(g.getAvailableBallsPoints(), [4, 5, 6, 7]);

  // Arriscando
  g.addBallToBreak(4);
  assert.deepEqual(g.getAvailableBallsPoints(), [5, 6, 7]);
  // Jogada livre
  g.addBallToBreak(7);
  // Todas as bolas devem estar disponiveis
  g.log = true;
  assert.deepEqual(g.getAvailableBallsPoints(), [5, 6, 7]);
  g.log = false;
  // Arriscando
  g.addBallToBreak(7);
  // Pode jogar em qualquer bola arriscando
  assert.deepEqual(g.getAvailableBallsPoints(), [5]);
});
