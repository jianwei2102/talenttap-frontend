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
        <div className="w-full bg-white p-5 rounded-2xl mb-6">
            <h1 className="text-2xl font-bold mb-7">New Hiring Requests</h1>
            <table className="table-fixed w-full">
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
                            className="me-2 mb-[-1px]"
                            sx={{ marginBottom: -1 }}
                          >
                            {iconType[request.status].icon}
                          </Icon>
                            {request.status}
                        </td>
                        <td>{request.date}</td>
                        <td>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                            <div className={`bg-red-600 h-2.5 rounded-full w-[${request.progress}%]`}></div>
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