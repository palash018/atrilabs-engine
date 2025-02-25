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
    rows: { type: "array" },
    cols: { type: "array" },
    checkboxSelection: { type: "boolean" },
    autoHeight: { type: "boolean" },
    numRows: { type: "number" },
    rowHeight: { type: "number" },
    selection: { type: "array" },
  },
};

const compManifest: ReactComponentManifestSchema = {
  meta: { key: "Table", category: "Data" },
  dev: {
    decorators: [],
    attachProps: {
      styles: {
        treeId: CSSTreeId,
        initialValue: {
          height: "400px",
        },
        treeOptions: cssTreeOptions,
        canvasOptions: { groupByBreakpoint: true },
      },
      custom: {
        treeId: CustomTreeId,
        initialValue: {
          rows: [],
          cols: [],
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
      onSelectionChange: [
        { type: "controlled", selector: ["custom", "selection"] },
      ],
    },
    defaultCallbackHandlers: {},
  },
};

const iconManifest = {
  panel: { comp: "CommonIcon", props: { name: "Table" } },
  drag: {
    comp: "CommonIcon",
    props: { name: "Table", containerStyle: { padding: "1rem" } },
  },
  renderSchema: compManifest,
};

export default {
  manifests: {
    [reactSchemaId]: compManifest,
    [iconSchemaId]: iconManifest,
  },
};
