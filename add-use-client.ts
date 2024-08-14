// add-use-client.ts
import { API, FileInfo, Options } from 'jscodeshift';

const hooks = [
  'useEffect',
  'useState',
  'useContext',
  'useReducer',
  'useMemo',
  'useCallback',
];

module.exports = function (fileInfo: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const hasClientHookImport =
    root
      .find(j.ImportDeclaration)
      .filter((path) => {
        return (
          path.node.source.value === 'react' &&
          path.node.specifiers.some((specifier) => {
            return (
              specifier.imported && hooks.includes(specifier.imported.name)
            );
          })
        );
      })
      .size() > 0;

  if (hasClientHookImport) {
    const firstNode = root.find(j.Program).get('body', 0);
    firstNode.insertBefore(
      j.expressionStatement(j.stringLiteral('use client')),
    );
  }

  return root.toSource();
};
