const blessed = require("blessed");
const contrib = require("blessed-contrib");
const Layout = require("../layout");
const { settings } = require("../../settings");
const { wlogError, wlog } = require("../layout");

var log = {};

function make(grid, x, y, xSpan, ySpan) {
  log = grid.set(y, x, ySpan, xSpan, blessed.log, {
    tags: true,
    label: "Logs",
    input: false,
    mouse: true,
    interactive: true,
    keys: false,
    style: {
      focus: {
        border: { fg: "red" },
        //   enabled: false,
      },
    },
  });

  //   log.on("click", function (data) {
  //     screen.copyToClipboard("ssss");
  //     wlog("Log copied to clipboard.");
  //   });

  return log;
}

function update() {}

exports.make = make;
exports.update = update;
