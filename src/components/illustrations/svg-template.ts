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
