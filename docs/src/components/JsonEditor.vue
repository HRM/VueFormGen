<template>
  <div ref="editor" class="editor"></div>
</template>
<script setup lang="ts">
import { oneDark } from "@codemirror/theme-one-dark";
import { json, jsonParseLinter, jsonLanguage } from "@codemirror/lang-json";
import { EditorView, keymap } from "@codemirror/view";
import { linter } from "@codemirror/lint";
import { defaultKeymap } from "@codemirror/commands";
import { hoverTooltip } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { autocompletion } from "@codemirror/autocomplete";
import {
  jsonSchemaLinter,
  jsonSchemaHover,
  jsonCompletion,
  stateExtensions,
  handleRefresh,
} from "codemirror-json-schema";
import schema from "@/assets/JSONschema7.json";
import { onBeforeUnmount, useTemplateRef, watch} from "vue";

const ref = useTemplateRef("editor");
let editorView: EditorView | null = null;

const model = defineModel({
  default: `{ "type": "object" }`,
  type: String,
});

const themeExtension = EditorView.theme({
  "&.cm-focused": {
    outline: "none",
  },
  "&.cm-editor": {
    borderRadius: "var(--border-radius)",
    padding: "var(--space-1)",
    height: "100%",
  },
  ".cm-content":{
    fontFamily: "var(--font-code)",
    fontSize: "var(--code-font-size)"
  },
  ".cm-scroller::-webkit-scrollbar" : {
    width : '.5rem',
    height: '.5rem'
  },
  ".cm-scroller::-webkit-scrollbar-thumb" : {
    background : 'rgba(255,255,255,.1)',
    borderRadius : '0.5rem'
  },
  ".cm-scroller::-webkit-scrollbar-thumb:hover" : {
    background : 'rgba(255,255,255,.5)'
  },
  ".cm-scroller::-webkit-scrollbar-track" : {
  background : 'transparent'
  },
  ".cm-scroller::-webkit-scrollbar-corner":{
    background : 'transparent'
  }
});

const updateListener = EditorView.updateListener.of((update) => {
  if (update.docChanged) {
    model.value = update.state.doc.toString();
  }
});

watch(model, (value) => {
  if (editorView&&editorView.state.doc.toString() !== value) {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: value,
      },
    });
  }
});

watch(ref, (element)=>{
  if (element) {
    if (editorView) {
      editorView.destroy();
    }
    editorView = new EditorView({
      parent: element,
      doc: model.value,
      extensions: [
        json(),
        autocompletion(),
        linter(jsonParseLinter(), {
          delay: 300,
        }),
        linter(jsonSchemaLinter(), {
          needsRefresh: handleRefresh,
        }),
        jsonLanguage.data.of({
          autocomplete: jsonCompletion(),
        }),
        hoverTooltip(jsonSchemaHover()),
        stateExtensions(schema as any),
        keymap.of(defaultKeymap.concat(indentWithTab)),
        oneDark,
        themeExtension,
        updateListener,
      ],
    });
  }
});

onBeforeUnmount(() => {
  if (editorView) {
    editorView.destroy();
  }
});
</script>
