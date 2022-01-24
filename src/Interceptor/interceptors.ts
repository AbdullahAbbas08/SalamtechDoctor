import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandleingInterceptor } from "./error-handleing.interceptor";

export const InterceptorsProvider = [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandleingInterceptor,multi:true}
]; 