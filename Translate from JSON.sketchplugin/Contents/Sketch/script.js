var sketch = require('sketch');

var stringify = function(obj, prettyPrinted) {
    var prettySetting = prettyPrinted ? NSJSONWritingPrettyPrinted : 0,
    jsonData = [NSJSONSerialization dataWithJSONObject:obj options:prettySetting error:nil];
    return [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
}

var saveLanguageFile = function(text, filePath) {
    var p = filePath;
    var t = [NSString stringWithFormat:@"%@", text],
    f = [NSString stringWithFormat:@"%@", p.replace('Sketch/script.js','Resources/language.json')];
    return [t writeToFile:f atomically:true encoding:NSUTF8StringEncoding error:nil];
}

var readLanguageFile = function(filePath, mutable) {
    var p = filePath.replace('Sketch/script.js', 'Resources/language.json')
    var data = [NSData dataWithContentsOfFile: p];
    var options = mutable == true ? NSJSONReadingMutableContainers : 0
    return [NSJSONSerialization JSONObjectWithData: data options: options error: nil];
}

var checkRegex = function(string){
    if (string.match(/\[(.*?)\]/)) return string.match(/\[(.*?)\]/)[1];
    else return false;
}

var checkVariablesForSymbol = function(string){
    if (string.match(/\((.*?)\)/)) return string.match(/\((.*?)\)/)[1];
    else return false;
}

var importFile = function (context) {
    
    sketch.UI.message('Translate from JSON')
    
    var contextApi = context.api();
    var languageFile = null;
    var languageData = null;
    
    var openPanel = NSOpenPanel.openPanel();
    openPanel.setCanChooseFiles(true)
    openPanel.setCanChooseDirectories(false)
    openPanel.setAllowsMultipleSelection(false)
    openPanel.setAllowedFileTypes(["json"])
    openPanelButtonPressed = openPanel.runModal()
    
    if (openPanelButtonPressed == NSFileHandlingPanelOKButton) {
        languageFile = openPanel.URL()
    } else {
        sketch.UI.message('Cancelled')
    }

    var fileContent = JSON.parse(NSString.stringWithContentsOfFile(languageFile))
    saveLanguageFile(stringify(fileContent), context.scriptPath);
    updateLanguage(context)
}
var updateLanguage = function (context) {
    
    sketch.UI.message('Updating...')
    
    var contextApi = context.api();
    var document = sketch.getSelectedDocument();
    var selectedLanguage = null;
    var languageData = readLanguageFile(context.scriptPath);
    var availableLanguages = Object.keys(languageData);
    var dropdown = contextApi.getSelectionFromUser("Choose A Language", availableLanguages, 0);
    
    dropdownSelectedIndex = dropdown[1];
    selectedLanguage = availableLanguages[dropdownSelectedIndex];
    document.pages.forEach(translate)

    function translate(page) {
        page.layers.forEach(layer => {
            layer.layers.forEach(layer => {
                
                if (layer.type === 'Text') {
                    var variableName = layer.name
                    if (checkRegex(variableName)) {
                        sketch.UI.message('Translating:' + variableName)
                        translation = eval('languageData.' + selectedLanguage + '.' + checkRegex(variableName) + '')
                        if (translation) layer.text = translation;
                        else layer.text = 'ERROR:' + variableName + '';
                        layer.name = variableName;
                    }
                }

                if (layer.type == 'SymbolInstance' && checkVariablesForSymbol(layer.name)){
                    var variables = checkVariablesForSymbol(layer.name)
                    var variablesArray = variables.split(',')                       
                    for(i=0; i < variablesArray.length; i++){       
                        var overrideName = variablesArray[i].split('=')[0]
                        var variableName = variablesArray[i].split('=')[1]              
                        layer.overrides.forEach(override=>{
                            translation = eval('languageData.' + selectedLanguage + '.' + checkRegex(variableName) + '')
                            if (override.affectedLayer.name === overrideName) {
                                if (translation) override.value = translation
                                else override.value = 'ERROR:' + variableName + '';
                            }
                        })
                    }
                }

               
                // if (layer.type === 'SymbolInstance') {
                //     layer.overrides.forEach(override => {
                //         variableName = layer.name
                //         if (checkRegex(variableName)) {
                //             translation = eval('languageData.' + selectedLanguage + '.' + checkRegex(variableName) + '')
                //             if (override.affectedLayer.type === 'Text') {
                //                 if (translation) override.value = translation;
                //                 else override.value = 'ERROR:' + variableName + '';
                //             }
                //         }
                //     })
                // }
            })
        })
        sketch.UI.message('Translated')
    }
}