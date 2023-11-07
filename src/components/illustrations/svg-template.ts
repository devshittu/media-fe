const comments = `
// Auto-generated file created by svgr-cli
// Run yarn icons:create to update
// Do not edit
`;

// @ts-ignore
const template = (variables, { tpl }) => {
  return tpl`
${comments}
${variables.imports};
${variables.interfaces};
const ${variables.componentName} = React.forwardRef((props: SVGProps<SVGSVGElement>, ref: React.Ref<SVGSVGElement>) => {
  return React.cloneElement(${variables.jsx}, { ...props, ref });
});
${variables.componentName}.displayName = '${variables.componentName}';
${variables.exports};
`;
};

module.exports = template;

// Path: src/components/blocks/icons/svg-template.ts
