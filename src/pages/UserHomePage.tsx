import React from 'react';
import UserNavBar from "../components/UserNavBar.tsx";
import {useState} from 'react';

function UserHomePage() {
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);

  return (
    <div className='h-screen w-screen absolute flex flex-col'>
      <UserNavBar activeIndex={0} />
      <div className="w-full h-20 flex justify-center items-center">
        <div className="w-5/6 h-3/4 flex justify-between pl-10 pr-10">
            <div id='campaign-switch' className="w-auto h-5/6 flex justify-center items-center border border-black rounded-sm p-2">
                <div className={activeCampaignIndex === 0 ? 'bg-red-700 text-white text-sm text-center mr-2 p-2' : 'bg-white text-black text-sm text-center mr-2 p-2'}>Ongoing Campaign</div>
                <div className={activeCampaignIndex === 1 ? 'bg-red-700 text-white text-sm text-center p-2' : 'bg-white text-black text-sm text-center p-2'}>Applied Campaign</div>
            </div>
            <div className='w-4/6 h-5/6 flex justify-between items-center p-2'>
                <div className='w-2/6 border border-black flex'>
                    <img alt=''></img>
                    <span className='text-xs'>Search by job title or keyword</span>
                </div>
                <div className='w-2/6 border border-black'>
                    <img alt=''></img>
                    <span className='text-xs'>All locations</span>
                </div>
                <button className='w-1/6 bg-red-700 text-center text-white text-md p-2 border rounded-md'>SEARCH</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
