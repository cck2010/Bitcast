
import { push } from "connected-react-router";
import { useDispatch,  } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';

import { CToast, CToastBody, CToastClose, CToastHeader } from '@coreui/react';

function ToastDemo() {
    
   
  return (
      
    <CToast autohide={false} visible={true} className="align-items-center">
  <div className="d-flex text-danger">
    <CToastBody>請在個人頁面更改電話號碼</CToastBody>
    <CToastClose className="me-2 m-auto" />
  </div>
</CToast>
  )
}
export default ToastDemo;