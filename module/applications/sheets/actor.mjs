export default class LudiverseActorSheet extends ActorSheet {
  /** @inheritdoc */
  static get defaultOptions() {
    const options = super.defaultOptions;
    return Object.assign(options, {
      width: 800,
      height: 1200,
      classes: [SYSTEM.id, "sheet", "actor", this.actorType],
      template: `systems/${SYSTEM.id}/templates/sheets/${this.actorType}.hbs`,
      resizable: true,
      scrollY: [],
    });
  }

  /** @override */
  async getData(options) {
    const context = {};

    //const isEditable = this.actor.isUnlocked;
    //context.cssClass = isEditable ? "editable" : "locked";
    context.editable = true;

    context.actor = this.document;
    context.system = this.document.system;

    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Lock/Unlock la fiche
    html.find(".change-lock").click(this._onSheetChangelock.bind(this));
  }

  /**
   * Manage the lock/unlock button on the sheet
   *
   * @name _onSheetChangelock
   * @param {*} event
   */
  async _onSheetChangelock(event) {
    event.preventDefault();

    let flagData = await this.actor.getFlag(game.system.id, "SheetUnlocked");
    if (flagData) await this.actor.unsetFlag(game.system.id, "SheetUnlocked");
    else await this.actor.setFlag(game.system.id, "SheetUnlocked", "SheetUnlocked");
    this.actor.sheet.render(true);
  }
}
