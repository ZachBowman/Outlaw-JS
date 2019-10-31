////////////////////////////////////////////////////////////////////////////////
// Automates scene transitions
////////////////////////////////////////////////////////////////////////////////

// fade direction
var FADE_NONE = 0;
var FADE_OUT = 1;
var FADE_IN = 2;

var fade_opacity = 1.0;
var fade_direction = IN;
var fade_speed = 0.05;

////////////////////////////////////////////////////////////////////////////////

function fadeout () { fade_direction = "out"; }
function fadein () { fade_direction = "in"; }

////////////////////////////////////////////////////////////////////////////////
 
function Fade_Control ()
  {
  if (fade_direction === FADE_IN)
    {
    fade_opacity -= 0.02;
    if (fade_opacity <= 0)
      {
      fade_direction = FADE_NONE;
      }
    }
  else if (fade_direction === FADE_OUT)
    {
    fade_opacity += 0.02;
    if (fade_opacity >= 1.0)
      {
      fade_direction = FADE_IN;

      game_state = next_game_state;
      next_game_state = NONE;          
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////

function fade_render()
  {
  if (fade_direction != NONE)
    {
    canvas_2d.globalAlpha = fade_opacity;
    solid_black.draw (canvas_2d, 0, 0);
    canvas_2d.globalAlpha = 1.0;
    }
  }
