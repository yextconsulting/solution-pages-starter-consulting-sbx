import { SlugManager } from "https://github.com/yextconsulting/slug-plugin/blob/v0.0.0-beta/plugin-folder/mod.ts";

declare const API_KEY: string;

export const {webhook, connector} = SlugManager({
	apiKey: API_KEY,
	slugFormat: "[[localeCode]]/[[address.region]]/[[address.city]]/[[address.line1]]",
	slugFormatLocaleOverrides: {
		"en": "[[address.region]]/[[address.city]]/[[address.line1]]"
	},
	entityTypes: ["location"],
	env: "sandbox"
});
