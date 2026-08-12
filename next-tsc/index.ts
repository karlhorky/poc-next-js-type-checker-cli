import { createProjectService } from '@typescript-eslint/project-service';
import ts from 'typescript';

const fileName = ts.sys.resolvePath('app/layout.tsx');
const { service } = createProjectService({
  options: { loadTypeScriptPlugins: true },
});
service.openClientFile(fileName);

const diagnostics = service
  .getScriptInfo(fileName)!
  .getDefaultProject()
  .getLanguageService(true)
  .getSemanticDiagnostics(fileName);

service.closeClientFile(fileName);

if (diagnostics.length > 0) {
  console.error(
    ts.formatDiagnostics(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n',
    }),
  );
  process.exitCode = 2;
}
