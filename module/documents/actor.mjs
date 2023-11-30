import StandardCheck from "../dice/standard-check.mjs";
export default class LudiverseActor extends Actor {
  get isUnlocked() {
    if (this.getFlag(game.system.id, "SheetUnlocked")) return true;
    return false;
  }

  /**
   * Roll a skill check for a given skill ID.
   *
   * @param {string} qualiteId      The ID of the skill to roll a check for, for example "courage"
   * @param {number} [diff]         A known difficulty
   * @param {string} [rollMode]   The roll visibility mode to use, default is the current dropdown choice
   * @param {boolean} [dialog]    Display a dialog window to further configure the roll. Default is false.
   * @param {Object} [defaultValues]    Contient les valeurs par défaut, utilisées lors que c'est un item Action qui est à l'origine du jet
   * action : nom de l'action, aspect, aspectAlt, attribut, attributAlt, categorie, controle, formulaHtml, opposition, parDefaut, qualite, qualiteAlt
   * @return {StandardCheck}      The StandardCheck roll instance which was produced.
   */
  async rollAction(composante, moyen) {
    // Prepare check data
    let rollData = {
      actorId: this.id,
      actorData: this.system,
      composante: composante,
      moyen: moyen,
    };

    // Create the check roll
    //let sc = new StandardCheck(rollData);

    // Create the check roll
    let sc = new StandardCheck(rollData);

    // Prompt the user with a roll dialog
    const flavor = "Réaliser une action";
    const title = "Réaliser une action";
    const response = await sc.dialog({ title, flavor });
    if (response === null) return null;

    sc = await sc.roll();
    // Execute the roll to chat
    await sc.toMessage();
    return sc;
  }
}
