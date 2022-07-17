import { toast } from "react-toastify";
 
export const showToast = (type,msg) => {
    switch (type) {
        case 'SUCCESS':
                toast.success(msg,{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            break;
        case 'ERROR':
                toast.success(msg,{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            break;
        default:
            return false;
    }
}