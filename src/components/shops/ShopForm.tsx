import { useMutation} from "@tanstack/react-query";
import { useEffect } from "react";
import { PlainFormButton } from "../../shared/form/FormButton";
import { FormInput } from "../../shared/form/FormInput";
import { FormSelect } from "../../shared/form/FormSelect";
import { SearchSelect } from "../../shared/form/SearchSelect";
import { useCustomForm } from "../../shared/form/useCustomForm";
import { concatErrors } from "../../shared/helpers/concaterrors";

import { addShop,ShopMutationFields, ShopResponse } from "../../state/api/shops";
import { searchTenant, TenantResponse } from "../../state/api/tenant";
import { AppUser } from "../../state/types/base";
import { ShopList } from "./ShopList";

interface ShopFormProps {

    user: AppUser
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    shop?:ShopResponse
    tenant?:TenantResponse
}

export function ShopForm({setOpen,shop,tenant}:ShopFormProps){

    

    function genInitValues(): ShopMutationFields {
        if (shop) {
            return {
                order: shop.order,
                shop_number: shop.shop_number,
                tenant: shop.tenant,
                utils: shop.utils
            }
        }
        if (tenant) {
            return {
                order: 0,
                shop_number: 'G-12',
                tenant:tenant.id,
                utils: 'elec'
            }
        }
        return {
            order: 0,
            shop_number: 'G-01',
            tenant: '',
            utils: 'elec'
        }
    }

   function inputValidation(
        inpt:ShopMutationFields,
        setError: React.Dispatch<React.SetStateAction<{ name: string, message: string }>>) {
        const reg = new RegExp(/^(G-[0-9][1-9]|G-[1-9][0-9]|M[1-9]-[0-9][1-9]|M[1-9]-[1-9][0-9]|BASEMENT|NIBS)$/)
        if (!reg.test(inpt.shop_number)) {
            setError({ name: 'shop_number', message: 'invalid shop number' })
            return false
        }
        if (inpt.tenant === '') {
            setError({ name: 'tenant', message: 'invalid tenant' })
            return false
        }
        // const shop_num = shops.find(shop => shop.shop_number === inpt.shop_number)

        // if(inpt.shop_number  === shop_num?.shop_number){
        //     setError({ name: 'shop_number', message: 'shop number already exists' })
        //     return false
        // }
   
        setError({ name: '', message: '' })
        return true

    }

    const mutation = useMutation({
        mutationFn: (input: ShopMutationFields) => addShop(input),
        meta: {
            invalidates:[["shops"],['tenants']]
        },
        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
            // store.updateNotification({ type: "success", message: "leave request successfully sent" })
            setOpen(false)
        },
    })
    
    const { error, handleChange, input, setError, setInput, handleSubmit, success } 
        = 
    useCustomForm<ShopMutationFields,ShopResponse>({
    initialValues:genInitValues(),
    inputValidation,
    mutation
    })   
 


    const util_options = [
        { value: 'both', label: 'Both' },
        { value: 'elec', label: 'Elec' },
        { value: 'water', label: 'Water' },
    ]

    const setTenant = (value: any) => {
        setInput((prev) => {
            return { ...prev, tenant: value };
        });
    }  ;
console.log("input  === ",input)

return (
    <div className='w-full h-full flex flex-col items-center justify-center  bg-slate-800 rounded-lg gap-2 p-2'>
        <ShopList />

        <form onSubmit={handleSubmit}
            data-testid="add-shop-form"
            className="w-full h-full flex flex-wrap items-center justify-center p-5 gap-1">

 

            <SearchSelect
            defaultkeyword={tenant?.name} 
            gettterFunction={searchTenant} 
            setValue={setTenant}
  
            />
            <FormInput
                error={error}
                handleChange={handleChange}
                input={input}
                label="Shop Number"
                prop="shop_number"
                input_props={{
                    pattern: '^(G-[0-9][1-9]|G-[1-9][0-9]|M[1-9]-[0-9][1-9]|M[1-9]-[1-9][0-9]|BASEMENT|NIBS)$',
                    // style: { width: "40%" }
                }}
            />

            <FormSelect<ShopMutationFields>
                error={error}
                input={input}
                label="Utils"
                prop="utils"
                select_options={util_options}
                setInput={setInput}
                // styles={{width: "40%",}}
            />



            <FormInput
                error={error}
                handleChange={handleChange}
                input={input}
                label="order"
                prop="order"
                type="number"
                input_props={{
                style: {minWidth: "40%"}}}
            />
            <PlainFormButton
            isSubmitting={mutation.isPending}
            disabled={mutation.isPending}
            label="Submit Shop"
            />
        </form>
 </div>
);
}
