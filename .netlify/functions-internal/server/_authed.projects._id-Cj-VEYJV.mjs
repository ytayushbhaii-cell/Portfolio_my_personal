import { n as useSuspenseQuery, o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as projectByIdQuery, t as Route } from "./_authed.projects._id-Cb6g1ASH.mjs";
import { t as ProjectEditor } from "./_ssr/ProjectEditor-F7Tf6qNN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed.projects._id-Cj-VEYJV.js
var import_jsx_runtime = require_jsx_runtime();
function EditProjectRoute() {
	const { id } = Route.useParams();
	const project = useSuspenseQuery(projectByIdQuery(id)).data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectEditor, { existing: project });
}
//#endregion
export { EditProjectRoute as component };
