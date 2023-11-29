import { SYSTEM } from "../config/system.mjs";

/**
 * Prompt the user to perform a Standard Check.
 * @extends {Dialog}
 */
export default class ActionDialog extends Dialog {
  /**
   * A StandardCheck dice instance which organizes the data for this dialog
   * @type {StandardCheck}
   */
  roll = this.options.roll;

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 500,
      height: 360,
      classes: ["ludiverse", "roll"],
      template: `systems/${SYSTEM.id}/templates/dice/standard-check-dialog.hbs`,
      submitOnChange: true,
      closeOnSubmit: false,
    });
  }

  /** @override */
  async getData(options = {}) {
    const data = this.roll.data;
    const context = await super.getData(options);
    context.system = data.actorData.system;
    context.rollMode = this.options.rollMode || game.settings.get("core", "rollMode");

    return foundry.utils.mergeObject(context, data);
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  }

  /*  Factory Methods                             */

  /** @inheritdoc */
  static async prompt(config = {}) {
    config.callback = this.prototype._onSubmit;
    config.options.jQuery = false;
    config.rejectClose = false;
    return super.prompt(config);
  }

  /**
   * Return dialog submission data as a form data object
   * @param {HTMLElement} html    The rendered dialog HTML
   * @returns {StandardCheck}     The processed StandardCheck instance
   * @private
   */
  _onSubmit(html) {
    const form = html.querySelector("form");
    const fd = new FormDataExtended(form);

    this.roll.initialize(fd.object);
    return this.roll;
  }
}
