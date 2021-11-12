/**
 * This file defines the flip tile component.
 *
 * The part exposes certain parts using style and slot to allow the user to alter the look and content of the
 * flipping tile.
 *
 * Slots:
 * - front-content
 * ---- The slot with name 'front-content' can be used to determine what's supposed to be on the front face of the card.
 * - back-content
 * ---- The slot with name 'back-content' can be used to determine what's supposed to be on the back of the card.
 *
 * Parts:
 * - front
 * ---- used to style the front side of the card
 * - back
 * ---- used to style the back of the card
 * - disabled
 * ---- used to style a disabled card
 * - hidden
 * ---- used to style a hidden card
 *
 * @author Jacob Skoog
 * @version 1.0.0
 */

const lnuImg = new URL('./pictures/lnu-symbol.png', import.meta.url).href
const template = document.createElement('template')
/*
 * Imagining the custom element as a div containing the front of the card and the back of the card, only displaying one
 * at a time.
 */
template.innerHTML = `
  <style> /* TODO: see if it is possible to make focus styling to work */
    :host {
        --dark-grey: #202020;
        --light-grey: #909090;
        --lighter-grey: #a5a5a5;
        --l: 100;
        --length: 100px;
        --radius: 10px;
        height: var(--length);
        width: var(--length);
        display: block;
        margin: 5px;
        /* Flippity Tippities */
        perspective: 1000px;
        position: relative;
    }
    :host, :host>* {
        box-sizing: border-box; /* Easier to manage box-sizing */
    }
    #tile {
        position: relative;
        height: 100%; 
        width: 100%;
        border: 2px solid var(--dark-grey);
        cursor: pointer;
        border-radius: var(--radius);
        box-shadow: 0 5px 5px var(--light-grey);
        display: block;
        background-color: ghostwhite;
        
        /* Flippity tippity */
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }
    #front, #back {
        position: absolute;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        border-radius: 12px;
        margin: 3px;
        text-align: center;
        overflow: hidden;
    }
    #tile * {
        top: 0;
        left: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        background-color: ghostwhite;
    }
    #front {
        transform: rotateY(180deg); /* Making the front face down by default */
    }
    #front>*, #back>* {
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    #back {
        background: transparent url(${lnuImg}) no-repeat center center;
        background-size: contain;
    }
    :host([face-up]) #tile {
        transform: rotateY(180deg);
    }
    :host([hidden]) #front, :host([hidden]) #back {
        opacity: 0;
    }
    :host #tile:hover {
        border: 3px solid black;
    }
    :host([hidden]) #tile {
        border: 1px dotted var(--lighter-grey);
        cursor: default;
        box-shadow: 0 5px 5px var(--lighter-grey);
    }
    :host([hidden]) #tile:hover {
        border-style: solid;
    }
    :host([disabled]) #tile {
        cursor: default;
        border: 2px dashed var(--light-grey);
        opacity: 0.5;
     }
  </style>
  <div part="tile" id="tile">
    <div part="back" id="back">
        <slot name="back-content"></slot>
    </div>
    <div part="front" id="front">
        <slot name="front-content"></slot>
    </div>
  </div>
`
/**
 * This class defines the actual element.
 */
class FlipTile extends HTMLElement {
  /**
   * The container for the tile.
   *
   * @type {HTMLDivElement}
   */
  #tile
  /**
   * The container for the front of the tile.
   *
   * @type {HTMLDivElement}
   */
  #front
  /**
   * The container for the back of the tile.
   *
   * @type {HTMLDivElement}
   */
  #back
  /**
   * The element's shadow root.
   *
   * @type {ShadowRoot}
   */
  #shadow
  /**
   * The event listener for the click (as it is created by bind).
   */
  #clickListener

  /**
   * Simple constructor to initialise private fields.
   */
  constructor () {
    super()
    this.#tile = null
    this.#front = null
    this.#back = null
    this.#shadow = null
    this.#clickListener = null
  }

  /**
   * Gets an array of observed attributes.
   *
   * @returns {string[]} An array of observed attributes.
   */
  static get observedAttributes () {
    return ['face-up']
  }

  /**
   * Fires when an observed attribute is changed.
   *
   * @param {string} name The name of the attribute.
   * @param {string} oldValue The old value of the attribute.
   * @param {string} newValue The new value of the attribute.
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'face-up') {
      this.dispatchEvent(new CustomEvent('flip', {
        detail: { innerHTML: this.innerHTML.trim() },
        bubbles: true
      }))
    }
  }

  /**
   * Putting most of the element initialisation in here as I find some things don't initialise right when put in the
   * constructor if the element is instantiated by document.createElement().
   */
  connectedCallback () {
    this.#shadow = this.attachShadow({ mode: 'open' })
    this.#shadow.appendChild(template.content.cloneNode(true))
    this.#tile = this.#shadow.getElementById('tile')
    this.#front = this.#shadow.getElementById('front')
    this.#back = this.#shadow.getElementById('back')
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0')

    this.#clickListener = this.flip.bind(this)
    this.#tile.addEventListener('click', this.#clickListener)
  }

  /**
   * Disconnects the event listeners.
   */
  disconnectedCallback () {
    this.#tile.removeEventListener('click', this.#clickListener)
  }

  /**
   * Toggles the face-up and face-down attributes.
   *
   * @param {MouseEvent} event the event fired to this event handler.
   */
  flip (event) {
    if (!this.hasAttribute('disabled') && !this.hasAttribute('hidden') && !event.altKey && !event.ctrlKey && !event.shiftKey) {
      this.toggleAttribute('face-up')
    }
  }
}
customElements.define('flip-tile', FlipTile)
export default { FlipTile }
