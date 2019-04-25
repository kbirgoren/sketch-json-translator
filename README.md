### Translate-From-JSON
A Sketch plugin lets you use variables for texts in your designs.

### Installation
1. [Download](https://github.com/kbirgoren/sketch-json-translator.git) the plugin
2. Double click the plugin file to automatically install
3. The shortcut should now be available under the `Plugin`'s menu in `Sketch`

### How to use?

- Create your langauge JSON like below. Don't forget to create another object for each language.

```json
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

- Change your text layer name you want to set as variable between brackets like `[page1.hello]` , `[page1.bye]`
- Go to `Plugin` / `Translate` / `Import JSON` in Sketch
- Select your `JSON ` formatted file 
- Select language you want to use
- Booom! Let the magic happen!

### Useful Tips
If you added new variables to your artboard after you import the JSON file, you can always go to `Plugin` / `Translate` / `Update All Texts` or use short cut <kbd>cmd</kbd> + <kbd>option</kbd> + <kbd>T</kbd>
