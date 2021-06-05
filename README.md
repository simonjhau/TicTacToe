# TicTacToe Online Game

Tic Tac toe game created using React, Express and Node. 

## REST API Design

Player 1 sends a POST request to http://server:port/api/game to create a new game.
JSON will be returned with the game details

Player 2 must then send a PATCH request to the endpoint http://server:port/api/game/gameid to join the game

Throughout the game, both players send GET requests to the gameid endpoint to retreive the current state of the game.  Players must send PUT requests to to update the current board state and move number

Currently games get deleted from the server if inactive for over 10 minutes
