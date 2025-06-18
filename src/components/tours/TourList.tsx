// /src/components/tours/TourList.tsx
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useTourFilters } from "./hooks/useTourFilters";
import { useTourActions } from "./hooks/useTourActions";
import { getTourColumns } from "./tourGridColumns";
import { TourListHeader } from "./TourListHeader";
import { PageContainer, ContentArea } from "./styles/styledComponents";
import { useEffect } from "react"; // Import useEffect

function CustomNoRowsOverlay() { /* ... same as before ... */ }

export const TourList = () => {
  const { dataGridProps, setFilters } = useDataGrid({
    resource: "tours",
    pagination: { pageSize: 50 },
    hasPagination: true,
  });

  const filterProps = useTourFilters(setFilters);
  const { handleToggle } = useTourActions();

  // FIX: This useEffect makes the toggle buttons instant, but only when a filter is changed by the user.
  useEffect(() => {
    // This applies all currently selected filters whenever a flag or other advanced filter changes.
    filterProps.applyFilters();
  }, [filterProps.filtersState, filterProps.applyFilters]);


  const columns = getTourColumns(handleToggle);

  return (
    <PageContainer>
      <TourListHeader 
        {...filterProps} 
        // Pass the loaded data to the header to calculate counts
        tourData={dataGridProps.rows}
      />
      
      <ContentArea>
        <DataGrid 
          {...dataGridProps} 
          columns={columns}
          // ... other props ...
        />
      </ContentArea>
    </PageContainer>
  );
};