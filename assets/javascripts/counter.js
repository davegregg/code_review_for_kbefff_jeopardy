(function() {

  $(function() {

    let questions;


    function getQuestions(){
      $.get("http://jservice.io/api/random?count=5", function(data) {
        questions = data;
      }
    }

    getQuestions();


      $("#question1").click(function() {

        var question = questions[0].question;
        var answer = questions[0].answer;
        console.log(answer)
        let txt = prompt(questions[0].question)
        console.log(txt)

        let outcome = (txt == answer) ? 'Correct!' : 'Try again!';

        alert(outcome)


      })




      $("#question2").click(function() {

        var question = questions[1].question;
        var answer = questions[1].answer;
        console.log(answer)
        let txt = prompt(questions[1].question)
        console.log(txt)

        let outcome = (txt == answer) ? 'Correct!' : 'Try again!';

        alert(outcome)



      })

    //



  })



})()
