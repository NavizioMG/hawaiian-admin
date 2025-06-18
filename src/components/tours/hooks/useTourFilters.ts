// /src/components/tours/hooks/useTourFilters.ts
import { useState, useMemo, useCallback } from "react";
import { CrudFilter, CrudFilters } from "@refinedev/core";
import { Tour } from "../../../interfaces/tour";

type TriState = true | false | undefined;

type FiltersState = Partial<Pick<Tour, "category" | "location" | "is_featured" | "is_unforgettable" | "is_vip" | "is_pinned" | "show_on_homepage">>;

export const useTourFilters = (setFilters: (filters: CrudFilters) => void) => {
  const [search, setSearch] = useState("");
  const [filtersState, setFiltersState] = useState<FiltersState>({});

  const toggleFlagFilter = (key: string) => {
    setFiltersState(prev => {
      const currentValue = prev[key as keyof FiltersState];
      let nextValue: TriState;
      if (currentValue === undefined) nextValue = true;
      else if (currentValue === true) nextValue = false;
      else nextValue = undefined;
      return { ...prev, [key]: nextValue };
    });
  };
  
  const applyFilters = useCallback(() => {
    const newFilters: CrudFilter[] = [];
    if (search) {
      const searchFormatted = search.trim().split(' ').filter(Boolean).join(' & ');
      if (searchFormatted) {
        newFilters.push({
          field: "title_description_tags_fts",
          operator: "fts" as any, 
          value: searchFormatted,
        });
      }
    }
    
    Object.entries(filtersState).forEach(([field, value]) => {
      if (value !== undefined && value !== "") {
        newFilters.push({ field, operator: "eq", value });
      }
    });
    setFilters(newFilters);
  }, [search, filtersState, setFilters]);

  const clearAllFilters = () => {
    setSearch("");
    setFiltersState({});
    setFilters([]);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    Object.values(filtersState).forEach(value => {
      if (value !== undefined && value !== "") count++;
    });
    return count;
  }, [search, filtersState]);

  return {
    search, setSearch, filtersState, setFiltersState, activeFilterCount,
    clearAllFilters, applyFilters, toggleFlagFilter,
  };
};