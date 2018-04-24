

//Luis Suarez
var music = new Audio('assets/music/music.mp3');
var youWin = new Audio('assets/sfx/youwin.mp3');
var youLose = new Audio('assets/sfx/youlose.mp3');
var fightClick = new Audio('assets/sfx/fight.mp3');
var select = new Audio('assets/sfx/select.wav');
var characters = ["win", "mac", "ubu", "and"];
var playerPicked = false;
var enemyPicked = false;
var currentPlayer;
var currentEnemy;
var enemiesDefeated = 0;
// Building initial ogject caracters

var win = new character("Windows", 140, 6);
var mac = new character("McOS", 100, 10);
var ubu = new character("Ubuntu", 160, 4);
var and = new character("Android", 120, 8);

music.play()
play();

// Defining function to run game
function play() {
  if (enemiesDefeated >= 3) {
    displayInstructions(
      "Congratulations " + currentPlayer.name + ", you are the greatest OS"
    );
  }

  if (!playerPicked) {
    pickPlayer();
  }
  if (playerPicked && !enemyPicked) {
    pickEnemy();
  }
  if (playerPicked && enemyPicked) {
    fight();
  }
}

//defining fight function
function fight() {
  $(".btn").css({ visibility: "visible", opacity: "1" });
  displayInstructions("Click [ Fight! ] to attack...");
  $(".btn").on("click", function() {
    fightClick.play();
    
    $(".playerArea").animate({ margin: "0 -150px" }, 500);
    $(".enemyArea").animate({ margin: "0 -150px" }, 500);
    $(".playerArea").animate({ margin: "0 0" }, 500);
    $(".enemyArea").animate({ margin: "0 0" }, 500);
    currentPlayer.health -= currentEnemy.attack;
    currentEnemy.health -= currentPlayer.attack;
    currentPlayer.attack += currentPlayer.initialAttack;
    $(".playerDamage").animate(
      { width: currentPlayer.damagePercentage() + "%" },
      800,
      function() {}
    );
    $(".enemyDamage").animate(
      { width: currentEnemy.damagePercentage() + "%" },
      800,
      function() {}
    );
    if (currentPlayer.health <= 0) {
      youLose.play();
      $(".btn").off("click"),
        $(".btn").css({ visibility: "visible", opacity: "0" });
      displayInstructions(
        "You lost to " + currentEnemy.name + " you fight like a Mac"
      );
    }
    if (currentEnemy.health <= 0) {
      youWin.play();
      $(".btn").off("click");
      $(".btn").css({ visibility: "visible", opacity: "0" });
      displayInstructions(
        "You defeated " + currentEnemy.name + " pick a new oponent."
      );
      $(".enemyImage").css({ visibility: "visible", opacity: "0" });
      enemyPicked = false;
      enemiesDefeated += 1;
      if (enemiesDefeated >= 3) {
        displayInstructions(
          "Congratulations " + currentPlayer.name + ", you are the greatest OS"
        );
        enemyPicked = true;
        return;
      }
      play();
    }
  });
}

// Defining object caracter
function character(name, health, attack) {
  this.name = name;
  this.health = health;
  this.attack = attack;
  this.initialHealth = health;
  this.initialAttack = attack;
  this.healthPercentage = function() {
    return 100 * (this.health / this.initialHealth);
  };
  this.damagePercentage = function() {
    if (this.health >= 0) {
      return 100 - this.healthPercentage();
    } else {
      return 100;
    }
  };
}

// Funcion that changes the instruction message
function displayInstructions(instruction) {
  $(".instructions").html(instruction);
}
// Function to pick player's character
function pickPlayer() {
  displayInstructions("Pick your OS...");
  $(".player").on("click", function() {
    select.play();
    if ($(this).attr("value") === "win") {
      $(".playerCharacter").attr("src", "assets/images/win.gif");
      $(".playerImage").css({ visibility: "visible", opacity: "1" });
      $(".win").animate({ opacity: "0" }, 800, function() {
        $(".win").css("display", "none");
      });
      $(".mac").css("display", "unset");
      $(".ubu").css("display", "unset");
      $(".and").css("display", "unset");
      $(".player").off("click");
      currentPlayer = win;
      playerPicked = true;
      play();
    }
    if ($(this).attr("value") === "mac") {
      $(".playerCharacter").attr("src", "assets/images/mac.gif");
      $(".playerImage").css({ visibility: "visible", opacity: "1" });
      $(".win").css("display", "unset");
      $(".mac").animate({ opacity: "0" }, 800, function() {
        $(".mac").css("display", "none");
      });
      $(".ubu").css("display", "unset");
      $(".and").css("display", "unset");
      $(".player").off("click");
      currentPlayer = mac;
      playerPicked = true;
      play();
    }
    if ($(this).attr("value") === "ubu") {
      $(".playerCharacter").attr("src", "assets/images/ubu.gif");
      $(".playerImage").css({ visibility: "visible", opacity: "1" });
      $(".win").css("display", "unset");
      $(".mac").css("display", "unset");
      $(".ubu").animate({ opacity: "0" }, 800, function() {
        $(".ubu").css("display", "none");
      });
      $(".and").css("display", "unset");
      $(".player").off("click");
      currentPlayer = ubu;
      playerPicked = true;
      play();
    }
    if ($(this).attr("value") === "and") {
      $(".playerCharacter").attr("src", "assets/images/and.gif");
      $(".playerImage").css({ visibility: "visible", opacity: "1" });
      $(".win").css("display", "unset");
      $(".mac").css("display", "unset");
      $(".ubu").css("display", "unset");
      $(".and").animate({ opacity: "0" }, 800, function() {
        $(".and").css("display", "none");
      });
      $(".player").off("click");
      currentPlayer = and;
      playerPicked = true;
      play();
    }
  });
}
//function to pick next enemy's character
function pickEnemy() {
  displayInstructions("Pick your enemy OS...");
  if (enemiesDefeated > 0) {
    displayInstructions(
      "You defeated " + currentEnemy.name + ", pick your next enemy OS..."
    );
  }

  $(".enemy").on("click", function() {
    select.play();
    $(".enemyDamage").animate({ width: "0%" }, 800, function() {});

    if ($(this).attr("value") === "win") {
      $(".win").animate({ opacity: "0" }, 800, function() {
        $(".win").css("display", "none");
      });

      $(".enemyCharacter").attr("src", "assets/images/win.gif");
      $(".enemyImage").css({ visibility: "visible", opacity: "1" });
      $(".enemy").off("click");
      currentEnemy = win;
      enemyPicked = true;
      play();
    }
    if ($(this).attr("value") === "mac") {
      $(".enemyCharacter").attr("src", "assets/images/mac.gif");
      $(".enemyImage").css({ visibility: "visible", opacity: "1" });
      $(".mac").animate({ opacity: "0" }, 800, function() {
        $(".mac").css("display", "none");
      });
      $(".enemy").off("click");
      currentEnemy = mac;
      enemyPicked = true;
      play();
    }
    if ($(this).attr("value") === "ubu") {
      $(".enemyCharacter").attr("src", "assets/images/ubu.gif");
      $(".enemyImage").css({ visibility: "visible", opacity: "1" });
      $(".ubu").animate({ opacity: "0" }, 800, function() {
        $(".ubu").css("display", "none");
      });
      $(".enemy").off("click");
      currentEnemy = ubu;
      enemyPicked = true;
      play();
    }
    if ($(this).attr("value") === "and") {
      $(".enemyCharacter").attr("src", "assets/images/and.gif");
      $(".enemyImage").css({ visibility: "visible", opacity: "1" });
      $(".and").animate({ opacity: "0" }, 800, function() {
        $(".and").css("display", "none");
      });
      $(".enemy").off("click");
      currentEnemy = and;
      enemyPicked = true;
      play();
    }
  });
}
