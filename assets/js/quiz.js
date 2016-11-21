(function(){

    var app = angular.module('bcsScienceCity', []);
    angular.module('myApp', [
        'ngLoadScript'
    ]);

    app.controller('QuizController', ['$scope', '$http', '$sce', function($scope, $http, $sce){

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;
        $scope.gameRestarted = false;
        $scope.gameType = 'energy';
        $scope.trust = $sce.trustAsHtml;
        console.log($scope);

        $scope.startGame = function(selectedGameType){
            $scope.activeQuestion = 0;
            $scope.gameType = selectedGameType;
            $scope.gameRestarted = false;

            $http.get('assets/data/quiz_data_' + $scope.gameType+ '.json').then(function(quizData){
                $scope.myQuestions = quizData.data;
                $scope.totalQuestions = $scope.myQuestions.length;
            });
        };

        $scope.restartGame = function(){
            $scope.activeQuestion = -1;
            $scope.gameRestarted = true;
            $scope.score = 0;
        };

        $scope.selectAnswer = function(qIndex, aIndex){
            var questionState = $scope.myQuestions[qIndex].questionState;


            if ( questionState != 'answered' ) {
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

                if  ( aIndex === correctAnswer ){
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                } else{
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }
                $scope.myQuestions[qIndex].questionState = 'answered';
            }
            $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed();
        };

        $scope.isSelected = function(qIndex, aIndex){
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        };

        $scope.isCorrect = function(qIndex, aIndex){
            return $scope.myQuestions[qIndex].correctAnswer  === aIndex;
        };

        $scope.selectContinue = function(){
            return $scope.activeQuestion += 1;
        };

        $scope.isGameOver = function(){
            return $scope.activeQuestion === $scope.totalQuestions;
        };

    }]);



})();


