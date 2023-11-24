import { concatErrors } from "@/utils/helpers/concaterrors";


interface ErrorOutputProps {
err:any
}

export function ErrorWrapper({err}:ErrorOutputProps){
return (
    <div className="p-1 w-full h-full bg-error text-error-content text-center rounded-lg">
        {concatErrors(err)}
    </div>
);
}
