import React, { useMemo, useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import AdminNavBar from "../../components/admin/AdminNavBar.tsx";
import {
  InformationIcon,
  CircleCrossIcon,
  CircleCheckIcon,
  EyeIcon,
  MoreVerticalIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  IdIcon,
  CrossIcon,
  HelpIcon,
} from "../../assets/index.js";
import { useNavigate } from "react-router-dom";
import CommandBar from "../../components/CommandBar.tsx";

// Used for General Interview and Technical Assessment table data
type CandidateCVData = {
  rank: number;
  name: string;
  title: string;
  status: "Passed" | "Approved" | "Pending" | "Rejected";
  cvLink: string;
};

// Used for General Interview and Technical Assessment table data
type CandidateAssessmentData = {
  rank: number;
  name: string;
  title: string;
  status: "Passed" | "Approved" | "High Priority / KIV" | "Pending" | "Rejected";
  score: number;
};

// Used for Hiring Manager Interview table data
type HiringManagerInterviewData = {
  rank: number;
  name: string;
  title: string;
  status: "Passed" | "Approved" | "Scheduled" | "Pending" | "Rejected";
  interviewStatus: "Scheduled" | "Pending";
  email: string;
  interviewTime: string | null;
};

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?:
      | "text"
      | "range"
      | "candidate-cv-component-status-select"
      | "candidate-assessment-component-status-select"
      | "hiring-manager-component-status-select"
      | "interview-details-select";
  }
}

const supportTextSections = [
  {
    section: "Overview",
    message:
      "The Campaign Process Results Page allows you to view each process in the selected campaign and the results of the candidates in each interview component.",
  },
  {
    section: "View Candidate Results in Selected Interview Component",
    message:
      'To view a candidate\'s results in a specific interview component (for example \"General Interview 1\"), click on the interview component in the navigation list (left-middle side of the page), then click on the eye icon on the candidate\'s row.',
  },
  {
    section: "Approve and Reject Candidates",
    message:
      'To approve or deject a candidate in an interview component, click on the more menu icon (3 vertical dots) on the candidate\'s row, then click on the \"Approve\" or \"Reject\" button.',
  },
  {
    section: "View Candidate Profile",
    message:
      'To view a candidate\'s profile which has an overview of the candidate, click on the more menu icon (3 vertical dots) on the candidate\'s row, then click on the \"View Candidate Profile\" button.',
  },
  {
    section: "Ctrl + K Shortcut Key",
    message:
      "Simply click on Ctrl + K on your keyboard to display the command box! The command box helps you navigate to frequently visited areas of the site, without needing to click on multiple buttons. If you need any help, you can also search through the website, which employs AI to get the resources that you need.",
  },
];

function CampaignProcessResultsPage() {
  const navigate = useNavigate();

  const campaignName = "ASEAN Software Engineer 2024";
  const interviewComponentList = [
    { name: "CV Round", type: "CV Filtering" },
    { name: "General Interview 1", type: "General Interview" },
    { name: "Technical Assessment 1", type: "Technical Assessment" },
    { name: "Technical Assessment 2", type: "Technical Assessment" },
    { name: "Hiring Manager Interview 1", type: "Hiring Manager Interview" },
  ];
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);
  const [isShowingSupportModal, setIsShowingSupportModal] = useState(false);

  const handleViewCandidateResultsButtonClick = () => {
    switch (interviewComponentList[activeComponentIndex].type) {
      case "General Interview":
        navigate("/general-interview-result");
        break;
      case "Technical Assessment":
        navigate("/skill-assessment-result");
        break;
    }
  };

  const handleViewCandidateProfileButtonClick = () => {
    navigate("/candidate-profile");
  };

  const CandidateCVComponent = () => {
    // TODO: fetch data for general interview/ technical assessment
    const defaultData: CandidateCVData[] = [
      {
        rank: 1,
        name: "Jane Doe",
        title: "Software Engineer",
        status: "Passed",
        cvLink: "https://talenttap-data.s3.amazonaws.com/Michelle+Chin+Yee+Lin_Resume+2024.pdf",
      },
      {
        rank: 2,
        name: "Ng Jian Wei",
        title: "Software Engineer",
        status: "Passed",
        cvLink: "",
      },
      {
        rank: 3,
        name: "Jonah Jonash",
        title: "Software Engineer",
        status: "Approved",
        cvLink: "",
      },
      {
        rank: 4,
        name: "Yui Hakami",
        title: "Software Engineer",
        status: "Approved",
        cvLink: "",
      },
      {
        rank: 5,
        name: "Kim Joon Eon",
        title: "Software Engineer",
        status: "Approved",
        cvLink: "",
      },
      {
        rank: 6,
        name: "Albraham Muhammad",
        title: "Software Engineer",
        status: "Pending",
        cvLink: "",
      },
      {
        rank: 7,
        name: "Sean Kimson",
        title: "Software Engineer",
        status: "Pending",
        cvLink: "",
      },
      {
        rank: 8,
        name: "Choi Seungcheol",
        title: "Software Engineer",
        status: "Pending",
        cvLink: "",
      },
      {
        rank: 9,
        name: "Yoon Jeonghan",
        title: "Software Engineer",
        status: "Pending",
        cvLink: "",
      },
      {
        rank: 10,
        name: "Hong Jisoo",
        title: "Software Engineer",
        status: "Rejected",
        cvLink: "",
      },
      {
        rank: 11,
        name: "Wen Jun Hui",
        title: "Software Engineer",
        status: "Rejected",
        cvLink: "",
      },
      {
        rank: 12,
        name: "Kwon Soonyoung",
        title: "Software Engineer",
        status: "Rejected",
        cvLink: "",
      },
    ];

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const columns = useMemo<ColumnDef<CandidateCVData, any>[]>(
      () => [
        {
          accessorFn: (row) => row.rank,
          id: "rank",
          cell: (info) => info.getValue(),
          header: "Rank",
          size: 5,
          enableColumnFilter: false,
        },
        {
          accessorKey: "name",
          cell: (info) => info.getValue(),
          header: "Name",
          size: 50,
        },
        {
          accessorFn: (row) => row.title,
          id: "title",
          cell: (info) => info.getValue(),
          header: "Title",
          size: 40,
        },
        {
          accessorFn: (row) => row.status,
          id: "status",
          cell: (info) => info.getValue(),
          header: "Status",
          size: 15,
          meta: {
            filterVariant: "candidate-cv-component-status-select",
          },
          enableSorting: false,
        },
        {
          accessorFn: (row) => row.cvLink,
          id: "cvLink",
          cell: (info) => info.getValue(),
          header: "CV Link",
          size: 30,
          enableSorting: false,
          enableColumnFilter: false,
        },
        {
          id: "action",
          header: "Action",
          cell: (props) => (
            <div className="tw-flex tw-space-x-5">
              <button
                data-key={props.row.getValue("name")}
                className="tw-h-8 tw-text-gray-600"
                onClick={handleMoreMenuButtonClick}>
                <MoreVerticalIcon />
              </button>
            </div>
          ),
          size: 20,
        },
      ],
      []
    );

    const [data, setData] = useState<CandidateCVData[]>(defaultData);

    const table = useReactTable({
      data,
      columns,
      filterFns: {},
      state: {
        columnFilters,
      },
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: true,
      debugHeaders: true,
      debugColumns: true,
    });

    // TODO: Fetch interviewer details
    const interviewerList = ["John Stones", "Devid Bromberg"];
    const interviewerEmailList = ["johnstones@hilti.com", "devidbromberg@hilti.com"];

    const [isShowingMoreMenuModal, setIsShowingMoreMenuModal] = useState(false);
    const [moreMenuModalX, setMoreMenuModalX] = useState(0);
    const [moreMenuModalY, setMoreMenuModalY] = useState(0);
    const [moreMenuModalDataKey, setMoreMenuModalDataKey] = useState("");

    const handleMoreMenuButtonClick = (event) => {
      let currentTargetRect = event.currentTarget.getBoundingClientRect();
      setMoreMenuModalX(currentTargetRect.left);
      setMoreMenuModalY(currentTargetRect.top);
      setIsShowingMoreMenuModal(true);
      setMoreMenuModalDataKey(event.currentTarget.getAttribute("data-key"));
    };

    const handleMoreMenuApproveButtonClick = () => {
      const index = data.findIndex((candidate) => candidate.name === moreMenuModalDataKey);
      const updatedData = [...data];
      if (updatedData[index].status === "Pending") {
        updatedData[index].status = "Approved";
        setData(updatedData);
      }
    };

    const handleMoreMenuRejectButtonClick = () => {
      const index = data.findIndex((candidate) => candidate.name === moreMenuModalDataKey);
      const updatedData = [...data];
      if (updatedData[index].status === "Pending") {
        updatedData[index].status = "Rejected";
        setData(updatedData);
      }
    };

    return (
      <div className="tw-p-2 tw-w-full tw-overflow-auto">
        <table className="tw-h-[90%] tw-w-full">
          <thead className="tw-space-x-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="tw-space-x-5">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: `${header.getSize() + "rem"}` }}
                    className="tw-space-x-5 tw-px-2">
                    {header.isPlaceholder ? null : (
                      <div className="tw-flex tw-flex-col">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "tw-flex tw-items-center tw-cursor-pointer tw-select-none"
                              : "tw-flex tw-items-center",
                            onClick: header.column.getToggleSortingHandler(),
                          }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.columnDef.header === "Status" ? (
                            <div className="tw-group tw-relative">
                              <div className="tw-h-5 tw-text-black tw-ml-2 tw-cursor-pointer">
                                <InformationIcon />
                              </div>
                              <div className="tw-w-56 tw-transition tw-transform tw-translate-x-8 tw-translate-y-[-2rem] tw-ease-in-out tw-invisible tw-absolute tw-border tw-border-2 tw-border-red-700 tw-bg-white tw-shadow-lg tw-flex tw-flex-col tw-p-2 group-hover:tw-visible">
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Passed: </span>Reviewed, passed
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Approved: </span>Reviewed, passed,
                                  yet to inform candidate
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Pending: </span>Pending human
                                  review
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Rejected: </span>Reviewed, rejected
                                  candidate
                                </span>
                              </div>
                            </div>
                          ) : (
                            {
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null
                          )}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="tw-mt-2">
                            <Filter column={header.column} />
                          </div>
                        ) : (
                          <div className="tw-h-10" />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) =>
                  cell.column.columnDef.header === "CV Link" ? (
                    <td className="tw-pr-10">
                      {cell.getValue() !== "" ? (
                        <a href={String(cell.getValue())} target="_blank">
                          {cell.row.getValue("name") + " - CV"}
                        </a>
                      ) : (
                        <></>
                      )}
                    </td>
                  ) : (
                    <td key={cell.id} className="tw-h-full tw-px-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tw-h-[10%] tw-w-full tw-relative tw-fixed">
          <div className="tw-h-[2px] tw-w-full tw-bg-gray-300 tw-mt-2" />
          <div className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-p-2">
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              {"<<"}
            </button>
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              {"<"}
            </button>
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              {">"}
            </button>
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              {">>"}
            </button>
            <span className="tw-flex tw-items-center tw-gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
            <span className="tw-flex tw-items-center tw-gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="tw-border tw-border-gray-400 tw-p-1 tw-rounded tw-w-16"
              />
            </span>
            <select
              className="tw-border tw-border-gray-400 tw-rounded"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* More Menu Modal */}
        <div
          className={`tw-h-screen tw-w-screen tw-fixed tw-top-0 tw-left-0 tw-z-1 ${
            isShowingMoreMenuModal ? "tw-visible" : "tw-hidden"
          }`}
          onClick={() => setIsShowingMoreMenuModal(false)}>
          <div
            className="tw-h-fit tw-w-fit tw-p-3 tw-rounded-xl tw-shadow-lg tw-flex tw-flex-col tw-justify-center tw-relative tw-z-10 tw-bg-white"
            style={{
              top: `${moreMenuModalY + "px"}`,
              left: `calc(${moreMenuModalX + "px"} - 15rem)`,
            }}>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleMoreMenuApproveButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <ThumbsUpIcon />
              </div>
              <span className="tw-ml-2">Approve</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleMoreMenuRejectButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <ThumbsDownIcon />
              </div>
              <span className="tw-ml-2">Reject</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleViewCandidateProfileButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <IdIcon />
              </div>
              <span className="tw-ml-2">View Candidate Profile</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={() => setIsShowingMoreMenuModal(false)}>
              <div className="tw-h-5 tw-text-black">
                <CrossIcon />
              </div>
              <span className="tw-ml-2">Close</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CandidateAssementComponent = () => {
    // TODO: fetch data for general interview/ technical assessment
    const defaultData: CandidateAssessmentData[] = [
      {
        rank: 1,
        name: "Jane Doe",
        title: "Software Engineer",
        status: "Passed",
        score: 98,
      },
      {
        rank: 2,
        name: "Ng Jian Wei",
        title: "Software Engineer",
        status: "Passed",
        score: 95,
      },
      {
        rank: 3,
        name: "Jonah Jonash",
        title: "Software Engineer",
        status: "Approved",
        score: 91,
      },
      {
        rank: 4,
        name: "Yui Hakami",
        title: "Software Engineer",
        status: "High Priority / KIV",
        score: 75,
      },
      {
        rank: 5,
        name: "Kim Joon Eon",
        title: "Software Engineer",
        status: "Pending",
        score: 65,
      },
      {
        rank: 6,
        name: "Albraham Muhammad",
        title: "Software Engineer",
        status: "Pending",
        score: 15,
      },
      {
        rank: 7,
        name: "Sean Kimson",
        title: "Software Engineer",
        status: "Rejected",
        score: 45,
      },
      {
        rank: 8,
        name: "Jane Doe",
        title: "Software Engineer",
        status: "Passed",
        score: 98,
      },
      {
        rank: 9,
        name: "Ng Jian Wei",
        title: "Software Engineer",
        status: "Passed",
        score: 95,
      },
      {
        rank: 10,
        name: "Jonah Jonash",
        title: "Software Engineer",
        status: "Approved",
        score: 91,
      },
      {
        rank: 11,
        name: "Yui Hakami",
        title: "Software Engineer",
        status: "High Priority / KIV",
        score: 75,
      },
      {
        rank: 12,
        name: "Kim Joon Eon",
        title: "Software Engineer",
        status: "Pending",
        score: 65,
      },
      {
        rank: 13,
        name: "Albraham Muhammad",
        title: "Software Engineer",
        status: "Pending",
        score: 15,
      },
      {
        rank: 14,
        name: "Sean Kimson",
        title: "Software Engineer",
        status: "Rejected",
        score: 45,
      },
    ];

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const columns = useMemo<ColumnDef<CandidateAssessmentData, any>[]>(
      () => [
        {
          accessorFn: (row) => row.rank,
          id: "rank",
          cell: (info) => info.getValue(),
          header: "Rank",
          size: 5,
          enableColumnFilter: false,
        },
        {
          accessorKey: "name",
          cell: (info) => info.getValue(),
          header: "Name",
          size: 50,
        },
        {
          accessorFn: (row) => row.title,
          id: "title",
          cell: (info) => info.getValue(),
          header: "Title",
          size: 40,
        },
        {
          accessorFn: (row) => row.status,
          id: "status",
          cell: (info) => info.getValue(),
          header: "Status",
          size: 15,
          meta: {
            filterVariant: "candidate-assessment-component-status-select",
          },
          enableSorting: false,
        },
        {
          accessorFn: (row) => row.score,
          id: "score",
          cell: (info) => info.getValue(),
          header: "Score",
          size: 10,
          meta: {
            filterVariant: "range",
          },
        },
        {
          id: "action",
          header: "Action",
          cell: (props) => (
            <div className="tw-flex tw-space-x-5">
              <button
                className="tw-h-8 tw-text-gray-600"
                onClick={handleViewCandidateResultsButtonClick}>
                <EyeIcon />
              </button>
              <button
                data-key={props.row.getValue("name")}
                className="tw-h-8 tw-text-gray-600"
                onClick={handleMoreMenuButtonClick}>
                <MoreVerticalIcon />
              </button>
            </div>
          ),
          size: 20,
        },
      ],
      []
    );

    const [data, setData] = useState<CandidateAssessmentData[]>(defaultData);

    const table = useReactTable({
      data,
      columns,
      filterFns: {},
      state: {
        columnFilters,
      },
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: true,
      debugHeaders: true,
      debugColumns: true,
    });

    const [isShowingMoreMenuModal, setIsShowingMoreMenuModal] = useState(false);
    const [moreMenuModalX, setMoreMenuModalX] = useState(0);
    const [moreMenuModalY, setMoreMenuModalY] = useState(0);
    const [moreMenuModalDataKey, setMoreMenuModalDataKey] = useState("");

    const handleMoreMenuButtonClick = (event) => {
      let currentTargetRect = event.currentTarget.getBoundingClientRect();
      setMoreMenuModalX(currentTargetRect.left);
      setMoreMenuModalY(currentTargetRect.top);
      setIsShowingMoreMenuModal(true);
      setMoreMenuModalDataKey(event.currentTarget.getAttribute("data-key"));
    };

    const handleMoreMenuApproveButtonClick = () => {
      const index = data.findIndex((candidate) => candidate.name === moreMenuModalDataKey);
      const updatedData = [...data];
      if (
        updatedData[index].status === "Pending" ||
        updatedData[index].status === "High Priority / KIV"
      ) {
        updatedData[index].status = "Approved";
        setData(updatedData);
      }
    };

    const handleMoreMenuRejectButtonClick = () => {
      const index = data.findIndex((candidate) => candidate.name === moreMenuModalDataKey);
      const updatedData = [...data];
      if (
        updatedData[index].status === "Pending" ||
        updatedData[index].status === "High Priority / KIV"
      ) {
        updatedData[index].status = "Rejected";
        setData(updatedData);
      }
    };

    const handleMoreMenuKivButtonClick = () => {
      const index = data.findIndex((candidate) => candidate.name === moreMenuModalDataKey);
      const updatedData = [...data];
      if (updatedData[index].status === "Pending") {
        updatedData[index].status = "High Priority / KIV";
        setData(updatedData);
      }
    };

    return (
      <div className="tw-p-2 tw-w-full tw-overflow-auto">
        <table className="tw-h-[90%] tw-w-full">
          <thead className="tw-space-x-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="tw-space-x-5">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: `${header.getSize() + "rem"}` }}
                    className="tw-space-x-5 tw-px-2">
                    {header.isPlaceholder ? null : (
                      <div className="tw-flex tw-flex-col">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "tw-flex tw-items-center tw-cursor-pointer tw-select-none"
                              : "tw-flex tw-items-center",
                            onClick: header.column.getToggleSortingHandler(),
                          }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.columnDef.header === "Status" ? (
                            <div className="tw-group tw-relative">
                              <div className="tw-h-5 tw-text-black tw-ml-2 tw-cursor-pointer">
                                <InformationIcon />
                              </div>
                              <div className="tw-w-56 tw-transition tw-transform tw-translate-x-8 tw-translate-y-[-2rem] tw-ease-in-out tw-invisible tw-absolute tw-border tw-border-2 tw-border-red-700 tw-bg-white tw-shadow-lg tw-flex tw-flex-col tw-p-2 group-hover:tw-visible">
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Passed: </span>Reviewed, passed
                                  interview
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Approved: </span>Reviewed, passed
                                  interview, yet to inform candidate
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">High Priority / KIV: </span>Keep
                                  candidate in view
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Pending: </span>Interview
                                  completed, pending human review
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Rejected: </span>Reviewed, rejected
                                  candidate
                                </span>
                              </div>
                            </div>
                          ) : (
                            {
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null
                          )}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="tw-mt-2">
                            <Filter column={header.column} />
                          </div>
                        ) : (
                          <div className="tw-h-10" />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) =>
                  cell.column.columnDef.header === "Score" ? (
                    <td className="tw-pr-10">
                      <div
                        className={`${
                          Number(cell.getValue()) >= 75
                            ? "tw-bg-green-300 tw-text-green-900"
                            : Number(cell.getValue()) >= 45
                            ? "tw-bg-orange-100 tw-text-yellow-900"
                            : "tw-bg-red-100 tw-text-red-900"
                        } tw-py-1 tw-flex tw-justify-center tw-items-center tw-rounded-full`}>
                        {row.getValue("status") === "Passed" ? (
                          <div className="tw-h-5 tw-w-5 tw-flex tw-items-center tw-mr-2">
                            <CircleCheckIcon />
                          </div>
                        ) : row.getValue("status") === "Rejected" ? (
                          <div className="tw-h-5 tw-w-5 tw-flex tw-items-center tw-mr-2">
                            <CircleCrossIcon />
                          </div>
                        ) : (
                          <div />
                        )}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())} / 100
                      </div>
                    </td>
                  ) : (
                    <td key={cell.id} className="tw-h-full tw-px-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tw-h-[10%] tw-w-full tw-relative tw-fixed">
          <div className="tw-h-[2px] tw-w-full tw-bg-gray-300 tw-mt-2" />
          <div className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-p-2">
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              {"<<"}
            </button>
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              {"<"}
            </button>
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              {">"}
            </button>
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              {">>"}
            </button>
            <span className="tw-flex tw-items-center tw-gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
            <span className="tw-flex tw-items-center tw-gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="tw-border tw-border-gray-400 tw-p-1 tw-rounded tw-w-16"
              />
            </span>
            <select
              className="tw-border tw-border-gray-400 tw-rounded"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* More Menu Modal */}
        <div
          className={`tw-h-screen tw-w-screen tw-fixed tw-top-0 tw-left-0 tw-z-1 ${
            isShowingMoreMenuModal ? "tw-visible" : "tw-hidden"
          }`}
          onClick={() => setIsShowingMoreMenuModal(false)}>
          <div
            className="tw-h-fit tw-w-fit tw-p-3 tw-rounded-xl tw-shadow-lg tw-flex tw-flex-col tw-justify-center tw-relative tw-z-10 tw-bg-white"
            style={{
              top: `${moreMenuModalY + "px"}`,
              left: `calc(${moreMenuModalX + "px"} - 15rem)`,
            }}>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleMoreMenuApproveButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <ThumbsUpIcon />
              </div>
              <span className="tw-ml-2">Approve</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleMoreMenuRejectButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <ThumbsDownIcon />
              </div>
              <span className="tw-ml-2">Reject</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleMoreMenuKivButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <svg
                  className="tw-h-full tw-w-fit"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M8 13.5v-8a1.5 1.5 0 0 1 3 0v6.5m0 -6.5v-2a1.5 1.5 0 0 1 3 0v8.5m0 -6.5a1.5 1.5 0 0 1 3 0v6.5m0 -4.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2a7 6 0 0 1 -5 -3l-2.7 -5.25a1.4 1.4 0 0 1 2.75 -2l.9 1.75" />
                </svg>
              </div>
              <span className="tw-ml-2">High Priority / KIV</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleViewCandidateProfileButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <IdIcon />
              </div>
              <span className="tw-ml-2">View Candidate Profile</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={() => setIsShowingMoreMenuModal(false)}>
              <div className="tw-h-5 tw-text-black">
                <CrossIcon />
              </div>
              <span className="tw-ml-2">Close</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HiringManagerInterviewComponent = () => {
    // TODO: fetch data for general interview/ technical assessment
    const defaultData: HiringManagerInterviewData[] = [
      {
        rank: 1,
        name: "Jane Doe",
        title: "Software Engineer",
        status: "Passed",
        interviewStatus: "Scheduled",
        email: "janedoe@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 2,
        name: "Ng Jian Wei",
        title: "Software Engineer",
        status: "Passed",
        interviewStatus: "Scheduled",
        email: "jianwei@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 3,
        name: "Jonah Jonash",
        title: "Software Engineer",
        status: "Approved",
        interviewStatus: "Scheduled",
        email: "jonahjonash@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 4,
        name: "Yui Hakami",
        title: "Software Engineer",
        status: "Approved",
        interviewStatus: "Scheduled",
        email: "yuihakami@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 5,
        name: "Kim Joon Eon",
        title: "Software Engineer",
        status: "Scheduled",
        interviewStatus: "Scheduled",
        email: "jooneonkim@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 6,
        name: "Albraham Muhammad",
        title: "Software Engineer",
        status: "Scheduled",
        interviewStatus: "Scheduled",
        email: "albrahammuhammad@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 7,
        name: "Sean Kimson",
        title: "Software Engineer",
        status: "Scheduled",
        interviewStatus: "Scheduled",
        email: "seankimson@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 8,
        name: "Choi Seungcheol",
        title: "Software Engineer",
        status: "Pending",
        interviewStatus: "Pending",
        email: "seungcheol@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 9,
        name: "Yoon Jeonghan",
        title: "Software Engineer",
        status: "Pending",
        interviewStatus: "Pending",
        email: "jeonghan@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 10,
        name: "Hong Jisoo",
        title: "Software Engineer",
        status: "Rejected",
        interviewStatus: "Scheduled",
        email: "joshuajisoo@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 11,
        name: "Wen Jun Hui",
        title: "Software Engineer",
        status: "Rejected",
        interviewStatus: "Scheduled",
        email: "jun@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
      {
        rank: 12,
        name: "Kwon Soonyoung",
        title: "Software Engineer",
        status: "Rejected",
        interviewStatus: "Scheduled",
        email: "hoshi@gmail.com",
        interviewTime: "Monday, June 16th, 10.00 - 10.30 UTC +8",
      },
    ];

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const columns = useMemo<ColumnDef<HiringManagerInterviewData, any>[]>(
      () => [
        {
          accessorFn: (row) => row.rank,
          id: "rank",
          cell: (info) => info.getValue(),
          header: "Rank",
          size: 5,
          enableColumnFilter: false,
        },
        {
          accessorKey: "name",
          cell: (info) => info.getValue(),
          header: "Name",
          size: 50,
        },
        {
          accessorFn: (row) => row.title,
          id: "title",
          cell: (info) => info.getValue(),
          header: "Title",
          size: 40,
        },
        {
          accessorFn: (row) => row.status,
          id: "status",
          cell: (info) => info.getValue(),
          header: "Status",
          size: 15,
          meta: {
            filterVariant: "hiring-manager-component-status-select",
          },
          enableSorting: false,
        },
        {
          accessorFn: (row) => row.interviewStatus,
          id: "interviewDetails",
          cell: (info) => info.getValue(),
          header: "Interview Details",
          size: 10,
          meta: {
            filterVariant: "interview-details-select",
          },
        },
        {
          id: "action",
          header: "Action",
          cell: (props) => (
            <div className="tw-flex tw-space-x-5">
              <button
                className="tw-h-8 tw-text-gray-600"
                onClick={() => navigate("/candidate-summary")}>
                <EyeIcon />
              </button>
              <button
                data-key={props.row.getValue("name")}
                className="tw-h-8 tw-text-gray-600"
                onClick={handleMoreMenuButtonClick}>
                <MoreVerticalIcon />
              </button>
            </div>
          ),
          size: 20,
        },
      ],
      []
    );

    const [data, setData] = useState<HiringManagerInterviewData[]>(defaultData);

    const table = useReactTable({
      data,
      columns,
      filterFns: {},
      state: {
        columnFilters,
      },
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: true,
      debugHeaders: true,
      debugColumns: true,
    });

    // TODO: Fetch interviewer details
    const interviewerList = ["John Stones", "Devid Bromberg"];
    const interviewerEmailList = ["johnstones@hilti.com", "devidbromberg@hilti.com"];

    const [isShowingMoreMenuModal, setIsShowingMoreMenuModal] = useState(false);
    const [moreMenuModalX, setMoreMenuModalX] = useState(0);
    const [moreMenuModalY, setMoreMenuModalY] = useState(0);
    const [moreMenuModalDataKey, setMoreMenuModalDataKey] = useState("");
    const [isShowingInterviewDetailsModal, setIsShowingInterviewDetailsModal] = useState(false);
    const [candidateInterviewDetailsIndex, setCandidateInterviewDetailsIndex] = useState(-1);

    const handleMoreMenuButtonClick = (event) => {
      let currentTargetRect = event.currentTarget.getBoundingClientRect();
      setMoreMenuModalX(currentTargetRect.left);
      setMoreMenuModalY(currentTargetRect.top);
      setIsShowingMoreMenuModal(true);
      setMoreMenuModalDataKey(event.currentTarget.getAttribute("data-key"));
    };

    const handleMoreMenuApproveButtonClick = () => {
      const index = data.findIndex((candidate) => candidate.name === moreMenuModalDataKey);
      const updatedData = [...data];
      if (updatedData[index].status === "Scheduled") {
        updatedData[index].status = "Approved";
        setData(updatedData);
      }
    };

    const handleMoreMenuRejectButtonClick = () => {
      const index = data.findIndex((candidate) => candidate.name === moreMenuModalDataKey);
      const updatedData = [...data];
      if (updatedData[index].status === "Scheduled") {
        updatedData[index].status = "Rejected";
        setData(updatedData);
      }
    };

    const handleViewInterviewDetailsButtonClick = (event) => {
      const index = data.findIndex(
        (candidate) => candidate.name === event.currentTarget.getAttribute("data-key")
      );
      setIsShowingInterviewDetailsModal(true);
      setCandidateInterviewDetailsIndex(index);
    };

    useEffect(() => {}, [candidateInterviewDetailsIndex]);

    return (
      <div className="tw-p-2 tw-w-full tw-overflow-auto">
        <table className="tw-h-[90%] tw-w-full">
          <thead className="tw-space-x-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="tw-space-x-5">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: `${header.getSize() + "rem"}` }}
                    className="tw-space-x-5 tw-px-2">
                    {header.isPlaceholder ? null : (
                      <div className="tw-flex tw-flex-col">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "tw-flex tw-items-center tw-cursor-pointer tw-select-none"
                              : "tw-flex tw-items-center",
                            onClick: header.column.getToggleSortingHandler(),
                          }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.columnDef.header === "Status" ? (
                            <div className="tw-group tw-relative">
                              <div className="tw-h-5 tw-text-black tw-ml-2 tw-cursor-pointer">
                                <InformationIcon />
                              </div>
                              <div className="tw-w-56 tw-transition tw-transform tw-translate-x-8 tw-translate-y-[-2rem] tw-ease-in-out tw-invisible tw-absolute tw-border tw-border-2 tw-border-red-700 tw-bg-white tw-shadow-lg tw-flex tw-flex-col tw-p-2 group-hover:tw-visible">
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Passed: </span>Reviewed, passed
                                  interview
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Approved: </span>Reviewed, passed
                                  interview, yet to inform candidate
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Pending: </span>Interview
                                  completed, pending human review
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Scheduled: </span>Interview
                                  scheduled, yet to be completed
                                </span>
                                <span className="tw-font-normal tw-mb-2">
                                  <span className="tw-font-bold">Rejected: </span>Reviewed, rejected
                                  candidate
                                </span>
                              </div>
                            </div>
                          ) : (
                            {
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null
                          )}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="tw-mt-2">
                            <Filter column={header.column} />
                          </div>
                        ) : (
                          <div className="tw-h-10" />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) =>
                  cell.column.columnDef.header === "Interview Details" ? (
                    <td className="tw-pr-10">
                      <div
                        className={`${
                          cell.getValue() === "Scheduled"
                            ? "tw-bg-green-300 tw-text-green-900"
                            : "tw-bg-gray-300 tw-text-gray-900"
                        } tw-py-1 tw-flex tw-justify-center tw-items-center tw-rounded-full tw-cursor-pointer`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        {cell.getValue() === "Scheduled" ? (
                          <div
                            className="tw-h-5 tw-ml-2"
                            data-key={cell.row.getValue("name")}
                            onClick={handleViewInterviewDetailsButtonClick}>
                            <InformationIcon />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                  ) : (
                    <td key={cell.id} className="tw-h-full tw-px-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tw-h-[10%] tw-w-full tw-relative tw-fixed">
          <div className="tw-h-[2px] tw-w-full tw-bg-gray-300 tw-mt-2" />
          <div className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-p-2">
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              {"<<"}
            </button>
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              {"<"}
            </button>
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              {">"}
            </button>
            <button
              className="tw-border tw-border-gray-400 tw-rounded tw-p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              {">>"}
            </button>
            <span className="tw-flex tw-items-center tw-gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
            <span className="tw-flex tw-items-center tw-gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="tw-border tw-border-gray-400 tw-p-1 tw-rounded tw-w-16"
              />
            </span>
            <select
              className="tw-border tw-border-gray-400 tw-rounded"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* More Menu Modal */}
        <div
          className={`tw-h-screen tw-w-screen tw-fixed tw-top-0 tw-left-0 tw-z-1 ${
            isShowingMoreMenuModal ? "tw-visible" : "tw-hidden"
          }`}
          onClick={() => setIsShowingMoreMenuModal(false)}>
          <div
            className="tw-h-fit tw-w-fit tw-p-3 tw-rounded-xl tw-shadow-lg tw-flex tw-flex-col tw-justify-center tw-relative tw-z-10 tw-bg-white"
            style={{
              top: `${moreMenuModalY + "px"}`,
              left: `calc(${moreMenuModalX + "px"} - 15rem)`,
            }}>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleMoreMenuApproveButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <ThumbsUpIcon />
              </div>
              <span className="tw-ml-2">Approve</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleMoreMenuRejectButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <ThumbsDownIcon />
              </div>
              <span className="tw-ml-2">Reject</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={handleViewCandidateProfileButtonClick}>
              <div className="tw-h-5 tw-text-black">
                <IdIcon />
              </div>
              <span className="tw-ml-2">View Candidate Profile</span>
            </div>
            <div
              className="tw-w-full tw-flex tw-items-center tw-p-2 tw-cursor-pointer"
              onClick={() => setIsShowingMoreMenuModal(false)}>
              <div className="tw-h-5 tw-text-black">
                <CrossIcon />
              </div>
              <span className="tw-ml-2">Close</span>
            </div>
          </div>
        </div>
        {/* Interview Details Modal */}
        <div
          className={`tw-h-screen tw-w-screen tw-fixed tw-top-0 tw-left-0 tw-z-1 tw-flex tw-justify-center tw-items-center ${
            isShowingInterviewDetailsModal ? "tw-visible" : "tw-hidden"
          }`}
          onClick={() => setIsShowingInterviewDetailsModal(false)}>
          <div className="pop-up-modal-backdrop" />
          <div className="tw-h-fit tw-w-2/6 tw-bg-white tw-rounded-3xl tw-absolute tw-z-10 tw-p-3 tw-pb-8 tw-flex tw-flex-col tw-items-center">
            <div className="tw-w-full tw-flex tw-justify-between tw-cursor-pointer tw-px-5 tw-pt-5">
              <span className="tw-font-bold tw-text-2xl">Interview Details</span>
              <div className="tw-h-8" onClick={() => setIsShowingInterviewDetailsModal(false)}>
                <CrossIcon />
              </div>
            </div>
            <div className="hiring-manager-scheduled-interview-modal-grid divide-y divide-gray-400 tw-border tw-rounded-lg tw-border-gray-400 tw-m-5">
              <div className="tw-w-full tw-flex tw-flex-col tw-px-3 tw-py-5">
                <span className="tw-text-left">Employees Involved</span>
                <span className="tw-text-left tw-font-bold tw-text-lg tw-mt-3">
                  {interviewerList.join(" & ")}
                </span>
              </div>
              <div className="tw-w-full tw-flex tw-p-3 tw-items-center tw-justify-between">
                <div className="tw-h-10 tw-w-10 tw-border tw-border-gray-400 tw-rounded-lg tw-p-1.5 tw-flex tw-items-center tw-justify-center">
                  <svg
                    className="tw-h-full tw-w-full tw-text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    {" "}
                    <circle cx="12" cy="12" r="10" /> <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="tw-h-full tw-w-full tw-flex tw-items-center tw-justify-between ">
                  <span className="tw-h-full tw-w-1/6 tw-text-center tw-font-bold tw-flex tw-items-center tw-justify-center">
                    Time
                  </span>
                  <span className="tw-w-5/6 tw-text-left">
                    {candidateInterviewDetailsIndex >= 0 &&
                    data[candidateInterviewDetailsIndex].interviewTime !== null
                      ? data[candidateInterviewDetailsIndex].interviewTime
                      : ""}
                  </span>
                </div>
              </div>
              <div className="tw-w-full tw-flex tw-p-3 tw-items-center">
                <div className="tw-h-10 tw-w-10 tw-border tw-border-gray-400 tw-rounded-lg tw-p-1.5 tw-flex tw-items-center tw-justify-center">
                  <svg
                    className="tw-h-full tw-w-full tw-text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    {" "}
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
                    <circle cx="9" cy="7" r="4" /> <path d="M23 21v-2a4 4 0 0 0-3-3.87" />{" "}
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="tw-h-full tw-w-full tw-flex tw-items-center tw-justify-between">
                  <span className="tw-h-full tw-w-1/6 tw-text-center tw-font-bold tw-flex tw-items-center tw-justify-center">
                    Guest
                  </span>
                  <span className="tw-w-5/6 tw-text-left">
                    {candidateInterviewDetailsIndex >= 0 &&
                      data[candidateInterviewDetailsIndex].email + " (Candidate), "}
                    {interviewerEmailList.join(", ")}
                  </span>
                </div>
              </div>
              <div className="tw-w-full tw-flex tw-p-3 tw-items-center">
                <div className="tw-h-10 tw-w-10 tw-border tw-border-gray-400 tw-rounded-lg tw-p-1.5 tw-flex tw-items-center tw-justify-center">
                  <svg
                    className="tw-h-8 tw-w-8 tw-text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </div>
                <div className="tw-h-full tw-w-full tw-flex tw-items-center tw-justify-between">
                  <span className="tw-h-full tw-w-1/6 tw-text-center tw-font-bold tw-flex tw-items-center tw-justify-center">
                    Details
                  </span>
                  <span className="tw-w-5/6 tw-text-left">
                    An email has been sent with all interview details
                  </span>
                </div>
              </div>
              <div className="tw-w-full tw-flex tw-p-3 tw-items-center">
                <div className="tw-h-10 tw-w-10 tw-border tw-border-gray-400 tw-rounded-lg tw-p-1.5 tw-flex tw-items-center tw-justify-center">
                  <svg
                    className="h-8 w-8 text-red-black"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />{" "}
                    <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                  </svg>
                </div>
                <div className="tw-h-full tw-w-full tw-flex tw-items-center tw-justify-between">
                  <span className="tw-h-full tw-w-1/6 tw-text-center tw-font-bold tw-flex tw-items-center tw-justify-center">
                    Links
                  </span>
                  <a href="https://meet.google.com/hpw-txpw-wnm" className="tw-w-5/6 tw-text-left">
                    https://meet.google.com/hpw-txpw-wnm
                  </a>
                </div>
              </div>
              <div className="tw-w-full tw-flex tw-p-3 tw-items-center">
                <div className="tw-h-10 tw-w-10 tw-border tw-border-gray-400 tw-rounded-lg tw-p-1.5 tw-flex tw-items-center tw-justify-center">
                  <svg
                    className="h-8 w-8 text-black"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                  </svg>
                </div>
                <div className="tw-h-full tw-w-full tw-flex tw-items-center tw-justify-between">
                  <span className="tw-h-full tw-w-1/6 tw-text-center tw-font-bold tw-flex tw-items-center tw-justify-center">
                    Info Helper
                  </span>
                  <div className="tw-w-5/6 tw-flex tw-justify-start">
                    <button className="tw-bg-red-700 tw-text-white tw-p-2 tw-rounded">
                      Launch Extension
                    </button>
                    <div className="tw-flex tw-flex-col tw-ml-5">
                      <span className="tw-text-sm">Access code</span>
                      <span className="tw-text-red-700 tw-text-sm">142 163</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="tw-h-screen tw-w-screen tw-absolute tw-flex tw-flex-col tw-bg-gray-100">
      <AdminNavBar activeIndex={-1} />
      <div className="main-container tw-px-10 tw-flex tw-flex-col">
        <span className="tw-text-red-700 tw-font-bold tw-text-lg tw-italic tw-mt-5">
          Campaign Process Results
        </span>
        <span className="tw-font-bold tw-text-2xl tw-mt-3">{campaignName}</span>
        <div
          id="interview-component-navigation"
          className="tw-w-fit tw-h-fit tw-flex tw-items-center tw-flex-wrap tw-mt-5">
          {interviewComponentList.map((component, index) => (
            <button
              className={`tw-h-full tw-w-[10rem] tw-flex tw-justify-center tw-items-center tw-py-1 tw-px-2 tw-text-center tw-text-sm tw-border tw-border-black ${
                activeComponentIndex === index
                  ? "tw-bg-red-700 tw-text-white"
                  : "tw-bg-white tw-text-black"
              } ${
                index === 0
                  ? "tw-rounded-l-lg"
                  : index === interviewComponentList.length - 1
                  ? "tw-rounded-r-lg"
                  : ""
              }`}
              onClick={() => setActiveComponentIndex(index)}>
              {component.name}
            </button>
          ))}
        </div>
        <div className="tw-h-[75%] tw-w-full tw-relative tw-overflow-auto">
          {interviewComponentList[activeComponentIndex].type === "General Interview" ||
          interviewComponentList[activeComponentIndex].type === "Technical Assessment" ? (
            <CandidateAssementComponent />
          ) : interviewComponentList[activeComponentIndex].type === "Hiring Manager Interview" ? (
            <HiringManagerInterviewComponent />
          ) : (
            <CandidateCVComponent />
          )}
        </div>
      </div>

            {/* Support Section */}
            <button
        className="tw-absolute tw-fixed tw-bottom-5 tw-right-5 tw-rounded-full tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-flex tw-justify-center tw-items-center"
        onClick={() => setIsShowingSupportModal(true)}>
        Support
        <div className="tw-w-5 tw-h-5 tw-ml-2">
          <HelpIcon />
        </div>
      </button>
      <div
        className={
          isShowingSupportModal
            ? "tw-h-screen tw-w-screen tw-absolute tw-fixed tw-flex tw-justify-center tw-items-center"
            : "tw-hidden"
        }>
        <div
          className="pop-up-modal-backdrop"
          onClick={() => setIsShowingSupportModal(false)}></div>
        <div className="tw-h-4/6 tw-w-1/2 tw-px-5 tw-pt-10 tw-pb-5 tw-bg-white tw-rounded-xl tw-shadow tw-z-10 tw-overflow-auto">
          <div className="tw-w-full tw-flex tw-justify-between tw-items-center">
            <span className="tw-font-bold tw-text-2xl">Welcome to the Campaign Process Results Page!</span>
            <div className="tw-h-8 tw-text-black tw-cursor-pointer" onClick={() => setIsShowingSupportModal(false)}>
              <CrossIcon />
            </div>
          </div>
          <span className="tw-text-lg tw-text-justify">
            {supportTextSections.map((support, index) => (
              <div className="tw-w-full tw-h-fit tw-bg-gray-100 tw-rounded-lg tw-p-2 tw-flex tw-flex-col tw-mt-5">
                <span className="tw-font-bold tw-text-xl">{support.section}</span>
                <span className="tw-mt-3">{support.message}</span>
              </div>
            ))}
          </span>
        </div>
      </div>
      <CommandBar />
    </div>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div className="tw-w-full">
      <div className="tw-flex tw-space-x-4">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min`}
          className="tw-w-16 tw-border tw-border-gray-400 tw-shadow tw-rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max`}
          className="tw-w-16 tw-border tw-border-gray-400 tw-shadow tw-rounded"
        />
      </div>
      <div className="tw-h-1" />
    </div>
  ) : filterVariant === "candidate-cv-component-status-select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="tw-border tw-border-gray-400 tw-shadow tw-rounded">
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="passed">Passed</option>
      <option value="approved">Approved</option>
      <option value="pending">Pending</option>
      <option value="rejected">Rejected</option>
    </select>
  ) : filterVariant === "candidate-assessment-component-status-select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="tw-border tw-border-gray-400 tw-shadow tw-rounded">
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="passed">Passed</option>
      <option value="approved">Approved</option>
      <option value="high priority / kiv">High Priority / KIV</option>
      <option value="pending">Pending</option>
      <option value="rejected">Rejected</option>
    </select>
  ) : filterVariant === "hiring-manager-component-status-select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="tw-border tw-border-gray-400 tw-shadow tw-rounded">
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="passed">Passed</option>
      <option value="approved">Approved</option>
      <option value="scheduled">Scheduled</option>
      <option value="pending">Pending</option>
      <option value="rejected">Rejected</option>
    </select>
  ) : filterVariant === "interview-details-select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="tw-border tw-border-gray-400 tw-shadow tw-rounded">
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="scheduled">Scheduled</option>
      <option value="pending">Pending</option>
    </select>
  ) : (
    <DebouncedInput
      className="tw-w-36 tw-border tw-border-gray-400 tw-shadow tw-rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

export default CampaignProcessResultsPage;
