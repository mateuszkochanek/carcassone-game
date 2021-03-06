from json import dumps

from backend.command.Command import Command
from backend.command.JSONConstructor import JSONConstructor


class ReadyCommand(Command):
    """Class which is responsible for setting attribute 'ready' in players"""

    def __init__(self, game, data):
        """"Initialize attributes"""
        super(ReadyCommand, self).__init__(game, data)

    def execute(self):
        """Set attribute 'ready' in player.
        Start game if all players are ready.
        Return dictionary {websocket: [json_in_string]}"""
        playerId = self._data['data']['id']
        players = self._game.getPlayers()

        for player in players:
            if player.getId() == playerId:
                player.setReady(True)

        if len(players) < 2 or False in [player.getReady() for player in players]:
            # not all players ready
            playersList = [[p.getId(), p.getColor(), p.getReady()] for p in players]
            json = {p.getWebsocket(): [dumps(JSONConstructor.players_info_json(
                p.getId(), p.getColor(), p.getReady(), playersList))] for p in players}
        else:
            # all players ready, start game
            playersList = [[p.getId(), p.getColor(), p.getPoints(), p.getPawnsNumber()] for p in players]
            boardList = self._game.getBoard().getTiles()
            tilesLeft = self._game.getTilesLeftAmount()
            self._game.start()
            json = {p.getWebsocket(): [dumps(JSONConstructor.start_game(p.getId(), p.getColor(), p.getReady())),
                                       dumps(JSONConstructor.board_state(tilesLeft, playersList, boardList))]
                    for p in players}

            currTile = self._game.getCurrTile()
            places = self._game.getBoard().getTilePositions(currTile)
            currPlayer = self._game.getCurrPlayer()
            json[currPlayer.getWebsocket()].append(dumps(JSONConstructor.tile_possible_places(
                currPlayer.getId(),
                currTile.code7x7,
                currTile.orientation,
                places
            )))
        return json
