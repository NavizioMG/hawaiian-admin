import { useState, useMemo, useCallback } from "react";
import { CrudFilter, CrudFilters } from "@refinedev/core";

// No changes needed to this hook for the bug fix and new features.
// The previous version was already correct and stable. The new "instant"
// logic will be handled directly in the TourList component.
// We are providing the stable code again here for completeness.

type TriState = true | false | undefined;

export const useTourFilters = (setFilters: (filters: CrudFilters) => void) => {
  const [search, setSearch] = useState("");
  
  const [filtersState, setFiltersState] = useState<{
    category: string;
    location: string;
    is_featured?: TriState;
    is_unforgettable?: TriState;
    is_vip?: TriState;
    is_pinned?: TriState;
    show_on_homepage?: TriState;
  }>({
    category: "",
    location: "",
    is_featured: undefined,
    is_unforgettable: undefined,
    is_vip: undefined,
    is_pinned: undefined,
    show_on_homepage: undefined
  });

  const toggleFlagFilter = (key: keyof typeof filtersState) => {
    setFiltersState(prev => {
      const currentValue = prev[key];
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
      const searchFormatted = search.trim().split(' ').join(' & ');
      newFilters.push({
        field: "title_description_tags_fts",
        operator: "fts", 
        value: searchFormatted,
      });
    }
    
    if (filtersState.category) newFilters.push({ field: "category", operator: "eq", value: filtersState.category });
    if (filtersState.location) newFilters.push({ field: "location", operator: "eq", value: filtersState.location });
    
    Object.keys(filtersState).forEach((key) => {
      if ((key.startsWith('is_') || key.startsWith('show_')) && filtersState[key] !== undefined) {
        newFilters.push({ field: key, operator: "eq", value: filtersState[key] });
      }
    });
    
    setFilters(newFilters);
  }, [search, filtersState, setFilters]);

  const clearAllFilters = () => {
    setSearch("");
    setFiltersState({
      category: "", location: "", is_featured: undefined, is_unforgettable: undefined,
      is_vip: undefined, is_pinned: undefined, show_on_homepage: undefined
    });
    setFilters([]);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (filtersState.category) count++;
    if (filtersState.location) count++;
    Object.values(filtersState).forEach(value => {
      if (typeof value === 'boolean') count++;
    });
    return count;
  }, [search, filtersState]);

  return {
    search, setSearch,
    filtersState, setFiltersState,
    activeFilterCount,
    clearAllFilters,
    applyFilters,
    toggleFlagFilter,
  };
};