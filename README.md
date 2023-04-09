# Utilities 

![table-for-react](https://user-images.githubusercontent.com/72096712/230765996-341c20e8-999d-4775-98f1-a2e47a7a46c4.png)


A simple react app for utilities entry and viewing

Built this app to fix the issue i had when making utilities meter readings across the building we were managing.

The process would begin with a printedcout spreadsheet of the shop name with their respective meters and a spot for thier readings .

The job aws simple , populate the empty spots. but it was very common to be doubtful because some of the meters would be foggy from the inside or just hard to read , referencing the former readings would be helpfull but doing it manually could wind up beig as eronious and require maximum attention

so i came up with the idea of just puttingit all a database and have a dashboard for it.

### frontend 
React SPA with vite and typescript
- Tanstack-query + Zustand
- Tailwind css + Mantine UI
- React-router-dom
- Pocketbase SDK
  
### backend
- Pocketbase  
  

getting setup 
for the front end you can just clone this repo
```sh
git clone https://github.com/tigawanna/utilities.git

```
run the command 
```sh
npm install
npm run dev
```

then include the .env file

```env
VITE_PB_URL=http://127.0.0.1:8090
VITE_ENV=DEV
```
for pocketbase can either use my build pocketbase executable

[Download linux executable file](https://github.com/tigawanna/devhub-backend/raw/master/pocketbase)



[Download windows executable file](https://github.com/tigawanna/devhub-backend/raw/master/pocketbase.exe)

[source code](https://github.com/tigawanna/devhub-backend)

this would be the easiest option since it has one of the custom routesthat am using

or you could download the [official pocketbase](https://pocketbase.io/docs/) and add the custo routes yourself 

⚠ Am primarily a frontend dev so pardon the messy go code.

## The collections
### Tenants:
```ts
export interface TenantResponse {
    id: string
    supa_id:string;
    collectionId: string
    collectionName: string
    created: string
    updated: string
    name: string
    contact: string
    email: string
    details: string
    expand: TenantExpand
}
```
[Tenants](https://github.com/tigawanna/utilities/blob/cc391287e74c5163f7de52fbc843fe0a93ec5293/src/state/api/tenant.ts)

This has to be the first set of data to  be entered because the next collection will depend on it's ID

we can then consume it in the frontend

```ts

export async function getTenants() {
    try {
    // you can also fetch all records at once via getFullList
    const records = await pb.collection('tenants').getFullList<TenantResponse>({
            // sort: '-created',
            expand:'shops(tenant)'
    });
    return records
    } catch (error) {
        console.log(error)
        throw error
    }
}

const query = useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants
  })
```

```ts
expand:'shops(tenant)'
```
and in here we're doing an [indirect expand](https://pocketbase.io/docs/expanding-relations) on the collection shops where the shop tenant filed === to the current tenant , this comes in use fll when you want to associate data with no direct relation , by doing this it returns a list of tenants + shops they own        


### Shops
```ts
export interface ShopExpand{
    tenant:TenantResponse
    "bills(shop)":Omit<BillResponse,"expand">[]
}

export interface ShopResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    tenant: string
    shop_number: string
    supa_tenant: string
    utils: "elec"|"water"|"both"
    order: number
    is_vacant:boolean
    supa_id: string
    expand:ShopExpand
}

```
[shops](https://github.com/tigawanna/utilities/blob/ee8bd47108304c0ad002dc3183e2ebbeb5c9ec39/src/state/api/shops.ts)

Since the shops are fixed and will retain their shop numbers even ater tenant change the tenaant field will be a relation to the tenant collection 

rontend:
```ts
export async function getShops() {
    try {
        const records = await pb.collection('shops').getFullList<ShopResponse>({
            sort: 'order',
            expand: 'tenant',
        });
        return records
    } catch (error) {
        console.log("error loading shops",error)
        throw error
    }
}

  const query = useQuery({
    queryKey: ['shops'],
    queryFn:getShops
  })

```

Here we'll just expandthe tenanat associated with the shop in order to get the current shop name and which is the tenant name 


### Bills
```ts
export interface BillExpand {
    shop:ShopResponse
}
export interface BillResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    shop: string
    elec_readings: number
    water_readings: number
    month: number
    year: number
    expand:BillExpand 
}

```

[bills](https://github.com/tigawanna/utilities/blob/cc391287e74c5163f7de52fbc843fe0a93ec5293/src/state/api/bills.ts)

Every bill created will be associated to a shop and will be a relation to the shop collection

This is where things get a little tricky since my requirents are etching all the shops then the bills associated with each shop or the current month as curr_elec and curr_water  and another similar one but with prev_water and prev_elec based on vlaues form the same shop but the previous month  in order to obtain 

```ts
export interface MonthlyBills {
    shop_id: string;
    curr_bill_id: string;
    prev_bill_id: string;
    shop_number: string;
    shop_name: string;
    curr_year: string;
    curr_month: string;
    prev_year: string;
    prev_month: string;
    list_order: string;
    current_elec: string;
    previous_elec: string;
    elec_diff: string;
    current_water: string;
    previous_water: string;
    water_diff: string;
}

```

to power a UI like this 

![bills home screen](https://github.com/tigawanna/utilities/blob/master/docs/imgs/Screenshot%202023-04-06%20183144.png)










