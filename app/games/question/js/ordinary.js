var mySwiper = new Swiper('.swiper-container', {
    mode: 'vertical',
    onlyExternal: true,
    onSlideChangeEnd: formnewlevel,
});
//ÓÎÏ·²¿·Ö
var isGaming = false;
var nowlevel = 1;
var nowleveltext;
var nowwrong = 0;
var nowquestion = 0;
var nowanswer = 1;
var doorleft, doorright;
var dones = [];

function showrule() {
    $("#startbutton").hide();
    $("#titlebg").hide();
    $("#title_con").show();
    $("#level").css("opacity", "1");
}

function entergame() {
    //³õÊ¼»¯Ò»ÏµÁÐÊý¾Ý
    nowlevel = 1;
    nowwrong = 0;
    nowanswer = 0;
    nowquestion = 0;
    isGaming = true;
    //ÏÔÒþ
    $('#title_con').hide();
    $("#question_con").hide();
    $('#result_con').hide();
    $("#level").css("opacity", "1");
    formnewlevel();
}

function showquestion() {
    if (dones.length == questions.length) dones = [];
    if (nowlevel < 30 && nowwrong <= 13) {
        nowquestion = Math.floor(Math.random() * questions.length) % questions.length;
        if (dones.indexOf(nowquestion) != -1) {
            showquestion();
            return;
        }
        dones.push(nowquestion);
        $(".questiontext").html(questions[nowquestion][0]);
        $(".answertext1").html("A." + questions[nowquestion][1]);
        $(".answertext2").html("B." + questions[nowquestion][2]);
        $(".answertext3").html("C." + questions[nowquestion][3]);
        $(".answertext4").html("D." + questions[nowquestion][4]);
        $("#question_con").show();
    } else {
        gameover();
    }
}

function confirmanswer(num) {
    nowanswer = num;
    $("#question_con").hide();
    $("#doorleft").animate({
        right: "50%"
    }, 700);
    $("#doorright").animate({
        left: "50%"
    }, 700);
    setTimeout(checkanswer, 750)
}

function checkanswer() {
    if (nowanswer != questions[nowquestion][5]) {
        nowwrong += 1;
        if (nowlevel - 2 >= 1) {
            mySwiper.swipeTo(mySwiper.activeIndex - 2);
            nowlevel -= 2;
        } else {
            if (nowlevel != 1) {
                mySwiper.swipeTo(0);
                nowlevel = 1;
            } else formnewlevel();
        }
    } else {
        if (nowlevel + 5 <= 30) {
            mySwiper.swipeTo(mySwiper.activeIndex + 5);
            nowlevel += 5;
        } else {
            mySwiper.swipeTo(7);
            nowlevel = 30;
        }
    }
}

function formnewlevel() {
    var slides = $(".swiper-slide");
    var startpos = nowlevel;
    if (nowlevel >= 3 && nowlevel <= 25) {
        startpos = nowlevel - 2;
    } else if (nowlevel < 3) startpos = 1;
    else startpos = 23;

    for (var i = 0; i < 8; i++) {
        $(slides[i]).find("td").html(startpos + i);
    }

    if (nowlevel >= 3 && nowlevel <= 25) {
        mySwiper.swipeTo(2, 0, false);
    } else if (nowlevel < 3) mySwiper.swipeTo(nowlevel - 1, 0, false);
    else mySwiper.swipeTo(nowlevel - 23, 0, false);
    $("#doorleft").css("right", "50%").animate({
        right: "80%"
    }, 700, showquestion);
    $("#doorright").css("left", "50%").animate({
        left: "80%"
    }, 700);
}

function gameover() {
    isGaming = false;
    if (nowwrong == 0) $("#rank td").html("成绩：A");
    else if (nowwrong <= 2) $("#rank td").html("成绩：A-");
    else if (nowwrong <= 4) $("#rank td").html("成绩：B+");
    else if (nowwrong <= 6) $("#rank td").html("成绩：B");
    else if (nowwrong <= 8) $("#rank td").html("成绩：B-");
    else if (nowwrong <= 9) $("#rank td").html("成绩：C+");
    else if (nowwrong <= 10) $("#rank td ").html("成绩：C");
    else if (nowwrong <= 11) $("#rank td").html("成绩：C-");
    else if (nowwrong <= 12) $("#rank td").html("成绩：D");
    else $("#rank td").html("成绩：F");
    $("#wrongnum td").html("共计答错" + nowwrong + "题");
    $("#level").css("opacity", "0");
    gameover_callback();
    $("#result_con").show();
}