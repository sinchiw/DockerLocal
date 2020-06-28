import React, { useState, useEffect, InputHTMLAttributes } from 'react';
import RepoListItem from './RepoListItem';

import { Repo, RepoResponseType } from '../../../types/types';


const AddRepos: React.FC = ({showAddRepos, setShowAddRepos, userInfo}) => {
  const [repos, setRepos] = useState<RepoResponseType>({personal: [], organizations: [], collaborations: []})
  const [selectedRepos, setSelectedRepos] = useState<readonly Repo[]>([])
  const [searchValue, setSearchValue] = useState('');
  
  // dummy request and response 
  const fetchRepos = (userInfo) => {
    // send request to back end
    // ** send request to **  /api/repos
    const response: RepoResponseType = {
      personal: [
      {repoName: 'perrepop1', repoCloneLink: 'personallink1'},
      {repoName: 'abcdefgpersonal2', repoCloneLink: 'personallink2'},
      {repoName: 'abbsddpersonalRepo3', repoCloneLink: 'personallink3'},
      {repoName: 'terrtqwwalRepo4', repoCloneLink: 'personallink4'},
      {repoName: 'abhhsdnalRepo5', repoCloneLink: 'personallink5'},
      {repoName: 'personalRepo6', repoCloneLink: 'personallink6'},
      {repoName: 'organization Repo1', repoCloneLink: 'orglink1'},
      {repoName: 'organization Repo2', repoCloneLink: 'orglink2'},
      {repoName: 'organization Repo3', repoCloneLink: 'orglink3'},
      {repoName: 'organization Repo4', repoCloneLink: 'orglink4'},
      {repoName: 'organization Repo5', repoCloneLink: 'orglink5'},
      {repoName: 'organization Repo6', repoCloneLink: 'orglink6'},
      {repoName: 'collab Repo1', repoCloneLink: 'collablink1'},
      {repoName: 'collab Repo2', repoCloneLink: 'collablink2'},
      {repoName: 'collab Repo3', repoCloneLink: 'collablink3'},
      {repoName: 'collab Repo4', repoCloneLink: 'collablink4'},
      {repoName: 'collab Repo5', repoCloneLink: 'collablink5'},
      {repoName: 'collab Repo6', repoCloneLink: 'collablink6'},


      ],
      organizations: [
      {repoName: 'organization Repo1', repoCloneLink: 'orglink1'},
      {repoName: 'organization Repo2', repoCloneLink: 'orglink2'},
      {repoName: 'organization Repo3', repoCloneLink: 'orglink3'},
      {repoName: 'organization Repo4', repoCloneLink: 'orglink4'},
      {repoName: 'organization Repo5', repoCloneLink: 'orglink5'},
      {repoName: 'organization Repo6', repoCloneLink: 'orglink6'},
      ],
      collaborations: [
      {repoName: 'collab Repo1', repoCloneLink: 'collablink1'},
      {repoName: 'collab Repo2', repoCloneLink: 'collablink2'},
      {repoName: 'collab Repo3', repoCloneLink: 'collablink3'},
      {repoName: 'collab Repo4', repoCloneLink: 'collablink4'},
      {repoName: 'collab Repo5', repoCloneLink: 'collablink5'},
      {repoName: 'collab Repo6', repoCloneLink: 'collablink6'},
      ],
    }

    return response;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value)
  }


  const handleSubmit = () => {
    // submit stuff to back end
    // then
    setShowAddRepos(false);

  }

  useEffect(() => {
    // fetchRepos(userInfo)
    // then
    setRepos(fetchRepos(userInfo));
  }, [])

  // {repos.map(repo => <li>{repo.repoName}</li>)}
  // <button onClick={handleSubmit}>Close</button>
  return (

    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <article className="panel is-primary">
          <p className="panel-heading">
            Select Repositories to Add: 
          </p>
          <section className="modal-card-body">
            <p className="panel-tabs">
              {/* these currently have no functionality */}
              <a className="is-active">All</a>
              <a>Personal</a>
              <a>Organizations</a>
              <a>Coallaborations</a>
            </p>
            <div className="panel-block">
              <p className="control has-icons-left">
                <input 
                  className="input is-large" 
                  type="text" 
                  placeholder="Search" 
                  size={80} 
                  value={searchValue}
                  onChange={handleChange}
                />
                {/* <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true"></i>
                </span> */}
              </p>
            </div>
          
            <div className="is-scrollable">

              {repos.personal
                .filter(({ repoName }) => {
                  return searchValue === '' ||  repoName.includes(searchValue)
                })
                .map((repo) => (
                  <RepoListItem 
                    key={repo.repoName}
                    // repo={repo}
                    {...{ 
                      repo,
                      selectedRepos, 
                      setSelectedRepos
                    }}
                  />
                ))}
            </div>

          </section>

          <footer className="modal-card-foot">
            <div className="content">
              Add the following Repositories to your project:
              <ul>
                {selectedRepos.map(({ repoName }) => <li key={`confirm ${repoName}`}>{repoName}</li> )}
              </ul>
            </div>
            <div>
            <button className="button" onClick={(): void => setShowAddRepos(false)}>Cancel</button>
            <button className="button is-success" onClick={(): void => handleSubmit()}>Add Repos</button>

            </div>
          </footer>
        </article>
      </div>
    </div>


    
  )
}

export default AddRepos;