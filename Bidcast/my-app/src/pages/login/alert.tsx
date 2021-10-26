
import { push } from "connected-react-router";
import { useDispatch,  } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';

import { CToast, CToastBody, CToastClose, CToastHeader } from '@coreui/react';

function ToastDemo() {
    
   
  return (
      
    <CToast autohide={false} visible={true} className="align-items-center">
  <div className="d-flex">
    <CToastBody>Hello, world! This is a toast message.</CToastBody>
    <CToastClose className="me-2 m-auto" />
  </div>
</CToast>
  )
}
export default ToastDemo;