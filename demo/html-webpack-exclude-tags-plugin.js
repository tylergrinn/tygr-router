/**
 * Tyler J Grinn
 * tylergrinn@gmail.com
 * License: MIT
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { JSDOM } = require('jsdom');

/**
 * Remove all tags from your html webpack template which have an attribute named `dev`
 *
 * This plugin adds the excludeSelector option to HTML Webpack plugin. It takes a css selector to
 * use to exclude tags from an html-webpack-plugin template. By default, the selector will be
 * '[dev]' and willl remove all elements with the 'dev' attribute from your html template.
 */
module.exports = class HtmlWebpackExcludeTagsPlugin {
  static PLUGIN_NAME = 'Html webpack exclude tags plugin';

  apply(compiler) {
    compiler.hooks.compilation.tap(
      HtmlWebpackExcludeTagsPlugin.PLUGIN_NAME,
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
          HtmlWebpackExcludeTagsPlugin.PLUGIN_NAME,
          (data) => {
            data.html = this.excludeSelector(
              data.plugin.options.excludeSelector,
              data.html
            );
            return data;
          }
        );
      }
    );
  }

  excludeSelector(selector = '[dev]', html) {
    const dom = new JSDOM(html);

    dom.window.document.querySelectorAll(selector).forEach((node) => {
      node.parentNode.removeChild(node);
    });

    return dom.serialize();
  }
};
