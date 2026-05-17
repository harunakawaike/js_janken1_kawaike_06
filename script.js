// ===== データの準備 =====

// グー・チョキ・パーの情報
const hands = {
  rock:     { label: 'Rock',     img: 'rock.png' },
  scissors: { label: 'Scissors', img: 'scissors.png' },
  paper:    { label: 'Paper',    img: 'paper.png' }
};

// CPUが選べる手の一覧
const choices = ['rock', 'scissors', 'paper'];

// キャラクターの画像
const characters = {
  player: {
    nomal: 'woman-nomal.png',
    win:   'woman-win.png',
    lose:  'woman-lose.png',
    draw:  'woman-draw.png'
  },
  cpu: {
    nomal: 'cpu-nomal.png',
    win:   'cpu-win.png',
    lose:  'cpu-lose.png',
    draw:  'cpu-draw.png'
  }
};

// 筋トレメニュー
const workout = {
  win: [
    { icon: '🤸', name: 'クランチ', rep: '1分' },
    { icon: '🦵', name: '自重スクワット', rep: '20回×5セット' },
    { icon: '🤸', name: 'ストレッチ', rep: '15分' }
  ],
  lose: [
    { icon: '💪', name: '懸垂',                 rep: '10回×3セット' },
    { icon: '🦵', name: 'フルボトムスクワット',   rep: '8回×3セット' },
    { icon: '🦵', name: 'ブルガリアンスクワット',  rep: '20回×2セット' },
    { icon: '🏋️', name: 'デッドリフト',          rep: '5回×2セット' },
    { icon: '🔥', name: 'プランク&サイドプランク', rep: '2分×3セット' }
  ],
  draw: [
    { icon: '🤸', name: 'レッグレイズ',           rep: '20回×3セット' },
    { icon: '🦵', name: 'サイドレイズ',           rep: '20回×3セット' },
    { icon: '🏃', name: 'ラットプルダウン',       rep: '12回×3セット' },
    { icon: '🏃', name: 'ジョギング',            rep: '20分' }
  ]
};

// スコアの初期値
let scores = { win: 0, draw: 0, lose: 0 };


// ===== ボタンを押したときの処理 =====
$(function() {

  // ↓イントロアニメーションを追加
  startIntro();

  $('#btn-rock').on('click', function() {
    play('rock');
  });

  $('#btn-scissors').on('click', function() {
    play('scissors');
  });

  $('#btn-paper').on('click', function() {
    play('paper');
  });

  $('#reset-btn').on('click', function() {
    resetGame();
  });

});


// ===== イントロアニメーション =====
function startIntro() {

  // Step1: 0.5秒後にキャラをスライドインさせる
  setTimeout(function() {
    $('#intro-player').addClass('slide-in-left');
    $('#intro-cpu').addClass('slide-in-right');
  }, 500);

  // Step2: 1.5秒後にテキストを表示する
  setTimeout(function() {
    $('#intro-text').addClass('show-text');
  }, 1500);

  // Step3: 3秒後にイントロ画面を消してじゃんけん画面を表示する
  setTimeout(function() {
    $('#intro-screen').fadeOut(800);
  }, 3000);

}


// ===== CPUの手をランダムに決める =====
function getCpuChoice() {
  const index = Math.floor(Math.random() * 3);
  return choices[index];
}


// ===== じゃんけんの勝敗を判定する =====
function judgeResult(player, cpu) {

  // あいこ
  if (player === cpu) return 'draw';

  // 勝ち
  if (
    (player === 'rock'     && cpu === 'scissors') ||
    (player === 'scissors' && cpu === 'paper')    ||
    (player === 'paper'    && cpu === 'rock')
  ) return 'win';

  // 負け
  return 'lose';
}


// ===== じゃんけんのメイン処理 =====
function play(playerChoice) {

  // CPUの手を決める
  const cpuChoice = getCpuChoice();

  // 勝敗を判定する
  const result = judgeResult(playerChoice, cpuChoice);

  // 手の画像を更新する
  $('#player-nomal-img').attr('src', hands[playerChoice].img);
  $('#cpu-nomal-img').attr('src', hands[cpuChoice].img);

  // 手の画像を更新する
  $('#player-nomal-img').attr('src', hands[playerChoice].img);
  $('#cpu-nomal-img').attr('src', hands[cpuChoice].img);

  // キャラの表情を更新する
  if (result === 'win') {
    $('#player-nomal-img').attr('src', characters.player.win);
    $('#cpu-nomal-img').attr('src', characters.cpu.lose);
  } else if (result === 'lose') {
    $('#player-nomal-img').attr('src', characters.player.lose);
    $('#cpu-nomal-img').attr('src', characters.cpu.win);
  } else {
    $('#player-nomal-img').attr('src', characters.player.draw);
    $('#cpu-nomal-img').attr('src', characters.cpu.draw);
  }

  // 結果テキストを表示する
  if (result === 'win') {
    $('#result-text').text('🎉 かちーっ！');
  } else if (result === 'lose') {
    $('#result-text').text('😨 まけた、、、');
  } else {
    $('#result-text').text('🙂 あいこ');
  }

  // スコアを更新する
  scores[result]++;
  $('#score-win').text(scores.win);
  $('#score-draw').text(scores.draw);
  $('#score-lose').text(scores.lose);

  // 筋トレメニューを表示する
  showWorkout(result);

  // リセットボタンを表示する
  $('#reset-btn').show();

}


// ===== 筋トレメニューの表示 =====
function showWorkout(result) {

  // 前回のメニューを消す
  $('#workout-box').empty();

  // 結果に合ったメニューを取り出す
  const menu = workout[result];

  // メニューのタイトルを作る
  let html = '<h3>💪 今日の筋トレメニュー</h3>';

  // メニューの各項目をhtmlで作る
  menu.forEach(function(item) {
    html += '<div class="workout-item">';
    html += '<span class="workout-icon">' + item.icon + '</span>';
    html += '<span class="workout-name">' + item.name + '</span>';
    html += '<span class="workout-rep">'  + item.rep  + '</span>';
    html += '</div>';
  });

  // workout-boxの中にhtmlを入れて表示する
  $('#workout-box').html(html).show();

}

// ===== リセット処理 =====
function resetGame() {

  // 手の画像を最初に戻す
  $('#player-nomal-img').attr('src', characters.player.nomal);
  $('#cpu-nomal-img').attr('src', characters.cpu.nomal);

  // 結果テキストを消す
  $('#result-text').text('');

  // 筋トレメニューを隠す
  $('#workout-box').hide();

  // リセットボタンを隠す
  $('#reset-btn').hide();

}
