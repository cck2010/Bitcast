import { Card, Col, Image, Row } from "react-bootstrap";
import lihkg_logo from "../homepage/lihkg_logo.png";

// const { Formik } = formik;

// const schema = yup.object().shape({
//   username: yup.string().required(),
//   phoneNumber: yup.number().required(),
//   email: yup.string().required(),
//   file: yup.mixed().required(),
// });

export function AccountDetails() {
  return (
    <div>
      <Row>
        <Col xs={12} md={8}>
          {/* <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        username: '',
        phoneNumber: '',
        email: '',
        file: null,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                isValid={touched.username && !errors.username}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>phoneNumber</Form.Label>
              <Form.Control
                type="number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                isValid={touched.phoneNumber&& !errors.phoneNumber}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
                          <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
              onChange={handleChange}
              isInvalid={!!errors.file}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.file}
            </Form.Control.Feedback>
            </Form.Group>

          </Row>
          
          <Button type="submit">Update Profile</Button>
        </Form>
      )}
    </Formik> */}
        </Col>
        <Col xs={6} md={4}>
          <Card className="card_body" style={{ width: "18rem" }}>
            <div className="card_bg_color"></div>
            <Image src={lihkg_logo} width="80" height="80" roundedCircle className="profile_logo" />
            <Card.Body>
              <Card.Title>Name</Card.Title>
              <Card.Text>phone no</Card.Text>
              <Card.Text>email</Card.Text>
              <Card.Text>telegram_account</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
