/**
 * App initialization is done here.
 * @module app
 */

const blessed = require("blessed");
const Layout = require("./layout");
const Keyboard = require("./keyboard");
const Jack = require("./jack_client");
const { settings } = require("../settings");
const LV2 = require("./lv2");
const store = require("./store");
const program = blessed.program();
const screen = blessed.screen({
  //   smartCSR: true,
});

try {
  store.loadUserSettings();
  LV2.init();
  Jack.init();

  // Create a screen object.
  Layout.setUpLayout(screen);
  Keyboard.registerKeyboardShortcuts(screen);
} catch (error) {
  console.trace("ERROR: " + error);
  console.log("Aborting...");
  process.exit(0);
}

screen.render();
program.enableMouse();

store.app.INITIALIZED = true;
Jack.poll();
// Set up polling
let jackPoll = setInterval(() => {
  Jack.poll();
}, store.app.SETTINGS.JACK_POLLING_RATE);

let uiPoll = setInterval(() => {
  store.notifySubscribers();
  screen.render();
}, store.app.SETTINGS.UI_UPDATE_RATE);

function exit() {
  store.clearRack();
  program.clear();
  screen.detach();
  return process.exit(0);
}

exports.exit = exit;
