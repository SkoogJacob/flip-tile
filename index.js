/**
 * Index script file for the component
 *
 * @author Jacob Skoog <js224wv@student.lnu.se>
 * @version 1.0.5
 */
import FlipTile from "./flip-tile.js";

function defineFlipTile() {
    customElements.define('flip-tile', FlipTile)
}

export default defineFlipTile;
