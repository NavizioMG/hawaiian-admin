// /src/components/tours/TourList.tsx
import { useState, useEffect } from "react";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef, GridOverlay } from "@mui/x-data-grid";
import { Box, Typography, Collapse, useTheme, useMediaQuery } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Tour } from "../../interfaces/tour";
import { useTourFilters } from "./hooks/useTourFilters";
import { useTourActions } from "./hooks/useTourActions";
import { getTourColumns } from "./tourGridColumns";
import { TourDetailView } from "./TourDetailView";
import { TourListHeader } from "./TourListHeader";
import { PageContainer, ContentArea } from "./styles/styledComponents";

function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <SearchOffIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
        <Typography variant="h6" gutterBottom>No Tours Found</Typography>
        <Typography variant="body2" color="text.secondary">Try adjusting your search or filters.</Typography>
      </Box>
    </GridOverlay>
  );
}

export const TourList = () => {
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const { handleToggle } = useTourActions();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSelectTour = (tour: Tour) => {
    setSelectedTourId((currentId) => (currentId === tour.id ? null : tour.id));
  };

  const { dataGridProps, setFilters, tableQueryResult } = useDataGrid<Tour>({
    resource: "tours",
    pagination: { pageSize: 50 },
    hasPagination: true,
    syncWithLocation: true,
    meta: {
      select: "*",
    },
  });

  const filterProps = useTourFilters(setFilters);

  useEffect(() => {
    filterProps.applyFilters();
  }, [filterProps.filtersState, filterProps.applyFilters]);

  // FIX: Pass handleToggle directly without wrapping it
  const columns: GridColDef<Tour>[] = getTourColumns(
    handleToggle,
    handleSelectTour,
    isMobile
  );

  return (
    <PageContainer>
      <TourListHeader 
        {...filterProps} 
        tourData={dataGridProps.rows}
      />
      <Collapse in={!!selectedTourId}>
        {selectedTourId && (
          <TourDetailView tourId={selectedTourId} onClose={() => setSelectedTourId(null)} />
        )}
      </Collapse>
      <ContentArea>
        <Box>
          <DataGrid 
            {...dataGridProps} 
            columns={columns}
            density="compact"
            pageSizeOptions={[25, 50, 100]}
            autoHeight
            loading={tableQueryResult.isLoading}
            slots={{ noRowsOverlay: CustomNoRowsOverlay }}
            sx={{ 
              border: 0,
              '& .MuiDataGrid-footerContainer': { borderTop: `1px solid #e0e0e0` },
              // FIX: This is the correct way to hide the header on mobile
              ...(isMobile && {
                '.MuiDataGrid-columnHeaders': {
                  display: 'none',
                },
              }),
            }}
          />
        </Box>
      </ContentArea>
    </PageContainer>
  );
};