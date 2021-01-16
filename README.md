# Important Note
Thanks for your interest.

It's been a very long time since I developed this plugin.  I guess many new version has been released by Sketch during that time and I could not have any time to keep the plugin up to date with new versions. 

Unfortunately I don't expect to update the plugin soon either. So sorry for that :(

---

# Translate From JSON
[<img src="https://img.shields.io/badge/release-v1.2.6-brightgreen.svg">](https://github.com/kbirgoren/sketch-json-translator/releases/tag/1.2.6)

A Sketch plugin lets you use variables for texts in your designs.

### Installation
1. [Download](https://github.com/kbirgoren/sketch-json-translator/releases/tag/1.2.6) the plugin
2. Double click the plugin file to automatically install
3. The shortcut should now be available under the `Plugin`'s menu in `Sketch`

Or Install with Sketchpacks

<a href="https://sketchpacks.com/kbirgoren/sketch-json-translator/install">
  <img width="160" height="41" src="http://sketchpacks-com.s3.amazonaws.com/assets/badges/sketchpacks-badge-install.png" >
</a>

### How to use?

Create your langauge JSON like below. Don't forget to create an object for each language.

```javascript
{
  "en": {
    "page1": {
      "hello": "Hello English",
      "bye": "Good bye English!"
    }
  },
  "nl": {
    "page1": {
      "hello": "Hello Dutch",
      "bye": "Good Bye Dutch!"
    }
  },
  "de": {
    "page1": {
      "hello": "Hello German",
      "bye": "Good Bye German!"
    }
  }
}
```

#### Text Layers
- Change your text layer name you want to set as variable between square brackets

Example: `[page1.hello]` , `[page1.bye]`

#### Symbols
- Create your symbol and give unique names to text layers in it.
- Add your symbol to your artboard.
- Add your override name & JSON key between braclets after your symbol name.

Example: `MyButtonSymbol (button_text=[button.submit])`
- If you have multiple text overrides in a symbol add comma between definations.

Example: `HeaderSymbol (title=[homepage.title],subtitle=[homepage.subtitle])`

#### Apply It
- Go to `Plugin` / `Translate` / `Import JSON` in Sketch
- Select your `JSON ` formatted file 
- Select language you want to use
- Booom! Let the magic happen!

### Useful Tips
If you added new variables to your artboard after you import the JSON file, you can always go to `Plugin` / `Translate` / `Update All Texts` or use short cut <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>T</kbd>
