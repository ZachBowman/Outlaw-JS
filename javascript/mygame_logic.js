////////////////////////////////////////////////////////////////////////////////
// Gameplay-specific logic
////////////////////////////////////////////////////////////////////////////////

// accurate & slow distance checker
// best for one-time checks
function get_distance (thing1, thing2)
  {
  return Math.sqrt (((thing1.x - thing2.x) * (thing1.x - thing2.x)) + ((thing1.y - thing2.y) * (thing1.y - thing2.y)));
  }

////////////////////////////////////////////////////////////////////////////////

// fast & inaccurate distance checker
// best for recurring checks
function close_enough (thing1, thing2, distance)
  {
  if (thing1.x > thing2.x - distance && thing1.x < thing2.x + distance
      && thing1.y - (thing1.box_height / 2) > thing2.y - (thing2.box_height / 2) - distance
      && thing1.y - (thing1.box_height / 2) < thing2.y - (thing2.box_height / 2) + distance) return true;
  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

function get_direction (x1, y1, x2, y2)
  {
  var dir_radians;
  var x_distance, y_distance;

  x_distance = x2 - x1;
  y_distance = y2 - y1;

  // get radians of direction
  if (x_distance > 0 && y_distance >= 0) dir_radians = Math.atan (y_distance / x_distance);
  else if (x_distance > 0 && y_distance < 0) dir_radians = Math.atan (y_distance / x_distance) + (2 * Math.PI);
  else if (x_distance < 0) dir_radians = Math.atan (y_distance / x_distance) + Math.PI;
  else if (x_distance === 0 && y_distance > 0) dir_radians = 90 * Math.PI / 180;
  else if (x_distance === 0 && y_distance < 0) dir_radians = 270 * Math.PI / 180;
  else dir_radians = 0;  // x_distance = 0, y_distance = 0

  return dir_radians;
  }

////////////////////////////////////////////////////////////////////////////////

function random (lowest, highest)
  {
  return Math.floor ((Math.random () * (highest - lowest + 1)) + lowest);
  }

////////////////////////////////////////////////////////////////////////////////
