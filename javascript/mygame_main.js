////////////////////////////////////////////////////////////////////////////////
// Main entry point
////////////////////////////////////////////////////////////////////////////////

// application
var canvas_html;
var canvas_2d;
var div;
var fps = 30;
var game;

// game
var game_state = LOADING;
var next_game_state = SPLASH;

// video
var screen_width;
var screen_height;
var screen_x_offset = 0;
var screen_y_offset = 0;

// controls
var mouse_x = 0;
var mouse_y = 0;
var key_left = false;
var key_right = false;
var key_down = false;
var key_enter = false;
var key_esc = false;

// title screen
var splash_clicked = false;
var loading_text = "LOADING";
var splash_text = "CLICK TO START";
var sound_loaded_flag = false;

// graphics
var splash_screen = Sprite ("splash_screen");
var title_screen = Sprite ("title_screen");
var solid_black = Sprite ("solid_black");

var click_here_counter = 0;
var click_here_delay = 20;
var click_here_onoff = true;
var click_to_start_sound = false;

// objects
var date = new Date();

var sounds =
  [
  {id: "test_sound", src: "sounds/test_sound.mp3"},
  ];

var music =
  [
  ];

var music_player = null;
var music_volume = 0.5;
var music_track = null;
var last_track = null;
var total_sounds = 0;
var sounds_loaded = 0;

////////////////////////////////////////////////////////////////////////////////

// called when the html file is loaded

function html_init()
  {
  canvas_html = document.getElementById ("canvas");
  canvas_2d = document.getElementById ("canvas").getContext ("2d");
  div = document.getElementById ("canvas_div");
  screen_width = Number (canvas_html.getAttribute ("width"));
  screen_height = Number (canvas_html.getAttribute ("height"));

  init_sound();
  }

////////////////////////////////////////////////////////////////////////////////

// Main loop before user input

setInterval (function()
  {
  if (splash_clicked === false) splash_screen_update();
  else game.update();

  try
    {
    if (canvas_2d)
      {
      if (splash_clicked === false) splash_screen_draw();
      else game.draw();
      }
    }
  catch (error)
    {
    console.log ("canvas_2d not ready yet.");
    }
  }, 1000 / fps);

////////////////////////////////////////////////////////////////////////////////

// called by html_init()

function init_sound ()
  {
  if (!createjs.Sound.initializeDefaultPlugins()) 
    {
    console.log ("Sound not available on this device.");
    sound_loaded();
    return;
    }

  total_sounds = sounds.length;
  sounds_loaded = 0;

  createjs.Sound.addEventListener("fileload", one_sound_loaded);
  createjs.Sound.registerSounds (sounds, "");
  }

////////////////////////////////////////////////////////////////////////////////

function one_sound_loaded (event)
  {
  sounds_loaded += 1;
  if (sounds_loaded === total_sounds) all_sounds_loaded();
  }

////////////////////////////////////////////////////////////////////////////////

function music_track_loaded (event)
  {
  // mark each track loaded as they come in.
  for (var track = 0; track < music.length; track += 1)
    {
    if (music[track].id === event.id) music[track].loaded = true;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function all_sounds_loaded (event)
  {
  // stop listening for sound loads.
  createjs.Sound.removeEventListener ("fileload", one_sound_loaded);

  sound_loaded_flag = true;
  game_state = SPLASH;
  div.addEventListener ("click", splash_screen_click, false);

  // load music async.
  createjs.Sound.addEventListener("fileload", music_track_loaded);
  createjs.Sound.registerSounds (music, "");
  }

////////////////////////////////////////////////////////////////////////////////

function splash_screen_update ()
  {
  click_here_counter += 1;
  if (click_here_counter >= click_here_delay)
    {
    click_here_counter = 0;
    if (click_here_onoff === true) click_here_onoff = false;
    else click_here_onoff = true;
    }

  if (game_state === SPLASH)
    {
    // Loading finished - add any extra animations here.
    }
  }

////////////////////////////////////////////////////////////////////////////////

function splash_screen_draw ()
  {
  var x = 0;
  var y = 0;
  var r = new Rectangle();

  solid_black.draw (canvas_2d, x, y);

  // Sounds not loaded yet.
  if (game_state === LOADING)
    {
    splash_screen.draw_from_center(canvas_2d, screen_width / 2, screen_height / 2);

    canvas_2d.fillStyle = "#FFFFFF";
    canvas_2d.font = "24px impact";
    if (click_here_onoff === true) canvas_2d.fillText (loading_text, 150, 500);
    }

  // Sounds loaded, waiting for user input.
  else if (game_state === SPLASH)
    {
    splash_screen.draw_from_center(canvas_2d, screen_width / 2, screen_height / 2);

    canvas_2d.fillStyle = "#FF00FF";
    canvas_2d.font = "24px impact";
    if (click_here_onoff === true) canvas_2d.fillText (splash_text, 125, 400);
    }
  }

////////////////////////////////////////////////////////////////////////////////

function splash_screen_click ()
  {
  splash_clicked = true;
  div.removeEventListener ("click", splash_screen_click, false);
  game = new mygame_namespace.mygame();
  game_state = MENU;

  canvas_html.addEventListener   ("mousedown",   function() {mouse_down (false, mouse_x, mouse_y)}, false);
  canvas_html.addEventListener   ("mousemove",   function(event) {mouse_move (event, false, canvas_html)}, false);
  canvas_html.addEventListener   ("touchstart",  function() {mouse_down (true)},  false);
  canvas_html.addEventListener   ("touchmove",   function() {mouse_move (true)},  true);
  canvas_html.addEventListener   ("touchend",    function() {mouse_up (true)},    false);
  document.body.addEventListener ("mouseup",     function() {mouse_up (false)},   false);
  document.body.addEventListener ("touchcancel", function() {mouse_up (true)},    false);
  document.body.addEventListener ('touchmove',   function (event) {event.preventDefault()}, false);
  document.addEventListener ('keydown', keyboard_down, false);
  document.addEventListener ('keyup', keyboard_up, false);

  play_sound ("start");
  }

////////////////////////////////////////////////////////////////////////////////

this.mygame_namespace = this.mygame_namespace || {};

////////////////////////////////////////////////////////////////////////////////

(function ()
  {
        
  function mygame ()
    {
    this.init();
    play_sound ("test_sound");

    //music_player = createjs.Sound.play ("title_screen_music");
    //music_player.volume = music_volume;
    }

  mygame_namespace.mygame = mygame;

  ////////////////////////////////////////////////////////////////////////////////

  mygame.prototype.init = function ()
    {
    }

  ////////////////////////////////////////////////////////////////////////////////

  // Main game loop

  mygame.prototype.update = function ()
    {
    if (game_state === GAME)
      {    
      }

    //Music_Control ();

    // update_fade transitions
    Fade_Control ();
    }
    
  ////////////////////////////////////////////////////////////////////////////////

  $(document).ready (function()
    {
    $("canvas").mousemove (function (event)
      {
      if (game_state === GAME)
        {
        mouse_x = event.pageX - this.offsetLeft;
        mouse_y = event.pageY - this.offsetTop;
        }
      });
    });

  ////////////////////////////////////////////////////////////////////////////////

  mygame.prototype.draw = function ()
    {

    if (game_state === TITLE)
      {
      title_screen.draw (canvas_2d, 0, 0);
      }

    if (game_state === GAME)
      {
      game.draw_background();
      }
   
    fade_rander();
    }

  mygame.prototype.draw_background = function()
    {
	  }

  }());
