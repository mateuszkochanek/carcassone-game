export const gameStart = (data) => ({type: 'GAME_START', data})
export const gameUpdateBoard = (data) => ({type: 'GAME_BOARD', data})
export const gameTurnInfo = (data) => ({type: 'GAME_TURN_INFO', data})
export const gamePawnInfo = (data) => ({type: 'GAME_PAWN_INFO', data})
export const gameEndTurn = (data) => ({type: 'GAME_END_TURN', data})
export const gameEnd = (data = {}) => ({type: 'GAME_END', data})
export const gameInitial = (data = {}) => ({type: 'GAME_INITIAL', data})

export const gameTilePlaced = (data = {}) => ({type: 'GAME_TILE_PLACED', data})