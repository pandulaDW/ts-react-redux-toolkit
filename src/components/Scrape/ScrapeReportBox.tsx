import React, { useState, useEffect } from "react";
import { CornerDialog } from "evergreen-ui";

interface Props {
  numRecords: number;
  numFetched: number;
}

const ScrapeReportBox: React.FC<Props> = ({ numFetched, numRecords }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (numFetched > 0 && numRecords > 0) {
      setIsShown(true);
    }
  }, [numFetched, numRecords]);

  const title = "LEI Scrape Request Details";
  const description = `${numRecords} requests were sent \n
  and ${numFetched} scraped successfully`;

  return (
    <CornerDialog
      title={title}
      isShown={isShown}
      hasFooter={false}
      onCloseComplete={() => setIsShown(false)}
    >
      {description}
    </CornerDialog>
  );
};

export default ScrapeReportBox;
