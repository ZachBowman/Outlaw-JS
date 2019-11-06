////////////////////////////////////////////////////////////////////////////////
// Create game objects here
////////////////////////////////////////////////////////////////////////////////

// game state references
var LOADING = 0;
var SPLASH  = 1;
var TITLE   = 2;
var GAME    = 3;

// control types
var NO_CONTROL = 0;        // player has not used any input yet
var KEYBOARD_CONTROL = 1;
var CLICK_CONTROL = 2;     // finger or mouse

// direction references
var NONE  = 0;
var LEFT  = 1;
var RIGHT = 2;
var UP = 3;
var DOWN = 4;

////////////////////////////////////////////////////////////////////////////////

function Game_Object (sprite = null)
  {
  this.x = 0;
  this.y = 0;
  this.direction = 0;
  this.frame = 0;
  this.last_frame = 0;
  this.count = 0;
  this.delay_between_frames = 0;
  this.sprite = sprite;
  }
 
////////////////////////////////////////////////////////////////////////////////

function Rectangle (x = 0, y = 0, width = 0, height = 0)
  {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  }
