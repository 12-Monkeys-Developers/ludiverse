import LudiverseActorSheet from "./actor.mjs";

/**
 * Represents a character sheet for a player character (PJ).
 * Extends the LudiverseActorSheet class.
 */
export default class PJSheet extends LudiverseActorSheet {
  /** @inheritdoc */
  static get defaultOptions() {
    const options = super.defaultOptions;
    return Object.assign(options, {
      width: 800,
      height: 1200,
    });
  }

  /**
   * The type of actor that this sheet displays.
   * @type {string}
   */
  static actorType = "pj";

  /** @override */
  async getData(options) {
    const context = await super.getData(options);

    context.system = this.document.system;
    context.descriptionHTML = TextEditor.enrichHTML(this.actor.system.description, { async: false });
    context.equipementHTML = TextEditor.enrichHTML(this.actor.system.equipement, { async: false });
    context.capacites1HTML = TextEditor.enrichHTML(this.actor.system.capacites.capacite1.description, { async: false });
    context.capacites2HTML = TextEditor.enrichHTML(this.actor.system.capacites.capacite2.description, { async: false });
    context.capacites3HTML = TextEditor.enrichHTML(this.actor.system.capacites.capacite3.description, { async: false });
    context.unlocked = this.actor.isUnlocked;
    context.locked = !this.actor.isUnlocked;

    return context;
  }

  /**
   * Activates event listeners for the sheet's HTML elements.
   * @param {HTMLElement} html - The HTML element of the sheet.
   */
  activateListeners(html) {
    super.activateListeners(html);
    // Cocher Points de Vie
    html.find(".pts-vie").click(this._onCocherPv.bind(this));
    // Cocher Points de Souffle
    html.find(".pts-souffle").click(this._onCocherPs.bind(this));
    // Jet d'action
    html.find(".roll-elem").click(this._onJetAction.bind(this));
  }

  /**
   * Event handler for the "Jet d'action" click event.
   * @param {Event} event - The click event.
   */
  _onJetAction(event) {
    event.preventDefault();
    const dataset = event.currentTarget.dataset;
    let elem = dataset.elem;
    if (SYSTEM.COMPOSANTES.hasOwnProperty(elem)) return this.actor.rollAction(elem, "action");
    else if (SYSTEM.MOYENS.hasOwnProperty(elem)) return this.actor.rollAction("corps", elem);
    else return;
  }

  /**
   * Event handler for the "Cocher Points de vie" click event.
   * @param {Event} event - The click event.
   */
  async _onCocherPv(event) {
    event.preventDefault();
    const element = event.currentTarget;
    let indexVal = parseInt(element.dataset.index);
    if (indexVal === this.actor.system.pv.valeur) await this.actor.update({ "system.pv.valeur": indexVal - 1 });
    else await this.actor.update({ "system.pv.valeur": indexVal });
  }

  /**
   * Event handler for the "Cocher Points de souffle" click event.
   * @param {Event} event - The click event.
   */
  async _onCocherPs(event) {
    event.preventDefault();
    const element = event.currentTarget;
    let indexVal = parseInt(element.dataset.index);
    if (indexVal === this.actor.system.ps.valeur) await this.actor.update({ "system.ps.valeur": indexVal - 1 });
    else await this.actor.update({ "system.ps.valeur": indexVal });
  }
}
