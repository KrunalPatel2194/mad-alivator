import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  UncontrolledTooltip,
  Breadcrumb,
} from "reactstrap";
import { CirclePicker } from "react-color";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "../components/form/label";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdayWish: "Hurray! It's your Birthday",
      profileDetails: {
        firstName: "Krunal",
        lastName: "Patel",
        birthDate: this.convertDate("17-04-2021"),
        favColor: "#3f51b5",
      },
      tempProfileDeatils: {
        firstName: "",
        lastName: "",
        birthDate: "",
        favColor: "",
      },
      isEditModeOn: false,
      colorCode: {
        lightGreen: "succeess",
      },
      isMybirthday: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  editProfile() {
    //store previous values : to flush new one in cancel edit
    if (!this.state.isEditModeOn) {
      this.setState({ tempProfileDeatils: this.state.profileDetails });
    }
    this.setState({ isEditModeOn: !this.state.isEditModeOn });
    this.setState({
      isMybirthday: this.isToday(this.state.profileDetails.birthDate),
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.editProfile();
  }
  isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };
  handleChange(e, name) {
    let value;
    switch (name) {
      case "birthDate":
        value = e;
        break;
      case "favColor":
        value = e.hex;
        break;
      default:
        value = e.target.value;
        break;
    }
    this.setState((prevState) => {
      let profileDetails = { ...prevState.profileDetails };
      profileDetails[name] = value;
      return { profileDetails };
    });
  }

  cancelEdit() {
    this.editProfile();
    const tempProfileDeatils = this.state.tempProfileDeatils;
    this.setState({ profileDetails: tempProfileDeatils });
  }

  componentDidMount() {
    this.setState({
      isMybirthday: this.isToday(this.state.profileDetails.birthDate),
    });
  }

  convertDate(myDate) {
    myDate = myDate.split("-");
    var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    return newDate;
  }
  render() {
    return (
      <>
        <section className="bg-half bg-light d-table w-100">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12" className="text-center">
                <div className="page-next-level">
                  <h4 className="title"> Profile</h4>
                  <div className="page-next">
                    <nav className="d-inline-block">
                      {this.state.isMybirthday && (
                        <Breadcrumb
                          aria-label="breadcrumb"
                          listClassName="bg-white rounded shadow mb-0"
                          style={{ color: this.state.profileDetails.favColor }}
                        >
                          {this.state.isMybirthday
                            ? this.state.birthdayWish
                            : ""}
                        </Breadcrumb>
                      )}
                    </nav>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <section className="section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10} md={7}>
                <Card className="custom-form border-0">
                  <CardBody>
                    <Alert
                      style={{
                        backgroundColor: this.state.profileDetails.favColor,
                        color: "white",
                      }}
                      isOpen={this.state.isEditModeOn}
                      toggle={() => {
                        this.cancelEdit();
                      }}
                    >
                      Edit Mode On.
                    </Alert>
                    <Form
                      onSubmit={this.handleSubmit}
                      className="rounded shadow p-4"
                    >
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <InputLabel labelName="First Name" />
                            <Input
                              name="firstName"
                              id="name"
                              type="text"
                              className="form-control pl-5"
                              placeholder="First Name :"
                              value={this.state.profileDetails.firstName}
                              onChange={(e) =>
                                this.handleChange(e, "firstName")
                              }
                              disabled={!this.state.isEditModeOn}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <InputLabel labelName="Last Name" />

                            <Input
                              name="lastName"
                              id="name"
                              type="text"
                              className="form-control pl-5"
                              placeholder="Last Name :"
                              value={this.state.profileDetails.lastName}
                              onChange={(e) => this.handleChange(e, "lastName")}
                              disabled={!this.state.isEditModeOn}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup className="position-relative">
                            <InputLabel labelName="Birth Date" />
                            <div className="position-relative"></div>
                            <DatePicker
                              name="birthDate"
                              selected={this.state.profileDetails.birthDate}
                              onChange={(e) =>
                                this.handleChange(e, "birthDate")
                              }
                              disabled={!this.state.isEditModeOn}
                              className="form-control pl-5"
                            />
                          </FormGroup>
                        </Col>

                        <Col className="mt-4 pt-2" id="radio-buttons">
                          <div className="component-wrapper rounded shadow">
                            <div className="p-4 border-bottom">
                            <InputLabel labelName="Favourite Colour" />

                            </div>

                            <div className="p-4">
                              {this.state.isEditModeOn && (
                                <CirclePicker
                                  color={this.state.profileDetails.favColor}
                                  disableAlpha={true}
                                  onChangeComplete={(e) =>
                                    this.handleChange(e, "favColor")
                                  }
                                />
                              )}
                              {!this.state.isEditModeOn && (
                                <div>
                                  <div
                                    style={{
                                      height: "50px",
                                      width: "50px",
                                      backgroundColor: this.state.profileDetails
                                        .favColor,
                                      borderRadius: "50px",
                                    }}
                                  ></div>
                                  <br />
                                  <Label>Click On Edit to change color</Label>
                                </div>
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm="12">
                          {this.state.isEditModeOn && (
                            <input
                              type="submit"
                              id="submit"
                              name="send"
                              className="submitBnt btn"
                              value="Save"
                              style={{
                                backgroundColor: `${this.state.profileDetails.favColor}`,
                                color: "white",
                              }}
                            />
                          )}
                          {!this.state.isEditModeOn && (
                            <button
                              style={{
                                backgroundColor: `${this.state.profileDetails.favColor}`,
                                color: "white",
                              }}
                              className="submitBnt btn"
                              onClick={() => this.editProfile()}
                            >
                              Edit Profile
                            </button>
                          )}
                          {this.state.isEditModeOn && (
                            <button
                              style={{
                                marginLeft: "10px",
                                backgroundColor: `${this.state.profileDetails.favColor}`,
                                color: "white",
                              }}
                              className="submitBnt btn"
                              onClick={() => this.cancelEdit()}
                            >
                              Cancel Edit
                            </button>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
