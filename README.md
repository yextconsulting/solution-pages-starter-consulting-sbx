# solution-pages-starter-consulting for Yext Sandbox Accounts
Solution Templates are pre-built configurations created by Yext that can be installed into an account. 

They can add all sorts of things - from custom entity types in the Knowledge Graph to Search Experiences and much more. You can think about this as another way to update your account, just like you do via the UI or the API — this time, it’s just via a set of files.

To learn more about solution templates, please visit Hitchhiker Documents:
https://hitchhikers.yext.com/modules/sol101-solution-templates/01-what-are-solution-templates/
https://hitchhikers.yext.com/modules/sol201-configuration-as-code/01-what-is-configuration-as-code/
https://hitchhikers.yext.com/modules/sol202-introduction-to-the-admin-console/03-advanced-admin-console/

## Useful commands
`yext init [account id]` - tells the terminal the prod yext account you want to perform action on
`yext init -u sandbox [account id]` - this lets you connect to the sandbox accounts
`yext resources apply [path to template]` - Applies the template at the folder path, example: `yext resources apply .` for the template in the current directory

## Applying Templates
The default/resources folder contains the CaC files of preexisting configurations that can be "loaded" into any Yext account.

You can apply a folder of CaC files, as well as a single file, depending on the path you specify. However, you may run into dependency errors if you choose to apply CaC folders or files one at a time. For example, if you apply the km/entity folder before km/field, you might get an error saying some Custom Fields do not exist in your account. By applying the root folder, Yext CLI should handle the dependencies.

The Config as Code Workshop Exercise has very detailed and important steps to the process of applying templates to new accounts, including how to install Yext CLI, create APP and getting API Keys, add Funciton Hooks feature (this will 'add invoke a function' to Webhooks).

The exercise shows you how to apply templates using the admin console, but you can also use commands in the terminal
https://docs.google.com/document/d/1JYd6HTFK8Fw0n7DB3QAOM6eh9bKnrjHnvVOBueqifbc/edit#heading=h.c30digsgl4f5

## Admin Console

You can view the existing configuration on your account by going to the Admin Console on Knowledge Graph.      
## What Templates are here?

### **km/entity**
This folder contains templates for creating various test entities like entity type location, faq, product, search page etc to populate the account.

Example: `yext resources apply solution-pages-starter-consulting/default/resources/km/entity` or `yext resources apply solution-pages-starter-consulting/default/resources/km/entity/search-page.json`

### **km/folder** 
By applying this folder, you are creating a "Test Entities" folder in the account. 

### **km/entity-type**
This folder contains the CaC files for the custom entity types for City, Region, Root, Search Page, Site. By applying templates in this folder you are creating these custom entity types.

### **km/field-type** 
This folder contains the Custom Field Types. Since Custom Fields uses CFTs, you would want to apply this folder before the km/field folder.
### **km/field**
This folder contains the templates for Custom Fields. By applying this folder you won't have to create the custom fields by hand anymore.

### **km/field-eligibility-group** 
This folder contains which Entities which Custom Fields are eligible to show up on.

### **platform/plugin/slugs/mod.ts:**
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

   
### **km/connector/updateAllSlugs.json:**

By applying this template, you are creating a Connector, as well as all of the required mappings, in the knowledge graph. This connector can run the Slug Manager function on all entities, which updates the `slug` field on all entities' language profiles. By going to the Connector page in KG, you can turn on or off the connector and specify how often it should run.

## Applying Templates for Slugs using the terminal
### An example workflow to set up templates for slugs webhook:
1. in the Knowledge Graph:
	- in developer console, make an app with read/write knowledge enities access, which creates an api key
	- in Account Features enable “Preview Feature: Function Hooks
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

## Github Work Flows
### Sync Upstream
source: https://github.com/dabreadman/sync-upstream-repo
This GitHub workflow syncs the Prod solution-pages-starter-consulting repo (https://github.com/yextconsulting/solution-pages-starter-consulting.git) with this sbx repo since they should almost be identical 


