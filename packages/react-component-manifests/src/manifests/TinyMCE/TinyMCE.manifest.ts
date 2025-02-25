import { Id as reactSchemaId } from "@atrilabs/react-component-manifest-schema";
import type { ReactComponentManifestSchema } from "@atrilabs/react-component-manifest-schema";
import { Id as iconSchemaId } from "@atrilabs/component-icon-manifest-schema";
import { Id as CSSTreeId } from "@atrilabs/app-design-forest/src/cssTree";
import { CSSTreeOptions } from "@atrilabs/app-design-forest";
import { CustomPropsTreeOptions } from "@atrilabs/app-design-forest";
import { Id as CustomTreeId } from "@atrilabs/app-design-forest/src/customPropsTree";
import {
  Id as AttributesTreeId,
  AttributesTreeOptionsBoolean,
} from "@atrilabs/app-design-forest/src/attributesTree";

const attributesTreeOptions: AttributesTreeOptionsBoolean = {
  basics: true,
  ariaLabelledBy: false,
};

const cssTreeOptions: CSSTreeOptions = {
  boxShadowOptions: true,
  flexContainerOptions: false,
  flexChildOptions: true,
  positionOptions: true,
  typographyOptions: true,
  spacingOptions: true,
  sizeOptions: true,
  borderOptions: true,
  outlineOptions: true,
  backgroundOptions: true,
  miscellaneousOptions: true,
};

const customTreeOptions: CustomPropsTreeOptions = {
  dataTypes: {
    initialValue: { type: "text" },
    value: { type: "text" },
    disabled: { type: "boolean" },
    inline: { type: "boolean" },
    id: { type: "text" },
    contentEditable: { type: "boolean" },
    initOnMount: { type: "boolean" },
    tinymceScriptSrc: { type: "text" },
    plugins: { type: "array" },
    toolbar: {
      type: "array_enum",
      options: [
        "false",
        "forecolor  backcolor",
        "undo redo",
        "fontsize",
        "bold italic underline strikethrough",
        "alignleft aligncenter alignright alignjustify ",
        "bullist numlist outdent indent",
        "link unlink",
        "image",
        "media",
        "table",
        "charmap",
        "searchreplace",
        "code",
        "fullscreen",
        "visualblocks",
        "blockquote removeformat ",
        "subscript superscript",
        "help",
      ],
    },
    menubar: {
      type: "array_enum",
      options: ["false", "file", "edit", "view", "insert", "format"],
    },
    statusbar: { type: "boolean" },
    branding: { type: "boolean" },
    resize: { type: "boolean" },
    paste_data_images: { type: "boolean" },
  },
};

const compManifest: ReactComponentManifestSchema = {
  meta: { key: "TinyMCE", category: "Basics" },
  dev: {
    decorators: [],
    attachProps: {
      styles: {
        treeId: CSSTreeId,
        initialValue: { height: "500px" },
        treeOptions: cssTreeOptions,
        canvasOptions: { groupByBreakpoint: true },
      },
      custom: {
        treeId: CustomTreeId,
        initialValue: {
          initialValue: "This is the initial content of the editor.",
          statusbar: true,
          resize: true,
          branding: true,
          paste_data_images: true,
          contentEditable: true,
          plugins: [
            "lists",
            "link",
            "image",
            "media",
            "table",
            "charmap",
            "searchreplace",
            "code",
            "fullscreen",
            "visualblocks",
          ],
        },
        treeOptions: customTreeOptions,
        canvasOptions: { groupByBreakpoint: false },
      },
      attrs: {
        treeId: AttributesTreeId,
        initialValue: {},
        treeOptions: attributesTreeOptions,
        canvasOptions: { groupByBreakpoint: false },
      },
    },
    attachCallbacks: {
      onClick: [{ type: "do_nothing" }],
      onEditorChange: [{ type: "do_nothing" }],
    },
    defaultCallbackHandlers: {
      onClick: [{ sendEventData: true }],
    },
  },
};

const iconManifest = {
  panel: { comp: "CommonIcon", props: { name: "TinyMCE" } },
  drag: {
    comp: "CommonIcon",
    props: { name: "TinyMCE", containerStyle: { padding: "1rem" } },
  },
  renderSchema: compManifest,
};

export default {
  manifests: {
    [reactSchemaId]: compManifest,
    [iconSchemaId]: iconManifest,
  },
};
