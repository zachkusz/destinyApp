app.controller('DocController', ['$scope', '$http', '$window', '$interval',
function($scope, $http, $window, $interval) {

  //sets default statuses functionally and user readable
  var winText = 'Loss';
  var vsFireteamText = 'No Fireteam';
  $scope.vsFireteam = false;
  $scope.win = false;
  $scope.weaponName = 'Shotgun'; // test!! for highlighting

///minutes and seconds stopwatch!!!
  var timer; //declared globally so pauseTimer can access
  var startable = true;
  $scope.minutes = 0;
  $scope.seconds = 0;
  $scope.timeInSeconds = 0; //extra - used for easy time entry later
  checkStartResume();

  function checkStartResume() {
    if (startable == true) {
      $scope.startText = "Start";
    } else {
      $scope.startText = "Pause";
    }
  }

  $scope.startTimer = function() {
    if (startable == true) {
      timer = $interval(addTime, 1000);
      startable = false;
      checkStartResume();
    } else {
      $scope.pauseTimer();
    }
  }

  function addTime() {
    if ($scope.minutes == 59 && $scope.seconds == 59) {
      $scope.resetTimer();
    } else { //extra
      $scope.timeInSeconds++;
    }

    if ($scope.seconds < 59) {
      $scope.seconds++;
    } else if ($scope.seconds == 59) {
      $scope.minutes++;
      $scope.seconds = 0;
    }
  }

  $scope.pauseTimer = function () {
    $interval.cancel(timer);
    startable = true;
    checkStartResume();
  }

  $scope.resetTimer = function() {
    $scope.seconds = 0;
    $scope.minutes = 0;
    $scope.timeInSeconds = 0; //extra
    startable = true;
    $interval.cancel(timer);
    checkStartResume();
  }

  $scope.useCurrentTimer = function() { //extra - easy time entry
    $scope.timeAlive = $scope.timeInSeconds;
  }
///stopwatch

////tracking array of 'death' objects
  $scope.deaths = [];
  var i = 0; //used to increment through deaths array

  //Death object prototype to add in array
  function Death(weaponType, weaponName, timeAlive) {
    this.weaponType = weaponType;
    this.weaponName = weaponName;
    this.timeAlive = timeAlive;
  }

  $scope.addDeath = function() {
    $scope.deaths[i] = new Death($scope.weaponType, $scope.weaponName,
      $scope.timeAlive);
    //clears input field
    $scope.weaponType = '';
    $scope.weaponName = '';
    $scope.timeAlive = '';

    i++; //increments so we add to array not overwrite, need a function for when user mistypes and deletes 1
    console.log('clicked', i);
  }
  ////

  //object to send to DB
  $scope.submitMatch = function() {
    var newMatch = {
      mapName: $scope.mapName,
      gameType: $scope.gameType,
      vsFireteam: $scope.vsFireteam,
      win: $scope.win,
      kd: $scope.kd,
      kad: $scope.kad
    };

    if ($scope.win == true) {
      winText = 'Win';
    }
    if ($scope.vsFireteam == true) {
      vsFireteamText = 'Vs Fireteam';
    }

    console.log(newMatch);

    $scope.confirmSetup(newMatch);
  }

  $scope.confirmSetup = function(newMatch) {
    var confirmChoice = $window.confirm('Begin Crucible Analysis with the following setup?\n' +
    'Map: ' + $scope.mapName + ',\n' +
    'Game Type: ' + $scope.gameType + ',\n' +
    'Vs Fire Team: ' + vsFireteamText + ',\n' +
    'Win/Loss: ' + winText + ',\n' +
    'K/D: ' + $scope.kd + ',\n' +
    'K+A/D: ' + $scope.kad
    );

    if (confirmChoice == true){
      console.log('chose yes add to DB');
      postMatch(newMatch);
    } else {
      console.log('chose no, no DB');
    }
  }

  function postMatch(newMatch) {
    $http.post('/matches', newMatch).then(
      function(response) {
        console.log('posting match to db', response);
      }
    );
  }

}]);
