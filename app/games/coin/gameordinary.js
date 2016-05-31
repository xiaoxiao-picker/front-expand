//游戏部分

var LoadMenu;
var titleMenu;
var ResultMenu;
var gameMenu;
var totalcoin = 0;
var isGaming = false;
var totaltime = 30;
var totalscan = 0;
var nowproduct = 0;
var nowscore = 0;
var barpos = [[0.869, 1], [0.6686, 2], [0.5343, 3], [0.377, 4], [0.6962, 5], [0.32258, 6], [0.86087, 7], [0.56818, 8], [0.7, 9], [0.787234, 10]]

//随机商品
function resetproduct() {
    for (var i = 0; i < barpos.length - 1; i++) {
        var temp = barpos[i];
        var nowpos = Math.floor(Math.random() * (barpos.length - i - 1)) % barpos.length + i + 1;
        console.log(nowpos);
        barpos[i] = barpos[nowpos];
        barpos[nowpos] = temp;
    }
}
resetproduct();
var isScaned = false;

var game = new Phaser.Game(640, 1020, Phaser.CANVAS, 'gamecon', { preload: preload, create: create, update: update }, false);

function preload() {
    game.scale.height = window.innerHeight;
    game.scale.width = window.innerWidth;
    game.scale.refresh();

    window.onresize = function () {
        game.scale.height = window.innerHeight;
        game.scale.width = window.innerWidth;
        game.scale.refresh();
    }

    game.load.image("background", "collectcoin/bg.jpg?v=1");
    game.load.image("gamebg", "collectcoin/gamebg.jpg?v=1");
    game.load.image("bag", "collectcoin/bag.png?v=1");
    game.load.image("dropper", "collectcoin/dropper.png?v=1");
    game.load.image("start", "collectcoin/start.png?v=1");
    game.load.image("close", "collectcoin/close.png?v=1");
    game.load.image("result", "collectcoin/result.jpg?v=1");
    game.load.image("restart", "collectcoin/restart.png?v=1");
    for (var i = 1; i < 11; i++) {
        game.load.image("gold" + i, "collectcoin/gold" + i + ".png?v=1");
    }

    LoadMenu = game.add.group();
    game.add.text(game.world.centerX, game.world.centerY, "0%", { fill: "#ffffff" }, LoadMenu).anchor.setTo(0.5, 0.5);
    game.load.onFileComplete.add(updateProgressBar, this);
}

function updateProgressBar() {
    LoadMenu.getChildAt(0).text = game.load.progress + "%";
}

function create() {
    game.load.onFileComplete.removeAll();
    LoadMenu.visible = false;

    //背景元素
    background = game.add.sprite(game.world.centerX, game.world.centerY, "background");
    background.height = game.world.height;
    background.width = game.world.width;
    background.anchor.setTo(0.5, 0.5);
    background.inputEnabled = true;
    background.events.onInputDown.add(checkscore);

    //游戏界面
    gameMenu = game.add.group();
    gameMenu.create(game.world.centerX, 0, "dropper").anchor.setTo(0.5, 0);
    gameMenu.create(0, 0);
    gameMenu.create(game.world.centerX, 990, "bag").anchor.setTo(0.5, 1);
    game.add.text(game.world.centerX, game.world.centerY - 120, "", { fill: "#ff0000", font: "50pt Arial" }, gameMenu).anchor.setTo(0.5, 0.5);
    gameMenu.visible = false;

    //首页
    titleMenu = game.add.group();
    titleMenu.create(game.world.centerX, 900, "start").anchor.setTo(0.5, 0.5);
    titleMenu.getChildAt(0).inputEnabled = true;
    titleMenu.getChildAt(0).events.onInputDown.add(showrule);
    game.add.group(titleMenu);
    game.add.graphics(0, 150, titleMenu.getChildAt(1)).beginFill("#000000", 0.5).drawRect(0, 0, game.world.width, game.world.height - 400).endFill();
    game.add.text(game.world.centerX, 380,"" , { fill: "#ffffff", font: "20pt Arial" }, titleMenu.getChildAt(1)).anchor.setTo(0.5, 0.5);
    game.add.text(game.world.centerX, 370, "轻触扫描器以扫描校名\n商品上的条形码，扫描\n的平均重合率越高，\n得分越高哦！", { fill: "#ffffff", font: "40pt Arial" }, titleMenu.getChildAt(1)).anchor.setTo(0.5, 0.5);
    titleMenu.getChildAt(1).create(500, 160, "close");
    titleMenu.getChildAt(1).getChildAt(3).inputEnabled = true;
    titleMenu.getChildAt(1).getChildAt(3).events.onInputDown.add(entergame);
    titleMenu.getChildAt(1).visible = false;

    //结束画面
    ResultMenu = game.add.group();
    ResultMenu.create(game.world.centerX, 50, "result").anchor.setTo(0.5, 0);
    game.add.text(150, 400, "成　绩：", { fill: "#ffffff", font: "40pt Arial" }, ResultMenu).anchor.setTo(0, 0.5);
    game.add.text(150, 540, "准确率：", { fill: "#ffffff", font: "40pt Arial" }, ResultMenu).anchor.setTo(0, 0.5);
    ResultMenu.create(game.world.centerX, 670, "restart").anchor.setTo(0.5, 0.5);
    ResultMenu.getChildAt(3).inputEnabled = true;
    ResultMenu.getChildAt(3).events.onInputDown.add(entergame);
    ResultMenu.visible = false;
}

function showrule() {
    background.loadTexture("gamebg");
    titleMenu.getChildAt(0).visible = false;
    titleMenu.getChildAt(1).visible = true;
}

function entergame() {
    isGaming = true;
    //显隐
    titleMenu.visible = false;
    ResultMenu.visible = false;
    gameMenu.visible = true;
    gameMenu.getChildAt(0).position.setTo(game.world.centerX, 0);
    gameMenu.getChildAt(2).position.setTo(game.world.centerX, game.world.centerY + 370);

    //初始化计数器
    totalcoin = 0;
    totaltime = 30;
    nowproduct = 0;
    totalscan = 0;
    //生成炸弹和金币
    resetproduct();
    formobj();
}

function formobj() {
    if (isGaming) {
        nowproduct += 1;
        var tempkey = "gold" + barpos[nowproduct - 1][1];
        if (nowproduct <= 6) {
            gameMenu.getChildAt(1).loadTexture(tempkey);
            gameMenu.getChildAt(1).position.setTo(game.world.centerX, 200);
            gameMenu.getChildAt(1).anchor.setTo(0.5, barpos[nowproduct - 1][0]);
            gameMenu.getChildAt(1).visible = true;
            isScaned = false;
            game.add.tween(gameMenu.getChildAt(1)).to({ y: 900 }, 1700 - nowproduct * 150).start().onComplete.addOnce(function () {
                checkscore();
                gameMenu.getChildAt(1).visible = false;
                gameMenu.getChildAt(3).text = "";
                isScaned = true;
                formobj();
            }, this);
        }
        else gameover();
    }
}

function checkscore() {
    if (!isScaned && gameMenu.getChildAt(1).y >= 600 && isGaming) {
        isScaned = true;
        var tempscore = Math.floor((100 - Math.abs(gameMenu.getChildAt(1).y - 750)) / 100 * 100);
        if (tempscore <= 0) gameover();
        else {
            totalscan += tempscore;
            gameMenu.getChildAt(3).text = tempscore + "%";
        }
    }
}

function update() {
    if (isGaming) {
        if (gameMenu.getChildAt(2).x > game.world.centerX + 250) gameMenu.getChildAt(2).x = game.world.centerX + 250;
        if (gameMenu.getChildAt(2).x < game.world.centerX - 250) gameMenu.getChildAt(2).x = game.world.centerX - 250;
        gameMenu.getChildAt(2).y = 990;
    }
}

function gameover() {
    isGaming = false;
    gameMenu.visible = false;
    if (nowproduct > 1) {
        nowscore = Math.floor(totalscan / (nowproduct - 1) * 100) / 100;
        if (nowproduct == 7) {
            if (nowscore >= 95) ResultMenu.getChildAt(1).text = "成　绩：A";
            else if (nowscore >= 90) ResultMenu.getChildAt(1).text = "成　绩：A-";
            else if (nowscore >= 85) ResultMenu.getChildAt(1).text = "成　绩：B+";
            else if (nowscore >= 80) ResultMenu.getChildAt(1).text = "成　绩：B";
            else if (nowscore >= 75) ResultMenu.getChildAt(1).text = "成　绩：B-";
            else if (nowscore >= 70) ResultMenu.getChildAt(1).text = "成　绩：C+";
            else if (nowscore >= 65) ResultMenu.getChildAt(1).text = "成　绩：C";
            else if (nowscore >= 60) ResultMenu.getChildAt(1).text = "成　绩：C-";
            else if (nowscore >= 55) ResultMenu.getChildAt(1).text = "成　绩：D";
            else ResultMenu.getChildAt(1).text = "成　绩：F";
        }
        else ResultMenu.getChildAt(1).text = "成　绩：F";
        ResultMenu.getChildAt(2).text = "准确率：" + nowscore + "%";
    }
    else {
        ResultMenu.getChildAt(1).text = "成　绩：F";
        ResultMenu.getChildAt(2).text = "准确率：0%";
    }
    gameover_callback();
    ResultMenu.visible = true;
}