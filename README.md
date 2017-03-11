# comp20-s2017-team16

**Project title**: Memelord

**Problem statement**: People need to compete among friends and weakling challengers to develop typing speed and accuracy and see who is the fastest, most ruthless typer. Give them a chance to compete in a biased, four-person arena under the influence of the Memelord.

**How do you solve the problem?**: The solution is to introduce the world to Memelord, which builds typing skills and meme recognition. 

**List of all the features that your team will implement.**
- Geolocation - will determine player groups
- Server-side persistence - maintain all-time fastest typing users
- Reporting with charts and graphs - appears between rounds and will give a comparison between the typing speeds of all players and their player standings.

**What data will your prototype be using and collecting**
- Prewritten stories for players to type, split into paragraphs. One paragraph denotes one round. 
- Geolocation info from users - used only at the beginning of the game to match people. 
- Scores between rounds.
- Time it takes for people to complete each paragraph (used for after-round wpm report).
- Time it takes for people to complete the story (used for all-time scoreboard)
- Usernames - used for player ID and current and all-time scoreboards.
- Memes and icons

**Any algorithms or special techniques that will be necessary**
- The position of memelord will be randomly generated by a randomizer function.
- If we don't find enough people, we will use an expanding radius search for players by geolocation. 
- Random generator of memes
