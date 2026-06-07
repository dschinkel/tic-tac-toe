### To Play the game:
- `yarn` to install npm modules
- then `yarn start` to start a new game

if you don't have [yarn](https://yarnpkg.com/en/), here's how to install it:

`brew install yarn`
or
`sudo port install yarn`

### To run tests:
- `yarn test:unit`
- if using WebStorm's test runner (like I do), all you need is to set it to the unit test directory then add this for mocha options:
`--recursive -r @babel/register ./src/test/test.imports -w`

### Implementation Notes
The modules in this game are all done via [JS Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).


## Original Readme Description
I’m the project manager at a Command Line Games, Inc. I have a small dev team and we hired a consulting company to help us build an app that will feature a number of games for children, one being Tic Tac Toe. 
	
They just demoed the basic version of the Tic Tac Toe game in the console and my boss wasn’t thrilled with what he saw. The game play was rough. It didn’t function as he expected. We’ve decided to move in a different direction and bring in someone else. 
	
While my boss doesn’t have a technical background, I do, and we both understand the importance of writing code that can be maintained in the future. 
	
We would like you to improve the existing Tic Tac Toe that the previous firm worked on. There are a number of issues with the code. Below I’ve listed some of those issues, but I’m sure there are more. 

  ●  The game does not gracefully handle bad user input
  ●  In its current form, it’s supposed to be played at a difficulty level of “hard”, meaning the computer player cannot be beaten, but in reality you can beat it with the right moves. 
  ●  The game play left a lot to be desired. The user messages are lacking in many ways, which I’m sure you can tell
  As you can tell, there are a lot of problems and from what our devs say, the code itself is a mess. This puts us in a difficult position because we have a number of features we would like to add and we’re hoping you can help. 
		
We hope that you’ll be able to help us get the code in a better state. 
		
Without that, our devs don’t even think we’ll be able to implement the new features my boss has requested. Below you’ll see a list of the features we’re hoping to add.
		
  ●  Allow the user to choose the level of difficulty (“easy” means the computer can easily be beaten, “medium” means it can be beaten but only with a series of intelligent moves, and “hard” means the it is unbeatable). 
  ●  Allow the user to choose the game type (human v. human, computer v. computer, human v. computer). 
  ●  Allow the user to choose which player goes first
  ●  Allow the user to choose with what “symbol” the players will mark their selections on the board 
(traditionally it’s “X” and “O”)
		
Could you implement these features? 
