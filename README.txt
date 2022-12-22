GA Project 1 - Guide the Cat Home

This project is a side scrolling game which uses the <canvas> tag to create and animate characters like the player, enemies and platforms.

Character Creation:

A separate class is created for player, enemy and platform with their own properties.
The player has an x and y coordinates in the canvas. Player velocity is created by constantly adding this value to the player coordinates in
a continuous loop by using the requestAnimationFrame() function.
Grvavity (given value) is continuously added when the player is above the bottom of the screen.
Beyond the bottom of the screen, the velocity along y axis is 0 to prevent the player from falling further.

Navigation:

"W, A, S, D" keys are used to navigate the player character on the stage to avoid obstacles and reach the goal point which is the house.
These are done by adding event listeners when the corresponding keys are pressed.
When "D" key (forward) is pressed, it sets a postive value to player velocity along x axis so that it will move to the right.

Scrolling effect:

Once the player moves a certain amount of pixels, the player velocity is set to 0 and now both the platforms and enemies move to the left.
By matching the former player velocity with the speed at which the platforms and enemies move to the left, this creates the illusion that the canvas is scrolling to the right.
Vice versa for moving backwards with the "A" key.

Collision effect:

To create the player-platform collision effect, the player velocity along y axis is set to 0 when it is above the platform.
To create the player-enemy collision effect, the player dies (alert message) when its x or y coordinates fall within the enemy's image size.

Goal:

The player wins when the it reaches the goal (the house) at the end of the canvas.
Each time the player moves forward, there is a variable called scrollDistance which increases.
Vice versa, scrollDistance decreases when the player moves backwards.
Once the target scrollDistance is reached (which corresponds to the house's coordinates), the player wins (alert message)

