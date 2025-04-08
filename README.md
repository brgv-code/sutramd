# SutraMD

An Obsidian-like Markdown editor for the web, built with TipTap, React, and Next.js.

## Features

- Rich text editing with Markdown support
- Dark mode by default
- Support for tables, task lists, code blocks with syntax highlighting
- Preview mode
- Autosave functionality
- Customizable toolbar
- Easily portable and reusable

## Installation

```bash
# Install in your React/Next.js project
yarn add sutramd

# Or using npm
npm install sutramd
```

## Usage

### Basic Usage

```jsx
import { MarkdownEditor } from "sutramd";

function MyEditor() {
  const handleChange = (markdown) => {
    console.log("Markdown content:", markdown);
    // Save to your backend, localStorage, etc.
  };

  return (
    <MarkdownEditor
      initialContent="# Hello, world!\n\nThis is a **markdown** editor."
      onChange={handleChange}
      autosaveIntervalMs={5000} // 5 seconds
    />
  );
}

export default MyEditor;
```

### Props

| Prop                 | Type     | Default     | Description                                                      |
| -------------------- | -------- | ----------- | ---------------------------------------------------------------- |
| `initialContent`     | string   | `''`        | Initial markdown content                                         |
| `onChange`           | function | `undefined` | Callback that receives the markdown content when it changes      |
| `autosaveIntervalMs` | number   | `3000`      | Interval in milliseconds between autosaves (set to 0 to disable) |

## Development

```bash
# Install dependencies
yarn

# Start dev server
yarn dev

# Build for production
yarn build

# Run production server
yarn start
```

## License

MIT
