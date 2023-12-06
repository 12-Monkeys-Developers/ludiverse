import StandardCheck from "../dice/standard-check.mjs";
export default class LudiverseActor extends Actor {
  
  get isUnlocked() {
    if (this.getFlag(game.system.id, "SheetUnlocked")) return true;
    return false;
  }

  /**
   * Performs an action by rolling a check.
   * @param {string} composante - The component of the action.
   * @param {string} moyen - The means of the action.
   * @returns {Promise<StandardCheck>} - A promise that resolves to the rolled check.
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
