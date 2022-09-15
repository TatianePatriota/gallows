function createSprite(seletor) {
  var $el = $(seletor);
  var frames = [
    "frame1",
    "frame2",
    "frame3",
    "frame4",
    "frame5",
    "frame6",
    "frame7",
    "frame8",
    "frame9",
  ];

  var current = 0;
  var last = frames.length - 1;
  $el.addClass(frames[current]);

  function moveFrame(from, to) {
    $el.removeClass(from).addClass(to);
  }

  function hasNext() {
    return current +1 <= last;
  }

  function nextFrame() {
    if(hasNext()){
      moveFrame(frames[current], frames[++current]);
    };
  }

  function reset() {
    moveFrame(frames[current], frames[0]);
    current = 0;
  }

  function isFinished() {
    return !hasNext();
  }

  return {
    nextFrame: nextFrame,
    reset: reset,
    isFinished: isFinished,
  };
}
