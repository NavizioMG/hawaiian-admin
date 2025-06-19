// /src/components/tours/TourList.tsx
import { useEffect } from "react";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef, GridOverlay } from "@mui/x-data-grid";
import { Box, Typography, useMediaQuery, useTheme, Stack, Pagination } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';

import { Tour } from "../../interfaces/tour";
import { useTourFilters } from "./hooks/useTourFilters";
import { useTourActions } from "./hooks/useTourActions";
import { getTourColumns } from "./tourGridColumns";
import { TourListHeader } from "./TourListHeader";
import { PageContainer, ContentArea } from "./styles/styledComponents";
import { TourCard } from "./TourCard"; // Import our new mobile card component

function CustomNoRowsOverlay() { /* ... content is the same ... */ }

export const TourList = () => {
  const theme = useTheme();
  // FIX: This hook will be true if the screen is desktop-sized
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { dataGridProps, setFilters, current, setCurrent, pageCount } = useDataGrid<Tour>({
    resource: "tours",
    pagination: { pageSize: isDesktop ? 50 : 10 }, // Use smaller page size for mobile
    hasPagination: true,
    syncWithLocation: true,
  });

  const filterProps = useTourFilters(setFilters);
  const { handleToggle } = useTourActions();

  useEffect(() => {
    filterProps.applyFilters();
  }, [filterProps.filtersState, filterProps.applyFilters]);

  const columns: GridColDef<Tour>[] = getTourColumns(handleToggle);

  return (
    <PageContainer>
      <TourListHeader 
        {...filterProps} 
        tourData={dataGridProps.rows}
      />
      
      <ContentArea>
        {isDesktop ? (
          // DESKTOP VIEW: Show the full DataGrid
          <DataGrid 
            {...dataGridProps} 
            columns={columns}
            density="compact"
            pageSizeOptions={[25, 50, 100]}
            disableRowSelectionOnClick
            autoHeight
            loading={dataGridProps.loading}
            slots={{ noRowsOverlay: CustomNoRowsOverlay }}
            sx={{ border: 0, '& .MuiDataGrid-footerContainer': { borderTop: `1px solid #e0e0e0` } }}
          />
        ) : (
          // MOBILE VIEW: Show a list of TourCards
          <>
            <Stack spacing={2}>
              {dataGridProps.rows.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </Stack>
            <Pagination
              count={pageCount}
              page={current}
              onChange={(event, value) => setCurrent(value)}
              color="primary"
              sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
          </>
        )}
      </ContentArea>
    </PageContainer>
  );
};