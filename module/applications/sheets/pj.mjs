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
}
