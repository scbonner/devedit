import React from "react";
import { EmailIcon, FacebookIcon, LinkedinIcon } from "react-share";
import { withFirebase, storage } from "../Firebase";
//import storage from "../Firebase/firbaseStorage"
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import SignOut from "../SignOut";
import Setting from "../../containers/Account";
const options = ["username", "profile", "setting"];
class Userprofile extends React.Component {
  constructor(props) {
    // console.log("this is the props value:" + props)
    super(props);
    this.state = {
      article: [],
      username: "",
      //photoUrl: " ",
      name: "",
      email: "",
      selectedFile: null,
      image: null,
      progress: 0,
      crewDirectory: [],
      file: "",
      pics: [],
      url: "",
    };
  }
  // componentDidMount() {
  //   this.directoryAirTable();
  // }
  // directoryAirTable() {
  //   const url =
  //     "https://api.airtable.com/v0/appBu5I7tEJENCp45/Employee%20directory";
  //   fetch(url, {
  //     headers: {
  //       Authorization: "Bearer " + process.env.REACT_APP_DIRECTORY_AIRTABLE_KEY,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       console.log("directory data ", responseData);
  //       const crewDirectory = responseData.records;
  //       console.log("crewDirectory ", crewDirectory);
  //       this.setState({
  //         crewDirectory: crewDirectory,
  //         allDirectory: crewDirectory,
  //       });
  //       console.log(" crewDirectory", this.state.crewDirectory);
  //     });
  // }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  // postPics = (e) => {
  //   let pics ="https://ya-webdesign.com/images250_/placeholder-image-png-1.png";
  //   {
  //     this.state.crewDirectory &&
  //       this.state.crewDirectory.map((staffPhoto, id) => {
  //         console.log("stafphoto", staffPhoto.fields.Photo);
  //         //if (staffPhoto.fields.Photo) {
  //         this.setState({
  //           pics: staffPhoto.fields.Photo,
  //         });

  //         //  }
  //       });
  //   }
  // };
  onUrlChange = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  upload = (e, authUser) => {
    e.preventDefault();
   // console.log("my new url", authUser.uid);
    const autherId = authUser.uid;
    this.props.firebase.user(autherId).update({
      photoUrl: this.state.url,
    });
    this.setState({showPopup:false})
  };
  cancleButton = (e) => {
    this.setState({ showPopup: false });
  }
  render() {
    const { selectedFile, url, crewDirectory, pics } = this.state;
    console.log("pics1", url);
    let imgPreview;
    let id;
    if (this.state.file) {
      imgPreview = <img src={this.state.file} alt="" />;
    }
    ;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <div className="dropdown">
              <div className="dropbtn">
                <i style={{ Color: "#fae596" }}>
                  {" "}
                  <img src={authUser.photoUrl} className="user-profile1" />
                </i>{" "}
                <i className="fa fa-caret-down" style={{ Color: "#fae596" }} />
                <div className="dropdown-content">
                  <div>
                    <span>
                      <img src={authUser.photoUrl} className="user-profile11" />
                      <div className="PhotoCamera">
                        <span >
                          <i
                            className="fa fa-camera"
                            aria-hidden="true"
                            onClick={this.togglePopup}
                          />
                        </span>

                        {this.state.showPopup ? (
                         <div className="profilewraper">
                          <div className="prfilecard">
                            <div  > <button className=" canclebutton" onClick={e => this.cancleButton(e)}>x</button></div>
                            <br/>
                            {/* <button onClick={this.postPics}>
                              Upload your photo
                            </button>
                            {pics &&
                              pics.map((pic, id) => {
                                return (
                                  <div>
                                    <img
                                      src={pic.url}
                                      
                                      alt="Staff Photos"
                                     
                                      onClick={this.handlOnchange}
                                      width="40"
                                      height="40"
                                    />
                                  </div>
                                );
                              })}

                            <button onClick={this.upload}>
                              set as profile photo
                            </button>*/}
                            <div className="uploadimage">
                              <input
                                className="imageinput"
                                type="url"
                                placeholder="Drage and drop your Image-URl"
                                value={this.state.url}
                                onChange={this.onUrlChange}
                                required
                          
                              />
                             
                              <button

                                className="imageupload"
                                onClick={(e) => this.upload(e, authUser)}
                                
                              >
                                upload Image
                              </button>
                            </div>
                            <br />

                            <img
                              src={
                                this.state.url ||
                                "http://via.placeholder.com/100x100"
                              }
                              alt="Uploaded images"
                             // height="100"
                              //width="100"
                            />
                          </div>
                          </div>
                        ) : null}
                      </div>
                      
                    </span>
                    
                    <br/><br/>


                    <p>{authUser.username}</p>
                    <p>{authUser.email}</p>
                  </div>

                                <div>
                                    
                    <Link to={ROUTES.ACCOUNT}>
                      {" "}
                      <i className="fal fa-cog" style={{ Color: "#fae596" }} />
                      {"  "}
                      UserSetting{" "}
                    </Link>
                    <SignOut />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(Userprofile);
