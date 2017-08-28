// NOTE: Use Atom's Todo-Show package to navigate the notes in this file more easily. Go to `Packages` > `Todo-Show` > `Find in Active File`.

{ // NOTE: This is the new block scoping feature in ES6, which allows us to use a simple pair of curly braces instead of the funky-looking IIFE (`(function() {...do stuff...})()`). This achieves the main goals of the IIFE so long as we discipline ourselves to use `let` instead of `var`.
  $(function() {

    'use strict' // NOTE: `use strict` can help us make sure our code follows certain best practices.

    const scoreBoard = $('#scoreboard') // NOTE: CSS selectors are case sensitive. This was '.scoreBoard' which is why the score counter wasn't working.
    const questionNumbers = [1, 2, 3, 4] // NOTE: Using `const` instead of `let` because we don't plan on mutating this data.
    const categoryNumbers = [309, 31, 680, 139, 2538] // NOTE: Semicolons are almost always optional. The important thing is to apply a style consistently.

    categoryNumbers.forEach(currentCategoryNumber => { // NOTE: Arrow functions can often be used in place of normal functions for a more concise syntax. You should learn the differences in due time (as they are important). [https://wesbos.com/arrow-functions/]

      questionNumbers.forEach(currentQuestionNumber => {
        const currentQuestionURL = `http://jservice.io/api/clues?category=${currentCategoryNumber}&value=${currentQuestionNumber}00` // NOTE: String interpolation (inside a template string, notable by the backtick characters) gives us a cleaner way to perform string concatenation. [https://wesbos.com/javascript-template-strings/]
        const currentHigherScore = parseInt(scoreBoard.html()) + parseInt(`${currentQuestionNumber}00`)

        let questionsData
        $.get(currentQuestionURL, data => [questionsData] = data) // NOTE: Destructuring assignment can be used here to get the first item in the data array, without having to do `questionsData[0]` multiple times later. [https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Destructuring_assignment]
                                                                  // NOTE: This is a slightly different example of an arrow function. If your arrow function can fit on a single line, you can omit the curly braces in most circumstances. This also performs an implicit `return` statement, so you don't have to state it explictly.

        const currentQuestionElement = $(`#category${currentCategoryNumber} .question${currentQuestionNumber}`)

        currentQuestionElement.click(thisEvent => { // NOTE: This callback function has an optional argument which will refer to the click event itself -- we'll use this for disabling the click event, at the bottom of this function. [https://api.jquery.com/click/#click-handler]
          let outcome

          let {question, answer} = questionsData // NOTE: More destructuring assignment. Remember: `questionsData` is just an object. It contains, among other things, the `question` and `answer` properties. So on the left side of the assignment, we're "opening up" the object with the curly braces (we'd use square brackets if this were an array), and then we're saying we want to pull out the values of the `question` and `answer` properties and assign them to two variables of the same names. (There is a way to change the variable names so they don't have to be the same as the properties' names, but we have no need to do that right now.)
          answer = answer.replace(/<.+?>/g, '').trim() // NOTE: Replacing the HTML tags in certain answers with empty strings. Then trimming the whitespace out of answers, because we don't want to trust the Jeopardy API with this. Notice what happens when you remove the `?` lazy quantifier or the global (`g`) flag.
          const answerCaseInsensitive = new RegExp(answer, 'i') // NOTE: Creating a case-insensitive RegExp object out of the `answer` string.
          console.log(`answer: ${answer}`)

          const txt = prompt(question)
          console.log(`txt: ${txt}`)

          if (txt.match(answerCaseInsensitive)) { // NOTE: Using the `String.match()` method to test whether `txt` case-insensitively matches `answer`. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match]
            outcome = 'Correct'
            scoreBoard.html(currentHigherScore)
            currentQuestionElement.css({
              'background-color': 'black', // NOTE: We have to put quotes around property names with dashes, because JavaScript does not accept dashes in identifiers (variables, property names, function names, etc.).
                          color : 'red'
            })
          } else {
            outcome = 'LOSER'
            currentQuestionElement.css({
              'background-color': 'red',
                          color : 'black'
            })
          }

          currentQuestionElement.off(thisEvent) // NOTE: Here we're passing the click event itself as an object to jQuery's `off()` method. I discovered this was an option by reading the `off()` documention. This is more explicit than passing the string 'click', like we were before, because it is possible to assign multiple click events to a single element -- so we want to make sure we're disabling the right one. Don't want to disable some click-event-based feature which some other developer created! [https://api.jquery.com/off/#off-event]
          alert(`Outcome: ${outcome}`)
        })

      })

    })

  })
}
