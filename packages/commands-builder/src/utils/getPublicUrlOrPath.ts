import { URL } from "url";

/**
 * Returns a URL or a path with slash at the end
 * In production can be URL, abolute path, relative path
 * In development always will be an absolute path
 * In development can use `path` module functions for operations
 *
 * @param {boolean} isEnvDevelopment
 * @param {(string|undefined)} homepage a valid url or pathname
 * @param {(string|undefined)} envPublicUrl a valid url or pathname
 * @returns {string}
 */
export function getPublicUrlOrPath(
	isEnvDevelopment: boolean,
	homepage: string | undefined,
	envPublicUrl: string | undefined
) {
	const stubDomain = "https://atrilabs.com";

	if (envPublicUrl) {
		// ensure last slash exists
		envPublicUrl = envPublicUrl.endsWith("/")
			? envPublicUrl
			: envPublicUrl + "/";

		// validate if `envPublicUrl` is a URL or path like
		// `stubDomain` is ignored if `envPublicUrl` contains a domain
		const validPublicUrl = new URL(envPublicUrl, stubDomain);

		return isEnvDevelopment
			? envPublicUrl.startsWith(".")
				? "/"
				: validPublicUrl.pathname
			: // Some apps do not use client-side routing with pushState.
			  // For these, "homepage" can be set to "." to enable relative asset paths.
			  envPublicUrl;
	}

	if (homepage) {
		// strip last slash if exists
		homepage = homepage.endsWith("/") ? homepage : homepage + "/";

		// validate if `homepage` is a URL or path like and use just pathname
		const validHomepagePathname = new URL(homepage, stubDomain).pathname;
		return isEnvDevelopment
			? homepage.startsWith(".")
				? "/"
				: validHomepagePathname
			: // Some apps do not use client-side routing with pushState.
			// For these, "homepage" can be set to "." to enable relative asset paths.
			homepage.startsWith(".")
			? homepage
			: validHomepagePathname;
	}

	return "/";
}
