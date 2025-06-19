// /src/components/tours/TourList.tsx
import { useEffect } from "react"; 
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef, GridOverlay } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Tour } from "../../interfaces/tour";
import { useTourFilters } from "./hooks/useTourFilters";
import { useTourActions } from "./hooks/useTourActions";
import { getTourColumns } from "./tourGridColumns";
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
  const { dataGridProps, setFilters } = useDataGrid<Tour>({
    resource: "tours",
    pagination: { pageSize: 50 },
    hasPagination: true,
    syncWithLocation: true,
  });

  const filterProps = useTourFilters(setFilters);
  const { handleToggle } = useTourActions();

  // This useEffect applies filters whenever the user changes a filter setting.
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
        <DataGrid 
          {...dataGridProps} 
          columns={columns}
          density="compact"
          pageSizeOptions={[25, 50, 100]}
          disableRowSelectionOnClick
          autoHeight
          loading={dataGridProps.loading}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          sx={{ 
            border: 0,
            '& .MuiDataGrid-footerContainer': {
                borderTop: `1px solid #e0e0e0`
            },
            '& .MuiDataGrid-columnHeaders': {
              fontSize: { xs: '0.75rem', md: '0.875rem' }
            },
            '& .MuiDataGrid-cell': {
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              padding: { xs: '4px 8px', md: '8px 16px' }
            }
          }}
        />
      </ContentArea>
    </PageContainer>
  );
};