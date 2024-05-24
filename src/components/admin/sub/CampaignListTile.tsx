import React from "react";
import {useNavigate} from "react-router-dom";
import Icon from "@mui/material/Icon";
import hilti from "../../../assets/hilti-sales.png";


interface CampaignListTileProps {
    id: number;
    title: string;
    newHire: number;
    startdate: string;
    endDate: string;

}

export default function CampaignListTile({id, title, newHire, startdate, endDate}: CampaignListTileProps) {
  const navigate = useNavigate();
    return (
      // TODO: Change the onClick function to store the selected campaign id as the state to pass into the campaign process results page
        <div className="tw-w-100 tw-border tw-border-black tw-flex tw-flex-row tw-p-5 tw-rounded-xl tw-justify-between tw-mb-6 tw-cursor-pointer" onClick={() => navigate("/campaign-process-results")}>
        {/* List Tile Information */}
        <div className="tw-flex tw-flex-col me-4">
          {/* ID */}
          <h5 className="tw-mb-2">Campaign ID #{id}</h5>
          {/* Campaign Name */}
          <h3 className="tw-text-red-500 tw-font-extrabold tw-text-2xl tw-mb-2">
            {title}
          </h3>

          <div className="tw-flex tw-flex-row tw-justify-between">
            <div>
              <Icon
                color="error"
                fontSize="large"
                sx={{ paddingBottom: 0, marginBottom: -1 }}
              >
                check_circle_outlined
              </Icon>

              <span className="tw-text-black tw-ml-2">{newHire} new hires</span>
            </div>
            <div>
              <Icon
                color="error"
                fontSize="large"
                sx={{ paddingBottom: 0, marginBottom: -1 }}
              >
                date_range
              </Icon>
              <span className="tw-text-black tw-ml-2">{startdate}-{endDate}</span>
            </div>
          </div>
        </div>

        {/* List Tile Picture */}
        <div style={{overflow: "tw-hidden", width: 100, height: 100}} className="tw-rounded-xl">
          <img
            src={hilti}
            alt="login background"
            // width={100}
            // height={100}
            style={{ objectFit: "cover"}}
          />
        </div>
      </div>
    )
}