import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from './data.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(DataService)
  const router = inject(Router)
  let isLoggedIn= false;
  authService.currentData.subscribe(data=>{isLoggedIn=data})
  if(isLoggedIn)  return true;
  else{
    Swal.fire({
      title: 'Login Required',
      text: 'Please login to continue',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    router.navigate(["/login"],{queryParams:{"redirect":state.url}})
    return false
  }
};
