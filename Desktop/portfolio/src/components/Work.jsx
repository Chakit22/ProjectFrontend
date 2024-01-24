import React from 'react';
import { useState, useEffect } from 'react';
import  Skeleton  from '@mui/material/Skeleton';

const Work = () => {
  const [projects,setProjects] = useState([]);

  const fetchGithubRepositories = async () => {
    try{
        /* Get the response from Github. */
        const response = await fetch(`https://api.github.com/users/${process.env.REACT_APP_GITHUB_USERNAME}/repos`,
                                    {headers: {Authorization: 'Bearer ' + process.env.REACT_APP_PAT}});

        if(!response.ok){ 
            /* If the response is not okay then throw the error. */
            throw new Error("Responded with " + response.status);
        }

        /* Get all the repos of the current user. */
        let repos = await response.json();
        return repos;
    }catch(err){
        console.error(err);
        throw err;
    }
  }

  const fetchImagesAndData = async (repos) => {
    let projectsData = [];

    for(let i=0;i<repos.length;++i){
        
        const response = await fetch(`https://api.github.com/repos/${process.env.REACT_APP_GITHUB_USERNAME}/${repos[i].name}/contents/demoImage`,
                                    {headers: {Authorization: 'Bearer ' + process.env.REACT_APP_PAT}});

        if(response.ok){
            const demoImageFolderContent = await response.json();
            
            /* Get the demo Image from the reponse. */
            const demoImage = demoImageFolderContent[0]?.name;

            /* Default name of main branch is main. */
            let mainBranch = "main";

            /* Verify whether the main branch on the Github is master or main. */
            const response1 = await fetch(`https://raw.githubusercontent.com/${process.env.REACT_APP_GITHUB_USERNAME}/${repos[i].name}/master/demoImage/${demoImage}`);
            
            if(response1.ok){
                mainBranch = "master";
            }

            projectsData.push({
                name:repos[i].name,
                github:repos[i].html_url,
                demo:repos[i].homepage,
                image:`https://raw.githubusercontent.com/${process.env.REACT_APP_GITHUB_USERNAME}/${repos[i].name}/${mainBranch}/demoImage/${demoImage}`,
            });
        }else{
            console.error("Responded with " + response.status);
        }
    }

    return projectsData;
  }
  
  useEffect(() => {
    const fetchData = async () => {
        try{
            /* Fetch the github repositories */
            const repos = await fetchGithubRepositories();

            /* Refactor's the data after adding images. */
            const projectsData = await fetchImagesAndData(repos);

            /* Set the projects state variable to this after 2 seconds for smooth transition. */
            setTimeout(() => {
                setProjects(projectsData);
            },2000);
        }catch(err){
            console.error(err);
        }
    }

    /* Fetch the Github data. */
    fetchData();
  },[]);

  return (
    <div name='Work' className='w-full min-h-screen text-gray-300 bg-[#0a192f] pt-[80px] flex flex-col justify-center'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 text-gray-300 border-pink-600'>
            Work
          </p>
          <p className='py-6'>// Check out my Projects</p>
        </div>

        {/* Projects container */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects.length == 0 ? (
                <>
                    {[...Array(6)].map((repo, index) => (
                        <div
                        key={index}
                        className="container rounded-md flex justify-center text-center 
                        items-center mx-auto"
                        >
                            <Skeleton
                            variant="rounded"
                            sx={{ bgcolor: "grey.600", minHeight: "250px"}}
                            className="sm:w-80 w-full"
                            />
                        </div>
                    ))}
                </>
            ):(
                <>
                    {projects.map((item, index) => (
                        <div
                            key={index}
                            style={{ backgroundImage: `url(${item?.image})` }}
                            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center text-center 
                            items-center mx-auto w-full content-div"
                        >
                            {/* Hover effect for images */}
                            <div className="opacity-0 group-hover:opacity-100 ">
                                <span className="text-2xl font bold text-white tracking-wider ">
                                    {item?.name}
                                </span>
                                <div className="pt-8 text-center ">
                                    {/* eslint-disable-next-line */}
                                    <a href={item?.github} target="_blank">
                                        <button 
                                        className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                                            Code
                                        </button>
                                    </a>
                                    {/* eslint-disable-next-line */}
                                    <a href={item?.demo} target="_blank">
                                        <button 
                                        className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                                            Demo
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Work;