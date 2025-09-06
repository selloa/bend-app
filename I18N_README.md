# Internationalization (i18n) System for Bend App

## Overview
The Bend app now includes a comprehensive internationalization system supporting **English**, **German**, and **Spanish** with built-in infrastructure for easy expansion to additional languages.

## Features

### ✅ **Supported Languages**
- 🇺🇸 **English** (en) - Default language
- 🇩🇪 **German** (de) - Deutsch
- 🇪🇸 **Spanish** (es) - Español

### 🌟 **Key Features**
- **Language Detection** - Automatically detects user's browser language
- **Language Persistence** - Remembers user's language choice
- **Dynamic Switching** - Change languages without page reload
- **Fallback System** - Falls back to English if translation missing
- **Future-Ready** - Easy to add new languages
- **Unicode Support** - Full UTF-8 support for user-generated content
- **Accessibility** - Proper language attributes for screen readers

## Files Structure

```
bend-app/
├── i18n.js              # Core internationalization system
├── i18n-styles.css      # Language selector styling
├── index.html           # Updated with i18n attributes
├── script.js            # Updated with i18n integration
└── I18N_README.md       # This documentation
```

## How It Works

### 1. **Language Detection**
The system automatically detects the user's preferred language in this order:
1. Saved language preference (localStorage)
2. Browser language setting
3. Default to English

### 2. **Translation Keys**
Text is organized using dot notation:
- `app.title` → "Bend"
- `navigation.back` → "Back" / "Zurück" / "Atrás"
- `timer.switchSides` → "Switch sides" / "Seite wechseln" / "Cambia de lado"

### 3. **Usage in HTML**
```html
<!-- Text content translation -->
<h1 data-i18n="app.title">Bend</h1>

<!-- Attribute translation -->
<button data-i18n-attr="aria-label" data-i18n="accessibility.toggleDarkMode">

<!-- Placeholder translation -->
<input data-i18n-placeholder="userRoutines.routineName">
```

### 4. **Usage in JavaScript**
```javascript
// Get translation
const text = window.i18n.t('navigation.back');

// Translation with parameters
const progress = window.i18n.t('timer.progress', { current: 1, total: 8 });

// Change language
window.i18n.changeLanguage('de');
```

## Current Translations

### **Navigation**
| Key | English | German | Spanish |
|-----|---------|---------|---------|
| `navigation.back` | Back | Zurück | Atrás |
| `navigation.next` | Next | Weiter | Siguiente |
| `navigation.start` | Start | Start | Comenzar |
| `navigation.pause` | Pause | Pause | Pausar |

### **Timer**
| Key | English | German | Spanish |
|-----|---------|---------|---------|
| `timer.switchSides` | Switch sides | Seite wechseln | Cambia de lado |
| `timer.exerciseComplete` | Exercise Complete | Übung abgeschlossen | Ejercicio Completado |
| `timer.routineComplete` | Routine Complete | Routine abgeschlossen | Rutina Completada |

### **Routines**
| Key | English | German | Spanish |
|-----|---------|---------|---------|
| `routines.wakeUp` | Wake Up | Aufwachen | Despertar |
| `routines.neckShoulders` | Neck & Shoulders | Nacken & Schultern | Cuello y Hombros |
| `routines.fullBody` | Full Body | Ganzkörper | Cuerpo Completo |

### **Body Areas**
| Key | English | German | Spanish |
|-----|---------|---------|---------|
| `folders.hips` | Hips | Hüften | Caderas |
| `folders.shoulders` | Shoulders | Schultern | Hombros |
| `folders.lowerBack` | Lower Back | Unterer Rücken | Espalda Baja |

## Adding New Languages

### 1. **Update i18n.js**
Add the new language to the translations object:
```javascript
fr: {
    app: {
        title: "Bend",
        subtitle: "Étirement et Flexibilité"
    },
    // ... rest of translations
}
```

### 2. **Update Available Languages**
Add to the `getAvailableLanguages()` method:
```javascript
{ code: 'fr', name: 'French', flag: '🇫🇷' }
```

## User-Generated Content Support

The system is designed to handle user-created routines in multiple languages:

```javascript
// Prepare user routine with i18n support
const userRoutine = window.i18n.prepareUserRoutine({
    name: "Mon Routine Personnalisée",
    description: "Une routine créée par l'utilisateur",
    exercises: [...]
});
```

## Accessibility Features

- **Language Attributes** - Proper `lang` and `dir` attributes
- **Screen Reader Support** - ARIA labels in user's language  
- **Keyboard Navigation** - Language selector accessible via keyboard
- **High Contrast** - Language selector supports high contrast mode

## Future Enhancements

### **Planned Languages**
- 🇫🇷 French (Français)
- 🇮🇹 Italian (Italiano)
- 🇵🇹 Portuguese (Português)
- 🇷🇺 Russian (Русский)
- 🇯🇵 Japanese (日本語)
- 🇰🇷 Korean (한국어)
- 🇨🇳 Chinese (中文)
- 🇸🇦 Arabic (العربية) - RTL support included

### **Advanced Features**
- **Exercise Translation** - Translate exercise names and descriptions
- **Voice Prompts** - Multi-language audio cues
- **Cultural Adaptations** - Exercise variations for different cultures
- **Regional Preferences** - Time formats, measurement units

## Testing the i18n System

1. **Open the app** in a web browser
2. **Click the language selector** (flag icon in header)
3. **Select different languages** and verify:
   - Interface text changes immediately
   - Language preference is saved
   - All UI elements are translated
   - No broken text or missing translations

## Development Tips

- **Always provide English fallback** - Ensures app never breaks
- **Use semantic keys** - `timer.switchSides` not `switchSidesText`
- **Test with long translations** - German text is often longer
- **Consider context** - Same English word may have different translations
- **Unicode awareness** - Ensure proper UTF-8 encoding

The i18n system is designed to be robust, maintainable, and user-friendly while supporting the app's future growth into global markets! 🌍
