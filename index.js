/**
 * Index script file for the component
 *
 * @author Jacob Skoog <js224wv@student.lnu.se>
 * @version 1.0.10
 */
import FlipTile from "./flip-tile.js";

/**
 * Defines the flip-tile element when called.
 *
 * @param {string} tagName the user can determine their own name for the element by passing a custom element tag-name here.
 */
function defineFlipTile(tagName = 'flip-tile') {
    if (!tagName.includes('-', 1)) throw new Error('A custom tag name must contain a hyphen (\'-\')')
    customElements.define(tagName, FlipTile)
}

export default defineFlipTile;
