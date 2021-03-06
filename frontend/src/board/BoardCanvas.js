import {MyBoard} from "./graphic-utils/MyBoard";

/**
 * Class handling drawing board on canvas.
 */
class BoardCanvas {

    /**
     * Constructor setting canvas and callbacks.
     * @param canvas: canvas on which board should be drawn
     * @param tileCallback: function called when user chooses tile
     * @param pawnCallback: function called when user chooses pawn
     * @param rotateCallback:  function called on rotate
     */
    constructor(canvas, tileCallback, pawnCallback, rotateCallback) {
        this.canvas = canvas
        this.tileCallback = tileCallback
        this.pawnCallback = pawnCallback
        this.rotateCallback = rotateCallback
        //--------------------------------------------
        this.board = new MyBoard(this.canvas, 105,
            this.tileCallback, this.pawnCallback, this.rotateCallback);
    }

    /**
     * Render board after update.
     * @param players: list of players including player id and color
     * @param board: holds info about placed tiles and pawns,
     *        see front.json (game.board)
     * @param turnState: holds info about what should be displayed
     *        in current turn, see front.json (game.turn.state)
     * @param possiblePlaces: holds info about possible places
     *        of pawns and tiles (depending on turnState)
     *        see front.json (game.turn.possible_places)
     * @param myTurn
     * @param currentTile
     */
    render = (players, board, turnState, possiblePlaces, myTurn, currentTile) => {
        this.board.removeTiles();
        this.board.removePossiblePlaces();
        this.board.removePawnPlaces();
        this.board.removeCurrentTile();
        if (players !== undefined) {
            this.board.setPlayers(players);
        }

        if (turnState === "S_SHOW_POSSIBLE_TILES") {
            // this.board.setPlayers(players);
            this.board.drawTiles(board);
            this.board.drawPossiblePlaces(possiblePlaces);
            // rysowanie bieżącej płytki
            if (myTurn) {
                this.board.showCurrentTile(currentTile.id);
            }
        } else if (turnState === "S_SHOW_POSSIBLE_PAWNS") {
            // pokazuje miejsca na położenie pionków na płytce
            // ostatniej na liście
            // this.board.setPlayers(players);
            this.board.drawTiles(board);
            this.board.showPawnPlaces(possiblePlaces);
        } else if (turnState === "S_EMPTY") {
            this.board.drawTiles(board);
        }
    }

}

export default BoardCanvas