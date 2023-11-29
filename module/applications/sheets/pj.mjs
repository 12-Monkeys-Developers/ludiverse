import LudiverseActorSheet from "./actor.mjs";

export default class PJSheet extends LudiverseActorSheet {
  /**
   * Le type d'Actor qu'affiche cette Sheet
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

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    // Cocher dégâts
    html.find(".pts-vie").click(this._onCocherPv.bind(this));
    // Cocher souffle
    html.find(".pts-souffle").click(this._onCocherPs.bind(this));
    // Jet d'action
    html.find(".roll-elem").click(this._onJetAction.bind(this));
  }

  _onJetAction(event) {
    event.preventDefault();
    const dataset = event.currentTarget.dataset;
    let elem= dataset.elem;
    if(SYSTEM.COMPOSANTES.hasOwnProperty(elem)) return this.actor.rollAction(elem, "action");
    else if(SYSTEM.MOYENS.hasOwnProperty(elem)) return this.actor.rollAction("corps", elem);
    else return;
  }

  async _onCocherPv(event) {
    event.preventDefault();
    const element = event.currentTarget;
    let indexVal = parseInt(element.dataset.index);
    if(indexVal === this.actor.system.pv.valeur) await this.actor.update({ "system.pv.valeur": indexVal-1 });
    else await this.actor.update({ "system.pv.valeur": indexVal });
  }
  async _onCocherPs(event) {
    event.preventDefault();
    const element = event.currentTarget;
    let indexVal = parseInt(element.dataset.index);
    if(indexVal === this.actor.system.ps.valeur) await this.actor.update({ "system.ps.valeur": indexVal-1 });
    else await this.actor.update({ "system.ps.valeur": indexVal });
  }
}
