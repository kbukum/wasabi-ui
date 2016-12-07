export enum Position {
    CENTER = 0,
    TOP = 1,
    RIGHT = 2,
    BOTTOM = 3,
    LEFT = 4
}

export enum LayoutPosition {
    TOP_LEFT        = ( Position.TOP * 10 )     + Position.LEFT,
    TOP_CENTER      = ( Position.TOP * 10 )     + Position.CENTER,
    TOP_RIGHT       = ( Position.TOP * 10 )     + Position.RIGHT,
    RIGHT_TOP       = ( Position.RIGHT * 10 )   + Position.TOP,
    RIGHT_CENTER    = ( Position.RIGHT * 10 )   + Position.CENTER,
    RIGHT_BOTTOM    = ( Position.RIGHT * 10 )   + Position.BOTTOM,
    BOTTOM_RIGHT    = ( Position.BOTTOM * 10 )  + Position.RIGHT,
    BOTTOM_CENTER   = ( Position.BOTTOM * 10 )  + Position.CENTER,
    BOTTOM_LEFT     = ( Position.BOTTOM * 10 )  + Position.LEFT,
    LEFT_BOTTOM     = ( Position.LEFT * 10 )    + Position.BOTTOM,
    LEFT_CENTER     = ( Position.LEFT * 10 )    + Position.CENTER,
    LEFT_TOP        = ( Position.LEFT * 10 )    + Position.TOP,
}


export default Position;