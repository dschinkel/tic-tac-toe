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

- The game does not gracefully handle bad user input
- In its current form, it’s supposed to be played at a difficulty level of “hard”, meaning the computer player cannot be beaten, but in reality you can beat it with the right moves. 
- The game play left a lot to be desired. The user messages are lacking in many ways, which I’m sure you can tell
  As you can tell, there are a lot of problems and from what our devs say, the code itself is a mess. This puts us in a difficult position because we have a number of features we would like to add and we’re hoping you can help. 
		
We hope that you’ll be able to help us get the code in a better state. 
		
Without that, our devs don’t even think we’ll be able to implement the new features my boss has requested. Below you’ll see a list of the features we’re hoping to add.
		
- Allow the user to choose the level of difficulty (“easy” means the computer can easily be beaten, “medium” means it can be beaten but only with a series of intelligent moves, and “hard” means the it is unbeatable). 
- Allow the user to choose the game type (human v. human, computer v. computer, human v. computer). 
- Allow the user to choose which player goes first
- Allow the user to choose with what “symbol” the players will mark their selections on the board 
(traditionally it’s “X” and “O”)
		
Could you implement these features? 


## CodeReview
Done by Rob Mulholand
Rob was so gracious to take his time to give a code review on this, something 8th Lighters did when reviewing this kata as part of submitting for an interview.

Hi Dave,

Here are some notes about your code submission. They are organized into three categories (strong, needs improvement, and questions to consider).

Strong
- The game is unbeatable
- I enjoyed the colorful UI, especially the message for when a player wins!
- You broke out a number responsibilities into a number of well named modules.
- Nice specs!
	 
Could be improved

#### The GameController module has more than one responsibility

- It is responsible for configuring the game, and for the game flow
- Could you refactor so that each of these responsibilities are contained in their own modules?
		
#### The processNextMove move function is currently dispatching based on the type of the player

- Can you refactor this to be more polymorphic? 
	- Ideally, we would like to have this function do the next move for the current player using the same logic
 	- Leveraging polymorphism here should make this function more generic and easier to test
  	- It would also make it more flexible for us to add additional player types in the future
	
- Many of the modules have a hard dependency on some of the UI modules, namely the UIDisplay module
	- This is not the most flexible design
		- Imagine that we added a new FaxDisplay module that would allow us to play the game via a fax machine
		- What modules would we have to change in order to support both the console and fax?
		- This is the essence of the Open/Closed Principle
			- We want to be able to extend our code without needing to modify it
		- Another side effect of this hard dependency is that we end up printing to stdout in our tests, which adds a lot of noise
			- It would be nice if we had the ability to configure our code to use a TestDisplay or something of the like when we are unit testing
				
#### The Move module looks to have multiple responsibilities as well
- It is responsible for validating the moves
	- and also placing the move
 	- Adding the move to the board feels like it might be better at home in the Board module
	
#### The Players module is depending on the GameController module in order to determine the level of difficulty, and the GameController module is depending on the Player module for various actions
- Circular dependencies can make our code rigid very quickly
- The Dependency Inversion Principle states that "higher level modules should not depend on lower level modules"
- GameController is higher level than the Players module
	- How could we break this dependency?
		- There a number of ways that we could approach the solution
			- One way might be to pass the difficulty to the Player somehow
				- Another approach might be to split the split the player into many players, a Human, EasyComputer, MediumComputer, and HardComputer, then decide which one to use inside the GameController based on the value of the difficulty setting
				- Could you refactor so that we no longer have this circular dependency? Questions to Consider

#### Please attach the answers to these questions to your next pull request.
		
- If you were to receive a new requirement for your Tic Tac Toe game to be able to play on a 4x4 board, what would have to change?
	
- Were there any parts of the codebase that were difficult to test? What would have to change in order to make it easier?

Dave: 
```
Yes, I found it hard to test GameController because the top level functions called internal functions and to test those internal functions I'd have to export them which isn't a good thing to do…it felt very wrong having to export internals for some modules.  For example promptForGameSettings in GameController, that was hard to test because it was doing too much under the hood but it was setting up the workflow so…it had multiple prompts in the workflow and designated the order in which things happen as part of the game workflow
```
