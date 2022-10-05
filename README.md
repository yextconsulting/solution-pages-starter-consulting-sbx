# solution-pages-starter-consulting

## Useful commands

`yext resources apply [path to template]` - Applies the template at the folder path, example: `yext resources apply .` for the template in the current directory


## Applying Templates
### An example workflow to set up templates for slugs webhook:
1. in the developer console, make an app with read/write knowledge api access, which creates an api key
2. customize the `mod.ts` (the template) with the slug format you want at https://github.com/yextconsulting/solution-pages-starter-consulting/tree/main/default/resources/platform/plugin/slugs
3. at the root of the repo, apply the function using the command `yext resources apply default/resources/platform/plugin/slugs`, it will ask these questions:
- `Warning: Are you sure you want to overwrite configuration resources for the current configuration?` yes
- `Please enter value for variable 'apiKey'` paste the api key from step 1
4. in your developer console app, click on Webhooks -> Add a Webhook -> Select Webhook Type: choose Entities -> click `or invoke a function` under URL and choose the 'webhook' function that got created
- example: https://sandbox.yext.com/s/3160439/developerconsole/apps/152005/webhooks

### An example workflow to set up templates for slugs connector:
1. apply this file to create a slug connector: https://github.com/yextconsulting/solution-pages-starter-consulting/blob/main/default/resources/km/connector/updateAllSlugs.json by `yext resources apply default/resources/km/connector`
2. in the Connectors page on knowledge graph, click into the connector created in step 1 and run the connector to populate the slugs for all your existing entities
- example: https://sandbox.yext.com/s/3160439/addData/connectors/3548

## What Templates are here?
### **default/resources/platform/plugin/slugs/mod.ts:**
This template contains the Slug Manager function, which updates entities' base profile and language profiles based on the slug format specified in this file.

You can customize how the slug should look like in the mod.ts file. 
- `apiKey`: do not change this, this will take in a prompted variable when you are applying the template
- `slugFormat`: the default slug format applying to all language profiles
- `slugFormatLocaleOverrides`: if you want one or more language profile to have a different slug format than the others, you can specify in the map here. 
For example, we don't want the localeCode to show up for English sites since this is a common practice for yext sites, the default will look like:
```
  slugFormatLocaleOverrides: {
		"en": "[[address.region]]/[[address.city]]/[[address.line1]]"
	},
```
- `entityTypes`: the slug function will only be applied to the entity types listed here
- `env`: sandbox or production, depending which Knowledge Graph environment you want to apply the function

   
### **default/resources/km/connector/updateAllSlugs.json:**

By applying this template, you are creating a Connector, as well as all of the required mappings, in the knowledge graph. This connector can run the Slug Manager function on all entities, which updates the `slug` field on all entities' language profiles. By going to the Connector page in KG, you can turn on or off the connector and specify how often it should run.
