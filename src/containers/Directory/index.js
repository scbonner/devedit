import React from 'react';
import DirectorySearchBar from '../../ctd-project-components/DirectorySearchBar';
import DirectoryList from '../../ctd-project-components/DirectoryList';

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      crewDirectory: [],
      searchDirectory: "",
      isFlipped: false,
    }
  }

  componentDidMount() {
    this.directoryAirTable();
    this.projectAirTable();
  }
  
  selectedStaffMember = id => {
    this.setState({isFlipped: id});
  }

  directoryAirTable() {
    const url = "https://api.airtable.com/v0/appBu5I7tEJENCp45/Employee%20directory";
      fetch(url, {
        headers: { Authorization: "Bearer " + process.env.REACT_APP_DIRECTORY_AIRTABLE_KEY  }
      })
      .then(response => response.json())
      .then(responseData => {
        // console.log("directory data ", responseData);
        const crewDirectory = responseData.records;
        // console.log("crewDirectory ", crewDirectory);
        this.setState({
          crewDirectory: crewDirectory, 
          allDirectory: crewDirectory,
        })
      });
    }
    
  projectAirTable() {
    const url = "https://api.airtable.com/v0/appQSPi3XUdUMbM1m/Projects";
    fetch(url, {
      headers: { Authorization: "Bearer " + process.env.REACT_APP_AIRTABLE_KEY }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log("data from Airtable", responseData);
        const projectData = responseData.records;
        // console.log("projectData ", projectData);
        this.setState({projectData: projectData});
      });
    }

  filterDirectory = searchTerm => {
    // console.log('searchTerm ', searchTerm)
    let directory = this.state.allDirectory;
    const formattedSearch = searchTerm.toLowerCase();
    // console.log(directory)
    
    const results = directory.filter(person => {
      // console.log(person)
      let grabData = (
        person.fields.Name +
        person.fields.Phone +
        person.fields['Email Address'] +
        person.fields.Location +
        person.fields.Title +
        person.fields.State
      )
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
      return grabData.indexOf(formattedSearch) > -1;
    })
    // console.log(results)
    this.setState({ crewDirectory: results })
  }
  render() {
    return(
      <div className = 'directory-container'>
        {this.state.crewDirectory && (<DirectorySearchBar 
          crewDirectory={this.state.crewDirectory}
          selectedStaffMember={this.selectedStaffMember}
          // handleInput={this.handleInput}
          filterDirectory={this.filterDirectory}
        />
        )}
        {this.state.crewDirectory && (<DirectoryList 
          crewDirectory={this.state.crewDirectory}
          selectedStaffMember={this.selectedStaffMember}
          projectData={this.state.projectData}
          isFlipped={this.state.isFlipped}
        />)}
     </div>
   
    )
    
  }
}

export default Directory 
  