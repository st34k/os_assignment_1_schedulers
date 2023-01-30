// handles creating and appending elements
export function createAndAppendElement({
                                  type,
                                  parent,
                                  innerText,
                                  id,
                                  bgcolor,
                                  textAlign,
                                  width,
                                  border,
                                  left,
                                  top,
                                  pos
                                }) {
  const el = document.createElement(type)

  if (id) el.id = id;
  if (innerText) el.innerText = innerText
  if (bgcolor) el.style.backgroundColor = bgcolor
  if (textAlign) el.style.textAlign = textAlign
  if (width) el.style.width = width
  if (border) el.style.border = border
  if (left) el.style.left = left
  if (top) el.style.top = top
  if (pos) el.style.position = pos

  parent.appendChild(el)

  return el // if we wanna pass this element again as a parent
}