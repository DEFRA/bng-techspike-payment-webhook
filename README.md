# BNG GOV Pay Webhook Spike
Spike to explore the usage of GOV.UK Pay webhooks within BNG

## Prerequisites
* Azure Functions Core Tools
* Azure Function App
* Azure Storage Account
* GOV.UK Pay Development Account

The following environment variables need to be set in `local.settings.json`:

| Name                 	| Description                        	| Required 	| Notes                                    	|
|----------------------	|------------------------------------	|----------	|------------------------------------------	|
| TABLE_STORAGE_URL    	| Table storage account endpoint     	| Yes      	| https://{account}.table.core.windows.net 	|
| STORAGE_ACCOUNT_NAME 	| Name of Azure Storage account      	| Yes      	|                                          	|
| STORAGE_ACCOUNT_KEY  	| Secret key for storage account     	| Yes      	|                                          	|
| EVENT_TABLE_NAME     	| Name of table to add pay events to 	| Yes      	|                                          	|

A new GOV.UK Pay webhook will need to be created using the external URL for the `payment-hook` function.
