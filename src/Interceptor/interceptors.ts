import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandleingInterceptor } from "./error-handleing.interceptor";
import { HttpInterceptorInterceptor } from "./http-interceptor.interceptor";

export const InterceptorsProvider = [
    // {provide:HTTP_INTERCEPTORS,useClass:ErrorHandleingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:HttpInterceptorInterceptor,multi:true}
]; 