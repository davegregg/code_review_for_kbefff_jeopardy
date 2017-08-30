// NOTE: Use Atom's Todo-Show package to navigate the notes in this file more easily. Go to `Packages` > `Todo-Show` > `Find in Active File`.

{                                                                                                         // NOTE: This is the new block scoping feature in ES6, which allows us to use a simple pair of curly braces instead of the funky-looking IIFE (`(function() {...do stuff...})()`). This achieves the main goals of the IIFE so long as we discipline ourselves to use `let` instead of `var`.
  $(function() {

    'use strict'                                                                                          // NOTE: `use strict` can help us make sure our code follows certain best practices.

    const scoreBoard = $('#scoreboard')                                                                   // NOTE: CSS selectors are case sensitive. This was '.scoreBoard' which is why the score counter wasn't working.
    const questionNumbers = [1, 2, 3, 4]                                                                  // NOTE: Using `const` instead of `let` because we don't plan on mutating this data.
    const categoryNumbers = [309, 31, 680, 139, 2538]                                                     // NOTE: Semicolons are almost always optional. The important thing is to apply a style consistently.

    categoryNumbers.forEach(currentCategoryNumber => {                                                    // NOTE: Arrow functions can often be used in place of normal functions for a more concise syntax. You should learn the differences in due time (as they are important). [https://wesbos.com/arrow-functions/]

      questionNumbers.forEach(currentQuestionNumber => {
        const endpoint = 'http://jservice.io/api/clues'
        const categoryArg = `category=${currentCategoryNumber}`
        const valueArg = `value=${currentQuestionNumber}00`
        const currentQuestionURL = `${endpoint}?${categoryArg}&${valueArg}`                               // NOTE: String interpolation (inside a template string, notable by the backtick characters) gives us a cleaner way to perform string concatenation. [https://wesbos.com/javascript-template-strings/]

        let question, answer                                                                              // NOTE: You can define two variables on the same line, when it makes stylistic sense. In this example, both of these are defined using `let`.
        $.get(currentQuestionURL, data => [{question, answer}] = data)                                    // NOTE: Destructuring assignment can be used here to get the first item in the data array (which is an object containing the properties 'question' and 'answer'), without having to do `questionsData[0].whatever` multiple times later. The pair of square brackets says you want to "open" the `data` array, the pair of curly braces says you want the first object contained in the array, and 'question' and 'answer' say you expect to find properties by those names within the object and want to assign those values to variables in your code of the same name. [https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Destructuring_assignment]
                                                                                                          // NOTE: This is also a slightly different example of an arrow function. If your arrow function can fit on a single line, you can omit the curly braces in most circumstances. This also performs an implicit `return` statement, so you don't have to state it explictly.
        const currentQuestionElement = $(`#category${currentCategoryNumber} .question${currentQuestionNumber}`)
        const currentHigherScore = parseInt(scoreBoard.html()) + parseInt(`${currentQuestionNumber}00`)

        function correct() {
          scoreBoard.html(currentHigherScore)
          currentQuestionElement.css({
            'background-color': 'black',                                                                  // NOTE: We have to put quotes around property names with dashes, because JavaScript does not accept dashes in identifiers (variables, property names, function names, etc.).
            color: 'red'
          })
          return 'Correct'                                                                                // NOTE: We'll just return 'Correct', so that we can write our `outcome` assignment and ternary operator on one straightforward line.
        }

        function incorrect() {
          currentQuestionElement.css({
            'background-color': 'red',
            color: 'black'
          })
          return 'LOSER'
        }

        currentQuestionElement.click(thisEvent => {                                                       // NOTE: This callback function has an optional argument which will refer to the click event itself -- we'll use this for disabling the click event, at the bottom of this function. [https://api.jquery.com/click/#click-handler]
          answer = answer.replace(/<.+?>/g, '').trim()                                                    // NOTE: Replacing the HTML tags in certain answers with empty strings. Then trimming the whitespace out of answers, because we don't want to trust the Jeopardy API with this. Notice what happens when you remove the `?` lazy quantifier or the global (`g`) flag.
          const answerCaseInsensitive = new RegExp(answer, 'i')                                           // NOTE: Creating a case-insensitive RegExp object out of the `answer` string.
          console.log(`answer: ${answer}`)
          const txt = prompt(question) || ''                                                              // NOTE: If the user hits Cancel, then the value returned from `prompt()` is `null`. So I'm using the OR operator to provide a fallback empty string value, so that I can stop the errors in the console. It's saying, "if prompt() returns something falsy, then don't assign it to my txt variable, assign this empty string instead."
                                                                                                          // NOTE: Our click event is already getting pretty long. Best practice would tell us to break out some the logic into separate functions -- the contents of this IF...ELSE block look good for this, so I've done that.
          let outcome = txt.match(answerCaseInsensitive) ? correct() : incorrect()                        // NOTE: We're using the `String.match()` method to test whether `txt` case-insensitively matches `answer`. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match]
                                                                                                          // NOTE: The ternary operator will return a value for you, so you can use it in an assignment like this.
          currentQuestionElement.off(thisEvent)                                                           // NOTE: Here we're passing the click event itself as an object to jQuery's `off()` method. I discovered this was an option by reading the `off()` documention. This is more explicit than passing the string 'click', like we were before, because it is possible to assign multiple click events to a single element -- so we want to make sure we're disabling the right one. Don't want to disable some click-event-based feature which some other developer created! [https://api.jquery.com/off/#off-event]
          alert(`Outcome: ${outcome}`)
        })

      })

    })

  })
}
