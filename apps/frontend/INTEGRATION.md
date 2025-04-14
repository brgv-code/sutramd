# Integrating SutraMD into Your Project

This guide explains how to integrate the SutraMD Markdown editor into different frontend frameworks.

## React / Next.js Integration

### Installation

```bash
# Using yarn
yarn add sutramd

# Using npm
npm install sutramd
```

### Basic Usage

```jsx
import React, { useState } from "react";
import { MarkdownEditor } from "sutramd";

function MyComponent() {
  const [markdownContent, setMarkdownContent] = useState("# Hello, World!");

  const handleChange = (markdown) => {
    setMarkdownContent(markdown);
  };

  return (
    <div>
      <h1>My Editor</h1>
      <MarkdownEditor
        initialContent={markdownContent}
        onChange={handleChange}
        autosaveIntervalMs={3000}
      />
    </div>
  );
}

export default MyComponent;
```

## Vue Integration

### Installation

```bash
# Using yarn
yarn add sutramd

# Using npm
npm install sutramd
```

### Creating a Vue Wrapper Component

Create a file named `MarkdownEditorVue.vue`:

```vue
<template>
  <div ref="editorContainer"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, watch } from "vue";
import { MarkdownEditor } from "sutramd";
import "sutramd/dist/style.css";

export default {
  name: "MarkdownEditorVue",
  props: {
    content: {
      type: String,
      default: "",
    },
    autosaveInterval: {
      type: Number,
      default: 3000,
    },
  },
  emits: ["update:content"],
  setup(props, { emit }) {
    let editor = null;
    let container = null;

    onMounted(() => {
      container = document.createElement("div");
      editorContainer.value.appendChild(container);

      const handleChange = (markdown) => {
        emit("update:content", markdown);
      };

      renderReactComponentInVue(
        MarkdownEditor,
        {
          initialContent: props.content,
          onChange: handleChange,
          autosaveIntervalMs: props.autosaveInterval,
        },
        container
      );
    });

    onBeforeUnmount(() => {
      if (container) {
        unmountComponentAtNode(container);
      }
    });

    watch(
      () => props.content,
      (newContent) => {
        if (editor && newContent !== editor.getContent()) {
          editor.setContent(newContent);
        }
      }
    );

    return {
      editorContainer,
    };
  },
};
</script>
```

### Using the Vue Component

```vue
<template>
  <div>
    <h1>My Editor</h1>
    <MarkdownEditorVue
      v-model:content="markdownContent"
      :autosaveInterval="5000"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import MarkdownEditorVue from "./MarkdownEditorVue.vue";

export default {
  components: {
    MarkdownEditorVue,
  },
  setup() {
    const markdownContent = ref("# Hello, World!");

    return {
      markdownContent,
    };
  },
};
</script>
```

## Angular Integration

Angular integration requires creating a wrapper component to bridge the React component to Angular.

1. Install required packages:

```bash
npm install sutramd react react-dom
npm install --save-dev @types/react @types/react-dom
```

2. Create a wrapper directive:

```typescript
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { MarkdownEditor } from "sutramd";

@Directive({
  selector: "[appMarkdownEditor]",
})
export class MarkdownEditorDirective implements OnInit, OnDestroy {
  @Input() initialContent = "";
  @Input() autosaveIntervalMs = 3000;
  @Output() contentChange = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.elementRef.nativeElement);
  }

  private render() {
    const { initialContent, autosaveIntervalMs } = this;
    const onChange = (markdown: string) => {
      this.contentChange.emit(markdown);
    };

    ReactDOM.render(
      React.createElement(MarkdownEditor, {
        initialContent,
        onChange,
        autosaveIntervalMs,
      }),
      this.elementRef.nativeElement
    );
  }
}
```

3. Use the directive in an Angular component:

```typescript
// editor.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-editor",
  template: `
    <div>
      <h1>My Editor</h1>
      <div
        appMarkdownEditor
        [initialContent]="content"
        [autosaveIntervalMs]="5000"
        (contentChange)="onContentChange($event)"
      ></div>
    </div>
  `,
})
export class EditorComponent {
  content = "# Hello, World!";

  onContentChange(markdown: string) {
    this.content = markdown;
    // Save to backend or local storage
  }
}
```

4. Don't forget to add the directive to your module:

```typescript
// app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MarkdownEditorDirective } from "./markdown-editor.directive";
import { EditorComponent } from "./editor.component";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, EditorComponent, MarkdownEditorDirective],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Svelte Integration

For Svelte integration, you can use the `svelte-react` package to wrap React components:

1. Install required packages:

```bash
npm install sutramd react react-dom svelte-react
```

2. Create a Svelte wrapper component:

```svelte
<!-- MarkdownEditor.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { ReactWrapper } from 'svelte-react';
  import { MarkdownEditor } from 'sutramd';

  export let content = '# Hello, World!';
  export let autosaveInterval = 3000;

  function handleChange(markdown) {
    content = markdown;
    dispatch('change', { content: markdown });
  }

  // Create props for React component
  $: props = {
    initialContent: content,
    onChange: handleChange,
    autosaveIntervalMs: autosaveInterval
  };
</script>

<ReactWrapper component={MarkdownEditor} props={props} />
```

3. Use the component in your Svelte app:

```svelte
<!-- App.svelte -->
<script>
  import MarkdownEditor from './MarkdownEditor.svelte';

  let markdownContent = '# Hello, World!';

  function handleContentChange(event) {
    // Save to backend or local storage
    console.log('Content changed:', event.detail.content);
  }
</script>

<h1>My Editor</h1>
<MarkdownEditor
  content={markdownContent}
  autosaveInterval={5000}
  on:change={handleContentChange}
/>
```
