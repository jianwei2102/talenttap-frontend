import React from "react";
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
    return (
        <div className="w-100 border border-black flex flex-row p-5 rounded-xl justify-between mb-6">
        {/* List Tile Information */}
        <div className="flex flex-col me-4">
          {/* ID */}
          <h5 className="mb-2">Campaign ID #{id}</h5>
          {/* Campaign Name */}
          <h3 className="text-red-500 font-extrabold text-2xl mb-2">
            {title}
          </h3>

          <div className="flex flex-row justify-between">
            <div>
              <Icon
                color="error"
                fontSize="large"
                sx={{ paddingBottom: 0, marginBottom: -1 }}
              >
                check_circle_outlined
              </Icon>

              <span className="text-black ml-2">{newHire} new hires</span>
            </div>
            <div>
              <Icon
                color="error"
                fontSize="large"
                sx={{ paddingBottom: 0, marginBottom: -1 }}
              >
                date_range
              </Icon>
              <span className="text-black ml-2">{startdate}-{endDate}</span>
            </div>
          </div>
        </div>

        {/* List Tile Picture */}
        <div style={{overflow: "hidden", width: 100, height: 100}} className="rounded-xl">
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