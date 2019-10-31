////////////////////////////////////////////////////////////////////////////////
// User input
////////////////////////////////////////////////////////////////////////////////

function handleClick()
  {
	canvas_html.onclick = null;
	}

////////////////////////////////////////////////////////////////////////////////

function mouse_move (e, finger, canvas_html)
  {
  if (!e) var e = event;
  if (!canvas_html) canvas_html = document.getElementById ("canvas");
  if (finger === true) e.preventDefault();

  if (canvas_html)
    {
    mouse_x = e.pageX - canvas_html.offsetLeft;
    mouse_y = e.pageY - canvas_html.offsetTop;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function mouse_down (finger, mouse_x, mouse_y)
  {
  var click_x = mouse_x;
  var click_y = mouse_y;  
  
  if (game_state == TITLE)
    {
    }
  else if (game_state === GAME)
    {
    }
  pointer_down = true;
  mouse_move (finger);
  }
  
//////////////////////////////////////////////////////////////////////////////// 

function mouse_up (finger)
  {
  pointer_down = false;
  if (finger === false) mouse_move (false);
  }

////////////////////////////////////////////////////////////////////////////////

// checks if the click is over a rectangle or any object with x, y, width, and height

function click_over_rect (click_x, click_y, rect)
  {
  if (click_x >= rect.x && click_x <= rect.x + rect.width
      && click_y >= rect.y && click_y <= rect.y + rect.height)
    {
    return true;
    }

  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

// checks if the click is over an object that relies on its sprite for width and height

function click_over_object (click_x, click_y, object)
  {
  if (object.draw_from_center === true
      && click_x >= object.x - (object.sprite.width / 2) && click_x <= object.x + (object.sprite.width / 2)
      && click_y >= object.y - (object.sprite.height / 2) && click_y <= object.y + (object.sprite.height / 2))
    {
    return true;
    }

  else if (click_x >= object.x && click_x <= object.x + object.sprite.width
      && click_y >= object.y && click_y <= object.y + object.sprite.height)
    {
    return true;
    }

  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

function keyboard_down (event)
  {
    if ((event.keyIdentifier === "Left" || event.key === "ArrowLeft") && key_left === false)
      {
      key_left = true;
      }

    if ((event.keyIdentifier === "Right" || event.key === "ArrowRight") && key_right === false)
      {
      key_right = true;
      }
  }

////////////////////////////////////////////////////////////////////////////////

function keyboard_up (event)
  {
  if ((event.keyIdentifier === "Left" || event.key === "ArrowLeft") && key_left === true)
    {
    key_left = false;
    }

  if ((event.keyIdentifier === "Right" || event.key === "ArrowRight") && key_right === true)
    {
    key_right = false;
    }
  }
