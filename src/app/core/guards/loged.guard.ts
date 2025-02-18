import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn,  Router } from '@angular/router';
import { fstat } from 'fs';

export const logedGuard: CanActivateFn = (route, state) => {

    const router = inject(Router)

    const pLATFORM_ID = inject(PLATFORM_ID)


if(isPlatformBrowser(pLATFORM_ID)){    if(  localStorage.getItem('userToken') !== null ){

  router.navigate(['/home'])

  return false


}
else{



  return true
}

}return false

};
