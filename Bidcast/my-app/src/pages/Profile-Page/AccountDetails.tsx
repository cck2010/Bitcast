import { Card, Col, Image, Row } from "react-bootstrap";
// import lihkg_logo from "../homepage/lihkg_logo.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store";
import "./AccountDetails.scss";
import { useState } from "react";
import bidcastQRcode from "./assets/bidcastQR.svg";
// import { push } from "connected-react-router";
import { refreshCurrentUser } from "../../redux/user/actions";

type editInput = {
  username?: string,
  profilePic?: string,
  phoneNumber?: number,
  telegramAccount?: string,
  // telegramChatId?:string,
  aboutMe?: string
}


export function AccountDetails() {
  //get user config
  const token = localStorage.getItem('token')
  const user = useSelector((state: RootState) => state.authState.user);
  const userInfo = JSON.parse(JSON.stringify(user));
  // console.log("userInfo", userInfo);


  const dispatch = useDispatch();


  const { register, handleSubmit,reset } = useForm<editInput>();

  // profile photo shown setup
  const [selectedImage, setSelectedImage] = useState<any>();
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  //! submit field
  const onSubmit: SubmitHandler<editInput> = async (data) => {
    let n = null;
    // console.log("data.profilePic>>>",data.profilePic)
    // console.log("selectImage",selectedImage)
    // console.log("data>>>",data)

    let editProFormData = new FormData();

    data.username? editProFormData.append('username',data.username):n=n;
    selectedImage? editProFormData.append('profilePic',selectedImage):n=n;
    data.phoneNumber? editProFormData.append('phoneNumber',(data.phoneNumber).toString()):n=n;
    data.telegramAccount? editProFormData.append('telegramAccount',`@${data.telegramAccount}`):n=n;
    // data.telegramChatId? editProFormData.append('telegramChatId',data.telegramChatId):n=n;
    data.aboutMe? editProFormData.append('aboutMe',data.aboutMe):n=n;
    editProFormData.append("userId",userInfo.id);

    const editRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/AccountDetails/editProfile`, {
          method: "PUT",
          body: editProFormData,
        })
        const editJson = await editRes.json();
        // console.log("editJson.data.res", editJson.data.res);
        
        if (token == null) {
          return;
      }
        
        await dispatch(refreshCurrentUser(userInfo.id))
        reset();
        setSelectedImage("");
        // window.location.reload();
        
        // dispatch(push("/profilePage/accountDetails"))
        
  }

  function CheckLoginShowPhoto() {
    return (
      //if else check login method
      <Image src={`${process.env.REACT_APP_BACKEND_URL}/${userInfo.profile_pic}`} width="80" height="80" roundedCircle className="profile_logo" />
    )
  }

  

  return (
    <div>
      <Row className={"details_container"}>
        <Col className={"Detail_col_Left"} xs={12} md={8}>
          {/* Edit Profile Form */}
          <div className={"edit_pro_container editProForm_shown"}>
            <div className={"edit_header"}>更改帳戶資料</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={'input_box'}><label>帳戶名稱:</label> <input className={"input_editProfile"} {...register('username')} placeholder={userInfo.username} /></div>
              <div className={'input_box'}><label>電郵地址:</label> <input className={"input_editProfile_ro"}  placeholder={userInfo.email} readOnly /></div>
              <div className={'input_box'}><label>電話號碼:</label> <input type="number"  className={"input_editProfile"} {...register('phoneNumber')} placeholder={userInfo.phone_number?userInfo.phone_number:"沒有"} /></div>
              <div className={'input_box_chatId'}><label>Telegram 帳戶:</label> <div>@ </div><input className={"input_editProfile"} {...register('telegramAccount')} placeholder={userInfo.telegram_acct?`${(userInfo.telegram_acct).substring(1)}`:"沒有"} />
              <div className={userInfo.telegram_acct? userInfo.telegram_is_verified?"chatId_verified":"chatId_unverified":"chatId_empty"}></div>
              </div>
              {<div className={"bidcast_bot_Info_container"}>
                <img className={"bidcast_bot_QR"} src={bidcastQRcode}></img>
                <div className={"bot_info"}>
                  <div>Telegram帳戶認証機器人：「 Bidcast bot 」</div>
                  <ul>
                    <li>用手機掃描QR Code</li>
                    <li>點擊Send Message並打開 Telegram 應用程式</li>
                    <li>在Bidcast bot 聊天室左下角打開menu </li>
                    <li>點擊/verify 並輸入你的電子郵件，即可進行認証</li>
                  </ul>
                </div>
              </div>}
              {/* <div className={'input_box'}><label>telegram chat id:</label> <input className={"input_editProfile"} {...register('telegramChatId')}  /></div> */}
              <div className={'input_textarea'}><label>關於我 :</label> <textarea className={"input_editProfile"} {...register('aboutMe')} placeholder={userInfo.description?userInfo.description:"自我介紹..."} /></div>
              <div className={'import_box'}><label>更換頭像:</label> <div className={"profileImport"}><input type="file" {...register('profilePic')} onChange={imageChange} /></div></div>
              {selectedImage &&
                <div className={"proImg_container"}>
                  <img className={"resize_upload_proPic proImg_shown"} src={URL.createObjectURL(selectedImage as any)} />
                  <div className={"file_Info_container"}>
                    {/* <div>{selectedImage.name as any}</div> */}
                    <div>{selectedImage.type as any}</div>
                    <div>{`${(((selectedImage.size as any) / 1000000).toString().match(/^\d+(?:\.\d{0,2})?/)) + " MB"}`}</div>
                  </div>
                </div>
              }
              <input className={"button_default"} type="submit" />
            </form>
          </div>
        </Col>
        <Col className={"Detail_col_Right"} xs={12} md={4}>
          <Card className="card_body">
            <div className="card_bg_color"></div>
            <CheckLoginShowPhoto />
            {/* <Image src={`${process.env.REACT_APP_BACKEND_URL}/${userInfo.profile_pic}`} width="80" height="80" roundedCircle className="profile_logo" /> */}
            <Card.Body>
              <Card.Title>{userInfo.username}</Card.Title>
              {/* <Card.Text >{userInfo.phone_number}</Card.Text> */}
              {/* <Card.Text>{userInfo.email}</Card.Text> */}
              <Card.Text className={"name_card_vice"}>{userInfo.telegram_acct ? `${userInfo.telegram_acct}` : "請登記 Telegram 帳號"}</Card.Text>
              <Card.Text>{userInfo.description? `「 ${userInfo.description} 」`:"自我介紹..."}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
// 