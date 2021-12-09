# flip-tile

This readme will document how the flip-tile component can be used.

## Overview

The flip tile is a custom element with a front and a back. The element will
animate a simple rotation animation when clicked. It will also fire a 
custom event of type 'flip' when the face-up element is changed. The event
has the innerHTML of the flipped element in 'event.detail.innerHTML'.

For styling and control, the element has a couple of boolean attributes,
styling parts, and slots.

The flip has an animation time of 0.8s.

[front](.readme/front.png)

[back](.readme/back.png)

## Boolean Attributes

The component makes use of three boolean attributes:
- face-up
- hidden
- disabled

### face-up

Toggling this attribute will flip the card. The card is facedown by default.

### hidden

If this attribute is present the element will not be displayed at all.

### disable

If this attribute is present the element will become unflipable, but the
current face will still be visible.

## Styling parts

This element has three exposed parts for styling:
- tile
- front
- back

### tile

This controls the style of the tile container, which is the parent of the
front and back faces of the tile.

By default, the style control for the flipping animation is here. The tile
is also slightly larger than the front and back faces, so if it has a
different background colour than the faces it will be like a coloured border.

### front

This part allows for styling the front face of the tile. The most important
css style rule is backface-visibility: hidden.

### back

This part allows for styling the front face of the tile. The most important
css styling is backface-visibility: hidden.

The image on the back of the card is set using the background style rule.

## HTML Slots

The element has two HTML slots to control the content of the tile:
- front-content
- back-content

### front-content

This slot can be used to slot in content for the front of the tile.

### back-content

This slot can be used to slot in content for the back of the tile.  
