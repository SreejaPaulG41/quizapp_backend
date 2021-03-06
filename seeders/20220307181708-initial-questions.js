'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Questions', [
      {
        questionId: 1,
        genreId: 'GK01',
        questionText: 'Who is Prime Minister of India?',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions: JSON.stringify([
          { answerText: 'Vijay Rupani', isCorrect: false },
          { answerText: 'Manmohan singh', isCorrect: false },
          { answerText: 'Narendra Modi', isCorrect: true },
          { answerText: 'Deep Patel', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 2,
        genreId: 'GK01',
        questionText: 'Who is CEO of Tata?',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Jeff Bezos', isCorrect: false },
          { answerText: 'Ratan Tata', isCorrect: true },
          { answerText: 'Mukesh Ambani', isCorrect: false },
          { answerText: 'Gautam Adani', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 3,
        genreId: 'GK01',
        questionText: 'who is richest person in the world?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'Jeff Bezos', isCorrect: false },
          { answerText: 'Elon Musk', isCorrect: true },
          { answerText: 'Mukesh Ambani', isCorrect: false },
          { answerText: 'Warren Buffett', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 4,
        genreId: 'GK01',
        questionText: 'How many countries in the world?',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: '120', isCorrect: false },
          { answerText: '183', isCorrect: false },
          { answerText: '170', isCorrect: false },
          { answerText: '195', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 5,
        genreId: 'GK01',
        questionText: 'Who was the first woman Prime Minister of India?',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Pratibha Devi Singh Patil', isCorrect: false },
          { answerText: 'Indira Gandhi', isCorrect: true },
          { answerText: 'Sonia Gandhi', isCorrect: false },
          { answerText: 'Jayalalithaa Jayaraman', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 6,
        genreId: 'GK01',
        questionText: 'Who is President of India?',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: 'Shri Pranab Mukherjee', isCorrect: false },
          { answerText: 'Dr. A.P.J. Abdul Kalam', isCorrect: false },
          { answerText: 'Ram Nath Kovind', isCorrect: false },
          { answerText: 'Dr.Rajendra Prasad', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 7,
        genreId: 'GK01',
        questionText: 'How many states are there in India?',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: '29', isCorrect: false },
          { answerText: '30', isCorrect: false },
          { answerText: '28', isCorrect: false },
          { answerText: '25', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 8,
        genreId: 'GK01',
        questionText: 'Who was the first man to set foot on the Moon?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'Colombus', isCorrect: false },
          { answerText: 'Edwin Aldrin', isCorrect: false },
          { answerText: 'Neil Armstrong', isCorrect: true },
          { answerText: 'Michael Collins', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 9,
        genreId: 'GK01',
        questionText: 'Film and TV institute of India is located at which place?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'Perambur (Tamilnadu)', isCorrect: false },
          { answerText: 'Pune (Maharashtra)', isCorrect: false },
          { answerText: 'Pimpri (Maharashtra)', isCorrect: false },
          { answerText: 'Rajkot (Gujrat)', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 10,
        genreId: 'GK01',
        questionText: 'Ajanta-Ellora caves are situated near which place?',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: 'Ajmer', isCorrect: false },
          { answerText: 'Jaipur', isCorrect: false },
          { answerText: 'Patna', isCorrect: false },
          { answerText: 'Aurangabad', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 11,
        genreId: 'JS02',
        questionText: 'Javascript is an _______ language?',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Object-Based', isCorrect: false },
          { answerText: 'Procedural', isCorrect: false },
          { answerText: 'Object-Oriented', isCorrect: true },
          { answerText: 'None Of The Above', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 12,
        genreId: 'JS02',
        questionText: 'Which of the following methods is used to access HTML elements using Javascript?',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'getElementById()', isCorrect: false },
          { answerText: 'getElementByClassName()', isCorrect: false },
          { answerText: 'Both A and B', isCorrect: true },
          { answerText: 'None Of The Above', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 13,
        genreId: 'JS02',
        questionText: 'What keyword is used to check whether a given property is valid or not?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'in', isCorrect: true },
          { answerText: 'is in', isCorrect: false },
          { answerText: 'lies', isCorrect: false },
          { answerText: 'exists', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 14,
        genreId: 'JS02',
        questionText: 'When an operator???s value is NULL, the typeof returned by the unary operator is:',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Undefined', isCorrect: false },
          { answerText: 'Integer', isCorrect: false },
          { answerText: 'Boolean', isCorrect: false },
          { answerText: 'Object', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 15,
        genreId: 'JS02',
        questionText: 'What does the Javascript ???debugger??? statement do?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'It will debug all the errors in th program at runtime.', isCorrect: false },
          { answerText: 'It acts as a breakpoint in a program.', isCorrect: true },
          { answerText: 'It will debug error in the current statement if any.', isCorrect: false },
          { answerText: 'All of the above.', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 16,
        genreId: 'JS02',
        questionText: 'Which function is used to serialize an object into a JSON string in Javascript?',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: 'stringify()', isCorrect: true },
          { answerText: 'toString()', isCorrect: false },
          { answerText: 'parse()', isCorrect: false },
          { answerText: 'convert()', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 17,
        genreId: 'JS02',
        questionText: 'Which object in Javascript doesn???t have a prototype?',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: 'All objects have a prototype.', isCorrect: false },
          { answerText: 'None of the objects have a prototype.', isCorrect: false },
          { answerText: 'Base Object', isCorrect: true },
          { answerText: 'None of the above', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 18,
        genreId: 'JS02',
        questionText: 'Which of the following is not javascript data types?',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Undefined', isCorrect: false },
          { answerText: 'Number', isCorrect: false },
          { answerText: 'Boolean', isCorrect: true },
          { answerText: 'Float', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 19,
        genreId: 'JS02',
        questionText: 'Which of the following function of Array object joins all elements of an array into a string?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'concat()', isCorrect: false },
          { answerText: 'pop()', isCorrect: false },
          { answerText: 'map()', isCorrect: false },
          { answerText: 'join()', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 20,
        genreId: 'JS02',
        questionText: 'The keyword or the property that you use to refer to an object through which they were invoked is',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'this', isCorrect: true },
          { answerText: 'from', isCorrect: false },
          { answerText: 'to', isCorrect: false },
          { answerText: 'object', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 21,
        genreId: 'SC04',
        questionText: 'Some fruits like mango, lemon, raw grapes, orange, etc., have a sour taste due to the presence of:',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'Lactic acid', isCorrect: false },
          { answerText: 'Citric Acid', isCorrect: true },
          { answerText: 'Acetic Acid', isCorrect: false },
          { answerText: 'Oxalic Acid', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 22,
        genreId: 'SC04',
        questionText: 'If the current flowing through a fixed resistor is halved, the heat produced in it will become:',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'One-half', isCorrect: false },
          { answerText: 'Double', isCorrect: false },
          { answerText: 'Four times', isCorrect: false },
          { answerText: 'One-fourth', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 23,
        genreId: 'SC04',
        questionText: 'If the current flowing through a fixed resistor is halved, the heat produced in it will become:',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: "By Newton's first law", isCorrect: true },
          { answerText: "By Newton's third law", isCorrect: false },
          { answerText: "By the Principle of Conservation of Momentum", isCorrect: false },
          { answerText: "By Newton's second law", isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 24,
        genreId: 'SC04',
        questionText: 'Which of the following is used in pencils?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'Silicon', isCorrect: false },
          { answerText: 'Phosphorous', isCorrect: false },
          { answerText: 'Graphite', isCorrect: true },
          { answerText: 'Charcoal', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 25,
        genreId: 'SC04',
        questionText: 'Which of the following metals forms an amalgam with other metals?',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: 'Tin', isCorrect: false },
          { answerText: 'Lead', isCorrect: false },
          { answerText: 'Zinc', isCorrect: false },
          { answerText: 'Mercury', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 26,
        genreId: 'SC04',
        questionText: 'Balloons are filled with',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Nitrogen', isCorrect: false },
          { answerText: 'Helium', isCorrect: true },
          { answerText: 'Oxygen', isCorrect: false },
          { answerText: 'Argon', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 27,
        genreId: 'SC04',
        questionText: 'Which of the following metals remain in liquid for under normal conditions?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'Mercury', isCorrect: true },
          { answerText: 'Uranium', isCorrect: false },
          { answerText: 'Radium', isCorrect: false },
          { answerText: 'Zinc', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 28,
        genreId: 'SC04',
        questionText: 'The hardest substance available on earth is',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'Gold', isCorrect: false },
          { answerText: 'Platinum', isCorrect: false },
          { answerText: 'Iron', isCorrect: false },
          { answerText: 'Diamond', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 29,
        genreId: 'SC04',
        questionText: 'The group of metals Fe, Co, Ni may best called as',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Transition metals', isCorrect: true },
          { answerText: 'Alkali metals', isCorrect: false },
          { answerText: 'Main group metals', isCorrect: false },
          { answerText: 'Rare metals', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 30,
        genreId: 'SC04',
        questionText: 'Chemical formula for water is',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'CaSiO3', isCorrect: false },
          { answerText: 'H2O', isCorrect: true },
          { answerText: 'Al2O3', isCorrect: false },
          { answerText: 'NaAlO2', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 31,
        genreId: 'RJS03',
        questionText: "What kind of component import React from 'react' is?",
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Pure component', isCorrect: false },
          { answerText: 'Statefull component', isCorrect: false },
          { answerText: 'Stateless component', isCorrect: true },
          { answerText: 'Dumb component', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 32,
        genreId: 'RJS03',
        questionText: 'What does the webpack command do?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'Transpiles all the Javascript down into one file', isCorrect: false },
          { answerText: 'A module bundle', isCorrect: true },
          { answerText: 'Runs react local development server.', isCorrect: false },
          { answerText: 'None of the above', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        questionId: 33,
        genreId: 'RJS03',
        questionText: 'What function allows you to render React content in an HTML page?',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: 'ReactDOM.start()', isCorrect: false },
          { answerText: 'React.mount()', isCorrect: false },
          { answerText: 'React.render()', isCorrect: false },
          { answerText: 'ReactDOM.render()', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 34,
        genreId: 'RJS03',
        questionText: 'Everything in react is what?',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'Class', isCorrect: false },
          { answerText: 'Package', isCorrect: false },
          { answerText: 'Component', isCorrect: true },
          { answerText: 'Module', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 35,
        genreId: 'RJS03',
        questionText: 'For controlled components in react',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Source of truth is component state', isCorrect: true },
          { answerText: 'Source of truth can be anything', isCorrect: false },
          { answerText: 'Source of truth is DOM', isCorrect: false },
          { answerText: 'None of the above', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 36,
        genreId: 'RJS03',
        questionText: 'What is babel in react?',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: 'Compiler', isCorrect: false },
          { answerText: 'Transpiler', isCorrect: false },
          { answerText: 'Interpreter', isCorrect: false },
          { answerText: 'Both Compiler & Transpiler', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 37,
        genreId: 'RJS03',
        questionText: 'In react state can be accessed using - ',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'this.state()', isCorrect: false },
          { answerText: 'state.current()', isCorrect: false },
          { answerText: 'this.state', isCorrect: true },
          { answerText: 'None of the above', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 38,
        genreId: 'RJS03',
        questionText: 'JSX allows us to write - ',
        questionMark: 1,
        timeAlloted: 40,
        answerOptions:  JSON.stringify([
          { answerText: 'HTML in React', isCorrect: true },
          { answerText: 'JQuery in React', isCorrect: false },
          { answerText: 'MySQL in React', isCorrect: false },
          { answerText: 'Angular Code in React', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 39,
        genreId: 'RJS03',
        questionText: 'What does props stand for?',
        questionMark: 2,
        timeAlloted: 50,
        answerOptions:  JSON.stringify([
          { answerText: 'Proper Arguments', isCorrect: false },
          { answerText: 'Proper Return Values', isCorrect: false },
          { answerText: 'Proper Values', isCorrect: false },
          { answerText: 'Properties', isCorrect: true },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 40,
        genreId: 'RJS03',
        questionText: 'Which ReactJS command is used to set up everything you need to run a React Application?',
        questionMark: 3,
        timeAlloted: 60,
        answerOptions:  JSON.stringify([
          { answerText: 'create-react-app', isCorrect: true },
          { answerText: 'create-new-reactapp', isCorrect: false },
          { answerText: 'react-app', isCorrect: false },
          { answerText: 'new-react-app', isCorrect: false },
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
