To use this

> yarn icons:create

the cofiguration

```json 
{
    "icons:create": "npx @svgr/cli --typescript --no-dimensions --out-dir ./src/components/illustrations/icons  ./src/components/illustrations/source/feather --config-file ./src/components/illustrations/svgr-config.json --template ./src/components/illustrations/svg-template.ts  --index-template ./src/components/illustrations/index-template.ts"
}
```
The above will create a react component for each svg icons in the source directory including the index.ts file for exporting the icons.
  
Other configurable options in the config file `svgr-config.json
```json 
{
  "typescript": true,
  "removeViewBox": false,
  "replaceAttrValues": {
    "white": "{props.color || `#FFFFFF`}",
    "#FFFFFF": "{props.color || `#FFFFFF`}",
    "black": "{props.color || `#000000`}",
    "#111111": "{props.color || `#000000`}",
    "#000": "{props.color || `#000000`}"
  },
  "svgProps": {
    "width": "{props.width || 24}",
    "height": "{props.height || 24}",
    "className": "{props.className || ''}",
    "role": "img"
  }
}

```

The svg-template.ts file contains the following.
```javascript
const comments = `
// Auto-generated file created by svgr-cli source svg-template.js
// Run yarn icons:create to update
// Do not edit
`;
// @ts-ignore
const template = (variables, { tpl }) => {
  return tpl`
${comments}
${variables.imports};
${variables.interfaces};
const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);
${variables.exports};
`;
};

module.exports = template;

//Path: src/components/blocks/icons/svg-template.ts
```

Lastly dont forget to update the .gitignore file
by add the source directory like this:

``` .gitignore
# icons sources
src/components/illustrations/source/
```
