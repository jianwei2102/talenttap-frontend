import Icon from '@mui/material/Icon';
import React from 'react';



interface HiringRequest {
    name: string;
    status: string;
    date: string;
    progress: number;
}

let iconType = {
    "Completed": {
        icon: "check_circle",
        color: "success",
    },
    "Unconfirmed": {
        icon: "error",
        color: "warning",
    },
    "Declined": {
        icon: "cancel",
        color: "error",
    }
}

let mockData: HiringRequest[] = [
    {
        name: "Johnson Cina",
        status: "Completed",
        date: "18 Apr 2021",
        progress: 100,
    },
    {
        name: "Dwang Jensen",
        status: "Declined",
        date: "18 Apr 2021",
        progress: 70,
    },
    {
        name: "Bogo Soto",
        status: "Unconfirmed",
        date: "20 May 2021",
        progress: 60,
    },
    {
        name: "Jason Stamp",
        status: "Completed",
        date: "20 May 2021",
        progress: 80,
    },
    {
        name: "Fong Shoy",
        status: "Completed",
        date: "12 July 2021",
        progress: 100,
    },
]

export default function HiringRequestTable() {
    return (
        <div className="tw-w-full tw-bg-white tw-p-5 tw-rounded-2xl tw-mb-6">
            <h1 className="tw-text-2xl tw-font-bold tw-mb-7">New Hiring Requests</h1>
            <table className="table-tw-fixed tw-w-full">
              <thead>
                <tr>
                  <th>HIRING MANAGER NAME</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>PROGRESS</th>
                </tr>
              </thead>
              <tbody>

               { mockData.map(function (request) {
                    return (
                        <tr>
                        <td>{request.name}</td>
                        <td>
                          <Icon
                            color={iconType[request.status].color}
                            fontSize="large"
                            className="me-2 tw-mb-[-1px]"
                            sx={{ marginBottom: -1 }}
                          >
                            {iconType[request.status].icon}
                          </Icon>
                            {request.status}
                        </td>
                        <td>{request.date}</td>
                        <td>
                          <div className="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-2.5 dark:tw-bg-gray-300">
                            <div className={`tw-bg-red-600 tw-h-2.5 tw-rounded-full tw-w-[${request.progress}%]`}></div>
                          </div>
                        </td>
                      </tr>
                    )
                } )}
         
                
              </tbody>
            </table>
          </div>
    )
}