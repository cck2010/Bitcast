import { Card, Col, Image, Row } from "react-bootstrap";
import lihkg_logo from "../homepage/lihkg_logo.png";
import { SubmitHandler, useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store";
import "./AccountDetails.scss";

type editInput = {
  username:string,
  profilePic:string,
  phoneNumber:number,
  telegramAcct:string,
  telegramChatId:string
}


export function AccountDetails() {
  //get user config
  const user = useSelector((state: RootState) => state.authState.user);
  // console.log("user", user);
  const userInfo = JSON.parse(JSON.stringify(user));

  const { register, watch, handleSubmit, control } = useForm();

  const onSubmit: SubmitHandler<any> = async () => {
    return(
    <div>

    </div>)
  }

  function CheckLoginShowPhoto(){
    return(
      //if else check login method
      <Image src={`${process.env.REACT_APP_BACKEND_URL}/${userInfo.profile_pic}`} width="80" height="80" roundedCircle className="profile_logo" />
    )
  }
  return (
    <div>
      <Row className={"details_container"}>
        <Col className={"Detail_col_Left"} xs={12} md={8}>
          {/* Edit Profile Form */}
          <div className={"edit_pro_container"}>
            <div className={"edit_header"}>Edit Profile</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={'input_box'}><label>username:</label> <input className={""} {...register('liveInput.liveTitle')} required /></div>
              <div className={'input_box'}><label>Email:</label> <input className={""} {...register('liveInput.liveTitle')} required /></div>
              <div className={'input_box'}><label>phone number:</label> <input className={""} {...register('liveInput.liveTitle')} required /></div>
              <div className={'input_box'}><label>telegram account:</label> <input className={""} {...register('liveInput.liveTitle')} required /></div>
              <div className={'input_box'}><label>telegram chat id:</label> <input className={""} {...register('liveInput.liveTitle')} required /></div>
              <div className={'input_box'}><label>About me:</label> <input className={""} {...register('liveInput.liveTitle')} required /></div>
              <div className={'input_box'}><label>Profile picture:</label> <input className={""} {...register('liveInput.liveTitle')} required /></div>
            </form>
          </div>
        </Col>
        <Col className={"Detail_col_Right"} xs={6} md={4}>
          <Card className="card_body" style={{ width: "18rem" }}>
            <div className="card_bg_color"></div>
            <CheckLoginShowPhoto />
            {/* <Image src={`${process.env.REACT_APP_BACKEND_URL}/${userInfo.profile_pic}`} width="80" height="80" roundedCircle className="profile_logo" /> */}
            <Card.Body>
              <Card.Title>{userInfo.username}</Card.Title>
              <Card.Text>{userInfo.phone_number}</Card.Text>
              <Card.Text>{userInfo.email}</Card.Text>
              <Card.Text>{userInfo.telegram_acct}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
