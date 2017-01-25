## Release process
* ~~Release~~
* ~~Email mailing list~~
* ~~Send to press~~
* ~~Add link back to website to menu~~
* ~~Open source~~
* ~~Update press list~~
* ~~Make website page~~
* ~~Make press kit (on github?)~~
* ~~Make trailer~~
* ~~Take screenshots~~

## Bugs
* ~~**FIXED with proper file formats and an initial onTouch trigger at zero volume** No audio in iOS~~
* ~~Possible to Restart while apple off screen and have timeout trigger on refreshed game (check on restarts and timers generally)~~

## Fixes/considerations
* ~~Capitalism: Make afford text disappear after a bit so it can redisplay on hit for more impact~~
* ~~Capitalism: Make hit sound play on apple you can't afford~~
* ~~Remember to add tracking information to the game (github)~~
* ~~Work on Monism's apple placement~~
* ~~Work on Optimism's apple placement~~
* ~~Work on Positivism's apple placement~~
* ~~Implement "no under body" code for Snake apple placement~~
* ~~**DONE A BUNCH OF THIS** Disallow apple placement under snake body (determine if there are levels this won't work for, like Optimism or Monism)~~
  * ~~The calculation. Total grid squares: 640/20*420/20 == 768.~~
  * ~~Monism starts with 22+22+... no wait...~~
  * ~~Monism can clearly fill the entire screen given that eating one body = one extra body on the screen (the added one + the relocated one), so that's an infinite generation process. So at some point you'd have to place new items on screen under the snake's body. As it stands it looks kind of fine anyway, I don't think you particularly notice. Maybe there could be a cut-off?~~
  * ~~Optimism has an arbitrary limit of 300 apples, and there are 20*24==480 squares to place them in. BUT if the snake keeps eating them, it will eventually be sufficiently long that you would have to place apples under its body. OR you could do something where it tries for a set amount of time, then gives up and tries on the next tick...~~

* ~~Add SFX to Casualism~~
* ~~Play every version and make sure sound, timing, etc. in place~~
* ~~Anthropomorphism seems like people find the apple hard to catch/deal with - make the apple not move if the player is within one grid of eating it~~
* ~~Reduce starting score in Capitalism~~
* ~~Why doesn't the progress bar go all the way across? God damnit!~~
* ~~**THEY SEND ME AN EMAIL** Narcissism feels wrong tonally - attribution? Change it to trigger an email/tweet/facebook?~~
* ~~Re-add touch-based instructions to Snake (where the fuck did it go?)~~
* ~~Add instructions to menu at bottom~~
* ~~Fix broken touch menu (where the fuck did it go?)~~
* ~~Add SFX for move, apple, collision~~

## Making the Snakisms

### ~~Anthropomorphicism~~
* ~~Make the apple move around on tick, collide with walls and body~~

### ~~Apocalypticism~~
* ~~Add a timer that gets rid of everything except instructions and just says "GAME OVER"~~

### ~~Asceticism~~
* ~~**TRYING IT FOR NOW** Points for duration of not eating the apple?~~
* ~~Death on eating the apple~~
* ~~**YEP** Change end message to just "YOU LOSE" if you eat the apple?~~

### ~~Capitalism~~
* ~~On death, report money finished with~~
* ~~On score to zero, display info that can't afford apple~~
* ~~Change score to $ and reduce on apple~~

### ~~Casualism~~
* ~~First stab is just to randomly generate every tile with a random image/character and let it be like static~~

### ~~Conservatism~~
* ~~Literally just extend Snake and don't change anything~~

### ~~Determinism~~
* ~~Play back the playthrough (no controls help, no input except r and m)~~
* ~~Record a deterministic playthrough (with deterministic apple positions)~~

### ~~Dualism~~
* ~~"Body Snake" for the instructions~~
* ~~Add instructions to control mind snake with your mind (stay on screen? **YES**)~~
* ~~**BUT IT DOESN'T MOVE** Add mind snake (semi-transparent) that moves (and wraps) on its own~~

### ~~Existentialism~~
* ~~Implement wrap for game edges (in Snake)~~
* ~~On game over no message~~
* ~~Snake long enough to suicide~~
* ~~No walls, no score, no instructions, no apple~~

### ~~Holism~~
* ~~Update whole group position on tick with the same movement as the snake~~
* ~~Add a "whole" group that contains all sprites and text~~

### ~~Idealism~~
* ~~Just display instructions to imagine snake + instructions for restart and menu and that's all~~

### ~~Monism~~
* ~~Implement eaten objects being repositioned on screen in the same way as apple (will have to make sure we don't put them behind any other object or text sadly, but it's just a fiddle)~~
* ~~**YES**Should the eaten elements be replaced somewhere else on the screen? Probably yes? Yikes... oh dear... this is more complex than I was thinking... hmmmmmmmmmm shit. Still that's why they play the game.~~
* ~~Should the body bits be edible as well? If so what happens to the bits behind them?~~
* ~~Make all the bits worth points~~
* ~~**ACTUALLY JUST EDITED THE RELEVANT GROUPS DIRECTLY**Make edibles group and add all elements to it (score, walls, body?, menu, restart)~~
* ~~Implement a check for edibles and remove on eaten~~

### ~~Narcissism~~
* ~~Let snake eat texts (not including spaces) and grow on completion~~
* ~~Make text appear like apples (account for size of screen)~~
* ~~Add narcissistic texts array~~

### ~~Nihilism~~
* ~~Display nothing, no controls, just nothing~~

### ~~Optimism~~
* ~~Apples appear constantly and you never get longer~~

### ~~Pessimism~~
* ~~Fix positioning of texts relative to wall area~~
* ~~Apple only outside the wall area~~
* ~~Smaller wall area~~

### ~~Positivism~~
* ~~Make all elements of game visible/invisible based on cone of vision of the snake head.~~
* ~~How the hell am I going to do this? And does it even make sense? Yes.~~

### ~~Post-apocalypticism~~
* ~~Just add a drab deconstructed world (random walls and greyscale variable ground tiles and no apple)~~
* ~~**ALREADY DID** World wraps on the edges~~
* ~~**NAH** Score (always 0) and restart/menu are like a HUD (follow)~~
* ~~**NAH** Camera follows the snake head~~
* ~~**NAH. JUST ONE SCREEN** On start, generate N screens worth of terrain by just applying a random selection of ground textures or a wall for each grid item~~

### ~~Romanticism~~
* ~~Generate enough titles for the situations for it to be funny~~
* ~~**ENDED UP JUST HAVING TITLE ON APPLE AND DEATH** Add title popup on a timer~~
* ~~Add ability to display a title~~
* ~~Play mp3 over game~~
* ~~Get mp3 of sad piano and violin from https://www.youtube.com/watch?v=TZTtvwpXReA~~

### ~~Stoicism~~
* Add sound effect of "hit" one time on collision to emphasis something happened
* ~~Rewrite so that snake stops before collision and stays put (maybe with imagined "ouch" sound on collision) but can then just keep going after~~
* ~~Rewrite body collision to just stay put and not die~~

### ~~Utilitarianism~~
* **Question**: Should we reinterpret the apples as deaths as per the Trolley problem? In which case negative scoring?
* ~~Alter game over text to be win and lose according to utilitarian choice~~
* ~~Place appropriate number of apples in branches~~
* ~~Make screen with branching options in walls~~

## ~~Continuing to dos~~

* ~~Refactor snake code for readability and extension~~ 2017-01-06
* ~~Add a timer to the apple so it doesn't instantly reappear~~ 2017-01-06
* ~~Add pre-instructions to game~~ 2017-01-06
* ~~Add restart/menu options to game~~ 2017-01-06
* ~~Add apple background to menu items to make them easier to tap?~~
* ~~Convert menu to full Snake~~
* ~~Make sure you can extend current Snake to other Snakes easily~~
* ~~Fix swipe lag? (Roll my own?)~~
* ~~Return to standard phaser keyboard (seemed more responsive)~~


## ~~Initial Snake To Dos~~

* ~~Swipe gestures for playing on mobile (this is tough and may require a square play area which would… suck…?)~~
* ~~Walled area of play (just a rectangle around most of the screen (excluding the score area)~~
* ~~Game over screen~~
* ~~Score on apple eat + text on screen~~
* ~~Basic moving snake~~
* ~~Apple eating~~
* ~~Snake lengthening~~
* ~~Dying~~
* ~~Death flicker~~



## Wednesday, 30 November 2016

Okay so this idea has been in my head for ages, Snake but you avoid eating the apple entirely because you’re an ascetic. It’s obviously VERY THIN in terms of a concept to release all on its own though… it’s the kind of thing that’s asking to be packages into a SNAKES kind of thing. But I just can’t be fucked doing the usual multipack form where I come up with mechanics, so if I were going to do that I’d want it to be Snake interpretations of philosophical ways of life I suppose? Stoic Snake, Platonic Snake, etc. Can I do that? Maybe I can? … Utilitarian Snake? Consequentialist Snake? What are the options here?

http://phrontistery.info/isms.html
* Stoic (… you die and kind of “put up with it?”)
* Ascetic (you don’t eat the apple)
* Platonic (there’s only one apple, the platonic form of an apple)
* Existentialist
* Consequentialist
* Utilitarian
* Nihilist (nothing at all? a snake in a void?)
* Absolutist
* Absurdist (irrational events - BUT is the snake the absurdist or are we?)
* Agnostic
* Atheist
* Anarchist (no points system?)
* Animist (the apple runs around?)
* Anthropomorphic
* Apocalyptic
* Capitalist
* Casualist (chance governs everything)
* Collectivist
* Individualist
* Communist
* Conservative (original version)
* Determinist (plays itself)
* Hedonist
* Holistic
* Idealist
* Libertarian
* Monist (all objects one category, so you can eat everything, say)
* Optimist (maybe all apples all the time and you can’t die?)
* Pantheist (seems funny… Pascal’s wager…)
* Pessimist
* Positivist (maybe if you can’t see something it doesn’t exist?)
* Romantic
* Skeptic
* Socialist
* Solipsist (self-existence only certainty…)
* Subjectivist (maybe define the value of apples/events yourself?)
* Minimalist
* Maximalist
* [Art movements are a whole thing… though would need to be careful about the extent to which they’re purely visual and thus less interesting…]

Okay having written that list of… ha ha 36 options, it seems like this is a legitimate idea. Each version of Snake would have some little (comic) take on the philosophy in question, just a tweak of the rules in that direction, I’d avoid doing anything big or fancy I imagine.

I really do like this project at this point, it’s a nice way of freshening what I’ve done in the past with the mega pack games, and Snake is a fun one to play around with that’s surfaced a few times in my work. Nice simple thing to implement, should be playable on a phone I suppose? Swipes? Or will they be reinterpreted by the phone and fuck me?

So… a good project. Not a project that fits really whatsoever with Speculative Play, which might raise the Spectre (ha ha) of me running it alongside another project… the great thing about it is its total simplicity in terms of implementation, though I’m guessing there will be some really shitty design challenges and that a whole bunch of the ideas won’t work conceptually? (Just realised that for at least one of the “after death” ones we can obviously have an after death sequence for the snake… so that helps.)

Alright. I’m more convinced that this is a really solid project now I’ve done that minimalist (OH MY!) research.
