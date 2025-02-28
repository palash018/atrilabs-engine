const upath = require("upath");

function atriPagesClientLoader() {
  const options = this.getOptions();
  const { routeObjectPath, modulePath } = options;

  if (routeObjectPath === undefined || modulePath === undefined) {
    const err = Error();
    err.name = "ValueError";
    err.message = `Expected defined value for route, modulePath. Got ${routeObjectPath}, ${modulePath} respectively.`;
    throw err;
  }

  return `
	import PageWrapper from "./pages/_app";
	import PageComponent from "${upath.toUnix(modulePath)}";

	import renderPageOrApp from "@atrilabs/atri-app-core/src/entries/renderPageOrApp";

  const options = {
    routeObjectPath: "${routeObjectPath}",
    PageWrapper,
    PageComponent
  };

	renderPageOrApp(options);
	`;
}

module.exports = atriPagesClientLoader;
