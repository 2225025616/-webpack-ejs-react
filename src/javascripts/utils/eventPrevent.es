export function stopBubbleAndDefault(e) {
  cancelBubble(e);
  preventDefault(e);
}

export function cancelBubble(e) {
  if (e && e.stopPropagation)
    e.stopPropagation();
  else
    e.cancelBubble = true;
}

export function preventDefault(e) {
  if (e && e.preventDefault)
    e.preventDefault();
  else
    e.returnValue = false;
}