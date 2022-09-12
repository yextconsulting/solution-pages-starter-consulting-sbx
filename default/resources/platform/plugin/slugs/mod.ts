import { createSlugManager } from "https://raw.githubusercontent.com/yext/pages/b360e5b215e85612e50b247514439ad8c227b081/packages/plugins/index.ts";

declare const API_KEY: string;

export const {webhook, connector} = createSlugManager({
	apiKey: API_KEY,
	slugFormat: "[[localeCode]]/[[address.region]]/[[address.city]]/[[address.line1]]",
	slugFormatLocaleOverrides: {
		"en": "[[address.region]]/[[address.city]]/[[address.line1]]"
	},
	entityTypes: ["location"],
	env: "sandbox"
});
