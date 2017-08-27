(function() {

  $(function() {

    let scoreBoard = $(".scoreBoard")
    let questionNumbers = [1, 2, 3, 4]
  

    let categoryNumbers = [309, 31, 680, 139, 2538]

    categoryNumbers.forEach(function(currentCategoryNumber) {
      let currentCategory = $('#category' + currentCategoryNumber)


      questionNumbers.forEach(function(currentQuestionNumber) {
        let currentHigherScore = parseInt(scoreBoard.html()) + parseInt(currentQuestionNumber + '00');
        let currentQuestionElement = $('.question' + currentQuestionNumber)
        let currentQuestionURL = "http://jservice.io/api/clues?category=" + currentCategoryNumber + "&value=" + currentQuestionNumber + "00"
        // console.log("currentHigherScore: " + currentHigherScore);
        // console.log("currentQuestionElement: " + currentQuestionElement);
        // console.log("currentQuestionURL: " + currentQuestionURL);
        let questionsData;

        function getQuestion() {
          $.get(currentQuestionURL, function(data) {
            questionsData = data;
          })
        }


        getQuestion();

        currentQuestionElement.click(function() {
          var question = questionsData[0].question;
          var answer = questionsData[0].answer;
          console.log(answer)
          let txt = prompt(questionsData[0].question)
          console.log(txt)

          // let outcome = (txt == answer) ? 'Correct' : 'Try again!';
          let outcome;
          if (txt == answer) {
            outcome = 'Correct'
            scoreBoard.html(currentHigherScore)
            currentQuestionElement.css({
              'background-color': 'black',
              color: 'red'
            })
          } else {
            outcome = 'LOSER'
            currentQuestionElement.css({
              'background-color': 'red',
              color: 'black'
            })
          }
          currentQuestionElement.off('click')
          alert(outcome)
        })

      })

    })


  })



})()
